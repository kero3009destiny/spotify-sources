import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { createLoader } from '@spotify-internal/creator-data-loading';
import { MARKETPLACE_MGMT_API, webgateFetchJson } from '../../../../shared/lib/api';
import { AccessLevel } from '../model/AccessLevel';
import { toFullName } from '..';
import { teamDetailsAndMembersLoader } from './teamDetailsAndMembersLoader';

var teamMemberAccessLevel = function teamMemberAccessLevel(teamMembers, username) {
  var teamMemberWithAccess = teamMembers.find(function (teamMember) {
    return teamMember.status === 'active' && teamMember.username === username;
  });
  return teamMemberWithAccess ? teamMemberWithAccess.accessLevel : AccessLevel.Reader;
};

var serverResponseToTeamMember = function serverResponseToTeamMember(raw, username, accessLevel) {
  return {
    status: 'active',
    fullName: toFullName(raw.firstname, raw.lastname),
    businessEmail: raw.email,
    role: raw.role,
    company: raw.companyname,
    username: username,
    accessLevel: accessLevel,
    id: username
  };
};

export var teamMemberLoader = createLoader( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref) {
    var username, teamUri, webgateAddress, _yield$Promise$all, _yield$Promise$all2, members, serverDetails, accessLevel;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            username = _ref.username, teamUri = _ref.teamUri;
            webgateAddress = "".concat(MARKETPLACE_MGMT_API, "/v0/settings/organization/").concat(teamUri, "/member/").concat(username);
            _context.next = 4;
            return Promise.all([teamDetailsAndMembersLoader.load({
              teamUri: teamUri
            }), webgateFetchJson(webgateAddress)]);

          case 4:
            _yield$Promise$all = _context.sent;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
            members = _yield$Promise$all2[0].members;
            serverDetails = _yield$Promise$all2[1];
            accessLevel = teamMemberAccessLevel(members, username);
            return _context.abrupt("return", serverResponseToTeamMember(serverDetails, username, accessLevel));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}(), {
  cacheKeyFn: JSON.stringify
});