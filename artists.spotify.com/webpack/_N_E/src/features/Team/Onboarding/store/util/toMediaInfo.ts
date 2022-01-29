import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
import { MEDIA_ID_LENGTH } from './constants';
import { assertMediaType } from '../models';

var isComplete = function isComplete(id) {
  return id.length === MEDIA_ID_LENGTH;
};

export var toMediaInfo = function toMediaInfo(mediaUriOrLink) {
  var _mediaUriOrLink$split = mediaUriOrLink.split(':'),
      _mediaUriOrLink$split2 = _slicedToArray(_mediaUriOrLink$split, 3),
      domain = _mediaUriOrLink$split2[0],
      type = _mediaUriOrLink$split2[1],
      id = _mediaUriOrLink$split2[2];

  var isUri = id && domain === 'spotify' && (type === 'track' || type === 'album');

  if (isUri && isComplete(id)) {
    return {
      type: assertMediaType(type),
      id: id
    };
  }

  var idRegexMatch = mediaUriOrLink.match(/^https?:\/\/open\.spotify\.com\/(track|album)\/([\w\d]+)/);

  if (idRegexMatch && isComplete(idRegexMatch[2])) {
    return {
      type: assertMediaType(idRegexMatch[1]),
      id: idRegexMatch[2]
    };
  }

  return null;
};