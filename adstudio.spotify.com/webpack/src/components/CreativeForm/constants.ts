import { TEST_IDS as AUDIO_TYPE_TEST_IDS } from './Fields/AudioType/constants';
import { TEST_IDS as BG_TRACK_TEST_IDS } from './Fields/BackgroundTrack/constants';

import { CreativeFormValues } from 'types/common/campaignHierarchy/types';

export const TEST_IDS: Record<string, string> = {
  CREATIVE_NAME: 'creative-name',
  IMAGE_UPLOADER: 'image-uploader',
  VIDEO_UPLOADER: 'video-uploader',
  CTA_OPTIONS_DROPDOWN: 'cta-options-dropdown',
  CLICKTHROUGH_URL: 'clickthrough-url',
  BRAND_NAME: 'brand-name',
  TAG_LINE: 'tag-line',
  AUDIO_UPLOADER: 'audio-uploader',
  VOICEOVER_SCRIPT: 'voiceover-script',
  VOICEOVER_LANGUAGE: 'voiceover-language',
  VOICEOVER_PROFILE: 'voiceover-profile',
  VOICEOVER_INSTRUCTIONS: 'voiceover-instructions',
  PLAY_FULL_TRACK: 'play-full-track-checkbox',
  ...AUDIO_TYPE_TEST_IDS,
  ...BG_TRACK_TEST_IDS,
};

export const VO_LOCALES: Array<Record<string, string>> = [
  { id: 'cmn-zh', value: 'Chinese - Mandarin' },
  { id: 'dan-dk', value: 'Danish - Denmark' },
  { id: 'deu-de', value: 'German - Germany' },
  { id: 'deu-au', value: 'German - Austria' },
  { id: 'eng-au', value: 'English - Australia' },
  { id: 'eng-ie', value: 'English - Ireland' },
  { id: 'eng-uk', value: 'English - England' },
  { id: 'eng-nz', value: 'English - New Zealand' },
  { id: 'eng-us', value: 'English - North America' },
  { id: 'eng-sco', value: 'English - Scotland' },
  { id: 'fin-fi', value: 'Finnish - Finland' },
  { id: 'fra-ca', value: 'French - Canada' },
  { id: 'fra-fr', value: 'French - France' },
  { id: 'jpn-jp', value: 'Japanese - Japan' },
  { id: 'ita-it', value: 'Italian - Italy' },
  { id: 'nld-de', value: 'Dutch - Netherlands' },
  { id: 'nor-no', value: 'Norwegian - Norway' },
  { id: 'spa-ar', value: 'Spanish - Argentina' },
  { id: 'spa-cl', value: 'Spanish - Chile' },
  { id: 'spa-co', value: 'Spanish - Colombia' },
  { id: 'spa-latam', value: 'Spanish - Latin American Neutral' },
  { id: 'spa-mx', value: 'Spanish - Mexico' },
  { id: 'spa-es', value: 'Spanish - Castilian  (from Spain)' },
  { id: 'swe', value: 'Swedish - Sweden' },
  { id: 'tgl-ph', value: 'Tagalog - Philippines' },
];

export const VOICE_TYPE: Array<Record<string, string>> = [
  { id: 'teenageBoy', value: 'Male | Teenage' },
  { id: 'youngAdultMale', value: 'Male | Young adult' },
  { id: 'middleAgeMale', value: 'Male | Middle age' },
  { id: 'seniorMale', value: 'Male | Senior' },
  { id: 'teenageGirl', value: 'Female | Teenage' },
  { id: 'youngAdultFemale', value: 'Female | Young adult' },
  { id: 'middleAgeFemale', value: 'Female | Middle age' },
  { id: 'seniorFemale', value: 'Female | Senior' },
];

export const CREATIVE_IMAGE_UPLOADER_FIELD_NAME: keyof CreativeFormValues =
  'imageUploader';

export const CREATIVE_AUDIO_UPLOADER_FIELD_NAME: keyof CreativeFormValues =
  'audioUploader';

export const CREATIVE_VIDEO_UPLOADER_FIELD_NAME: keyof CreativeFormValues =
  'videoUploader';

export const CREATIVE_STOCK_IMAGE_FIELD_NAME: keyof CreativeFormValues =
  'stockCompanionImage';
