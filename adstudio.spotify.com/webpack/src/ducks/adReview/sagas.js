import { all, call, put, select, takeEvery } from 'redux-saga/effects';

import * as actions from './actions';
import { getAccount } from 'ducks/account/selectors';

import { createMixPreview, pollMixPreview } from 'api/adCreation';
import { getMixHistory } from 'api/assetReview';

import { poll } from 'utils/sagaHelpers';

import * as types from './types';

export const DEFAULT_VOICE_ACTOR_UNAVAILABLE_MSG =
  'The voice actor who originally recorded your voiceover is not available for revisions. If you need a new voiceover, we suggest duplicating your campaign and resubmitting it. Contact us at adstudio@spotify.com for questions.';

export function* handleCreateMixPreview(action) {
  const {
    id,
    musicPath,
    voiceoverPath,
    playFullMusic,
    mixMode,
    voiceStart,
    musicStart,
    backgroundVolume,
    musicDuration,
  } = action.payload;

  try {
    const account = yield select(getAccount);
    const accountId = account.id;
    const createResult = yield call(
      createMixPreview,
      accountId,
      musicPath,
      voiceoverPath,
      playFullMusic,
      mixMode,
      voiceStart,
      musicStart,
      backgroundVolume,
      musicDuration,
    );
    const pollResult = yield poll(pollMixPreview, {
      maxPollTimeSeconds: 90,
      methodArgs: [accountId, createResult.outputFile],
      debugName: 'pollMixPreview:handleCreateMixPreview',
    });
    yield put(
      actions.createMixPreviewSuccess(
        id,
        musicPath,
        voiceoverPath,
        createResult.outputFile,
      ),
    );
  } catch (error) {
    yield put(actions.createMixPreviewFailed(error.status));
  }
}

export function* handleGetMixHistory(action) {
  const { adAccountId, voiceoverId } = action.payload;
  const getMixHistoryResult = yield call(
    getMixHistory,
    adAccountId,
    voiceoverId,
  );

  const asset = getMixHistoryResult.assets[0];
  yield put(
    actions.getMixHistorySuccess(
      asset.bgUrl,
      asset.mp3Url,
      asset.playFullMusic,
      asset.mixMode,
      asset.voiceStart,
      asset.musicStart,
      asset.backgroundVolume,
      asset.requestedDuration,
    ),
  );
}

function* watchForCreatePreview() {
  yield takeEvery(types.MIX_PREVIEW_SUBMITTED, handleCreateMixPreview);
}

function* watchForGetMixHistory() {
  yield takeEvery(types.MIX_HISTORY_REQUESTED, handleGetMixHistory);
}

export default function* adReviewSagas() {
  yield all([watchForCreatePreview(), watchForGetMixHistory()]);
}
