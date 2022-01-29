/* eslint-disable @spotify/best-practices/no-discouraged-words */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Team } from '@mrkt/features/teamswitcher';
import { GabitoEvent } from '@mrkt/features/gabito';
import { useT } from '@mrkt/features/i18n';
import { getTeams } from '@mrkt/features/teamswitcher/lib/useTeams';
import { CanvasAlternateEntity, DecoratedCanvas } from '../../types/canvas';
import {
  getCanvasAlternates,
  getCanvasPermissions,
  getCanvases,
  getTermsUrl,
  removeCanvases,
  saveCanvas,
} from '../../lib/actions';
import { createCanvasEvent } from '../../lib/logger';
import { CanvasProcessingError } from '../../lib/canvasHelpers';
import {
  CANVAS_PERMISSION_EDITOR,
  CANVAS_STATUS_BLACKLISTED,
  CANVAS_STATUS_CANVAS_UPLOADED,
  CANVAS_STATUS_READY,
  CANVAS_STATUS_TRANSCODING_FAILED,
  CANVAS_STATUS_UNKNOWN,
  TEAMSWITCHER_CANVAS_ACTION,
} from '../../lib/constants';

import { CanvasEditor, UpdatingCanvas } from '../CanvasEditor';
import { CanvasButtonProps, renderCanvasButtonPrimary } from '../CanvasButton';

// Poll the canvas service for status changes
const POLLING_CADENCE = 5 * 1000;

function isCanvasNotReady(canvases: DecoratedCanvas[]) {
  return canvases.every(
    ({ status }) =>
      status !== CANVAS_STATUS_READY &&
      status !== CANVAS_STATUS_TRANSCODING_FAILED,
  );
}

function isCanvasReady(canvases: DecoratedCanvas[]) {
  return canvases.every(({ status }) => status === CANVAS_STATUS_READY);
}

function isCanvasDenylisted(canvases: DecoratedCanvas[]) {
  return canvases.some(canvas => canvas.status === CANVAS_STATUS_BLACKLISTED);
}

type Props = {
  onEditorClose?: () => void;
  onEditorOpen?: () => void;
  onRemoveError: (message: string, err: Error) => void;
  onRemoveSuccess: (message?: string) => void;
  onUpdateError: (uri: string, message: string, err: Error) => void;
  onUpdateStart?: (uri: string) => void;
  onUpdateSuccess: (uri: string, message: string) => void;

  artistId: string;
  enableRecordingGroups?: boolean;
  enableTeamSwitcher?: boolean;
  entityUri: string;
  isPrerelease?: boolean;
  logGabitoEvent: (event: GabitoEvent) => void;
  readonly?: boolean;
  renderButton?: (props: CanvasButtonProps) => JSX.Element;
  team?: Team;
};

