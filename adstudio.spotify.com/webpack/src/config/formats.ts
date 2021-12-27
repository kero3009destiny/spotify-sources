import i18n from 'i18next';

import { FormatType } from 'types/common/state/api/format';

export const I18N_PLACEMENT: Record<FormatType, string> = {
  AUDIO: i18n.t('I18N_MUSIC', 'Music'),
  VIDEO: i18n.t('I18N_MUSIC', 'Music'),
  UNKNOWN: i18n.t('I18N_MUSIC', 'Music'),
  AUDIO_PODCAST: i18n.t('I18N_PODCASTS', 'Podcasts'),
};

export const I18N_ASSET_TYPE: Record<FormatType, string> = {
  AUDIO: i18n.t('I18N_FORMAT_AUDIO', 'Audio'),
  VIDEO: i18n.t('I18N_FORMAT_VIDEO', 'Video'),
  UNKNOWN: i18n.t('I18N_FORMAT_UNKNOWN', 'Unknown'),
  AUDIO_PODCAST: i18n.t('I18N_FORMAT_AUDIO', 'Audio'),
};
