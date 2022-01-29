// ignore-string-externalization
export const isSpotifyNet =
  typeof window === 'object' &&
  window.location.hostname.endsWith('.spotify.net');
