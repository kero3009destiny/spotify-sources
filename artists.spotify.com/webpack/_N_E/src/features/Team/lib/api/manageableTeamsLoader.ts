import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { createLoader } from '@spotify-internal/creator-data-loading';
import { assertTeamType } from '../model/Team';
import { MARKETPLACE_MGMT_API, webgateFetchJson } from '../../../../shared/lib/api';

function formatTeam(team) {
  return _objectSpread({
    id: team.uri.split(':')[2],
    type: assertTeamType(team.uri.split(':')[1])
  }, team);
}

export function filterTeams(teams) {
  return teams.filter(function (team) {
    return team.uri.split(':')[1] === 'artist' || team.uri.split(':')[1] === 'label';
  });
}
export var manageableTeamsLoader = createLoader(function () {
  return webgateFetchJson("".concat(MARKETPLACE_MGMT_API, "/v1/team/manageteam")).then(function (teams) {
    return filterTeams(teams).map(formatTeam);
  });
});