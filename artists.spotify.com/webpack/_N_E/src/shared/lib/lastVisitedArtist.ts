// ignore-string-externalization
import storage from 'local-storage-fallback';

var createKey = function createKey(username) {
  return "".concat(username, ":lastVisitedArtist");
};

export var getLastVisitedArtist = function getLastVisitedArtist(username) {
  return storage.getItem(createKey(username));
};
export var setLastVisitedArtist = function setLastVisitedArtist(username, artistId) {
  return storage.setItem(createKey(username), artistId);
};