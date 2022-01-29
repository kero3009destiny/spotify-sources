import React, { useEffect, useRef, useState } from 'react';
import createDebug from 'debug';

import { addSnackbar, useSnackbarState } from '@mrkt/features/snackbar';
import { useT } from '@mrkt/features/i18n';

import { StorylineDialog } from '../StorylineDialog';

import {
  Storyline,
  StorylineArtist,
  StorylineEditorCard,
  StorylineEntity,
  StorylinePreviewCard,
  StorylineStatus,
  StorylineStatusV1,
} from '../../lib/types';

import {
  deleteStorylineV1,
  generateCanvases,
  getStorylineV1,
  uploadStorylineV1,
  validateStorylineCards,
} from '../../lib/actions';
import { createStorylineEditorCard } from '../../lib/helpers';
import {
  removeErrorMsg,
  removeSuccessMsg,
  uploadErrorMsg,
  uploadingProgressDelay,
  uploadSuccessMsg,
} from './messaging';
import {
  StorylineButtonMini,
  StorylineButtonPrimary,
} from '../StorylineButton';

const debug = createDebug('Storylines:components:StorylineManager');

type Props = {
  onEditorClose?: () => void;
  onEditorOpen?: () => void;

  onRemoveError: (message: string, err: Error) => void;
  onRemoveSuccess: (message: string) => void;
  onUploadError: (message: string, err: Error) => void;

  artist: StorylineArtist;
  entity: StorylineEntity;
  hasEditAccess: boolean;
  isPrerelease?: boolean;
  textOnly?: boolean;
};

enum UploadStatus {
  None = 'NONE',
  Processing = 'PROCESSING',
  Uploading = 'UPLOADING',
  Error = 'ERROR',
}

