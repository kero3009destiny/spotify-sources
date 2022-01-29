import React from 'react';
import styled from 'styled-components';

import {
  Type,
  spacer8,
  spacer16,
  spacer40,
} from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';

import { StorylineEditorCard } from '../../lib/types';
import { TextToolbar } from '../TextToolbar';
import { ImageUpload } from './ImageUpload';

const EditMenu = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Grid = styled.div`
  align-items: center;
  display: grid;
  grid-gap: ${spacer8} ${spacer40};
  grid-template-columns: auto auto;
  justify-items: center;
  margin-top: ${spacer16};
`;

type Props = {
  card?: StorylineEditorCard;
  onChange: (card: StorylineEditorCard) => void;
  onFileError: (errors: string[]) => void;
};

export function EditorControls({ card, onChange, onFileError }: Props) {
  const t = useT();

  if (!card) {
    return null;
  }

  return (
    <EditMenu>
      <Grid>
        <Type as="label" variant="cta4">
          {t(
            'STORYLINES_IMAGE_REQUIRED',
            'Image (required)',
            'image required text',
          )}
        </Type>
        <Type as="label" variant="cta4">
          {t('STORYLINES_TEXT_OPTIONS', 'Text Options', 'text options')}
        </Type>

        <ImageUpload
          file={card.image.file}
          onChange={file => {
            const image = { ...card.image, file };
            onChange({ ...card, image });
          }}
          onError={onFileError}
        />
        <TextToolbar
          {...card.text.properties}
          onChange={properties => {
            const text = { ...card.text, properties };
            onChange({ ...card, text });
          }}
        />
      </Grid>
    </EditMenu>
  );
}
