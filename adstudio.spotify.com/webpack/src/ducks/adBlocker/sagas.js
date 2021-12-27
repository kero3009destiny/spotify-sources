import debug from 'debug';
import { all, call, put } from 'redux-saga/effects';

import { detectAdBlocker } from './actions';

const log = debug('sagas:adblocker');

// lazy-loaded import to defer loading this until we need it
export const fetchAdblockDetector = () =>
  import(/* webpackChunkName: "adblock" */ 'vendor/adblockDetector');

export function initAdblockDetector(adblockDetector) {
  log('using adblockDetector to determine adblocker status');
  return new Promise(resolve => adblockDetector.init({ complete: resolve }));
}

export function* loadAdBlockDetector() {
  log('loading adblock detector module');
  const adblockDetector = yield call(fetchAdblockDetector);
  const adBlockerDetected = yield call(initAdblockDetector, adblockDetector);
  log('adBlockerDetected result received', adBlockerDetected);
  yield put(detectAdBlocker(adBlockerDetected));
}

export default function* adBlockerSaga() {
  yield all([loadAdBlockDetector()]);
}
