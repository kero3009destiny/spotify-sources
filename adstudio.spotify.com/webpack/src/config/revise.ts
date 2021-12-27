import i18n from 'i18next';

import { UploadInfo } from 'types/common/state/api/upload';

export const VOICEOVER_INSTRUCTIONS_OPTION_ONE = `${i18n.t(
  'I18N_I_D_LIKE_TO_UPDATE_MY_SCR',
  "I'd like to update my script",
)}`;
export const VOICEOVER_INSTRUCTIONS_OPTION_TWO = i18n.t(
  'I18N_VOICE_ACTOR_MISPRONOUNCED',
  'Voice actor mispronounced something',
);

export const VOICEOVER_INSTRUCTIONS_OPTION_THREE = `${i18n.t(
  'I18N_I_D_LIKE_A_DIFFERENT_TONE',
  "I'd like a different tone/pace",
)}`;
export const VOICEOVER_INSTRUCTIONS_OPTION_OTHER = i18n.t(
  'I18N_OTHER',
  'Other ',
);
export const VOICEOVER_INSTRUCTIONS_OTHER_PLACEHOLDER = i18n.t(
  'I18N_THE_VOICEOVER_ARTIST_MISP',
  'The voiceover artist mispronounced...',
);

export const VOICEOVER_INSTRUCTIONS_PLACEHOLDER = i18n.t(
  'I18N_SELECT_A_REVISION_REASON',
  'Select a revision reason...',
);
export const VOICEOVER_INSTRUCTIONS_DESCRIPTION = `${i18n.t(
  'I18N_YOUR_REVISION_FEEDBACK_WI',
  "Your revision feedback will only affect your voiceover clip. Please don't send background music revisions, since our voiceover actors record their parts separately from the music. If you want a new voiceover actor, you must reject the ad and create a new one.",
)}`;

export type VoiceoverInstructionsOptions =
  | typeof VOICEOVER_INSTRUCTIONS_OPTION_ONE
  | typeof VOICEOVER_INSTRUCTIONS_OPTION_TWO
  | typeof VOICEOVER_INSTRUCTIONS_OPTION_THREE
  | typeof VOICEOVER_INSTRUCTIONS_OPTION_OTHER;

export type VoiceoverInstructionsOption = {
  key: VoiceoverInstructionsOptions;
  value: string;
};

export const REVISE_FORM_NAME = 'revise-ad-form';

export interface ReviseFormData {
  revise_option: string;
  reviseBGMusic: UploadInfo | null | undefined;
  reviseVOInstructions: VoiceoverInstructionsOption;
  reviseBackgroundDuration: {
    playFullMusic: boolean;
  };
  reviseBGMusic_uploader: TSFixMe;
  reviseMixMode: string | undefined;
  reviseVoiceStart?: number;
  reviseMusicStart?: number;
  reviseBackgroundVolume?: number;
  reviseMusicDuration?: number;
}

export const FormFields: Record<string, keyof ReviseFormData> = {
  REVISE_CATEGORY: 'revise_option',
  VOICEOVER_INSTRUCTIONS: 'reviseVOInstructions',
  REVISE_BG_MUSIC: 'reviseBGMusic',
  REVISE_BG_MUSIC_UPLOADER: 'reviseBGMusic_uploader',
  REVISE_BG_DURATION: 'reviseBackgroundDuration',
  REVISE_MIX_MODE: 'reviseMixMode',
  REVISE_VOICE_START: 'reviseVoiceStart',
  REVISE_MUSIC_START: 'reviseMusicStart',
  REVISE_BACKGROUND_VOLUME: 'reviseBackgroundVolume',
  REVISE_MUSIC_DURATION: 'reviseMusicDuration',
};

export const FORM_NAMES: Record<string, keyof ReviseFormData> = {
  REVISE_CATEGORY: FormFields.REVISE_CATEGORY,
  VOICEOVER_INSTRUCTIONS: FormFields.VOICEOVER_INSTRUCTIONS,
  REVISE_BG_MUSIC: FormFields.REVISE_BG_MUSIC,
  REVISE_BG_MUSIC_UPLOADER: FormFields.REVISE_BG_MUSIC_UPLOADER,
  REVISE_BG_DURATION: FormFields.REVISE_BG_DURATION,
  REVISE_MIX_MODE: FormFields.REVISE_MIX_MODE,
  REVISE_VOICE_START: FormFields.REVISE_VOICE_START,
  REVISE_MUSIC_START: FormFields.REVISE_MUSIC_START,
  REVISE_BACKGROUND_VOLUME: FormFields.REVISE_BACKGROUND_VOLUME,
  REVISE_MUSIC_DURATION: FormFields.REVISE_MUSIC_DURATION,
};

export const REVISE_DEFAULTS = {
  VOICE_START: 0.5, // in seconds
  MUSIC_START: 0,
  MUSIC_DURATION: 30, // in seconds
  BACKGROUND_VOLUME: 0.3,
  BACKGROUND_VOLUME_MIN: 0.1,
  BACKGROUND_VOLUME_MAX: 0.6,
  BACKGROUND_VOLUME_STEP: 0.05,
  MIX_MODE: 'autoduck',
};
