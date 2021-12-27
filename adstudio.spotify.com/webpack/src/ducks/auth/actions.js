import * as types from './types';

export function authorizedSessionActive() {
  return {
    type: types.AUTHORIZED_SESSION_ACTIVE,
  };
}

export function authorizedSessionInactive() {
  return {
    type: types.AUTHORIZED_SESSION_INACTIVE,
  };
}

export function ssoSessionActive() {
  return {
    type: types.SSO_SESSION_ACTIVE,
  };
}

export function ssoSessionInactive() {
  return {
    type: types.SSO_SESSION_INACTIVE,
  };
}

export function ssoSessionError(e) {
  return {
    type: types.SSO_SESSION_ERROR,
    error: true,
    payload: e,
  };
}

export function userLoggedOut() {
  return {
    type: types.USER_LOGGED_OUT,
  };
}
