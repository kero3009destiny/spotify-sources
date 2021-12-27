import { v4 as uuid } from 'uuid';
import { DEV_BUILD, VERSION } from './environment';

const AUTH_TOKEN_URL = `https://creator.wg.spotify.com/s4p-service/v3/auth/token`;
const AUTH_CLIENT_ID = '8fbd050ca47f430292682d30683d9c7c';
const CURRENT_TEAM_HEADER = 'SPA-Current-Team';

const AUTH_STATE_VERSION_INFO = DEV_BUILD && VERSION ? `version-${VERSION}` : '';

export const SITE_ROOT_URL = `${window.location.protocol}//${window.location.host}`;
export const AUTH_CALLBACK_PATH = '/auth-callback';
const AUTH_REDIRECT_URL = `${SITE_ROOT_URL}${AUTH_CALLBACK_PATH}`;

const DEFAULT_LOGIN_SUCCESS_REDIRECT_PATH = '/';
const DEFAULT_LOGIN_ERROR_REDIRECT_PATH = `/login-error`;

export const ACCESS_TOKEN_LOCAL_STORAGE_KEY = 's4p-access-token-v2';
const REFRESH_TOKEN_LOCAL_STORAGE_KEY = 's4p-refresh-token-v2';

export const getPersistedAccessToken = () =>
  window.localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);

const clearPersistedAccessToken = () =>
  window.localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);

const setPersistedAccessToken = (token: string) =>
  window.localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, token);

const getPersistedRefreshToken = () => window.localStorage.getItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY);

const clearPersistedRefreshToken = () =>
  window.localStorage.removeItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY);

const setPersistedRefreshToken = (token: string) =>
  window.localStorage.setItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY, token);

const clearTeamHeader = () => window.localStorage.removeItem(CURRENT_TEAM_HEADER);

const storeAuthCodeRequestState = (onSuccessPath: string, onErrorPath: string) => {
  const key = uuid() + AUTH_STATE_VERSION_INFO;
  window.localStorage.setItem(key, JSON.stringify({ onSuccessPath, onErrorPath }));
  return key;
};

const getAuthCodeRequestState = (stateKey: string) => {
  const str = window.localStorage.getItem(stateKey);
  if (!str) {
    return null;
  }

  return JSON.parse(str);
};

const clearAuthCodeRequestState = (stateKey: string) => window.localStorage.removeItem(stateKey);

const makeAuthCodeRequestUrl = (stateKey: string) =>
  `https://accounts.spotify.com/authorize?response_type=code` +
  `&client_id=${AUTH_CLIENT_ID}` +
  `&state=${stateKey}` +
  `&redirect_uri=${AUTH_REDIRECT_URL}` +
  `&scope=ugc-image-upload`;

// redirect to accounts.spotify for 'code'
export const redirectToAuthCodeRequest = (
  nextPath: string,
  onErrorPath = DEFAULT_LOGIN_ERROR_REDIRECT_PATH,
) => {
  const stateKey = storeAuthCodeRequestState(nextPath, onErrorPath);
  window.location.assign(makeAuthCodeRequestUrl(stateKey));
};

// call to s4p-service for auth token
const requestTokensWithAuthCode = async (authCode: string) => {
  const url = `${AUTH_TOKEN_URL}?auth_code=${authCode}&redirect_uri=${AUTH_REDIRECT_URL}`;
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error(`Unable to get access token using authorization code: ${response.statusText}`);
  }

  const tokenObject = await response.json();
  const { access_token: accessToken, refresh_token: refreshToken } = tokenObject;
  if (!accessToken) {
    throw new Error('Unexpected access token response payload.  No "access_token" field');
  }

  setPersistedAccessToken(accessToken);
  setPersistedRefreshToken(refreshToken);
};

// call to s4p-service when Auth token has expired
const requestFreshAccessTokenUsingRefreshToken = async (refreshToken: string) => {
  const url = `${AUTH_TOKEN_URL}?refresh_token=${refreshToken}`;
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error(`Unable to get access token using refresh token: ${response.statusText}`);
  }

  const tokenObject = await response.json();
  const { access_token: accessToken } = tokenObject;
  if (!accessToken) {
    throw new Error('Unexpected access token response payload.  No "access_token" field');
  }

  setPersistedAccessToken(accessToken);
};

