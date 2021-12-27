import i18n from 'i18next';

import {
  BG_MUSIC,
  UPLOADED_AUDIO,
  UPLOADED_COVER_ART,
  UPLOADED_VIDEO,
} from 'config';
import { FORM_NAMES as AD_CREATION_FORM_NAMES } from 'config/adCreation';

import { UploadType } from '../types/common/state/api/uploadTypes';

export const UPLOAD_TYPE_TO_FORM_FIELD: Record<UploadType, string> = {
  [UPLOADED_COVER_ART]: AD_CREATION_FORM_NAMES.IMAGE_UPLOADER,
  [BG_MUSIC]: AD_CREATION_FORM_NAMES.NEW_VOICEOVER_BGMUSIC_UPLOADER,
  [UPLOADED_AUDIO]: AD_CREATION_FORM_NAMES.AUDIO_UPLOADER,
  [UPLOADED_VIDEO]: AD_CREATION_FORM_NAMES.VIDEO_UPLOADER,
  // Placeholder for type check
  ['voiceover']: '',
};

export const UPLOAD_ID_TYPE_TO_FORM_FIELD: Record<UploadType, string> = {
  [UPLOADED_COVER_ART]: AD_CREATION_FORM_NAMES.IMAGE,
  [BG_MUSIC]: AD_CREATION_FORM_NAMES.NEW_VOICEOVER_BGMUSIC_UPLOADER,
  [UPLOADED_AUDIO]: AD_CREATION_FORM_NAMES.AUDIO,
  [UPLOADED_VIDEO]: AD_CREATION_FORM_NAMES.VIDEO,
  // Placeholder for type check
  ['voiceover']: '',
};

export const JPEG_FORMAT = 'image/jpeg';
export const PNG_FORMAT = 'image/png';

export const MP3_FORMAT = 'audio/mp3';
export const WAV_FORMAT = 'audio/wav';
export const OGG_FORMAT = 'audio/ogg';
export const MPEG_FORMAT = 'audio/mpeg';

export const QUICKTIME_FORMAT = 'video/quicktime';
export const MP4_FORMAT = 'video/mp4';

export const ACCEPTED_AUDIO_FILE_TYPES = {
  [MP3_FORMAT]: '.MP3',
  [WAV_FORMAT]: '.WAV',
  [OGG_FORMAT]: '.OGG',
  [MPEG_FORMAT]: '.MPEG',
};

export const ACCEPTED_IMAGE_FILE_TYPES = {
  [JPEG_FORMAT]: 'JPEGs',
  [PNG_FORMAT]: 'PNGs',
};

// source: https://en.wikipedia.org/wiki/Magic_number_%28programming%29#In_files
export const FORMAT_MAGIC_NUMBERS_START = {
  [JPEG_FORMAT]: '\xff\xd8\xff',
  [PNG_FORMAT]: '\x89PNG\r\n\x1a\n',
};

export const FORMAT_MAGIC_NUMBERS_END = {
  [JPEG_FORMAT]: '\xff\xd9\xff',
  [PNG_FORMAT]: '\x00\x00\x00\x00\x49\x45\x4E\x44\xAE\x42\x60\x82',
};

// Source: https://en.wikipedia.org/wiki/Portable_Network_Graphics
export const PNG_FORMAT_END_SEQUENCE = [
  0x00,
  0x00,
  0x00,
  0x00,
  0x49,
  0x45,
  0x4e,
  0x44,
  0xae,
  0x42,
  0x60,
  0x82,
];

export const CLIENT_AUDIO_TYPES = {
  'audio/ogg': 'OGG', // not supported by safari or firefox
  'audio/mp3': 'MP3',
  'audio/mpeg': 'MP3', // supported by safari
  'audio/wav': 'WAV', // supported by chrome
  'audio/x-wav': 'WAV', // supported by firefox, safari
};

export const ACCEPTED_VIDEO_FILE_TYPES = {
  'video/quicktime': '.MOV',
  'video/mp4': '.MP4',
};

export const DEFAULT_UPLOAD_ERROR_MESSAGE = i18n.t(
  'I18N_SOMETHING_WENT_WRONG_WHIL3',
  'Something went wrong while uploading your file. Please try again. If you continue to have problems, please contact us at adstudio@spotify.com.',
);

export const UPLOADER_STRINGS = {
  deleteLabel: i18n.t('I18N_DELETE', 'Delete'),
  dragAndDropText: i18n.t('I18N_OR_DRAG_AND_DROP_IT', 'or drag and drop it.'),
  processingText: i18n.t('I18N_PROCESSING', 'Processing'),
  uploadingText: i18n.t('I18N_UPLOADING', 'Uploading'),
  uploadFileText: i18n.t('I18N_UPLOAD_A_FILE', 'Upload a file'),
};

export const ACCEPTED_GENERIC_FILE_TYPES = {
  ...ACCEPTED_AUDIO_FILE_TYPES,
  ...ACCEPTED_IMAGE_FILE_TYPES,
  ...ACCEPTED_VIDEO_FILE_TYPES,
};
