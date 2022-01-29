import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { createLoader } from '@spotify-internal/creator-data-loading';
import { MARKETPLACE_MGMT_API, webgateFetchJson } from '../../../../shared/lib/api';
import { uriToMiniTeam } from '../util/uriToMiniTeam';
import { groupsToAccessLevel } from '../model/AccessLevel';

var isRawActiveTeamMember = function isRawActiveTeamMember(tm) {
  return !!tm.userName;
};

var rawActiveTeamMemberToTeamMember = function rawActiveTeamMemberToTeamMember(_ref) {
  var email = _ref.email,
      fullName = _ref.fullName,
      userName = _ref.userName,
      role = _ref.role,
      groups = _ref.groups,
      company = _ref.company;
  return {
    status: 'active',
    fullName: fullName,
    role: role,
    company: company,
    username: userName,
    businessEmail: email,
    accessLevel: groupsToAccessLevel(groups),
    id: userName
  };
};

var isRawInvitedTeamMember = function isRawInvitedTeamMember(tm) {
  return !!tm.inviteId && !!tm.inviteStatus;
};

var rawInvitedTeamMemberToTeamMember = function rawInvitedTeamMemberToTeamMember(_ref2) {
  var email = _ref2.email,
      fullName = _ref2.fullName,
      role = _ref2.role,
      groups = _ref2.groups,
      company = _ref2.company,
      inviteId = _ref2.inviteId,
      inviteStatus = _ref2.inviteStatus;
  return {
    status: function () {
      switch (inviteStatus) {
        case 'PENDING':
          return 'invited';

        case 'EXPIRED':
          return 'invite-expired';

        default:
          throw new Error("Unexpected value: ".concat(inviteStatus));
      }
    }(),
    fullName: fullName,
    role: role,
    company: company,
    inviteUuid: inviteId,
    accessLevel: groupsToAccessLevel(groups),
    businessEmail: email,
    id: inviteId
  };
};

var rawTeamMemberToTeamMember = function rawTeamMemberToTeamMember(tm) {
  if (isRawActiveTeamMember(tm)) {
    return rawActiveTeamMemberToTeamMember(tm);
  }

  if (isRawInvitedTeamMember(tm)) {
    return rawInvitedTeamMemberToTeamMember(tm);
  }

  throw new Error("Unexpected response: ".concat(JSON.stringify(tm)));
};

function rawTeamToTeam(_ref3) {
  var organization = _ref3.organization,
      members = _ref3.members;
  var convertedMembers = members.map(rawTeamMemberToTeamMember);
  return _objectSpread(_objectSpread({}, uriToMiniTeam(organization.uri)), {}, {
    name: organization.name,
    imageUrl: organization.imageUrl,
    members: convertedMembers
  });
}

export var teamDetailsAndMembersLoader = createLoader( /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref4) {
    var teamUri;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            teamUri = _ref4.teamUri;

            if (!(teamUri === null)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", null);

          case 3:
            return _context.abrupt("return", webgateFetchJson("".concat(MARKETPLACE_MGMT_API, "/v1/organization/").concat(teamUri, "?product=S4A")).then(function (response) {
              return rawTeamToTeam(response);
            }).catch(function (error) {
              return error;
            }));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref5.apply(this, arguments);
  };
}(), {
  cacheKeyFn: JSON.stringify
});