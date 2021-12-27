import * as types from './types';

export function detectAdBlocker(adBlockerDetected) {
  return {
    type: types.DETECT_AD_BLOCKER,
    payload: adBlockerDetected,
  };
}
