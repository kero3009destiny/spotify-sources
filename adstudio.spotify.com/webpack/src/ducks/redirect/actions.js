import { window } from 'global';
import moment from 'moment';

import * as types from './types';

export function setRedirecting(payload) {
  return {
    type: types.SET_REDIRECTING,
    payload,
  };
}

export function storeRedirectValues({
  url = window.location.href.replace(window.location.origin, ''),
  timeout = moment()
    .add(1, 'day')
    .valueOf(),
  preserveUrlParams = false,
} = {}) {
  return {
    type: types.STORE_REDIRECT_VALUES,
    payload: {
      url,
      timeout,
      preserveUrlParams,
    },
  };
}

export function redirectFromStorage() {
  return {
    type: types.REDIRECT_FROM_STORAGE,
  };
}

export function clearRedirectFromStorage() {
  return {
    type: types.CLEAR_REDIRECT_FROM_STORAGE,
  };
}
