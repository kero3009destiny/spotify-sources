import delay from '@redux-saga/delay-p';
import debug from 'debug';
import { all, call, put, take } from 'redux-saga/effects';

import {
  AUTHORIZED_SESSION_ACTIVE,
  SSO_SESSION_ACTIVE,
} from 'ducks/auth/types';
import * as actions from './actions';
import * as prefActions from 'ducks/userPreferences/actions';

import { getUserInfo } from 'api/user';

const log = debug('sagas:user');

export const RETRY_USERDATA_MAX_ATTEMPTS = 2;
export const RETRY_USERDATA_DELAY = 2000;
export function* fetchSpotifyAccountData() {
  yield take(SSO_SESSION_ACTIVE);

  let attempts = 0;
  let finalErr;

  while (attempts < RETRY_USERDATA_MAX_ATTEMPTS) {
    attempts++;

    try {
      const userData = yield call(getUserInfo);
      yield put(actions.setUserData(userData));
      return;
    } catch (e) {
      finalErr = e;
      log('Failed to fetch Spotify account data: %s', e.message);
      log('delaying then retrying after %s ms', RETRY_USERDATA_DELAY);
      yield call(delay, RETRY_USERDATA_DELAY);
    }
  }

  yield put(actions.fetchUserDataFailed(finalErr));
}

export function* watchAuthorizedSessionToFetchUserPreferences() {
  yield take(AUTHORIZED_SESSION_ACTIVE);
  yield put(prefActions.getPreferences());
}

export default function* userSaga() {
  yield all([
    fetchSpotifyAccountData(),
    watchAuthorizedSessionToFetchUserPreferences(),
  ]);
}
