import i18n from 'i18next';
import get from 'lodash/get';

import {
  getAudioFromUri,
  getDataUri,
} from '@spotify-internal/adstudio-web-utils/lib/utils/uploads';

import { getMediaMetadata } from './fileUpload';

import {
  MAX_AUDIO_DURATION,
  MAX_BG_AUDIO_DURATION,
  MIN_AUDIO_DURATION,
  MIN_BG_AUDIO_DURATION,
} from 'config';

import { AsyncFileValidator } from 'types/common/validators';

// TODO: consider moving to adstudio-web-utils if it's still useful to keep validators in that lib
const validateDurationInRange = async (
  file: File,
  min: number,
  max: number,
) => {
  const dataUri = await getDataUri(file);
  const audio = await getAudioFromUri(dataUri);

  if (audio.duration < min || audio.duration > max) {
    return i18n.t('I18N_YOUR_AUDIO_IS_TOO_LONG_OR_SHORT', {
      duration: Math.round(audio.duration),
      maxDuration: max,
      defaultValue:
        'Your audio is {{duration}} seconds long. Upload a file equal to or under {{maxDuration}} seconds.',
    });
  }

  return undefined;
};

export const validateDuration: AsyncFileValidator = async (file: File) => {
  return validateDurationInRange(file, MIN_AUDIO_DURATION, MAX_AUDIO_DURATION);
};

export const validateBackgroundDuration: AsyncFileValidator = async (
  file: File,
) => {
  return validateDurationInRange(
    file,
    MIN_BG_AUDIO_DURATION,
    MAX_BG_AUDIO_DURATION,
  );
};

export const validateIsSpokenlayerSource = async (
  file: File,
  logUserAction: (evt: GoogleAnalyticsEvent) => void,
  category: string,
) => {
  let metadata;
  try {
    metadata = await getMediaMetadata(file);
  } catch (e) {
    return i18n.t(
      'I18N_SOMETHING_WENT_WRONG_WHIL3',
      'Something went wrong while uploading your file. Please try again. If you continue to have problems, please contact us at adstudio@spotify.com.',
    );
  }

  if (metadata && get(metadata, '0.extra.spokenlayer', undefined)) {
    return;
  }
  logUserAction({
    category,
    label: 'upload_new_audio_failed',
    params: { errorType: 'no_spokenlayer_tag' },
  });
  return i18n.t(
    'I18N_PODCAST_CREATIVE_INVALID',
    'Podcast ad creative doesn’t match the file approved and provided by your Spotify Account Manager.',
  );
};