export const CanvasManager = (props: Props) => {
  const {
    entityUri: defaultEntityUri,
    renderButton = renderCanvasButtonPrimary,
  } = props;

  const t = useT();

  const isMounted = useRef(false);

  // Permissions
  const [canEdit, setCanEdit] = useState(false);

  // Canvas Entities
  const [canvases, setCanvases] = useState<DecoratedCanvas[]>();
  const [previewCanvas, setPreviewCanvas] = useState<DecoratedCanvas>();
  const [trackAlternates, setTrackAlternates] =
    useState<CanvasAlternateEntity[]>();

  // Intervals and Timeouts
  const [pollingPromise, setPollingPromise] =
    useState<Promise<DecoratedCanvas[]>>();
  const [pollingInterval, setPollingInterval] = useState<number>();
  const [postedIntermediate, setPostedIntermediate] = useState(false);
  const [postedIntermediateTimeout, setPostedIntermediateTimeout] =
    useState<number>();

  // TeamSwitcher
  const [team, setTeam] = useState<Team | undefined>(props.team);
  const [enableTeamSwitcher, setEnableTeamSwitcher] = useState(
    props.enableTeamSwitcher,
  );

  // Loading
  const [fetching, setFetching] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Dialog
  const [showEditCanvasModal, setShowEditCanvasModal] = useState(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // Clear intervals and timeouts on unmount
    return () => {
      window.clearInterval(pollingInterval);
      window.clearTimeout(postedIntermediateTimeout);
    };
  }, [pollingInterval, postedIntermediateTimeout]);

  const onLoadCanvases = useCallback(
    async (userTeam: Team) => {
      const teamUri = userTeam.uri;
      const entityUri = userTeam.resource_uri;
      const isLicensor = userTeam
        ? !!userTeam.uri.match(/spotify:label/)
        : false;

      setFetching(true);

      try {
        const [canvasesResponse, alternatesResponse] = await Promise.all([
          getCanvases(props.artistId, [entityUri], teamUri),
          isLicensor
            ? getCanvasAlternates(props.artistId, entityUri, teamUri)
            : undefined,
        ]);

        if (!isMounted.current || !canvasesResponse) {
          return;
        }

        const readyCanvas = canvasesResponse.find(
          canvas => canvas.status === CANVAS_STATUS_READY,
        );
        const isDenied = isCanvasDenylisted(canvasesResponse);

        setCanEdit(!isDenied);
        setCanvases(canvasesResponse);
        setTrackAlternates(alternatesResponse);
        setPreviewCanvas(readyCanvas);
      } catch (e) {
        throw e;
      } finally {
        if (isMounted.current) {
          setFetching(false);
        }
      }
    },
    [props.artistId],
  );

  useEffect(() => {
    if (!isMounted.current) {
      return;
    }

    (async function checkPermissionsAndLoad() {
      const permissions = await getCanvasPermissions(
        props.artistId,
        defaultEntityUri,
      );
      const isCanvasEditor = permissions.includes(CANVAS_PERMISSION_EDITOR);

      if (isMounted.current && isCanvasEditor) {
        let userTeam = props.team;

        if (!userTeam) {
          // To account for split rights, we need an eligible team from the user
          const allTeams = await getTeams(
            defaultEntityUri,
            TEAMSWITCHER_CANVAS_ACTION,
            { artistId: props.artistId },
          );
          userTeam = allTeams.teams[0];
        }

        // This call is intended to check for the existence of a Canvas and render ADD vs MANAGE.
        // The actual fetch for the display of a Canvas happens post-TeamSwitcher (see onSetTeam())
        await onLoadCanvases(userTeam);
      }
    })();
  }, [props.artistId, defaultEntityUri, isMounted, onLoadCanvases, props.team]);

  // Log metrics
  function logEvent(step: string, action: string) {
    props.logGabitoEvent(
      createCanvasEvent({
        step,
        action,
        artistUri: canvases?.[0].artist.uri || '',
        entityUri: canvases?.[0].entity.uri || '',
        team,
      }),
    );
  }

  // Open the editor dialog
  function openCanvasModal() {
    setShowEditCanvasModal(true);
    props.onEditorOpen?.();
  }

  // Close the editor dialog and reset values
  function closeCanvasModal() {
    setShowEditCanvasModal(false);
    setTeam(undefined);
    setEnableTeamSwitcher(!!props.enableTeamSwitcher);
    props.onEditorClose?.();
  }

  // Request the correct Terms and Conditions for a team
  function onGetTermsUrl() {
    return getTermsUrl(
      props.artistId,
      team?.resource_uri || defaultEntityUri,
      team?.uri,
    );
  }

  function onSetTeam(newTeam: Team, skipConfirmation?: boolean) {
    // For single-team users, skip the TeamSwitcher step
    if (skipConfirmation) {
      setEnableTeamSwitcher(false);
    }

    // Re-fetch the Canvases for a new team
    if (newTeam.uri !== team?.uri) {
      setTeam(newTeam);
      onLoadCanvases(newTeam);
    }
  }

  // Show an intermediate "Done" message before switching to "Manage Canvas"
  function onDisplayDone() {
    const postedTimeout = window.setTimeout(() => {
      setPostedIntermediate(false);
      setPostedIntermediateTimeout(undefined);
    }, 3000);

    setPostedIntermediate(true);
    setPostedIntermediateTimeout(postedTimeout);
  }

  // Upload a new Canvas
  async function onUpdate(canvas: UpdatingCanvas): Promise<void> {
    if (!canvases || !canvases[0].entity) {
      return;
    }

    const { entity } = canvases[0];

    try {
      props.onUpdateStart?.(entity.uri);
      logEvent('upload_canvas', 'attempt');

      const saveCanvasResponse = await saveCanvas(
        canvas,
        props.artistId,
        team?.uri,
      );

      const { id, canvasUri, uploadUrl, uploadUrlTtl } = saveCanvasResponse;
      const updatedCanvases: DecoratedCanvas[] = [
        {
          ...canvases[0],
          id,
          canvasUri,
          status: CANVAS_STATUS_CANVAS_UPLOADED,
          uploadUrl,
          uploadUrlTtl,
        },
      ];

      if (isMounted.current) {
        setCanvases(updatedCanvases);
      }
    } catch (err: any) {
      const message = t(
        'CANVAS_ERROR_UPLOAD_PAGE',
        'Your Canvas for "{name}" didn’t post.',
        "Error message for when we fail to save the user's Canvas",
        {
          name: entity.name,
        },
      );
      props.onUpdateError(entity.uri, message, err);
      logEvent('upload_canvas', 'fail');
      throw err;
    }
  }

  // Remove the existing Canvases
  async function onRemove() {
    if (removing || !canvases || !canvases[0].entity) {
      return;
    }

    const { entity } = canvases[0];
    const { isPrerelease } = props;
    const teamUri = team ? team.uri : undefined;
    const canvasIds = canvases.map(canvas => canvas.id);

    setRemoving(true);
    logEvent('remove_canvas', 'attempt');

    try {
      await removeCanvases(props.artistId, canvasIds, entity.uri, teamUri);

      if (!isMounted.current) {
        return;
      }

      const message = isPrerelease
        ? undefined
        : t(
            'CANVAS_PRERELEASE_REMOVAL',
            'Your Canvas for "{name}" was removed but it could still take about an hour to update for some listeners.',
            'After the Canvas is removed, it could take an hour for listeners on the app to notice its removal',
            { name: entity.name },
          );

      const updatedCanvases: DecoratedCanvas[] = [
        {
          ...canvases[0],
          id: '',
          canvasUri: '',
          url: '',
          originalUrl: '',
          status: CANVAS_STATUS_UNKNOWN,
        },
      ];

      setCanvases(updatedCanvases);
      setPreviewCanvas(undefined);
      props.onRemoveSuccess(message);
      logEvent('remove_canvas', 'success');
      closeCanvasModal();
    } catch (err: any) {
      const message = t(
        'CANVAS_ERROR_REMOVAL',
        `Your Canvas for "{name}" wasn't removed.`,
        "Error message for when we fail to delete the user's Canvas",
        { name: entity.name },
      );
      props.onRemoveError(message, err);
      logEvent('remove_canvas', 'fail');
      throw err;
    } finally {
      if (isMounted.current) {
        setRemoving(false);
      }
    }
  }

  // Monitor the Canvas transcoding process
  async function onProcessing() {
    const entity = canvases?.[0].entity;

    if (!entity) {
      return;
    }

    setProcessing(true);

    try {
      const canvasesResponse = await pollForCanvasReady();

      if (!isMounted.current) {
        return;
      }

      onDisplayDone();
      setCanvases(canvasesResponse);
      setPreviewCanvas(canvasesResponse[0]);
      const message = props.isPrerelease
        ? t(
            'CANVAS_SUCCESS_PRERELEASE',
            'Your Canvas for "{name}" is ready. Listeners will see it when your song is released.',
            'Success message for when a user uploads a Canvas for their unreleased song. Listeners can see the Canvas after the song is released.',
            { name: entity.name },
          )
        : t(
            'CANVAS_SUCCESS',
            'Your Canvas for "{name}" is on Spotify but it could still take about an hour to appear for some listeners.',
            'Success message for when a user uploads a Canvas for their song. Listeners can see the Canvas but it may take an hour to show up on the app',
            { name: entity.name },
          );
      props.onUpdateSuccess(entity.uri, message);
      logEvent('upload_canvas', 'success');
    } catch (err: any) {
      const message = t(
        'CANVAS_ERROR_UPLOAD_PAGE',
        'Your Canvas for "{name}" didn’t post.',
        "Error message for when we fail to save the user's Canvas",
        {
          name: entity.name,
        },
      );
      props.onUpdateError(entity.uri, message, err);
      logEvent('upload_canvas', 'fail');
      throw err;
    } finally {
      if (isMounted.current) {
        setProcessing(false);
      }
    }
  }

  // Continuously fetch Canvases for a track until they're all done transcoding
  async function pollForCanvasReady() {
    if (pollingPromise) {
      return pollingPromise;
    }

    const entityUri = team?.resource_uri || defaultEntityUri;
    const teamUri = team?.uri;
    const poll = new Promise<DecoratedCanvas[]>((resolve, reject) => {
      const interval = window.setInterval(async () => {
        const canvasesResponse = await getCanvases(
          props.artistId,
          [entityUri],
          teamUri,
        );

        // exit early if no progress yet
        if (!canvasesResponse || isCanvasNotReady(canvasesResponse)) {
          return;
        }

        // stop polling
        window.clearInterval(pollingInterval);

        if (!isMounted.current) {
          return;
        }

        setPollingInterval(undefined);
        setPollingPromise(undefined);

        if (isCanvasReady(canvasesResponse)) {
          resolve(canvasesResponse);
        } else {
          reject(
            new CanvasProcessingError(
              t(
                'CANVAS_ERROR_PROCESSING',
                'We couldn’t post your Canvas. You may need to re-export your file and try posting again.',
                "Error message for when we fail to save the user's Canvas because their uploaded image or video is invalid.",
              ),
            ),
          );
        }
      }, POLLING_CADENCE);

      setPollingInterval(interval);
    });

    setPollingPromise(poll);
    return poll;
  }

  // Render nothing if the user does not have permissions
  // nor if basic Canvas info is missing
  if (!canEdit || !canvases || !canvases[0].entity) {
    return null;
  }

  const readyCanvases = canvases.filter(
    canvas => canvas.status === CANVAS_STATUS_READY,
  );

  return (
    <>
      {renderButton({
        canvases,
        processing,
        posted: readyCanvases.length > 0,
        postedIntermediate,
        onEdit: openCanvasModal,
      })}

      {showEditCanvasModal && (
        <CanvasEditor
          artistId={props.artistId}
          canvasArtist={canvases[0].artist}
          canvases={readyCanvases}
          enableRecordingGroups={props.enableRecordingGroups}
          enableTeamSwitcher={
            // don't show the team switcher if there already is a team selected
            props.team ? false : enableTeamSwitcher
          }
          isPrerelease={props.isPrerelease}
          getTermsUrl={onGetTermsUrl}
          logGabitoEvent={props.logGabitoEvent}
          onClose={closeCanvasModal}
          onProcessing={onProcessing}
          onRemove={onRemove}
          onSetTeam={onSetTeam}
          onUpdate={onUpdate}
          previewCanvas={previewCanvas}
          readonly={props.readonly}
          setPreviewCanvas={setPreviewCanvas}
          team={team}
          teamFetchingCanvases={fetching}
          trackAlternates={trackAlternates}
          trackEntity={canvases[0].entity}
        />
      )}
    </>
  );
};
