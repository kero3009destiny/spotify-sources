import * as types from './types';

export function changeLanguage(lang: string): types.ChangeLanguageAction {
  return {
    type: types.CHANGE_LANGUAGE,
    payload: {
      lang,
    },
  };
}

export function changeLanguageSuccess(
  lang: string,
): types.ChangeLanguageSuccessAction {
  return {
    type: types.CHANGE_LANGUAGE_SUCCESS,
    payload: {
      lang,
      timestamp: new Date().getTime(),
    },
  };
}

export function changeLanguageFailed(
  error: Error,
): types.ChangeLanguageErrorAction {
  return {
    type: types.CHANGE_LANGUAGE_FAILURE,
    error: true,
    payload: error,
  };
}
