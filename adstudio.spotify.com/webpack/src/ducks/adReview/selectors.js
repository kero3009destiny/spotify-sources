import { get } from 'lodash';
import { getFormValues } from 'redux-form';

import { FORM_NAMES, REVISE_DEFAULTS, REVISE_FORM_NAME } from 'config/revise';

export const getMixHistoryStatusSelector = state => {
  return get(state, 'adReview.getMixHistory.status', '');
};

export const getMixHistoryMixUrlSelector = state => {
  return get(state, 'adReview.getMixHistory.payload.mixUrl', undefined);
};

export const getMixHistoryVoiceStartSelector = state => {
  return get(
    state,
    'adReview.getMixHistory.payload.voiceStart',
    REVISE_DEFAULTS.VOICE_START,
  );
};

export const getMixHistoryMusicStartSelector = state => {
  return get(
    state,
    'adReview.getMixHistory.payload.musicStart',
    REVISE_DEFAULTS.MUSIC_START,
  );
};

export const getMixHistoryBackgroundVolumeSelector = state => {
  return get(
    state,
    'adReview.getMixHistory.payload.backgroundVolume',
    REVISE_DEFAULTS.BACKGROUND_VOLUME,
  );
};

export const getMixHistoryMusicDurationSelector = state => {
  return get(
    state,
    'adReview.getMixHistory.payload.musicDuration',
    REVISE_DEFAULTS.MUSIC_DURATION,
  );
};

export const getMixHistoryMixModeSelector = state => {
  return get(state, 'adReview.getMixHistory.payload.mixMode', DEFAULT_MIX_MODE);
};

export const selectMixPreviewStatus = state => {
  return get(state, 'adReview.createMixPreview.status', '');
};

export const selectMixPreviewUrl = state => {
  return get(
    state,
    'adReview.createMixPreview.payload.mixUrl',
    getMixHistoryMixUrlSelector(state, ''),
  );
};

export const selectMixPreviewError = state => {
  return get(state, 'adReview.createMixPreview.error', '');
};

export const selectMixPreviewPlayFullMusic = state => {
  return get(
    getFormValues(REVISE_FORM_NAME)(state),
    `${FORM_NAMES.REVISE_BG_DURATION}.playFullMusic`,
    false,
  );
};

export const selectMixPreviewMixMode = state => {
  return get(
    getFormValues(REVISE_FORM_NAME)(state),
    `${FORM_NAMES.REVISE_MIX_MODE}.addFade`,
    getMixHistoryMixModeSelector(state) === DEFAULT_MIX_MODE,
  )
    ? 'autoduck'
    : 'vocal_ride';
};

export const selectMixPreviewVoiceStart = state => {
  return get(
    getFormValues(REVISE_FORM_NAME)(state),
    FORM_NAMES.REVISE_VOICE_START,
    getMixHistoryVoiceStartSelector(state),
  );
};

export const selectMixPreviewMusicStart = state => {
  return get(
    getFormValues(REVISE_FORM_NAME)(state),
    FORM_NAMES.REVISE_MUSIC_START,
    getMixHistoryMusicStartSelector(state),
  );
};

export const selectMixPreviewBackgroundVolume = state => {
  return get(
    getFormValues(REVISE_FORM_NAME)(state),
    FORM_NAMES.REVISE_BACKGROUND_VOLUME,
    getMixHistoryBackgroundVolumeSelector(state),
  );
};

export const selectMixPreviewMusicDuration = state => {
  return get(
    getFormValues(REVISE_FORM_NAME)(state),
    FORM_NAMES.REVISE_MUSIC_DURATION,
    getMixHistoryMusicDurationSelector(state),
  );
};
