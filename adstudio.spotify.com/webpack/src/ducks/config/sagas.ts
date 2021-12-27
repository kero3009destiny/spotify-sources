import delay from '@redux-saga/delay-p';
import debug from 'debug';
import { all, call, put, take } from 'redux-saga/effects';

import { SSO_SESSION_ACTIVE } from 'ducks/auth/types';
import * as actions from './actions';

import * as api from 'api/config';

export const RETRY_CONFIG_MAX_ATTEMPTS = 5;
export const RETRY_CONFIG_DELAY = 2000;

const log = debug('sagas:config');

export function* fetchAdStudioConfig() {
  let attempts = 0;
  let finalErr;

  while (attempts < RETRY_CONFIG_MAX_ATTEMPTS) {
    attempts++;

    try {
      const resp = yield call(api.getAdStudioConfig);

      log('fetched config service data');
      yield put(actions.fetchAdStudioConfigSuccess(resp));
      return;
    } catch (res) {
      finalErr = res;

      log('failed to fetch config service data: %s', res.message);
      log('delaying then retrying after %s ms', RETRY_CONFIG_DELAY);
      yield call(delay, RETRY_CONFIG_DELAY);
    }
  }
  yield put(actions.fetchAdStudioConfigFailed(finalErr));
}

function* watchAuthorizedSessionForFetchConfig() {
  log('waiting for user to be authenticated before calling config service');
  yield take(SSO_SESSION_ACTIVE);
  yield call(fetchAdStudioConfig);
}

export default function* configSaga() {
  yield all([watchAuthorizedSessionForFetchConfig()]);
}
