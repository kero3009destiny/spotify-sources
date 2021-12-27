import i18n from 'i18next';

import { OpenModal } from '../components/CreativeDetails/constants';

export const CODE_TO_REDIRECT_TYPE: Record<string, OpenModal> = {
  '205': OpenModal.REVISE_VO,
  '300': OpenModal.REVISE_VO,
  '301': OpenModal.REVISE_VO,
  '302': OpenModal.REVISE_VO,
  '303': OpenModal.REVISE_BG,
  '304': OpenModal.REVISE_VO,
  '400': OpenModal.REVISE_BG,
  '401': OpenModal.REVISE_BG,
  '402': OpenModal.REVISE_BG,
  '500': OpenModal.EDIT,
  '501': OpenModal.EDIT,
  '502': OpenModal.EDIT,
};

export const REJECT_CATEGORY_PLACEHOLDER = i18n.t(
  'I18N_REJECT_CATEGORY_PLACEHOLDER',
  'Select a category...',
);

export const REJECT_REASON_PLACEHOLDER = i18n.t(
  'I18N_REJECT_REASON_PLACEHOLDER',
  'Select a reason...',
);

export const REJECT_CATEGORY_OPTIONS = [
  {
    key: '',
    value: REJECT_CATEGORY_PLACEHOLDER,
  },
  {
    key: 'REJECT_CATEGORY_CANCEL_AD',
    value: `${i18n.t('I18N_REJECT_CATEGORY_CANCEL_AD', 'Cancel ad')}`,
  },
  {
    key: 'REJECT_CATEGORY_VOICEOVER_ISSUES',
    value: `${i18n.t(
      'I18N_REJECT_CATEGORY_VOICEOVER_ISSUES',
      'Voiceover issues',
    )}`,
  },
  {
    key: 'REJECT_CATEGORY_BACKGROUND_ISSUES',
    value: `${i18n.t(
      'I18N_REJECT_CATEGORY_BACKGROUND_ISSUES',
      'Background music issues',
    )}`,
  },
  {
    key: 'REJECT_CATEGORY_OTHER',
    value: `${i18n.t('I18N_REJECT_OTHER', 'Other')}`,
  },
];

export const REJECTION_REASON_CANCELLED_OPTIONS = [
  {
    key: '',
    value: REJECT_REASON_PLACEHOLDER,
  },
  {
    key: '100',
    value: `${i18n.t(
      'I18N_REJECT_REASON_PROJECT_CANCELLED',
      'The campaign is cancelled.',
    )}`,
  },
  {
    key: '101',
    value: `${i18n.t(
      'I18N_REJECT_REASON_PROJECT_SUBMITTED_INCORRECTLY',
      'I submitted the ad incorrectly.',
    )}`,
  },
  {
    key: '102',
    value: `${i18n.t(
      'I18N_REJECT_REASON_WANT_TO_CHANGE_ACTOR',
      "I'd like to change the voice actor.",
    )}`,
  },
  {
    key: '103',
    value: `${i18n.t(
      'I18N_REJECT_REASON_PROJECT_TOO_LATE',
      'The ad was delivered past my deadline.',
    )}`,
  },
  {
    key: '104',
    value: `${i18n.t('I18N_REJECT_OTHER', 'Other')}`,
  },
];

