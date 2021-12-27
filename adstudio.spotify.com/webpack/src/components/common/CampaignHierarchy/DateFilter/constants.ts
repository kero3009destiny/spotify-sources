import i18n from 'i18next';

export const DateDropdownOptionKeys = {
  LAST_SEVEN_DAYS: 'LAST_SEVEN_DAYS',
  LAST_FOURTEEN_DAYS: 'LAST_FOURTEEN_DAYS',
  LAST_THIRTY_DAYS: 'LAST_THIRTY_DAYS',
  LAST_NINETY_DAYS: 'LAST_NINETY_DAYS',
  MONTH_TO_DATE: 'MONTH_TO_DATE',
  PAST_MONTH: 'PAST_MONTH',
  LIFETIME: 'LIFETIME',
  CUSTOM: 'CUSTOM',
};

export const DateDropdownOptionValues: {
  [key: string]: string;
} = {
  [DateDropdownOptionKeys.LAST_SEVEN_DAYS]: i18n.t(
    'I18N_DATE_PICKER_LAST_7_DAYS',
    'Last 7 days',
  ),
  [DateDropdownOptionKeys.LAST_FOURTEEN_DAYS]: i18n.t(
    'I18N_DATE_PICKER_LAST_14_DAYS',
    'Last 14 days',
  ),
  [DateDropdownOptionKeys.LAST_THIRTY_DAYS]: i18n.t(
    'I18N_DATE_PICKER_LAST_30_DAYS',
    'Last 30 days',
  ),
  [DateDropdownOptionKeys.LAST_NINETY_DAYS]: i18n.t(
    'I18N_DATE_PICKER_LAST_90_DAYS',
    'Last 90 days',
  ),
  [DateDropdownOptionKeys.MONTH_TO_DATE]: i18n.t(
    'I18N_DATE_PICKER_MONTH_TO',
    'Month-to-date',
  ),
  [DateDropdownOptionKeys.PAST_MONTH]: i18n.t(
    'I18N_DATE_PICKER_PAST_MONTH',
    'Past Month',
  ),
  [DateDropdownOptionKeys.LIFETIME]: i18n.t(
    'I18N_DATE_PICKER_LIFETIME',
    'Lifetime',
  ),
  [DateDropdownOptionKeys.CUSTOM]: i18n.t(
    'I18N_DATE_PICKER_CUSTOM_DATE_RANGE',
    'Custom',
  ),
};

export const QueryParamDateFormat = 'YYYY-MM-DD';
