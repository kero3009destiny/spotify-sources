import { window } from 'global';
import { all, takeEvery } from 'redux-saga/effects';

import * as types from './types';

export function* handleHardRedirect({ payload }) {
  window.location = payload;
}

export function* handleScrollTo({ payload }) {
  window.scrollTo(...payload);
}

function* watchHardRedirectTriggered() {
  yield takeEvery(types.HARD_REDIRECT_TRIGGERED, handleHardRedirect);
}

function* watchScrollTo() {
  yield takeEvery(types.SCROLL_TO, handleScrollTo);
}

export default function* windowSaga() {
  yield all([watchHardRedirectTriggered(), watchScrollTo()]);
}
