import debug from 'debug';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { fetchUserAccountsFailed, fetchUserAccountsSuccess } from './actions';

import * as api from 'api/account';

import { poll } from 'utils/sagaHelpers';

import { AdAccountMetadata, FETCH_USER_ACCOUNTS } from './types';

const log = debug('sagas:accounts');

export function* fetchAccounts() {
  log('attempting to fetch accounts');

  try {
    const accounts: AdAccountMetadata[] | null = yield poll(api.getAdAccounts, {
      debugName: 'getAdAccounts:fetchAccounts',
    });

    log('accounts found; storing', accounts);

    yield put(fetchUserAccountsSuccess(accounts || []));
  } catch (e) {
    yield put(fetchUserAccountsFailed(e));
    log('failed to fetch accounts', e);
  }
}

function* watchAuthorizedSessionForFetchAccounts() {
  yield call(fetchAccounts);
}

function* watchForFetchAccountsRequests() {
  yield takeLatest(FETCH_USER_ACCOUNTS, fetchAccounts);
}

export default function* accountSagas() {
  yield all([
    watchAuthorizedSessionForFetchAccounts(),
    watchForFetchAccountsRequests(),
  ]);
}
