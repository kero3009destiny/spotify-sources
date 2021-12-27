import i18n from 'i18next';

import lang from './lang';

export const GENDER_FEMALE = 'Female';
export const GENDER_MALE = 'Male';
export const ALL_GENDERS_VALUE = 'All';
export const NO_GENDERS_VALUE = 'None';
export const ALL_GENDERS_LIST = ['Female', 'Male'];

export enum GenderKey {
  all = 'all',
  male = 'female',
  female = 'male',
}

export default new Map([
  [ALL_GENDERS_VALUE, lang(GenderKey.all, i18n.t('I18N_GENDER_ALL', 'All'))],
  [
    GENDER_FEMALE,
    lang(GenderKey.female, i18n.t('I18N_GENDER_FEMALE', 'Female')),
  ],
  [GENDER_MALE, lang(GenderKey.male, i18n.t('I18N_GENDER_MALE', 'Male'))],
]);
