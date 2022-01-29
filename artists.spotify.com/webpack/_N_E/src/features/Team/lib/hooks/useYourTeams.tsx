import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { useQuery } from 'react-query';
import { MARKETPLACE_MGMT_API, webgateFetchJson } from '../../../../shared/lib/api';
import { assertAccessLevel, assertTeamType } from '../model/Team';

function formatTeam(team) {
  return {
    uri: team.uri,
    name: team.name,
    imageUrl: team.imageUrl,
    id: team.uri.split(':')[2],
    type: assertTeamType(team.uri.split(':')[1]),
    group: assertAccessLevel(team.group),
    adminFullNames: team.adminFullNames
  };
}

export function filterTeams(teams) {
  return teams.filter(function (team) {
    return (team.uri.split(':')[1] === 'artist' || team.uri.split(':')[1] === 'label') && team.uri.split(':')[2] !== '*';
  });
}
export var useYourTeams = function useYourTeams() {
  return useQuery('yourTeams', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var response;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return webgateFetchJson("".concat(MARKETPLACE_MGMT_API, "/v1/team/yourteams"));

          case 2:
            response = _context.sent;
            return _context.abrupt("return", filterTeams(response).map(formatTeam));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
};