// ignore-string-externalization
import { createAuth } from '@spotify-internal/oauth-silent-authentication';
import { getSpotifyClientId } from '@mrkt/features/env';
import { TokenProviderResult } from './types';

export async function getSilentAuthToken(): Promise<TokenProviderResult> {
  // logged out on server
  if (!process.browser) {
    return [undefined, Infinity];
  }

  const hasSupport =
    window.location.protocol === 'https:' &&
    /\.spotify\.(net|com)$/.test(window.location.hostname);

  // fail when not supported
  if (!hasSupport) {
    throw new Error('failed to get access token');
  }

  const authServerConfig = process.env.USE_TEST_ACCOUNTS
    ? { url: 'https://accounts-shared.spotify.net' }
    : undefined;
  const scopes = process.env.USE_TEST_ACCOUNTS
    ? []
    : ['user-read-email', 'user-read-private', 'ugc-image-upload'];

  const silentAuth = createAuth(
    {
      clientId: getSpotifyClientId(),
      // this was the default scope in creator-auth-proxy when we switched token providers
      // https://ghe.spotify.net/creator/creator-auth-proxy/blob/f0412cb90bcd067e4bea736383d20b89e0df5680/src/main/java/com/spotify/creator/authproxy/handlers/WebAuthHandler.java#L47-L52
      scopes,
    },
    authServerConfig,
  );

  try {
    const [token, expiresIn] = await silentAuth.tokenProvider();
    return [token, expiresIn];
  } catch (error: any) {
    // logged out
    // requires a page refresh after login
    if (error.error === 'login_required') {
      return [undefined, Infinity];
    }

    // rethrow unexpected errors
    throw error;
  }
}
