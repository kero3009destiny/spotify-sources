import i18n from 'i18next';

import { MAX_VIDEO_FILE_SIZE } from '@spotify-internal/adstudio-web-utils/lib/constants/createAd';
import { BG_MUSIC, UPLOADED_AUDIO, UPLOADED_VIDEO } from 'config';

export const AUDIO_ANALYTICS_LABEL = 'upload_new_audio';
export const VIDEO_ANALYTICS_LABEL = 'upload_new_video';
export const BGTRACK_ANALYTICS_LABEL = 'upload_background_track';
export const IMAGE_ANALYTICS_LABEL = 'upload_new_image';
export const VIDEO_UPLOAD_SIZE_ERROR_LABEL = 'video_upload_size_too_big_error';
export const VIDEO_UPLOAD_PROCESS_ERROR_LABEL =
  'video_cannot_be_processed_error';
export const VIDEO_UPLOAD_PORTRAIT_ERROR_LABEL =
  'video_portrait_aspect_ratio_needed_error';
export const VIDEO_UPLOAD_LANDSCAPE_ERROR_LABEL =
  'video_landscape_aspect_ratio_needed_error';
export const VIDEO_UPLOAD_DURATION_ERROR_LABEL = 'AUDIO_DURATION_ERROR';
export const VIDEO_UPLOAD_AUDIO_ERROR_LABEL = 'video_missing_audio_error';
export const VIDEO_UPLOAD_CODEC_ERROR_LABEL = 'video_codec_error';
export const VIDEO_UPLOAD_ASPECT_RATIO_ERROR_LABEL =
  'video_no_aspect_ratio_error';
export const VIDEO_UPLOAD_UNKNOWN_ERROR = 'video_unknown_error';

const videoUploadErrors = new Map();
videoUploadErrors.set(
  i18n.t('I18N_YOUR_VIDEO_IS_INVALID_SIZE', {
    maxSize: MAX_VIDEO_FILE_SIZE,
    defaultValue:
      'Your video is larger than {{maxSize}} MB. Please upload a smaller video.',
  }),
  VIDEO_UPLOAD_SIZE_ERROR_LABEL,
);

videoUploadErrors.set(
  i18n.t(
    'I18N_YOUR_VIDEO_CODEC_CANNOT_BE_P',
    'Your video cannot be processed, please try uploading a different one. (Recommended codecs: H.264 video, AAC or MP3 audio)',
  ),
  VIDEO_UPLOAD_CODEC_ERROR_LABEL,
);

videoUploadErrors.set(
  i18n.t(
    'I18N_YOUR_VIDEO_CANNOT_BE_P',
    'Your video cannot be processed, please try uploading a different one.',
  ),
  VIDEO_UPLOAD_PROCESS_ERROR_LABEL,
);

videoUploadErrors.set(
  i18n.t(
    'I18N_UPLOADED_VIDEO_IS_INVALID',
    'Something went wrong trying to validate your video.  Your file may be corrupted or is not loadable by this browser.',
  ),
  VIDEO_UPLOAD_UNKNOWN_ERROR,
);

videoUploadErrors.set(
  i18n.t('I18N_YOUR_VIDEO_IS_ZERO_PIXELS', 'Your video is 0x0 pixels.'),
  VIDEO_UPLOAD_ASPECT_RATIO_ERROR_LABEL,
);

videoUploadErrors.set(
  i18n.t(
    'I18N_PLEASE_UPLOAD_VERTICAL_VIDEO',
    'Please upload a video with a 9:16 aspect ratio.',
  ),
  VIDEO_UPLOAD_PORTRAIT_ERROR_LABEL,
);
videoUploadErrors.set(
  i18n.t(
    'I18N_PLEASE_UPLOAD_HORIZONTAL_VIDEO',
    'Please upload a video with a 16:9 aspect ratio',
  ),
  VIDEO_UPLOAD_LANDSCAPE_ERROR_LABEL,
);
videoUploadErrors.set(
  i18n.t(
    'I18N_YOUR_VIDEO_IS_INVALID_DURATION_PARTIAL',
    'seconds long. Please upload a file equal to or under',
  ),
  VIDEO_UPLOAD_DURATION_ERROR_LABEL,
);
videoUploadErrors.set(
  i18n.t('I18N_YOUR_VIDEO_IS_INVALID_AUDIO', 'Your video must contain audio.'),
  VIDEO_UPLOAD_AUDIO_ERROR_LABEL,
);

export function getAnalyticsLabel(type) {
  let label;
  if (type === UPLOADED_AUDIO) {
    label = AUDIO_ANALYTICS_LABEL;
  } else if (type === UPLOADED_VIDEO) {
    label = VIDEO_ANALYTICS_LABEL;
  } else if (type === BG_MUSIC) {
    label = BGTRACK_ANALYTICS_LABEL;
  } else {
    label = IMAGE_ANALYTICS_LABEL;
  }

  return label;
}

export function fetchBlobFromUrl(url) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = 'blob';
    req.onload = () => resolve(req.response);
    req.onerror = err => reject(err);
    req.send();
  });
}

// returns the url before query parameters
export function removeSignatureFromUrl(url) {
  return url.split('?')[0];
}

export function getVideoUploadErrorLabel(uploadError) {
  for (const [error, label] of videoUploadErrors.entries()) {
    if (uploadError.includes(error)) {
      return label;
    }
  }
}
