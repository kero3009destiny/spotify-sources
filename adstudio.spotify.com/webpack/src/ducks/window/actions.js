import * as types from './types';

export function documentVisibilityUpdate(isDocumentVisible) {
  return {
    type: types.DOCUMENT_VISIBILITY_UPDATE,
    payload: isDocumentVisible,
  };
}

export function scrollTo(x, y) {
  return {
    type: types.SCROLL_TO,
    payload: [x, y],
  };
}

export function triggerHardRedirect(url) {
  return {
    type: types.HARD_REDIRECT_TRIGGERED,
    payload: url,
  };
}

export function triggerHardReload() {
  return triggerHardRedirect(window.location.href);
}
