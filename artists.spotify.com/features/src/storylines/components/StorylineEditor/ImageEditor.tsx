import React, { useState } from 'react';
import styled from 'styled-components';

import { ButtonSecondary } from '@spotify-internal/encore-web';
import { ImageCapture, ParentImageParams } from '@mrkt/features/imagecapture';
import { useT } from '@mrkt/features/i18n';

import { DEFAULT_CARD_WIDTH, CARD_ASPECT_RATIO } from '../../lib/constants';

import { StorylineEditorCard } from '../../lib/types';
import { ImageArrows, ImageArrowsInner, ImageEditorButtons } from './styles';

// Lifted from CardArea styles for StorylineEditor
const ImageEditorContainer = styled.div`
  top: 40px; /* match spacer for the delete card button */
  position: absolute;
  z-index: 2;
  left: 50%;
  width: ${DEFAULT_CARD_WIDTH}px;
  margin-left: -${DEFAULT_CARD_WIDTH / 2}px;
  height: calc(${DEFAULT_CARD_WIDTH / CARD_ASPECT_RATIO}px);
  display: flex;
  flex-direction: column;
`;

type Props = {
  card: StorylineEditorCard;
  onCancel: () => void;
  onFileError: (errors: string[]) => void;
  onSave: (card: StorylineEditorCard) => void;
};

export function ImageEditor({ card, onCancel, onSave }: Props) {
  const cardHeight = DEFAULT_CARD_WIDTH / CARD_ASPECT_RATIO;
  const [editedImage, setEditedImage] = useState<ParentImageParams>();
  const t = useT();

  // Record user edits to the source image
  const captureImage = (capturedImage: ParentImageParams) => {
    setEditedImage(capturedImage);
  };

  // Create StorylineEditorCard with user's edits
  // and call props.onSave with it
  const onSaveClick = () => {
    if (!editedImage) {
      throw new Error(
        t(
          'STORYLINES_SAVE_ERROR',
          'Attempted to save without a card in edit',
          'Describes attempting to save a Storyline when there is no card currently in an edit state.',
        ),
      );
    }

    const editingCard: StorylineEditorCard = {
      ...card,
      image: {
        file: editedImage.url,
        properties: {
          x: editedImage.position.x,
          y: editedImage.position.y,
          zoom: editedImage.zoom,
        },
      },
    };

    onSave(editingCard);
  };

  return (
    <ImageEditorContainer className="encore-muted-accent-set">
      <ImageCapture
        name="storyline-image-capture"
        image={{
          source: card.image.file as string,
          height: cardHeight,
          width: DEFAULT_CARD_WIDTH,
        }}
        width={DEFAULT_CARD_WIDTH}
        height={cardHeight}
        desiredAspectRatio={CARD_ASPECT_RATIO}
        sendImageToParent={captureImage}
        renderChildren={() => (
          <ImageArrows>
            <ImageArrowsInner />
          </ImageArrows>
        )}
        editable
      />

      <ImageEditorButtons className="encore-muted-accent-set">
        <ButtonSecondary
          buttonSize={ButtonSecondary.sm}
          aria-label={t(
            'STORYLINES_CANCEL_EDIT_LABEL',
            'Cancel editing image',
            'cancel editing button',
          )}
          onClick={onCancel}
        >
          {t('STORYLINES_CANCEL_EDIT', 'Cancel', 'cancel editing button')}
        </ButtonSecondary>

        <ButtonSecondary
          buttonSize={ButtonSecondary.sm}
          aria-label={t(
            'STORYLINES_FINISH_EDIT',
            'Finish editing image',
            'finish editing button',
          )}
          onClick={onSaveClick}
        >
          {t('STORYLINES_EDIT_COMPLETE', 'Done', 'complete job button')}
        </ButtonSecondary>
      </ImageEditorButtons>
    </ImageEditorContainer>
  );
}
