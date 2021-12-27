import i18n from 'i18next';

export const ADSTUDIO_LOGO_TITLE = i18n.t(
  'I18N_SPOTIFY_AD_STUDIO',
  'Spotify Ad Studio',
);
export const SPOTIFY_ADVERTISING_LOGO_TITLE = i18n.t(
  'I18N_SPOTIFY_ADVERTISING',
  'Spotify Advertising',
);
export {
  BG_MUSIC,
  DEFAULT_AUDIO,
  NEW_VOICEOVER,
  UPLOADED_AUDIO,
} from './audioTypes';
export {
  FREE_TRIAL_ELIGIBLE,
  FREE_TRIAL_INELIGIBLE,
  FREE_TRIAL_NULL_VALUE,
  default as freetrials,
} from './freetrials';
export {
  ALL_GENDERS_LIST,
  ALL_GENDERS_VALUE,
  default as genders,
  NO_GENDERS_VALUE,
} from './genders';
export { PlatformKey, PLATFORMS } from './platforms';
export {
  AUDIO_DURATION,
  FILE_FAIL,
  FILE_PROPERTIES,
  FILE_SIZE_PROP,
  FILE_TYPE_PROP,
  IMAGE_DIMENSIONS,
  UPLOADED_COVER_ART,
  UPLOADED_INFO,
  UPLOADED_STATUS,
  UPLOADED_VIDEO,
} from './uploadProperties';

export const MAX_FILE_SIZE_LIMIT = 104857600; // 100 mb
export const MIN_AUDIO_DURATION = 1;
export const MAX_AUDIO_DURATION = 31;
export const MIN_BG_AUDIO_DURATION = 5;
export const MAX_BG_AUDIO_DURATION = 600;
export const CLIENT_AUDIO_TYPES = [
  'audio/ogg', // not supported by safari
  'audio/mp3',
  'audio/wav', // supported by chrome
  'audio/mpeg',
  'audio/x-wav',
];

export const CLIENT_IMAGE_TYPES = ['image/jpeg', 'image/png'];

export const COVER_ART_IMAGE_DIMENSIONS = {
  minDimension: 640,
  maxDimension: 10000,
};

export const SPOTIFY_WEB_API = 'https://api.spotify.com/v1';

export const PAGINATION_PAGE_LIMIT = 20;
export const HEADLINE_CHAR_LIMIT = 100;

export {
  AUDIENCE_FORM_NAME,
  CAMPAIGN_FORM_NAME,
  EDIT_FORM_NAME,
} from './adCreation';
export { SUPPORTED_BROWSER_VERSIONS } from './browsers';

export const CUSTOMIZE_COLUMNS_FORM_NAME = 'customize-columns';

export const EXPANDED_TARGETING_LOCATION_LIMIT = 1000;

export const TARGETING_MIN_AGE = 13;
export const TARGETING_MAX_AGE = 65; // Actually we show '65+' as max
// According to our backend
export const REAL_MAX_AGE = 199;

// According to campaign service
export const MIN_PO_LENGTH = 2;
export const MAX_PO_LENGTH = 45;
