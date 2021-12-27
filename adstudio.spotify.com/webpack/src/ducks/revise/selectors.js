import {
  getMixHistoryBackgroundVolumeSelector,
  getMixHistoryMusicDurationSelector,
  getMixHistoryMusicStartSelector,
  getMixHistoryVoiceStartSelector,
  selectMixPreviewBackgroundVolume,
  selectMixPreviewMusicDuration,
  selectMixPreviewMusicStart,
  selectMixPreviewVoiceStart,
} from '../adReview/selectors';
import { getReduxFormValues } from 'ducks/reduxForm/selectors';

import {
  FORM_NAMES,
  REVISE_FORM_NAME,
  VOICEOVER_INSTRUCTIONS_OPTION_ONE,
} from 'config/revise';

export const hasChangesSelector = (state, { bgMusicId, playFullMusic }) => {
  const values = getReduxFormValues(state)[REVISE_FORM_NAME];

  if (values) {
    const reviseCategory = values[FORM_NAMES.REVISE_CATEGORY];
    if (reviseCategory === FORM_NAMES.VOICEOVER_INSTRUCTIONS) {
      return !!values[FORM_NAMES.VOICEOVER_INSTRUCTIONS].value;
    }
    if (reviseCategory === FORM_NAMES.REVISE_BG_MUSIC) {
      const formBgMusicId =
        values[FORM_NAMES.REVISE_BG_MUSIC] &&
        values[FORM_NAMES.REVISE_BG_MUSIC].id;
      const formPlayFullMusic =
        values[FORM_NAMES.REVISE_BG_DURATION] &&
        values[FORM_NAMES.REVISE_BG_DURATION].playFullMusic;
      const hasChanges =
        formBgMusicId !== bgMusicId ||
        formPlayFullMusic !== playFullMusic ||
        getMixHistoryVoiceStartSelector(state) !==
          selectMixPreviewVoiceStart(state) ||
        getMixHistoryMusicStartSelector(state) !==
          selectMixPreviewMusicStart(state) ||
        getMixHistoryBackgroundVolumeSelector(state) !==
          selectMixPreviewBackgroundVolume(state) ||
        getMixHistoryMusicDurationSelector(state) !==
          selectMixPreviewMusicDuration(state);
      return hasChanges;
    }
  }

  return false;
};

export const needsWordCounter = state => {
  const values = getReduxFormValues(state)[REVISE_FORM_NAME];

  if (values) {
    const reviseCategory = values[FORM_NAMES.REVISE_CATEGORY];
    if (reviseCategory === FORM_NAMES.VOICEOVER_INSTRUCTIONS) {
      const option = values[FORM_NAMES.VOICEOVER_INSTRUCTIONS];
      if (option && option.key === VOICEOVER_INSTRUCTIONS_OPTION_ONE)
        return true;
    }
  }

  return false;
};
