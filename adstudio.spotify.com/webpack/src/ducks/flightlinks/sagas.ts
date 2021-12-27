import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as Actions from './actions';

import * as Api from 'api/flightLink';

import {
  EDIT_FLIGHT_LINKS_START,
  EditFlightLinksStartAction,
  PAUSE_RESUME_FLIGHT_LINK_START,
  PauseResumeFlightLinkStartAction,
} from './types';

export function* pauseResumeFlightLink(
  action: PauseResumeFlightLinkStartAction,
) {
  try {
    yield call(Api.pauseResumeFlightLink, action.payload);
    yield put(Actions.pauseResumeFlightLinkSuccess(action.payload));
  } catch (e) {
    yield put(Actions.pauseResumeFlightLinkError(action.payload, e));
  }
}

export function* editFlightLinks(action: EditFlightLinksStartAction) {
  try {
    yield call(Api.editFlightLinks, action.payload);
    yield put(Actions.editFlightLinksSuccess(action.payload));
  } catch (e) {
    yield put(Actions.editFlightLinksError(action.payload, e));
  }
}

function* watchForPauseResumeFlightLink() {
  yield takeLatest(PAUSE_RESUME_FLIGHT_LINK_START, pauseResumeFlightLink);
}

function* watchForEditFlightLinks() {
  yield takeLatest(EDIT_FLIGHT_LINKS_START, editFlightLinks);
}

export default function* getCreativesSaga() {
  yield all([watchForPauseResumeFlightLink(), watchForEditFlightLinks()]);
}