export function StorylineManager(props: Props) {
  const isMounted = useRef(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>(
    UploadStatus.None,
  );
  const [isValid, setIsValid] = useState(false);
  const [renderStorylineDialog, setRenderStorylineDialog] = useState(false);
  const [storyline, setStoryline] = useState<Storyline | undefined | null>(
    null,
  );
  const [editorCards, setEditorCards] = useState<StorylineEditorCard[]>([
    createStorylineEditorCard(),
  ]);
  const [previewCards, setPreviewCards] = useState<StorylinePreviewCard[]>([]);
  const [, snackbarDispatch] = useSnackbarState();
  const isReady = storyline?.status === StorylineStatusV1.Published;
  const isUploading = uploadStatus === UploadStatus.Uploading;
  const isProcessing = uploadStatus === UploadStatus.Processing;
  const hasError = uploadStatus === UploadStatus.Error;
  const t = useT();

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Fetch storyline and initalize values in commponent state
  useEffect(() => {
    if (!isMounted.current) return;

    (async function loadData() {
      const data = await getStorylineV1(props.artist, props.entity);

      if (isMounted.current) {
        setStoryline(data);

        if (data.status === StorylineStatusV1.Processing) {
          setUploadStatus(UploadStatus.Processing);
        } else if (data.status === StorylineStatusV1.Failed) {
          setUploadStatus(UploadStatus.Error);
        }
      }
    })();
  }, [props.artist, props.entity, isMounted]);

  // Create HTML5 canvases whenever a card is updated
  useEffect(() => {
    if (!isMounted.current) return;

    if (isValid) {
      (async function loadData() {
        const cards = await generateCanvases(editorCards);
        if (isMounted.current) {
          debug('generated preview cards', cards);
          setPreviewCards(cards);
        }
      })();
    } else {
      debug('clearing preview cards');
      setPreviewCards([]);
    }
  }, [isValid, isMounted, editorCards]);

  // Displays "still uploading" message in Snackbar after a delay.
  // Only show it if the dialog is still open.
  useEffect(() => {
    let timer: number;

    if (isUploading) {
      timer = window.setTimeout(() => {
        if (isUploading && renderStorylineDialog) {
          const theme = { snackbar: 'dark' as const };
          const snackbarAction = addSnackbar(
            t(
              'STORYLINES_UPLOADING_MSG',
              `Your Storyline is still uploading. We’ll close this page when it’s finished.`,
              'storyline is uploading message',
            ),
            theme,
          );
          snackbarDispatch(snackbarAction);
        }
      }, uploadingProgressDelay);
    }
    return () => clearTimeout(timer);
  }, [isUploading, renderStorylineDialog, snackbarDispatch, t]);

  const resetEditorCards = () => {
    setEditorCards([createStorylineEditorCard()]);
  };

  const onEditorChange = async (cards: StorylineEditorCard[]) => {
    if (!validateStorylineCards(cards)) {
      debug('Invalid Storyline cards', cards);
      setEditorCards(cards);
      setIsValid(false);
      return;
    }

    setEditorCards(cards);
    setIsValid(true);
  };

  const onRemoveStoryline = async () => {
    try {
      await deleteStorylineV1(props.artist.id, props.entity.uri);
      props.onRemoveSuccess(removeSuccessMsg(t, props.entity));

      setStoryline({
        cards: [],
        entity: props.entity,
        status: StorylineStatusV1.NotFound,
      });
      onClose();
    } catch (err: any) {
      props.onRemoveError(removeErrorMsg(t, props.entity), err);
      throw err;
    }
  };

  const onUploadStoryline = async () => {
    try {
      setUploadStatus(UploadStatus.Uploading);
      const binaries = previewCards.map(card => card.binary);

      await uploadStorylineV1(binaries, props.artist.id, props.entity.uri);
      const response = await getStorylineV1(props.artist, props.entity);
      if (isMounted.current) {
        setStoryline(response);
        setUploadStatus(UploadStatus.None);
        const snackbarAction = addSnackbar(
          uploadSuccessMsg(t, props.entity, props.isPrerelease),
        );
        snackbarDispatch(snackbarAction);
      }

      onClose();
    } catch (err: any) {
      if (isMounted.current) {
        setUploadStatus(UploadStatus.Error);
      }
      props.onUploadError(uploadErrorMsg(t, props.entity), err);
      throw err;
    }
  };

  const onClose = () => {
    if (renderStorylineDialog) {
      setRenderStorylineDialog(false);
      setIsValid(false);
      resetEditorCards();
      props.onEditorClose?.();
    }
  };

  const onOpen = () => {
    setRenderStorylineDialog(true);
    props.onEditorOpen?.();
  };

  // no data loaded yet
  if (!storyline) {
    return null;
  }

  let primaryButtonText: string;

  if (isProcessing) {
    primaryButtonText = t(
      'STORYLINES_IS_PROCESSING',
      'Processing',
      'storyline is processing',
    );
  } else if (isReady) {
    primaryButtonText = t(
      'STORYLINES_MANAGE_BUTTON',
      'Manage Storyline',
      'manage story button',
    );
  } else {
    primaryButtonText = t(
      'STORYLINES_ADD_STORY_BUTTON',
      'Add Storyline',
      'add storyline button',
    );
  }

  return (
    <>
      {props.textOnly ? (
        <StorylineButtonMini
          align="left"
          onEdit={onOpen}
          posted={isReady}
          processing={isProcessing}
          error={hasError}
        />
      ) : (
        <StorylineButtonPrimary
          data-slo-id="edit-storyline-button"
          onClick={onOpen}
          showSpinner={isProcessing}
          showTextWithSpinner
        >
          {primaryButtonText}
        </StorylineButtonPrimary>
      )}

      {renderStorylineDialog && (
        <StorylineDialog
          data-testid="StorylineDialog"
          artist={props.artist}
          entity={props.entity}
          hasEditAccess={props.hasEditAccess}
          onEditorChange={onEditorChange}
          onClose={onClose}
          onRemove={onRemoveStoryline}
          onUpload={onUploadStoryline}
          isPrerelease={props.isPrerelease}
          isUploading={isUploading}
          isValid={isValid}
          storyline={storyline}
          editorCards={editorCards}
          previewCards={previewCards}
        />
      )}
    </>
  );
}