export const REJECTION_REASON_VO_ISSUES_OPTIONS = [
  {
    key: '',
    value: REJECT_REASON_PLACEHOLDER,
  },
  {
    key: '200',
    value: `${i18n.t(
      'I18N_REJECT_REASON_UNEXPECTED_AGE_OR_GENDER',
      'The voice actor is the incorrect age or gender.',
    )}`,
  },
  {
    key: '201',
    value: `${i18n.t(
      'I18N_REJECT_REASON_UNEXPECTED_ACCENT',
      'The voice actor has the incorrect accent.',
    )}`,
  },
  {
    key: '202',
    value: `${i18n.t(
      'I18N_REJECT_REASON_TOO_ROBOTIC',
      'The voice sounds robotic.',
    )}`,
  },
  {
    key: '203',
    value: `${i18n.t(
      'I18N_REJECT_REASON_WRONG_FIT_TONE',
      "The voice actor isn't the right fit or tone for this ad.",
    )}`,
  },
  {
    key: '204',
    value: `${i18n.t(
      'I18N_REJECT_REASON_ACTOR_DIDNT_FOLLOW_INSTRUCTIONS',
      "The voice actor didn't follow instructions.",
    )}`,
  },
  {
    key: '205',
    value: `${i18n.t(
      'I18N_REJECT_REASON_UNEXPECTED_PRONUNCIATION',
      'The voiceover has pronunciation issues.',
    )}`,
  },
  {
    key: '206',
    value: `${i18n.t(
      'I18N_REJECT_REASON_DISTORTION_OR_TOO_LOUD',
      'The voiceover is distorted.',
    )}`,
  },
  {
    key: '207',
    value: `${i18n.t(
      'I18N_REJECT_REASON_BACKGROUND_NOISE_OR_ECHO',
      'The voiceover has background noise or room echo.',
    )}`,
  },
  {
    key: '300',
    value: `${i18n.t(
      'I18N_REJECT_REASON_VOICEOVER_TOO_SHORT',
      'The voiceover is too short.',
    )}`,
  },
  {
    key: '301',
    value: `${i18n.t(
      'I18N_REJECT_REASON_VOICEOVER_TOO_LONG',
      'The voiceover is too long.',
    )}`,
  },
  {
    key: '302',
    value: `${i18n.t(
      'I18N_REJECT_REASON_WANT_SCRIPT_EDIT',
      'I need to edit the script.',
    )}`,
  },
  {
    key: '303',
    value: `${i18n.t(
      'I18N_REJECT_REASON_WRONG_VOICE_START_TIME',
      'The voiceover starts or ends at the wrong time.',
    )}`,
  },
  {
    key: '304',
    value: `${i18n.t(
      'I18N_REJECT_REASON_VOICEOVER_CUT_OFF',
      'The voiceover is cut off.',
    )}`,
  },
  {
    key: '305',
    value: `${i18n.t('I18N_REJECT_OTHER', 'Other')}`,
  },
];

export const REJECTION_REASON_BG_ISSUES_OPTIONS = [
  {
    key: '',
    value: REJECT_REASON_PLACEHOLDER,
  },
  {
    key: '400',
    value: `${i18n.t(
      'I18N_REJECT_REASON_WRONG_MUSIC_VOLUME',
      'I need to adjust the background music volume.',
    )}`,
  },
  {
    key: '401',
    value: `${i18n.t(
      'I18N_REJECT_REASON_WANT_DIFFERENT_MUSIC',
      'I need to change the background music.',
    )}`,
  },
  {
    key: '402',
    value: `${i18n.t(
      'I18N_REJECT_REASON_MUSIC_TOO_LONG',
      'The background music continues playing for too long.',
    )}`,
  },
  {
    key: '403',
    value: `${i18n.t(
      'I18N_REJECT_REASON_MUSIC_OPTIONS_NOT_GOOD',
      "I don't like any of the background music options.",
    )}`,
  },
  {
    key: '404',
    value: `${i18n.t(
      'I18N_REJECT_REASON_DONT_LIKE_MUSIC_FADE',
      "I don't like the fading in / fading out.",
    )}`,
  },
  {
    key: '405',
    value: `${i18n.t('I18N_REJECT_OTHER', 'Other')}`,
  },
];

export const REJECTION_REASON_OTHER_OPTIONS = [
  {
    key: '',
    value: REJECT_REASON_PLACEHOLDER,
  },
  {
    key: '500',
    value: `${i18n.t(
      'I18N_REJECT_REASON_WANT_BUDGET_OR_TARGETING_CHANGE',
      'I need to edit my campaign budget or targeting.',
    )}`,
  },
  {
    key: '501',
    value: `${i18n.t(
      'I18N_REJECT_REASON_WANT_DIFFERENT_CLICK_THROUGH_URL',
      'I need to edit my click URL.',
    )}`,
  },
  {
    key: '502',
    value: `${i18n.t(
      'I18N_REJECT_REASON_WANT_DIFFERENT_IMAGE',
      'I need to edit my image.',
    )}`,
  },
  {
    key: '503',
    value: `${i18n.t(
      'I18N_REJECT_REASON_OTHER_REJECTION_CODE_UNSET',
      'My reason for rejecting the ad is not listed.',
    )}`,
  },
];
