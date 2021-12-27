import debug from 'debug';
import { all, call, put } from 'redux-saga/effects';

import { fetchAdminAlertSuccess } from './actions';

import { getAdminAlert } from 'api/adminAlert';

const log = debug('sagas:realtimealert');

export function* fetchAdminAlert() {
  try {
    const alertObj = yield call(getAdminAlert);
    yield put(fetchAdminAlertSuccess(alertObj));
  } catch (e) {
    log('failed to fetch realtime alert', e);
  }
}

export default function* adminAlertSaga() {
  yield all([fetchAdminAlert()]);
}
