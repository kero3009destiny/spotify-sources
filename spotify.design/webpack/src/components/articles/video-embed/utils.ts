export const isYoutubePattern = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(\S+)/g;
export const isVimeoPattern = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(\S+)/g;

export function youtubeURLToYoutubeEmbed(input: string): string {
  const pattern = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(\S+)/g;
  if (pattern.test(input)) {
    const replacement = 'https://www.youtube.com/embed/$1';
    let toReturn = input.replace(pattern, replacement);
    // For start time, turn get param & into ?
    toReturn = toReturn.replace('&amp;t=', '?t=');
    return toReturn;
  }
  return input;
}

export function vimeoURLToVimeoEmbed(input: string): string {
  const pattern = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(\S+)/g;
  if (pattern.test(input)) {
    const replacement = 'https://player.vimeo.com/video/$1';
    return input.replace(pattern, replacement);
  }
  return input;
}
