import debug from 'debug';
import { all, put, takeEvery } from 'redux-saga/effects';

import {
  fetchUserDetailsFailed as fetchUserDetailsFailedAction,
  setUserDetails as setUserDetailsAction,
} from './actions';

import { getUserDetails } from 'api/userDetails';

import { poll } from 'utils/sagaHelpers';

import { FETCH_USER_DETAILS } from './types';

const log = debug('sagas:userDetails');

export function* fetchAdStudioUserAccount() {
  log('attempting to fetch Ad Studio user details');

  try {
    const userDetails = yield poll(getUserDetails, {
      debugName: 'getUserDetails:fetchAdStudioUserAccount',
    });
    log('Ad Studio user details fetched; storing');
    yield put(setUserDetailsAction(userDetails));
  } catch (e) {
    yield put(fetchUserDetailsFailedAction(e));
    log('failed to fetch Ad Studio user details', e);
  }
}

function* watchFetchStats() {
  yield takeEvery(FETCH_USER_DETAILS, fetchAdStudioUserAccount);
}

export default function* userDetailsSaga() {
  yield all([watchFetchStats()]);
}
