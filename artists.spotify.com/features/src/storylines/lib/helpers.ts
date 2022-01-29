// ignore-string-externalization
import { white } from '@spotify-internal/encore-web';
import {
  ImageProperties,
  StorylineEditorCard,
  StorylineImageEditor,
  StorylineTextEditor,
  TextProperties,
} from './types';

const defaultImageProperties: ImageProperties = {
  zoom: 1,
  x: 0,
  y: 0,
};
const defaultTextProperties: TextProperties = {
  color: white,
  align: 'left',
  position: 'middle',
};

let cardCreationCounter = 0;
export function createStorylineEditorCard(
  imageUrl?: string,
  textContent: string = '',
  imageProperties: ImageProperties = defaultImageProperties,
  textProperties: TextProperties = defaultTextProperties,
): StorylineEditorCard {
  const image: StorylineImageEditor = {
    file: imageUrl,
    properties: imageProperties,
  };

  const text: StorylineTextEditor = {
    content: textContent,
    properties: textProperties,
  };

  return { key: `${Date.now()}_${cardCreationCounter++}`, image, text };
}
