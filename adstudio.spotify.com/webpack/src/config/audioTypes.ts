import i18n from 'i18next';

export enum AudioType {
  UPLOADED_AUDIO = 'fullmix',
  NEW_VOICEOVER = 'newVO',
  BG_MUSIC = 'bgmusic',
  INSTANT_ASSETS = 'instant',
  DEFAULT_AUDIO = 'fullmix',
  SPOKEN_LAYER_BRIEF = 'spokenLayerBrief',
  SPOKEN_LAYER_FULLMIX = 'spokenLayerFullmix',
}

export interface StockTrack {
  id: string;
  uri: string;
  name: string;
  genre: string;
}

export const UPLOADED_AUDIO = AudioType.UPLOADED_AUDIO;
// export const EXISTING_VOICEOVER = 'existingVO';
export const NEW_VOICEOVER = AudioType.NEW_VOICEOVER;
export const BG_MUSIC = AudioType.BG_MUSIC;
export const DEFAULT_AUDIO = AudioType.DEFAULT_AUDIO;
export const INSTANT_ASSETS = AudioType.INSTANT_ASSETS;
export const SPOKEN_LAYER_BRIEF = AudioType.SPOKEN_LAYER_BRIEF;
export const SPOKEN_LAYER_FULLMIX = AudioType.SPOKEN_LAYER_FULLMIX;

export const AUDIO_NAME = {
  [UPLOADED_AUDIO]: i18n.t('I18N_USER_UPLOADED_AUDIO', 'User Uploaded Audio'),
  [NEW_VOICEOVER]: i18n.t('I18N_NEW_VOICEOVER', 'New Voiceover'),
  [INSTANT_ASSETS]: i18n.t('I18N_CREATE_INSTANTLY1', 'Create Instantly'),
  [SPOKEN_LAYER_BRIEF]: i18n.t(
    'I18N_SPOKEN_LAYER_BRIEF',
    'Create something new',
  ),
  [SPOKEN_LAYER_FULLMIX]: i18n.t(
    'I18N_SPOKEN_LAYER_FULLMIX',
    'Use something approved',
  ),
};
