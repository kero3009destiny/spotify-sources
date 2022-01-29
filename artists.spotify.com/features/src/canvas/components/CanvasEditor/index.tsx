import React, { useState, useCallback, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import createDebug from 'debug';
import {
  Backdrop,
  Banner,
  FormCheckbox,
  LoadingIndicator,
  Type,
  spacer8,
} from '@spotify-internal/encore-web';

import { DialogConfirmation } from '@mrkt/features/Dialog';
import { Dropzone, DropzoneFileData } from '@mrkt/features/dropzone';
import { GabitoEvent } from '@mrkt/features/gabito';
import { useT, TFunction } from '@mrkt/features/i18n';
import { TeamSwitcher, Team } from '@mrkt/features/teamswitcher';
import { NowPlayingView, NPV_HEIGHT } from '@mrkt/features/nowplayingview';
import { calculateCropInfo } from '@mrkt/features/mediahelpers';
import { CropInfo } from '@mrkt/features/mediahelpers/types';
import { useRouter } from 'next/router';

import {
  CanvasType,
  CanvasEntity,
  CanvasArtist,
  DecoratedCanvas,
  CanvasAlternateEntity,
} from '../../types/canvas';
import { CanvasProcessingError } from '../../lib/canvasHelpers';
import {
  CANVAS_TYPE_IMAGE,
  CANVAS_TYPE_VIDEO_LOOPING_RANDOM,
  TEAMSWITCHER_CANVAS_ACTION,
} from '../../lib/constants';
import { createCanvasEvent } from '../../lib/logger';
import { useIsCanvasInMaintenance } from '../../lib/useIsCanvasInMaintenance';
import { Instructions } from '../Instructions';
import { LogImpression } from '../LogImpression';
import { TermsAndConditions } from '../TermsAndConditions';
import { Language, localeToLanguage } from '../TermsAndConditions/Language';
import {
  getTermsUrl,
  TranslationMap,
} from '../TermsAndConditions/TranslationMap';
import { RemoveModal } from './RemoveModal';
import { TrackAlternatesModal } from './TrackAlternatesModal';
import { Footer } from './Footer';

import { TermsDropdown } from '../CanvasEditor/TermsDropdown';

const debug = createDebug('components:CanvasEditor');

const DialogBody = styled.div<{ showTerms?: boolean }>`
  height: ${props =>
    NPV_HEIGHT -
    (props.showTerms
      ? 60
      : 0)}px; /* the height differs if the dialog is showing the legal checkbox */
  margin-top: ${spacer8};
`;

const EditorLayout = styled.div`
  display: flex;
`;

const Centered = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;

const maxFileSize = 250 * 1024 * 1024;

export type UpdatingCanvas = {
  entityUri: string;
  binary: ArrayBuffer;
  type: CanvasType;
  cropInfo: CropInfo;
};

export type EditingCanvas = {
  url: string;
  type: CanvasType;
  cropInfo: CropInfo;
  file: File;
  binary: ArrayBuffer;
  source: string;
};

type CanvasEditorProps = {
  getTermsUrl: () => Promise<string | undefined>;
  onClose: () => void;
  onProcessing: (canvas: UpdatingCanvas) => Promise<void>;
  onRemove: () => void;
  onUpdate: (canvas: UpdatingCanvas) => Promise<any>;

  artistId: string;
  canvasArtist: CanvasArtist;
  canvases?: DecoratedCanvas[];
  logGabitoEvent: (event: GabitoEvent) => void;
  previewCanvas?: DecoratedCanvas;
  setPreviewCanvas: (canvas: DecoratedCanvas) => void;

  enableRecordingGroups?: boolean;
  isPrerelease?: boolean;
  readonly?: boolean;
  trackAlternates?: CanvasAlternateEntity[];
  trackEntity: CanvasEntity;

  onSetTeam: (team: Team, skipConfirmation?: boolean) => void;
  enableTeamSwitcher?: boolean;
  forceMaintenanceBanner?: boolean;
  team?: Team;
  teamFetchingCanvases?: boolean;
};

const onReceiveFiles = (
  [fileData]: DropzoneFileData[],
  t: TFunction,
): {
  editingCanvas?: EditingCanvas;
  errors: string[];
} => {
  const { file, metadata, errors: fileErrors = [], binary, source } = fileData;
  const errors = [...fileErrors];

  const isVideo = file.type.includes('video');
  const desiredAspectRatio = 9 / 16;

  const { width, height } = metadata;

  const WRONG_DIMENSIONS_IMAGE = t(
    'CANVAS_IMAGE_INVALID_RATIO',
    'That file has the wrong ratio. Your image must have a 9:16 aspect ratio.',
    "The user's uploaded image has an incompatible aspect ratio. The aspect ratio must be 9 to 16.",
  );
  const WRONG_DIMENSIONS_VIDEO = t(
    'CANVAS_VIDEO_INVALID_RATIO',
    'That file has the wrong ratio. Your video must have a 9:16 aspect ratio.',
    "The user's uploaded video has an incompatible aspect ratio. The aspect ratio must be 9 to 16.",
  );

  if (width && height) {
    const aspectRatio = width / height;

    if (aspectRatio !== desiredAspectRatio) {
      errors.push(isVideo ? WRONG_DIMENSIONS_VIDEO : WRONG_DIMENSIONS_IMAGE);
    }
  }

  if (errors.length || !binary || !width || !height) {
    return { errors };
  }

  const type: CanvasType = isVideo
    ? CANVAS_TYPE_VIDEO_LOOPING_RANDOM
    : CANVAS_TYPE_IMAGE;
  const cropInfo: CropInfo = calculateCropInfo(
    width,
    height,
    desiredAspectRatio,
  );
  const editingCanvas: EditingCanvas = {
    url: source,
    type,
    cropInfo,
    file,
    binary,
    source,
  };

  return { editingCanvas, errors };
};

export function CanvasEditor(props: CanvasEditorProps) {
  const t = useT();
  const [errors, setErrors] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [posted, setPosted] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [removable, setRemovable] = useState(
    Boolean(props.canvases && props.canvases.length),
  );
  const [editingCanvas, setEditingCanvas] = useState<EditingCanvas>();

  const [showTeamSwitcher, setShowTeamSwitcher] = useState(
    props.enableTeamSwitcher && !props.team,
  );
  const [team, setTeam] = useState<Team | undefined>(props.team);

  const [showTerms, setShowTerms] = useState(false);
  const [termsDisabled, setTermsDisabled] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter();
  const lang = localeToLanguage(router.locale || 'en');
  const [termsLanguage, setTermsLanguage] = useState<Language>(lang);

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showContentGuidelines, setShowContentGuidelines] = useState(false);
  const [showTrackAlternatesModal, setShowTrackAlternatesModal] =
    useState(false);

  const isCanvasInMaintenance = useIsCanvasInMaintenance();
  const showMaintenanceBanner =
    props.forceMaintenanceBanner || isCanvasInMaintenance;

  const memoizedTeamSwitcherParams = useMemo(
    () => ({
      artistId: props.artistId,
    }),
    [props.artistId],
  );
  const dialogRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    // re-check removability when canvases change (e.g. team switching)
    setRemovable(Boolean(props.canvases && props.canvases.length));
  }, [props.canvases]);

  const logEvent = (step: string, action: string) => {
    props.logGabitoEvent(
      createCanvasEvent({
        step,
        action,
        artistUri: props.canvasArtist.uri,
        entityUri: props.trackEntity.uri,
        team,
      }),
    );
  };

  // used for logging
  let step = 'unknown';
  if (posted) {
    step = 'canvas_posted';
  } else if (uploading) {
    step = 'canvas_uploading';
  } else if (processing) {
    step = 'canvas_processing';
  } else if (showTeamSwitcher) {
    step = 'select_team';
  } else if (showTerms) {
    step = 'terms';
  } else if (props.previewCanvas) {
    step = 'preview_canvas';
  } else if (!props.readonly) {
    step = 'choose_artwork';
  }

  const onClose = () => {
    if (!uploading) {
      logEvent(step, 'dismiss');
      props.onClose();
    }
  };

  const onUpdate = async () => {
    const { trackEntity } = props;

    if (!editingCanvas) {
      return;
    }

    setShowContentGuidelines(false);
    setUploading(true);
    setProcessing(false);
    setPosted(false);
    setRemovable(false);
    setShowTerms(false);

    const canvas: UpdatingCanvas = {
      entityUri: trackEntity.uri,
      binary: editingCanvas.binary,
      type: editingCanvas.type,
      cropInfo: editingCanvas.cropInfo,
    };

    try {
      // uploading complete -> canvas is getting processed now
      await props.onUpdate(canvas);
      setProcessing(true);
      setUploading(false);

      // processing complete -> canvas is posted now
      await props.onProcessing(canvas);
      setPosted(true);
      setProcessing(false);
    } catch (e) {
      debug('Failed to update Canvas', e);

      let error;
      if (e instanceof CanvasProcessingError) {
        error = e.message;
        setEditingCanvas(undefined);
      } else {
        error = t(
          'CANVAS_ERROR_UPLOAD_MODAL',
          'Something went wrong and we couldn’t post your Canvas.',
          "Error message for when we fail to save the user's Canvas",
        );
      }

      setUploading(false);
      setProcessing(false);
      setPosted(false);
      setErrors([error]);
    }
  };

  const { onSetTeam } = props;
  const onSelectTeam = useCallback(
    (selectedTeam: Team, skipConfirmation?: boolean) => {
      setTeam(selectedTeam);
      if (skipConfirmation) {
        setShowTeamSwitcher(false);
        onSetTeam(selectedTeam, true);
      }
    },
    [onSetTeam],
  );

  let body = (
    <DialogBody showTerms={showTerms}>
      <Centered>
        <LoadingIndicator
          indicatorSize={LoadingIndicator.md}
          data-testid="loading-indicator"
        />
      </Centered>
    </DialogBody>
  );

  const canvasIntroHeader = TranslationMap[termsLanguage].preambleTitle;
  const canvasIntroBody = TranslationMap[termsLanguage].preambleSubtitle;
  const termsTextDirection = TranslationMap[termsLanguage].rtl ? 'rtl' : 'ltr';

  const renderTermsAcceptance = () => (
    <div dir={termsTextDirection}>
      <FormCheckbox
        checked={termsAccepted}
        disabled={termsDisabled}
        onChange={() => {
          setTermsAccepted(v => {
            const toggled = !v;
            logEvent(step, toggled ? 'check' : 'uncheck');
            return toggled;
          });
        }}
        id="terms"
        data-testid="terms-checkbox"
        data-slo-id="terms-checkbox"
      >
        <Type variant={Type.body3} semanticColor="textSubdued">
          {TranslationMap[termsLanguage].acceptanceCta}
        </Type>
      </FormCheckbox>
    </div>
  );

  const onSelectLanguage = (selection: Language) => {
    setTermsLanguage(selection);
    setTermsDisabled(false);
    setTermsAccepted(false);
  };

  const focusDialog = () => dialogRef.current?.focus();

  const onHideTeamSwitcher = () => {
    setShowTeamSwitcher(false);
    focusDialog();
    if (team) {
      props.onSetTeam(team);
    }
  };

  const onHideTermsAndConditions = () => {
    setTermsAccepted(false);
    setShowTerms(false);
    focusDialog();
  };

  if (!props.enableTeamSwitcher || !props.teamFetchingCanvases) {
    body = (
      <DialogBody showTerms={showTerms}>
        {(errors.length > 0 || showMaintenanceBanner) && (
          <div style={{ marginBottom: '18px' }}>
            {errors.map((error: string) => (
              <Banner
                key={error}
                colorSet="negative"
                contextual
                style={{ marginBottom: '8px' }}
              >
                {error}
              </Banner>
            ))}
            {showMaintenanceBanner ? (
              <Banner
                key="showMaintenanceBanner"
                contextual
                style={{ marginBottom: '8px' }}
              >
                {t(
                  'CANVAS_MAINTENANCE',
                  "Canvas upload is temporarily unavailable. We'll have things back to normal soon.",
                  'Message for when the website is under maintenance and users cannot upload a Canvas',
                )}
              </Banner>
            ) : null}
          </div>
        )}

        {showTeamSwitcher && (
          <LogImpression
            logGabitoEvent={props.logGabitoEvent}
            step={step}
            artistUri={props.canvasArtist.uri}
            entityUri={props.trackEntity.uri}
          >
            <TeamSwitcher
              action={TEAMSWITCHER_CANVAS_ACTION}
              resourceUri={props.trackEntity.uri}
              params={memoizedTeamSwitcherParams}
              selectedTeam={team}
              onSelect={onSelectTeam}
              switcherTitle={t(
                'CANVAS_TEAMSWITCHER',
                'You’re acting on behalf of this team. Is that correct?',
                "Prompt to confirm the user's team is accurate",
              )}
            />
          </LogImpression>
        )}

        {showTerms && (
          <LogImpression
            logGabitoEvent={props.logGabitoEvent}
            step={step}
            artistUri={props.canvasArtist.uri}
            entityUri={props.trackEntity.uri}
            team={team}
          >
            <TermsAndConditions
              getTermsUrl={props.getTermsUrl}
              introHeader={canvasIntroHeader}
              introBody={canvasIntroBody}
              onLoad={() => setTermsDisabled(false)}
              onError={() => {
                setTermsDisabled(true);
                setTermsAccepted(false);
              }}
              staticTermsUrl={getTermsUrl(termsLanguage)}
              textDirection={termsTextDirection}
            />
          </LogImpression>
        )}

        {!showTerms && !showTeamSwitcher && (
          <LogImpression
            logGabitoEvent={props.logGabitoEvent}
            step={step}
            artistUri={props.canvasArtist.uri}
            entityUri={props.trackEntity.uri}
            team={team}
          >
            <EditorLayout>
              {processing ||
              uploading ||
              posted ||
              removable ||
              props.readonly ||
              props.previewCanvas ? (
                <NowPlayingView
                  canvas={editingCanvas || props.previewCanvas}
                  artist={props.canvasArtist}
                  entity={props.trackEntity}
                  showContentGuidelines={showContentGuidelines}
                />
              ) : (
                <Dropzone
                  ariaLabel={t(
                    'CANVAS_DROPZONE',
                    'Press Enter key to upload a file',
                    'A user can open the file upload dialog by pressing the Enter key',
                  )}
                  onFileSelection={(fileData: DropzoneFileData[]) => {
                    const processedFileData = onReceiveFiles(fileData, t);
                    setEditingCanvas(processedFileData.editingCanvas);
                    setErrors(processedFileData.errors);
                    logEvent(step, 'select_media');
                  }}
                  acceptsValidOnly={false}
                  acceptsVideo
                  maxFileSize={maxFileSize}
                  maxVideoDuration={8}
                  minVideoDuration={3}
                  minFileHeight={720}
                  minFileWidth={0}
                  imageTypes={['image/jpeg', 'image/jpg']}
                >
                  <NowPlayingView
                    canvas={editingCanvas}
                    artist={props.canvasArtist}
                    entity={props.trackEntity}
                    replaceable={!props.readonly}
                    showContentGuidelines={showContentGuidelines}
                  />
                </Dropzone>
              )}
              <Instructions
                canvases={props.canvases}
                isPrerelease={props.isPrerelease}
                removable={removable}
                onRemove={() => setShowRemoveModal(true)}
                uploading={uploading}
                processing={processing}
                posted={posted}
                showContentGuidelines={showContentGuidelines}
                toggleContentGuidelines={() =>
                  setShowContentGuidelines(currentValue => !currentValue)
                }
                readonly={props.readonly}
                previewCanvas={props.previewCanvas}
                setPreviewCanvas={props.setPreviewCanvas}
              />
            </EditorLayout>
          </LogImpression>
        )}
      </DialogBody>
    );
  }

  return (
    <Backdrop center onClose={onClose}>
      <DialogConfirmation
        style={{ width: '624px' }}
        dialogId="manage-canvas-dialog"
        refOverride={dialogRef}
        dialogTitle={
          <>
            {showTerms && (
              <TermsDropdown
                currentLanguage={termsLanguage}
                onSelectLanguage={onSelectLanguage}
              />
            )}
            {t('CANVAS', 'Canvas', 'Name of a product feature')}
            {props.isPrerelease && (
              <Type
                as="p"
                variant={Type.body3}
                semanticColor="textSubdued"
                condensed
              >
                {t(
                  'CANVAS_PRERELEASE_NOTICE',
                  'Listeners will see your Canvas when your song is released.',
                  'The listeners on the app will only be able to view the Canvas on or after the release date of the song',
                )}
              </Type>
            )}
          </>
        }
        body={body}
        footer={
          <Footer
            onClose={onClose}
            onHideTeamSwitcher={onHideTeamSwitcher}
            onHideTermsAndConditions={onHideTermsAndConditions}
            onShowTeamSwitcher={() => {
              setShowTeamSwitcher(true);
              focusDialog();
            }}
            onShowTermsAndConditions={() => {
              setShowTerms(true);
              focusDialog();
            }}
            onShowTrackAlternatesModal={() => setShowTrackAlternatesModal(true)}
            onUpdate={onUpdate}
            canvases={props.canvases}
            enableRecordingGroups={props.enableRecordingGroups}
            enableTeamSwitcher={props.enableTeamSwitcher}
            isCanvasInMaintenance={showMaintenanceBanner}
            isPrerelease={props.isPrerelease}
            hasEditingCanvas={Boolean(editingCanvas)}
            hasTeamSelected={Boolean(team)}
            posted={posted}
            processing={processing}
            readonly={props.readonly}
            removable={removable}
            showTeamSwitcher={showTeamSwitcher}
            showTerms={showTerms}
            termsAccepted={termsAccepted}
            trackAlternates={props.trackAlternates}
            trackEntity={props.trackEntity}
            uploading={uploading}
          />
        }
        legal={showTerms && renderTermsAcceptance()}
        legalStrict={showTerms}
      />

      {showRemoveModal && (
        <RemoveModal
          canvases={props.canvases}
          onCancel={() => setShowRemoveModal(false)}
          onRemove={props.onRemove}
        />
      )}

      {showTrackAlternatesModal && (
        <TrackAlternatesModal
          trackAlternates={props.trackAlternates}
          onClose={() => setShowTrackAlternatesModal(false)}
        />
      )}
    </Backdrop>
  );
}

CanvasEditor.defaultProps = {
  enableRecordingGroups: true,
  logGabitoEvent() {},
  onClose() {},
  async onRemove() {},
  async onUpdate() {},
  async onProcessing() {},
};
