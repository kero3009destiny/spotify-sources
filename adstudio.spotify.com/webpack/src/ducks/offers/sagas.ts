import { all, call, put, takeEvery } from 'redux-saga/effects';

import * as actions from './actions';

import { getAvailableOffers } from 'api/offers';

import * as types from './types';

export function* fetchOffers(action: types.FetchOffersRequestedAction) {
  try {
    const offersResponse = yield call(
      getAvailableOffers,
      action.payload.adAccountId,
    );
    yield put(actions.fetchOffersSuccess(offersResponse));
  } catch (e) {
    yield put(actions.fetchOffersFailed());
  }
}

export function* watchOffersFetch() {
  yield takeEvery(types.FETCH_OFFERS_REQUESTED, fetchOffers);
}

export default function* offersSaga() {
  yield all([watchOffersFetch()]);
}
