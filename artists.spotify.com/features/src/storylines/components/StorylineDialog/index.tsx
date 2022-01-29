import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import {
  Banner,
  DialogFullScreen,
  spacer8,
  spacer20,
  cssColorValue,
} from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';

import {
  Storyline,
  StorylineArtist,
  StorylineEntity,
  StorylineEditorCard,
  StorylinePreviewCard,
  StorylineStatus,
  StorylineStatusV1,
} from '../../lib/types';

import { EntityHeader } from '../EntityHeader';
import { StorylineEditor } from '../StorylineEditor';
import { StorylinePreview } from '../StorylinePreview';
import { CancelModal } from './CancelModal';
import { StorylineDialogFooter } from './Footer';
import { IncompleteCardModal } from './IncompleteCardModal';
import { RemoveModal } from './RemoveModal';

const isEditorDirty = (editorCards: StorylineEditorCard[]): boolean => {
  if (editorCards.length === 0) {
    return false;
  }

  return editorCards.some(card => !!card.text.content || !!card.image.file);
};

const Errors = styled.div`
  margin-bottom: ${spacer20};
  position: relative;
  z-index: 1;
`;

type Props = {
  onClose: () => void;
  onEditorChange: (cards: StorylineEditorCard[]) => void;
  onRemove: () => Promise<void>;
  onUpload: () => Promise<void>;

  artist: StorylineArtist;
  editorCards: StorylineEditorCard[];
  entity: StorylineEntity;
  hasEditAccess?: boolean;
  isPrerelease?: boolean;
  isUploading?: boolean;
  isValid?: boolean;
  previewCards: StorylinePreviewCard[];
  storyline: Storyline;
};

export function StorylineDialog(props: Props) {
  const [errors, setErrors] = useState<string[]>([]);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showIncompleteCardModal, setShowIncompleteCardModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [maxCardIndex, setMaxCardIndex] = useState(0);
  const isReady =
    props.storyline.status === StorylineStatus.Ready ||
    props.storyline.status === StorylineStatusV1.Published;

  useEffect(() => {
    if (props.isValid) {
      setErrors([]);
    }
  }, [props.isValid]);

  useEffect(() => {
    const storylineLength = props.storyline.cards.length;
    const cardLength = Math.max(
      storylineLength,
      props.editorCards.length,
      props.previewCards.length,
    );

    setMaxCardIndex(Math.max(cardLength - 1, 0));
  }, [props.storyline, props.editorCards.length, props.previewCards.length]);

  const resetErrors = () => {
    setErrors([]);
  };

  const decrementCardIndex = useCallback(
    () => setCardIndex(index => Math.max(index - 1, 0)),
    [],
  );

  const incrementCardIndex = useCallback(() => {
    setCardIndex(index => Math.min(index + 1, maxCardIndex));
  }, [maxCardIndex]);

  // cycle through cards with the arrow keys
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      // ignore keyboard events if the current focused element is an input
      if (
        !document.activeElement ||
        !['INPUT', 'TEXTAREA'].includes(document.activeElement.nodeName)
      ) {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            decrementCardIndex();
            break;
          case 'ArrowRight':
            e.preventDefault();
            incrementCardIndex();
            break;
        }
      }
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [decrementCardIndex, incrementCardIndex]);

  const t = useT();

  const onUploadImages = async () => {
    try {
      await props.onUpload();
    } catch {
      setErrors([
        t(
          'STORYLINES_UPLOAD_ERROR',
          'Something went wrong and we couldn’t post your Storyline. Try posting again.',
          'error message when storyline failed to post',
        ),
      ]);
    }
  };

  const onRemoveStoryline = async () => {
    try {
      await props.onRemove();
    } catch {
      setErrors([
        t(
          'STORYLINES_REMOVAL_ERROR1',
          'Removal failed. Please try again later.',
          'error message when storyline failed to be removed',
        ),
      ]);
    }
  };

  const onCloseEditor = (e?: KeyboardEvent) => {
    const anyModalOpen =
      showCancelModal || showIncompleteCardModal || showRemoveModal;
    if (anyModalOpen) {
      return;
    }

    e?.stopImmediatePropagation?.();

    isEditorDirty(props.editorCards)
      ? setShowCancelModal(true)
      : props.onClose();
  };

  let cardImages: string[] | undefined;
  if (isReady) {
    cardImages = props.storyline.cards.map(card => card.imageUrl);
  } else if (isPreviewing && props.previewCards.length) {
    cardImages = props.previewCards.map(card => card.imageUrl);
  }

  return (
    <>
      <DialogFullScreen
        className="encore-muted-accent-set"
        style={{ color: cssColorValue('textSubdued') }}
        dialogTitle={
          isReady
            ? t(
                'STORYLINES_VIEW_STORYLINE',
                'View Storyline',
                'view storyline dialog title',
              )
            : t(
                'STORYLINES_ADD_STORYLINE',
                'Add Storyline',
                'add storyline dialog title',
              )
        }
        onClose={onCloseEditor}
        onEscape={onCloseEditor}
        body={
          <>
            {errors.length >= 1 && (
              <Errors>
                {errors.map(error => (
                  <Banner
                    key={error}
                    colorSet="negative"
                    contextual
                    onClose={() => resetErrors()}
                    style={{ marginBottom: spacer8 }}
                  >
                    {error}
                  </Banner>
                ))}
              </Errors>
            )}

            <EntityHeader entity={props.entity} />

            {cardImages ? (
              <StorylinePreview
                artist={props.artist}
                entity={props.entity}
                images={cardImages}
                showFollow
                cardIndex={cardIndex}
                setCardIndex={setCardIndex}
              />
            ) : (
              <StorylineEditor
                onChange={props.onEditorChange}
                onError={setErrors}
                cards={props.editorCards}
                cardIndex={cardIndex}
                setCardIndex={setCardIndex}
              />
            )}

            {showCancelModal && (
              <CancelModal
                onClose={props.onClose}
                onCancel={() => setShowCancelModal(false)}
              />
            )}

            {showIncompleteCardModal && (
              <IncompleteCardModal
                onClose={() => setShowIncompleteCardModal(false)}
              />
            )}

            {showRemoveModal && (
              <RemoveModal
                onConfirm={onRemoveStoryline}
                onCancel={() => setShowRemoveModal(false)}
              />
            )}
          </>
        }
        footer={
          <StorylineDialogFooter
            hasEditAccess={props.hasEditAccess}
            hasStoryline={isReady}
            isPrerelease={props.isPrerelease}
            isPreviewing={isPreviewing}
            isUploading={props.isUploading}
            onBack={() => setIsPreviewing(false)}
            onClose={onCloseEditor}
            onPreview={() => {
              props.isValid
                ? setIsPreviewing(true)
                : setShowIncompleteCardModal(true);
            }}
            onRemove={() => setShowRemoveModal(true)}
            onUpload={onUploadImages}
          />
        }
      />
    </>
  );
}
