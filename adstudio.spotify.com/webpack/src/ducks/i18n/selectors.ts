import get from 'lodash/get';

import { SELECTED_LOCALE } from 'ducks/account/constants';
import { DEFAULT_LOCALE } from 'config/i18n';

import * as types from './types';

export const getI18nState = (state: TSFixMe = {}): types.I18nState =>
  state.i18n;
export const getSelectedLocale = (state: TSFixMe): string =>
  get(getI18nState(state), SELECTED_LOCALE, DEFAULT_LOCALE);
export const getSelectedLang = (state: TSFixMe): string =>
  getSelectedLocale(state)
    .substr(0, 2)
    .toLowerCase();
export const getLangLastChanged = (state: TSFixMe) =>
  getI18nState(state).langLastChanged;
