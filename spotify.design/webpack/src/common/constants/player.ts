export const CLIENT_ID = '38d6beb4bd7e4945a89214c3d4e320a7';
export const AUTHENTICATION = {
  ENDPOINT: 'https://accounts.spotify.com/en/authorize',
  RESPONSE_TYPE: 'token',
  SCOPES: ['streaming', 'user-read-email', 'user-read-private'],

  RESPONSE_DENIED: 'access_denied',
};

export const PRODUCT_PLANS = {
  OPEN: 'open',
  PREMIUM: 'premium',
};

export const SDK_URL = 'https://sdk.scdn.co/spotify-player.js';
export const API_ENDPOINT = 'https://api.spotify.com/v1/me';

export const PLAYER_NAME = 'Spotify.design';

export const ERROR_MESSAGES = {
  USER_DENIED_AUTH: 'You need to accept the Spotify authentication.',
  USER_NOT_PREMIUM: 'You need to be a Spotify Premium user.',
  AUTH_FAILED: 'Authentication failed',
  // Usually happens if you switch wifi/network whilst already signed in.
  CHANGED_NETWORK: 'Changed Network, please re-authenticate.',
  CATCH_ALL: 'Something went wrong, please refresh.',
};
