// ignore-string-externalization
var SESSION_STORAGE_REQUEST_ID_KEY = 'team::add-team::request-id';
var SESSION_STORAGE_ARTIST_INFO_KEY = 'team::add-team::artist-info';
export var getStoredRequestId = function getStoredRequestId() {
  if (!window.sessionStorage) {
    // browser does not support session storage
    return undefined;
  }

  var maybeRawJson = window.sessionStorage.getItem(SESSION_STORAGE_REQUEST_ID_KEY);

  if (!maybeRawJson) {
    // there is no state in session storage
    return undefined;
  }

  try {
    return JSON.parse(maybeRawJson);
  } catch (e) {
    // there was a parsing error
    return undefined;
  }
};
export var storeRequestId = function storeRequestId(requestId) {
  if (!window.sessionStorage) {
    // browser does not support session storage
    return;
  }

  window.sessionStorage.setItem(SESSION_STORAGE_REQUEST_ID_KEY, JSON.stringify(requestId));
};
export var clearStoredRequestId = function clearStoredRequestId() {
  if (!window.sessionStorage) {
    // browser does not support session storage
    return;
  }

  window.sessionStorage.removeItem(SESSION_STORAGE_REQUEST_ID_KEY);
};
export var getStoredArtistInfo = function getStoredArtistInfo() {
  if (!window.sessionStorage) {
    // browser does not support session storage
    return {
      artistName: undefined,
      artistImageUrl: undefined
    };
  }

  var maybeRawJson = window.sessionStorage.getItem(SESSION_STORAGE_ARTIST_INFO_KEY);

  if (!maybeRawJson) {
    // there is no state in session storage
    return {
      artistName: undefined,
      artistImageUrl: undefined
    };
  }

  try {
    return JSON.parse(maybeRawJson);
  } catch (e) {
    // there was a parsing error
    return {
      artistName: undefined,
      artistImageUrl: undefined
    };
  }
};
export var storeArtistInfo = function storeArtistInfo(artistInfo) {
  if (!window.sessionStorage) {
    // browser does not support session storage
    return;
  }

  window.sessionStorage.setItem(SESSION_STORAGE_ARTIST_INFO_KEY, JSON.stringify(artistInfo));
};
export var clearStoredArtistInfo = function clearStoredArtistInfo() {
  if (!window.sessionStorage) {
    // browser does not support session storage
    return;
  }

  window.sessionStorage.removeItem(SESSION_STORAGE_ARTIST_INFO_KEY);
};