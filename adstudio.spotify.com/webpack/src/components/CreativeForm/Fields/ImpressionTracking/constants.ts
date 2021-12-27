import i18n from 'i18next';

import { Pixel } from 'types/common/campaignHierarchy/types';
import { TRACKING_EVENT_TYPE } from 'types/common/state/api/creative';

export const URL_VALIDATION_DEBOUNCE_TIME_MILLIS = 200;

export const TEST_IDS: Record<string, string> = {
  IMPRESSION_PIXEL_FIELD: 'tracking-pixel-field',
  ADD_PIXEL: 'add-pixel',
};

export const TRACKING_URL_FIELDS = [
  {
    key: TRACKING_EVENT_TYPE.IMPRESSION,
    value: i18n.t('I18N_IMPRESSION', 'Impression'),
  },
  { key: TRACKING_EVENT_TYPE.START, value: i18n.t('I18N_START', 'Start') },
  {
    key: TRACKING_EVENT_TYPE.FIRST_QUARTILE,
    value: i18n.t('I18N_FIRST_QUARTILE_TYPE', 'First Quartile'),
  },
  {
    key: TRACKING_EVENT_TYPE.MIDPOINT,
    value: i18n.t('I18N_MIDPOINT_TYPE', 'Midpoint'),
  },
  {
    key: TRACKING_EVENT_TYPE.THIRD_QUARTILE,
    value: i18n.t('I18N_THIRD_QUARTILE_TYPE', 'Third Quartile'),
  },
  {
    key: TRACKING_EVENT_TYPE.COMPLETE,
    value: i18n.t('I18N_COMPLETE', 'Complete'),
  },
  {
    key: TRACKING_EVENT_TYPE.SKIPPED,
    value: i18n.t('I18N_SKIPPED', 'Skipped'),
  },
  {
    key: TRACKING_EVENT_TYPE.CLICKED,
    value: i18n.t('I18N_CLICKED', 'Clicked'),
  },
  { key: '', value: i18n.t('I18N_NONE', 'None') },
];

export const DCM_URL_PATTERN = /^(https:\/\/)?ad\.doubleclick\.net\/.*/;

export const isDcmImpressionPixel = (pixel: Pixel): boolean =>
  pixel.key === TRACKING_EVENT_TYPE.IMPRESSION &&
  !!pixel.value?.match(DCM_URL_PATTERN);
