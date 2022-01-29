// ignore-string-externalization
import { toMediaInfo } from './toMediaInfo';

var isUriOrUrl = function isUriOrUrl(inputText) {
  return inputText.includes('open.spotify.com/track/') || inputText.includes('spotify:track:') || inputText.includes('open.spotify.com/album/') || inputText.includes('spotify:album:');
};

export var selectedMediaIsInvalid = function selectedMediaIsInvalid(selectedMedia) {
  return !selectedMedia || selectedMedia.uri === '' || !isUriOrUrl(selectedMedia.uri) || !toMediaInfo(selectedMedia.uri);
};