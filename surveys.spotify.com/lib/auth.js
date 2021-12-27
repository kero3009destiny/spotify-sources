import * as localStorage from '../lib/localStorage';

import qs from 'qs';

const ACCESS_TOKEN_KEY = 'surveyorui_access_token';
const OAUTH_CLIENT_ID = '6e11e050b05f43109f8f0fc4f79c0b7a';
const OAUTH_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';

export function getLocalAuthSync() {
  const { expiresAt, accessToken = '' } = JSON.parse(
    localStorage.getItem(ACCESS_TOKEN_KEY) || '{}'
  );
  const token = { expiresAt, accessToken };

  if (!expiresAt || accessToken.trim().length === 0) {
    const error = new Error('auth');
    error.token = token;
    throw error;
  } else if (expiresAt < +new Date()) {
    const error = new Error('auth');
    error.token = token;
    throw error;
  } else {
    return {
      accessToken: accessToken,
      expiresAt: new Date(expiresAt),
    };
  }
}

export function getLocalAuth() {
  return new Promise((resolve, reject) => {
    try {
      resolve(getLocalAuthSync());
    } catch (e) {
      reject(e);
    }
  });
}

export function getOauthCallbackTokens() {
  return Promise.resolve().then(() => {
    const query = qs.parse(window.location.hash.substring(1));
    const {
      access_token: accessToken,
      expires_in: expiresIn,
      token_type: tokenType,
      error,
      state,
    } = query;

    if (error) {
      throw new Error(error);
    }

    if (!accessToken || !expiresIn || tokenType !== 'Bearer') {
      throw new Error(
        'Invalid query string. Please make sure you are on the right url'
      );
    }

    const now = +new Date();

    return {
      accessToken,
      tokenType,
      expiresAt: new Date(now + parseInt(expiresIn, 10) * 1000),
      state: JSON.parse(state),
    };
  });
}

export function storeOauthToken({ accessToken, expiresAt }) {
  localStorage.setItem(
    ACCESS_TOKEN_KEY,
    JSON.stringify({ accessToken, expiresAt: +expiresAt })
  );
}

export function buildAuthorizationUrl(returnUrl) {
  const { location } = window;
  const oauthReturnUrl = `${location.protocol}//${location.host}/oauth/callback`;

  const oauthQuery = qs.stringify({
    client_id: OAUTH_CLIENT_ID,
    response_type: 'token',
    redirect_uri: oauthReturnUrl,
    state: JSON.stringify({
      return_url: returnUrl,
      search: location.search.substring(1),
    }),
  });

  return `${OAUTH_AUTHORIZE_URL}?${oauthQuery}`;
}

export function ensureAuthenticated(path = window.location.pathname) {
  return getLocalAuth().catch(() => {
    window.location = buildAuthorizationUrl(String(path));
  });
}



// WEBPACK FOOTER //
// ./src/lib/auth.js