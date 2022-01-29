// ignore-string-externalization
import createDebug from 'debug';

import { DEFAULT_CARD_WIDTH, CARD_ASPECT_RATIO } from '../constants';
import { StorylineEditorCard, StorylinePreviewCard } from '../types';
import {
  ColorStop,
  drawLinearGradient,
  fillPositionedText,
} from './canvasWriter';

const debug = createDebug('Storylines:lib:canvas');

const FONT_FAMILY = 'spotify-circular,Helvetica,Arial,sans-serif';
const FONT_SIZE = 22;

// Affects the scale for both the card dimensions and text elements
const SCALE_FACTOR = 4;

// Lifted from StorylineTextInput
const TEXT_PADDING = {
  top: 48,
  right: 32,
  bottom: 64,
  left: 32,
};

/*
  Calculate the parameters for context.drawImage() that
  will center an image of non-standard aspect ratio
*/
const fitImageToCanvas = (
  imageWidth: number,
  imageHeight: number,
  canvasWidth: number,
  canvasHeight: number,
) => {
  const imageRatio = imageWidth / imageHeight;
  let finalWidth = canvasWidth;
  let finalHeight = canvasHeight;

  if (imageRatio < CARD_ASPECT_RATIO) {
    finalHeight = finalWidth / imageRatio;
  } else {
    finalWidth = finalHeight * imageRatio;
  }

  return {
    width: finalWidth,
    height: finalHeight,
    offsetX: (canvasWidth - finalWidth) / 2,
    offsetY: (canvasHeight - finalHeight) / 2,
  };
};

/*
  Take a StorylineEditorCard from the editor tool and create a new
  HTML canvas element.
  This funciton should support all image and text utilities provided
  by the editor tool.

  Canvas layers, ordered:
  1. Background image
  2. Gradient
  3. Text, if present
*/
export const generateCanvas = async (
  card: StorylineEditorCard,
): Promise<StorylinePreviewCard> => {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
  const text = card.text.content;
  const canvasWidth = DEFAULT_CARD_WIDTH * SCALE_FACTOR;
  const canvasHeight = canvasWidth / CARD_ASPECT_RATIO;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  if (!context) {
    debug('no context avialable for canvas');
    return Promise.reject();
  }

  if (!card.image.file) {
    debug('no background image file set for canvas');
    return Promise.reject();
  }

  // Draw the background Image
  const backgroundImage = new Image();
  backgroundImage.src = card.image.file;

  await new Promise(resolve => {
    backgroundImage.onload = resolve;
  });

  debug('drawing image');
  /*
    Ideally the image uploaded is 3:4 but this forces images
    into the CARD_ASPECT_RATIO similar to background image
    size: cover and position: center
  */
  const imageWidth = backgroundImage.width;
  const imageHeight = backgroundImage.height;

  if (imageWidth / imageHeight === CARD_ASPECT_RATIO) {
    context.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);
  } else {
    const { offsetX, offsetY, width, height } = fitImageToCanvas(
      imageWidth,
      imageHeight,
      canvasWidth,
      canvasHeight,
    );
    context.drawImage(backgroundImage, offsetX, offsetY, width, height);
  }

  // Draw the gradient layer
  debug('drawing gradient');
  const gradientStops: ColorStop[] = [
    { position: 0, color: 'rgba(0, 0, 0, .3)' },
    { position: 0.5, color: 'rgba(0, 0, 0, 0)' },
    { position: 1, color: 'rgba(0, 0, 0, 0.2)' },
  ];
  drawLinearGradient(context, gradientStops, 0, 0, canvasWidth, canvasHeight);

  /*
    If present, draw the text over the gradient layer.
    Text variable considerations:
    - Alignment (horizontal)
    - Position (vertical)
    - Color
  */
  if (text && text.length) {
    debug('drawing text');

    const textLineHeight = FONT_SIZE * SCALE_FACTOR * 1.4;
    // Set the point from which to draw text
    const textAlignment = card.text.properties.align;
    const textPosition = card.text.properties.position;

    // Determine where to start the text drawing area
    const textOriginX: number = TEXT_PADDING.left * SCALE_FACTOR;
    const textOriginY: number = TEXT_PADDING.top * SCALE_FACTOR;

    // Determine the text drawing area bounding rectangle
    // All alignment and positioning remains inbounds
    const textBoundingWidth =
      canvasWidth - (TEXT_PADDING.left + TEXT_PADDING.right) * SCALE_FACTOR;
    const textBoundingHeight =
      canvasHeight - (TEXT_PADDING.top + TEXT_PADDING.bottom) * SCALE_FACTOR;

    canvas.style.letterSpacing = '-0.6px';
    context.font = `700 ${FONT_SIZE * SCALE_FACTOR}px ${FONT_FAMILY}`;
    context.textBaseline = 'bottom';
    context.fillStyle = card.text.properties.color;

    fillPositionedText(
      context,
      text,
      textOriginX,
      textOriginY,
      textBoundingWidth,
      textBoundingHeight,
      textAlignment,
      textPosition,
      textLineHeight,
    );
  }

  debug('convert canvas into StorylinePreviewCard');
  const blob: Blob | null = await new Promise(resolveBlob =>
    canvas.toBlob(resolveBlob, 'image/jpeg', 1),
  );
  if (!blob) {
    throw new Error('Failed to convert canvas to blob');
  }

  const preview: StorylinePreviewCard = {
    imageUrl: canvas.toDataURL('image/jpeg'),
    binary: await new Response(blob).arrayBuffer(),
  };
  return preview;
};
