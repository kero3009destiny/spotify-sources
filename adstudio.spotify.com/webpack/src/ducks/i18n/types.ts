import { SELECTED_LOCALE } from 'ducks/account/constants';

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const CHANGE_LANGUAGE_SUCCESS = 'CHANGE_LANGUAGE_SUCCESS';
export const CHANGE_LANGUAGE_FAILURE = 'CHANGE_LANGUAGE_FAILURE';

export interface ChangeLanguageAction {
  type: typeof CHANGE_LANGUAGE;
  payload: {
    lang: string;
  };
}

export interface ChangeLanguageSuccessAction {
  type: typeof CHANGE_LANGUAGE_SUCCESS;
  payload: {
    lang: string;
    timestamp: number;
  };
}

export interface ChangeLanguageErrorAction {
  type: typeof CHANGE_LANGUAGE_FAILURE;
  error: boolean;
  payload: Error;
}

export interface I18nState {
  [SELECTED_LOCALE]?: string;
  langLastChanged?: number;
}
