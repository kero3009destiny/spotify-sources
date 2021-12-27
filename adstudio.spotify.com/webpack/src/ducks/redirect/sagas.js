import { replace as historyReplace } from 'react-router-redux';
import debug from 'debug';
import { window } from 'global';
import { all, call, put, take } from 'redux-saga/effects';

import * as actions from './actions';

import {
  getLocalStorage,
  getStorage,
  jsonParse,
  jsonStringify,
  removeStorage,
  setStorage,
} from 'utils/storageHelpers';

import * as types from './types';

const log = debug('sagas:redirect');

export const REDIRECT_KEY = 'redirect-url';

export function* handleStoreRedirect(redirect) {
  const redirectJSON = yield call(jsonStringify, redirect);

  if (!redirectJSON) {
    log('redirect values failed to serialize');
    return;
  }

  log('storing redirect URL and timer values');
  yield call(setStorage, getLocalStorage(), REDIRECT_KEY, redirectJSON);
}

export function* handleRedirect() {
  log('checking for redirect in storage');

  const redirectJson = yield call(getStorage, getLocalStorage(), REDIRECT_KEY);

  if (!redirectJson) {
    log('no redirect found in storage');
    log('redirecting to the homepage');
    yield put(historyReplace('/'));
    return;
  }

  const redirectObj = jsonParse(redirectJson);
  const { preserveUrlParams = false } = redirectObj;
  let { url } = redirectObj;

  if (!url) {
    log('url not found in redirect');
    return;
  }

  if (preserveUrlParams) {
    const newUrlParams = window.location.search;
    log(`copying current url params: ${newUrlParams}`);

    const [mainUrl, storedUrlParams] = url.split('?');
    if (storedUrlParams) {
      log(`dropping stored url params: ${storedUrlParams}`);
    }

    url = [mainUrl, newUrlParams].join('');
  }

  log(`redirecting to ${url}`);
  yield put(historyReplace(url));
}

export function* watchForRedirectStored() {
  const { payload } = yield take(types.STORE_REDIRECT_VALUES);
  yield handleStoreRedirect(payload);
}

export function* watchForRedirect() {
  yield take(types.REDIRECT_FROM_STORAGE);
  yield call(handleRedirect);
  yield put(actions.clearRedirectFromStorage());
}

export function* watchForRedirectCleared() {
  yield take(types.CLEAR_REDIRECT_FROM_STORAGE);
  log('clearing redirect from storage');
  yield call(removeStorage, getLocalStorage(), REDIRECT_KEY);
}

export default function* redirectSaga() {
  yield all([
    watchForRedirect(),
    watchForRedirectStored(),
    watchForRedirectCleared(),
  ]);
}