type ResultPaths = {
  onLoginErrorPath?: string;
  onLoginSuccessPath?: string;
};

export type AuthRequestInit = ResultPaths & RequestInit;

export const authenticatedRequest = async (
  url: string,
  options: AuthRequestInit = {},
): Promise<Response> => {
  const { onLoginSuccessPath, onLoginErrorPath, ...requestOptions } = options;
  const nextPath = onLoginSuccessPath || window.location.pathname + window.location.search;
  const errorPath = onLoginErrorPath || DEFAULT_LOGIN_ERROR_REDIRECT_PATH;

  const accessToken = getPersistedAccessToken();
  if (!accessToken) {
    const refreshToken = getPersistedRefreshToken();
    if (refreshToken) {
      return requestFreshAccessTokenUsingRefreshToken(refreshToken)
        .catch((err) => {
          clearPersistedAccessToken();
          clearPersistedRefreshToken();
          throw err;
        })
        .then(() => authenticatedRequest(url, options));
    }
    redirectToAuthCodeRequest(nextPath, errorPath);

    // Pause until the redirect has happened
    await new Promise(() => {});
  }

  let requestHeaders = requestOptions.headers || {};
  requestHeaders = {
    ...requestHeaders,
    Authorization: `Bearer ${accessToken}`,
  };

  if (
    (url.includes('s4p-service') || url.includes('localhost')) &&
    localStorage.getItem(CURRENT_TEAM_HEADER)
  ) {
    requestHeaders = {
      ...requestHeaders,
      [CURRENT_TEAM_HEADER]: localStorage.getItem(CURRENT_TEAM_HEADER) || '',
    };
  }

  const response = await fetch(url, {
    ...requestOptions,
    headers: requestHeaders,
  });

  if (response.status === 401) {
    clearPersistedAccessToken();
    return authenticatedRequest(url, options);
  }

  return response;
};

const parseQuery = (queryString: string) => {
  const query: { [k: string]: string } = {};
  let str = queryString;
  if (str[0] === '?' || str[0] === '#') {
    str = queryString.substr(1);
  }
  if (str.length < 1) {
    return query;
  }

  const keyValuePairs = str.split('&');
  for (let i = 0; i < keyValuePairs.length; i += 1) {
    const kv = keyValuePairs[i].split('=');
    query[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || '');
  }
  return query;
};

const handleAuthError = (errorString: string, stateKey: string = '') => {
  const state = getAuthCodeRequestState(stateKey) || {};
  const onErrorPath = state.onErrorPath || DEFAULT_LOGIN_ERROR_REDIRECT_PATH;
  clearAuthCodeRequestState(stateKey);

  window.location.assign(`${onErrorPath}?error=${errorString}`);
};

const handleAuthCodeRequestSuccess = (authCode: string, stateKey: string) => {
  const state = getAuthCodeRequestState(stateKey);
  if (!state) {
    handleAuthError('invalid auth state key', stateKey);
    return;
  }

  const onSuccessPath = state.onSuccessPath || DEFAULT_LOGIN_SUCCESS_REDIRECT_PATH;
  requestTokensWithAuthCode(authCode)
    .catch((err) => {
      handleAuthError(err.message, stateKey);
    })
    .then(() => {
      clearAuthCodeRequestState(stateKey);
      window.location.assign(onSuccessPath);
    });
};

// handles first redirect from accounts.spotify
export const handleAuthCodeResponse = (queryString: string) => {
  const query = parseQuery(queryString);

  if (query.error) {
    handleAuthError(query.error, query.state);
    return;
  }

  if (query.code) {
    handleAuthCodeRequestSuccess(query.code, query.state);
    return;
  }

  handleAuthError('Unknown error');
};

export const isAuthenticated = () => !!getPersistedAccessToken();

export const logoutUser = () => {
  clearTeamHeader();
  clearPersistedAccessToken();
  clearPersistedRefreshToken();
};
