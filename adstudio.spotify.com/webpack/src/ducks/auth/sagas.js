import debug from 'debug';
import { document, window } from 'global';
import { all, call, put, select, take, takeEvery } from 'redux-saga/effects';

import {
  FETCH_USER_ACCOUNT_FAILED,
  SET_USER_ACCOUNT,
} from 'ducks/account/types';
import { DOCUMENT_VISIBILITY_UPDATE } from 'ducks/window/types';
import * as actions from './actions';
import { getIsAuthenticated, isAuthenticatedFetching } from './selectors';

import { AuthSystemError, getWebgateToken } from 'api/webgate';

import { wait } from 'utils/asyncHelpers';

import { getEnvironmentConfig } from 'config/environment';

import * as types from './types';

const log = debug('sagas:auth');

export const CHECK_AUTHENTICATION_INTERVAL = 60000;

export function clearServiceWorkerStorage() {
  if ('caches' in window) {
    try {
      caches.delete('data-cache');
      log('deleted data cache');
    } catch (e) {
      log('could not delete data cache');
    }
  }
}

export async function checkForceDisabled() {
  const disabled = await getEnvironmentConfig('disableApp');
  if (disabled) throw new AuthSystemError();
}

export function* checkAuthentication() {
  const isAuthenticated = yield select(getIsAuthenticated);
  const fetching = yield select(isAuthenticatedFetching);

  // we already checked authentication and marked this session as
  // unauthenticated. don't check anymore.
  if (!fetching && !isAuthenticated) {
    return;
  }

  // don't check if the tab is not in view. helps with the visibilitychange
  // event and the periodic interval.
  if (document.hidden) {
    return;
  }

  try {
    log('checking auth status');
    yield call(checkForceDisabled);
    yield call(getWebgateToken);
    yield put(actions.ssoSessionActive());
  } catch (e) {
    if (e instanceof AuthSystemError) {
      yield put(actions.ssoSessionError(e));
      log('login error' + e.message);
    } else {
      yield put(actions.ssoSessionInactive());
      log('access token revoked');
    }
  }
}

export function* watchForLogOut() {
  yield take([types.USER_LOGGED_OUT, types.SSO_SESSION_INACTIVE]);
  yield call(clearServiceWorkerStorage);
  log('User logged out. Access token revoked');
}

export function* checkAuthenticationOnStartup() {
  yield call(checkAuthentication);
}

export function* checkAuthenticationOnInterval() {
  yield take(types.SSO_SESSION_ACTIVE);
  let isAuthenticated = true;

  while (isAuthenticated) {
    yield call(wait, CHECK_AUTHENTICATION_INTERVAL);
    yield call(checkAuthentication);
    isAuthenticated = yield select(getIsAuthenticated);
  }
}

export function* checkAuthenticationOnDocumentVisiblityChange() {
  yield takeEvery(DOCUMENT_VISIBILITY_UPDATE, checkAuthentication);
}

export function* watchAccountForAuthorization() {
  const { payload: account } = yield take(SET_USER_ACCOUNT);

  // if the user has an Ad Account, then grant them access.
  if (!!account) {
    yield put(actions.authorizedSessionActive());
  } else {
    yield put(actions.authorizedSessionInactive());
  }
}

// mark the session as invalid if fetching roles has failed.
export function* watchAccountFailureForAuthorization() {
  const { payload } = yield take(FETCH_USER_ACCOUNT_FAILED);
  yield put(actions.ssoSessionError(payload));
  yield put(actions.authorizedSessionInactive());
}

export default function* authSaga() {
  yield all([
    watchForLogOut(),
    checkAuthenticationOnStartup(),
    checkAuthenticationOnDocumentVisiblityChange(),
    checkAuthenticationOnInterval(),
    watchAccountForAuthorization(),
    watchAccountFailureForAuthorization(),
  ]);
}
