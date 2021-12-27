import debug from 'debug';
import i18n from 'i18next';
import get from 'lodash/get';
import { all, put, select, takeEvery } from 'redux-saga/effects';

import { RECEIVE_ALL_USER_PREFERENCES } from 'ducks/userPreferences/types';
import * as actions from './actions';
import { setPreference } from 'ducks/userPreferences/actions';
import { isSuperAdmin } from 'ducks/account/selectors';
import { getUserPreference } from 'ducks/userPreferences/selectors';

import { loadLanguage, setHTMLLang } from 'utils/i18nHelpers';
import { getBooleanProperty } from 'utils/remoteconfig/remoteConfigHelpers';
import { resolver } from 'utils/remoteconfig/resolver';
import { getLocalStorage, getStorage, setStorage } from 'utils/storageHelpers';

import { SELECTED_LOCALE } from 'ducks/account/constants';
import { DEFAULT_LOCALE, DEFAULT_NAMESPACE } from 'config/i18n';

import * as types from './types';

const log = debug('sagas:i18n');

export function* setLanguage(action: types.ChangeLanguageAction) {
  const { lang = DEFAULT_LOCALE } = action.payload || {};

  log(`attempting to set locale to proposed locale ${lang}`);
  try {
    const storage = getLocalStorage();
    const currSelLang = get(i18n, 'language', DEFAULT_LOCALE);
    log(`current selected i18n locale is ${currSelLang}`);
    const isSelLang = currSelLang === lang;

    const currBootstrapLang = getStorage(storage, SELECTED_LOCALE);
    log(`current bootstrap locale is ${currBootstrapLang}`);
    const isBootstrapLang = currBootstrapLang === lang;

    const isSupportedLanguage = get(i18n, `options.whitelist`, []).includes(
      lang,
    );
    log(
      `proposed locale ${lang} is ${
        isSupportedLanguage ? '' : 'not '
      }supported by i18n`,
    );

    const rcKey = lang.toLowerCase().replace(/-/g, '_');
    const isEnabledLanguage =
      (lang === 'xx_XX' && select(isSuperAdmin)) ||
      !resolver ||
      !resolver.isActive ||
      getBooleanProperty('i18n_language_releases_all') ||
      getBooleanProperty(`i18n_language_releases_${rcKey}`);
    log(
      `proposed locale ${lang} is ${
        isEnabledLanguage ? '' : 'not '
      }enabled for this user`,
    );

    if (lang === DEFAULT_LOCALE || (isSupportedLanguage && isEnabledLanguage)) {
      yield put(setPreference({ key: SELECTED_LOCALE, value: lang }));
      setHTMLLang(lang);
      log(
        `saved proposed locale ${lang} to preferences service as selected locale`,
      );
      if (!i18n.hasResourceBundle(lang, DEFAULT_NAMESPACE) || !isSelLang) {
        log(`loading proposed locale ${lang}`);
        loadLanguage(lang);
      } else {
        log(`proposed locale ${lang} is already selected`);
      }

      // Write to localStorage for bootstrap
      if (!isBootstrapLang) {
        setStorage(storage, SELECTED_LOCALE, lang);
        log(
          `saved proposed locale ${lang} to localStorage as bootstrap locale`,
        );
      }

      // Ensure ducks properly set no matter what
      yield put(actions.changeLanguageSuccess(lang));
    } else {
      log(
        `proposed locale ${lang} is not allowed, switching locale to ${DEFAULT_LOCALE}`,
      );
      yield put(actions.changeLanguage(DEFAULT_LOCALE));
    }
  } catch (err) {
    log(`could not set locale to ${lang}`, err);
    yield put(actions.changeLanguageFailed(err));
  }
}

export function* setLanguagePreference() {
  let lang = yield select(getUserPreference, SELECTED_LOCALE);
  if (lang) {
    log(`found locale ${lang} in user preferences`);
  } else {
    lang = get(i18n, 'language', DEFAULT_LOCALE);
    log(
      `no locale found in user preferences, will try currently selected or default locale ${lang}`,
    );
  }
  yield put(actions.changeLanguage(lang));
}

function* watchForChangeLanguage() {
  yield takeEvery(types.CHANGE_LANGUAGE, setLanguage);
}

function* watchForPreferencesLoad() {
  yield takeEvery(RECEIVE_ALL_USER_PREFERENCES, setLanguagePreference);
}

export default function* i18nSaga() {
  yield all([watchForChangeLanguage(), watchForPreferencesLoad()]);
}
