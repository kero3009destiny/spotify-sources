import { all, call, put, select, takeEvery } from 'redux-saga/effects';

import * as actions from './actions';
import { getSelectedLocale } from 'ducks/i18n/selectors';

import { getCachedPaymentDetails } from 'api/paymentMethod';

import { DEFAULT_LOCALE } from 'config/i18n';

import * as types from './types';

export function* handleFetchPaymentDetails(action) {
  const { adAccount, clearCache } = action.payload;
  const selectedLocale = yield select(getSelectedLocale);

  try {
    const result = yield call(
      getCachedPaymentDetails,
      clearCache,
      adAccount,
      selectedLocale || DEFAULT_LOCALE,
    );
    yield put(actions._fetchPaymentDetailsSuccess(result));
  } catch (error) {
    yield put(actions.fetchPaymentDetailsFailed(error));
  }
}

function* watchForFetchPaymentDetails() {
  yield takeEvery(types.FETCH_PAYMENT_DETAILS, handleFetchPaymentDetails);
}

export default function* adCreationSaga() {
  yield all([watchForFetchPaymentDetails()]);
}
