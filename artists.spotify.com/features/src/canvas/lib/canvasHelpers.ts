// ignore-string-externalization
export const VALID_IMAGE_TYPES = ['IMAGE', 'GIF'];
export const VALID_VIDEO_TYPES = [
  'VIDEO',
  'VIDEO_LOOPING',
  'VIDEO_LOOPING_RANDOM',
];

export function contentTypeForCanvas(type: string) {
  if (VALID_IMAGE_TYPES.includes(type)) {
    return 'image/jpeg';
  }

  if (VALID_VIDEO_TYPES.includes(type)) {
    return 'video/mp4';
  }

  throw new Error('Unacceptable type encountered!');
}
// format date in short format, e.g.: new Date('2019-02-04T18:35:04.833Z') -> 'Feb 4, 2019'
export const { format: formatDateShort } = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

export class CanvasProcessingError extends Error {}
