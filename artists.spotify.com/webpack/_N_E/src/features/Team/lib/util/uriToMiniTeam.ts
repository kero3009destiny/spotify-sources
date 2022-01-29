import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
import { isTeamType } from '../model/Team';
export var uriToMiniTeam = function uriToMiniTeam(uri) {
  var _uri$split = uri.split(':'),
      _uri$split2 = _slicedToArray(_uri$split, 3),
      domain = _uri$split2[0],
      type = _uri$split2[1],
      id = _uri$split2[2];

  if (!type || !id || domain !== 'spotify' || !isTeamType(type)) {
    return null;
  }

  return {
    uri: uri,
    type: type,
    id: id
  };
};
export var uriToMiniTeamOrThrow = function uriToMiniTeamOrThrow(uri) {
  var candidate = uriToMiniTeam(uri);

  if (!candidate) {
    throw new Error("Could not parse team uri: ".concat(uri));
  }

  return candidate;
};