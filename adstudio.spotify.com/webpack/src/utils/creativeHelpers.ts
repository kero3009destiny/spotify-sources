import i18n from 'i18next';

import { EffectiveVoState } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/EffectiveVoState';

import { isSpanEnabled } from 'utils/remoteconfig/remoteConfigHelpers';

import { ASPECT_RATIOS } from 'config/adCreation';

import { Placement } from '../types/common/campaignHierarchy/types';
import { PendingCreativeResponseRow } from 'types/common/state/api/assets';
import { CreativeDetails } from 'types/common/state/api/creative';
import { CreativeState } from 'types/common/state/api/creatives';
import { Format, FormatType } from 'types/common/state/api/format';
import { UPLOAD_TYPES, UploadType } from 'types/common/state/api/uploadTypes';
import { VoiceoverSystem } from 'types/common/state/api/voiceoverSystem';
import { AsyncFileValidator } from 'types/common/validators';

export const PODCAST_DEFAULT_IMAGE_URL =
  'https://adstudio.scdn.co/assets/podcast-default.png';

export const isVideoFormatType = (format?: FormatType) =>
  format === Format.VIDEO;

export const isAudioFormatType = (format?: FormatType) =>
  format === Format.AUDIO;

export const isPodcastFormatType = (format?: FormatType) => {
  return format === Format.AUDIO_PODCAST;
};

export const isMusicFormatType = (format?: FormatType) => {
  return isVideoFormatType(format) || isAudioFormatType(format);
};

const blockedForSpanPodcasts = (hasSpan: boolean, format: FormatType) => {
  if (!hasSpan) return true;
  return !isPodcastFormatType(format);
};

export const createCreativeEnabledForFormat = (
  hasSpan: boolean,
  format: FormatType,
) => {
  return blockedForSpanPodcasts(hasSpan, format);
};

export const creativeRotationEnabledForFormat = (
  hasSpan: boolean,
  format: FormatType,
) => {
  return blockedForSpanPodcasts(hasSpan, format);
};

export const isVideoUploadType = (uploadType: UploadType) =>
  uploadType === UPLOAD_TYPES.VIDEO;

export const isAudioCreativeType = (format: FormatType): boolean => {
  switch (format) {
    case Format.AUDIO:
    case Format.AUDIO_PODCAST:
      return true;
  }
  return false;
};

export const isUnsupportedUploadType = (uploadType: UploadType) =>
  uploadType === UPLOAD_TYPES.UNSUPPORTED;

export const hasRejectedVoiceover = (creative: CreativeDetails): boolean =>
  creative.voiceover?.state === EffectiveVoState.VO_REJECTED;

export const videoPlayerDimensions = {
  [ASPECT_RATIOS.LANDSCAPE]: { width: '224px', height: '126px' }, // 16:9 Landscape
  [ASPECT_RATIOS.PORTRAIT]: { width: '126px', height: '224px' }, // 9:16 Portrait
  [ASPECT_RATIOS.UNKNOWN]: { width: '0px', height: '0px' }, // Audio/undefined
};

export const isEditable = (
  creative: Pick<CreativeDetails, 'creativeState' | 'isAdgen'>,
) => {
  if (
    creative.isAdgen ||
    creative.creativeState === CreativeState.STOPPED ||
    creative.creativeState === CreativeState.REJECTED ||
    hasRejectedVoiceover(creative)
  ) {
    return false;
  }

  return true;
};

// Determine format from aspect ratio in 111
export const getFormatForAspectRatio = (aspectRatio: number): FormatType => {
  switch (aspectRatio) {
    case ASPECT_RATIOS.LANDSCAPE:
    case ASPECT_RATIOS.PORTRAIT:
      return Format.VIDEO;
    default:
      return Format.AUDIO;
  }
};

export const getPlacementFromFormat = (format: FormatType | '' | undefined) =>
  format && format === Format.AUDIO_PODCAST
    ? Placement.PODCASTS
    : Placement.MUSIC;

// TODO - remove once SPAN is launched
export const isSpanPodcast = (format: FormatType) =>
  isPodcastFormatType(format) && isSpanEnabled();

export const isSpokenlayerPendingCreativeResponseRow = (
  pendingCreativeResponseRow: PendingCreativeResponseRow,
) =>
  pendingCreativeResponseRow.voiceover.voiceoverSystem ===
  VoiceoverSystem.SPOKENLAYER;

export async function getFileError(
  file: File,
  uploadType: UploadType,
  asyncFileValidators: AsyncFileValidator[],
): Promise<string | void> {
  try {
    // If upload type is unsupported then return error
    if (isUnsupportedUploadType(uploadType)) {
      // ***TODO*** correct I18N plus copy setup
      return 'Unsupported file type';
    }

    const errors = await Promise.all(asyncFileValidators.map(fn => fn(file)));

    for (let i = 0; i < errors.length; i++) {
      if (!!errors[i]) {
        return errors[i];
      }
    }
  } catch (error) {
    let errorMsg = `${i18n.t(
      'I18N_YOUR_FILE_CANNOT_BE_P',
      'Your file cannot be processed, please try uploading a different one.',
    )}`;

    if (isVideoUploadType(uploadType)) {
      if (
        error &&
        error.message &&
        error.message.includes('no supported streams')
      ) {
        errorMsg = `${i18n.t(
          'I18N_YOUR_VIDEO_CODEC_CANNOT_BE_P',
          'Your video cannot be processed, please try uploading a different one. (Recommended codecs: H.264 video, AAC or MP3 audio)',
        )}`;
      } else {
        errorMsg = `${i18n.t(
          'I18N_YOUR_VIDEO_CANNOT_BE_P',
          'Your video cannot be processed, please try uploading a different one.',
        )}`;
      }
    }

    return errorMsg;
  }
}
