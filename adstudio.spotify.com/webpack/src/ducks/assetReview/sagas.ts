import { all, call, put, takeLatest } from 'redux-saga/effects';

import { fetchCreative, fetchCreativeStats } from 'ducks/creatives/sagas';
import * as Actions from './actions';

import * as Api from 'api/assetReview';

import {
  APPROVE_SCRIPT_START,
  APPROVE_VOICEOVER_START,
  ApproveScriptStartAction,
  ApproveVoiceoverStartAction,
  FETCH_PENDING_USER_APPROVAL_CREATIVES_START,
  FetchPendingUserApprovalCreativesStartAction,
  REJECT_VOICEOVER_START,
  RejectVoiceoverStartAction,
  REVISE_SCRIPT_BY_ID_START,
  REVISE_VOICEOVER_BACKGROUND_START,
  REVISE_VOICEOVER_BY_ID_START,
  ReviseScriptByIdStartAction,
  ReviseVoiceoverBackgroundStartAction,
  ReviseVoiceoverByIdStartAction,
} from './types';

export function* fetchPendingUserApprovalCreatives(
  action: FetchPendingUserApprovalCreativesStartAction,
) {
  try {
    const pendingUserApprovalCreatives = yield call(
      Api.getPendingUserApprovalCreatives,
      action.payload.adAccountId,
      action.payload.creativeId,
      action.payload.limit || 20,
      action.payload.offset || 0,
    );
    yield put(
      Actions.getPendingUserApprovalCreativesSuccess(
        pendingUserApprovalCreatives,
      ),
    );
  } catch (e) {
    yield put(Actions.getPendingUserApprovalCreativesFailed(e));
  }
}

export function* approveVoiceover(action: ApproveVoiceoverStartAction) {
  try {
    yield call(
      Api.approveVoiceover,
      action.payload.adAccountId,
      action.payload.voiceoverId,
      action.payload.mixId,
    );
    yield put(Actions.approveVoiceoverSuccess());
  } catch (e) {
    yield put(Actions.approveVoiceoverFailed(e));
  }
}

export function* approveScript(action: ApproveScriptStartAction) {
  try {
    yield call(
      Api.approveScript,
      action.payload.adAccountId,
      action.payload.voiceoverId,
      action.payload.mixId,
    );
    yield put(Actions.approveScriptSuccess());
    yield call(refreshCreativeState, action.payload);
  } catch (e) {
    yield put(Actions.approveScriptFailed(e));
  }
}

export function* rejectVoiceover(action: RejectVoiceoverStartAction) {
  try {
    yield call(
      Api.rejectVoiceover,
      action.payload.adAccountId,
      action.payload.voiceoverId,
      action.payload.creativeId,
      action.payload.rejectionReason,
      action.payload.rejectionCode,
    );
    yield put(Actions.rejectVoiceoverSuccess());
  } catch (e) {
    yield put(Actions.rejectVoiceoverFailed(e));
  }
}

export function* reviseVoiceoverById(action: ReviseVoiceoverByIdStartAction) {
  try {
    yield call(
      Api.reviseVoiceoverById,
      action.payload.adAccountId,
      action.payload.voiceoverId,
      action.payload.instructions,
    );
    yield put(Actions.reviseVoiceoverByIdSuccess());
  } catch (e) {
    yield put(Actions.reviseVoiceoverByIdFailed(e));
  }
}

export function* reviseScriptById(action: ReviseScriptByIdStartAction) {
  try {
    yield call(
      Api.reviseScriptById,
      action.payload.adAccountId,
      action.payload.voiceoverId,
      action.payload.instructions,
    );
    yield put(Actions.reviseScriptByIdSuccess());
    yield call(refreshCreativeState, action.payload);
  } catch (e) {
    yield put(Actions.reviseScriptByIdFailed(e));
  }
}

export function* reviseVoiceoverBackground(
  action: ReviseVoiceoverBackgroundStartAction,
) {
  try {
    yield call(
      Api.reviseVoiceoverBackground,
      action.payload.adAccountId,
      action.payload.bgAssetId,
      action.payload.creativeId,
      action.payload.playFullMusic,
      action.payload.voiceoverMixId,
      action.payload.mixMode,
      action.payload.voiceStart,
      action.payload.musicStart,
      action.payload.backgroundVolume,
      action.payload.musicDuration,
    );
    yield put(Actions.reviseVoiceoverBackgroundSuccess());
  } catch (e) {
    yield put(Actions.reviseVoiceoverBackgroundFailed(e));
  }
}

function* watchForGetPendingUserApprovalCreatives() {
  yield takeLatest(
    FETCH_PENDING_USER_APPROVAL_CREATIVES_START,
    fetchPendingUserApprovalCreatives,
  );
}

function* watchForApproveVoiceover() {
  yield takeLatest(APPROVE_VOICEOVER_START, approveVoiceover);
}

function* watchForApproveScript() {
  yield takeLatest(APPROVE_SCRIPT_START, approveScript);
}

function* watchForRejectVoiceover() {
  yield takeLatest(REJECT_VOICEOVER_START, rejectVoiceover);
}

function* watchForReviseVoiceoverById() {
  yield takeLatest(REVISE_VOICEOVER_BY_ID_START, reviseVoiceoverById);
}

function* watchForReviseScriptById() {
  yield takeLatest(REVISE_SCRIPT_BY_ID_START, reviseScriptById);
}

function* watchForReviseVoiceoverBackground() {
  yield takeLatest(
    REVISE_VOICEOVER_BACKGROUND_START,
    reviseVoiceoverBackground,
  );
}

/**
 * This is a util saga that will refresh the relevant redux states when a creative is approved/revised/rejected.
 */
function* refreshCreativeState(payload: {
  adAccountId: string;
  creativeId: string;
}) {
  yield all([
    call(fetchCreative, { type: 'FETCH_CREATIVE_START', payload }),
    call(fetchCreativeStats, { type: 'FETCH_CREATIVE_STATS_START', payload }),
    call(fetchPendingUserApprovalCreatives, {
      type: 'FETCH_PENDING_USER_APPROVAL_CREATIVES_START',
      payload,
    }),
  ]);
}

export default function* getFlightsSaga() {
  yield all([
    watchForGetPendingUserApprovalCreatives(),
    watchForApproveVoiceover(),
    watchForRejectVoiceover(),
    watchForReviseVoiceoverById(),
    watchForReviseVoiceoverBackground(),
    watchForApproveScript(),
    watchForReviseScriptById(),
  ]);
}
