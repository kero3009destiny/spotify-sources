// ignore-string-externalization
var LOCAL_STORAGE_TOKEN_KEY = 'team::artist-access::token';
export var getStoredToken = function getStoredToken(trackEvent, caseId) {
  if (!window.localStorage) {
    // browser does not support local storage
    trackEvent({
      action_target: 'artist-access:social-verification-page',
      action_type: 'artist-access:social-verification-page-load',
      action_intent: 'artist-access:get-stored-token',
      action_meta_str_1: 'browser-does-not-support-local-storage',
      action_meta_str_2: "case-id:".concat(caseId)
    });
    return undefined;
  }

  var maybeRawJson = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

  if (!maybeRawJson) {
    // there is no state in local storage
    trackEvent({
      action_target: 'artist-access:social-verification-page',
      action_type: 'artist-access:social-verification-page-load',
      action_intent: 'artist-access:get-stored-token',
      action_meta_str_1: 'there-is-no-stored-token',
      action_meta_str_2: "case-id:".concat(caseId)
    });
    return undefined;
  }

  try {
    return JSON.parse(maybeRawJson);
  } catch (e) {
    // there was a parsing error
    trackEvent({
      action_target: 'artist-access:social-verification-page',
      action_type: 'artist-access:social-verification-page-load',
      action_intent: 'artist-access:get-stored-token',
      action_meta_str_1: 'there-was-a-parsing-error',
      action_meta_str_2: "case-id:".concat(caseId)
    });
    return undefined;
  }
};
export var storeToken = function storeToken(token) {
  if (!window.localStorage) {
    // browser does not support local storage
    return;
  }

  window.localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(token));
};
export var clearStoredToken = function clearStoredToken() {
  if (!window.localStorage) {
    // browser does not support local storage
    return;
  }

  window.localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
};