import * as types from './types';

export function getMixHistory(adAccountId, voiceoverId) {
  return {
    type: types.MIX_HISTORY_REQUESTED,
    payload: {
      adAccountId,
      voiceoverId,
    },
  };
}

export function getMixHistorySuccess(
  bgUrl,
  mixUrl,
  playFullMusic,
  mixMode,
  voiceStart,
  musicStart,
  backgroundVolume,
  musicDuration,
) {
  return {
    type: types.MIX_HISTORY_SUCCEEDED,
    payload: {
      bgUrl,
      mixUrl,
      playFullMusic,
      mixMode,
      voiceStart,
      musicStart,
      backgroundVolume,
      musicDuration,
    },
  };
}

export function createMixPreview(
  id,
  musicPath,
  voiceoverPath,
  playFullMusic,
  mixMode,
  voiceStart,
  musicStart,
  backgroundVolume,
  musicDuration,
) {
  return {
    type: types.MIX_PREVIEW_SUBMITTED,
    payload: {
      id,
      musicPath,
      voiceoverPath,
      playFullMusic,
      mixMode,
      voiceStart,
      musicStart,
      backgroundVolume,
      musicDuration,
    },
    meta: { id },
  };
}

export function createMixPreviewSuccess(id, musicPath, voiceoverPath, mixUrl) {
  return {
    type: types.MIX_PREVIEW_SUCCEEDED,
    payload: {
      id,
      musicPath,
      voiceoverPath,
      mixUrl,
    },
    meta: { id },
  };
}

export function createMixPreviewFailed(err, id) {
  return {
    type: types.MIX_PREVIEW_FAILED,
    error: true,
    payload: err,
    meta: { id },
  };
}

export function clearMixPreview(err) {
  return {
    type: types.MIX_PREVIEW_CLEAR,
  };
}
