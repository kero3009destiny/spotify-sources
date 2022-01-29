import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { MARKETPLACE_MGMT_API, webgateFetch } from '../../../../shared/lib/api';
import { getNames } from '..';
import { teamMemberLoader } from './teamMemberLoader';
import { currentUserSettingsResource } from '../../../UserSettings/lib/resources';
import { teamDetailsAndMembersLoader } from './teamDetailsAndMembersLoader';

var saveCompanyAndRole = function saveCompanyAndRole(teamUri, details) {
  return webgateFetch("".concat(MARKETPLACE_MGMT_API, "/v0/settings/organization/").concat(teamUri, "/member/").concat(details.username), {
    method: 'PATCH',
    body: JSON.stringify({
      companyname: details.company,
      role: details.role
    })
  });
};

var saveNameAndEmail = function saveNameAndEmail(details) {
  var _getNames = getNames(details.fullName),
      firstName = _getNames.firstName,
      lastName = _getNames.lastName;

  return webgateFetch("".concat(MARKETPLACE_MGMT_API, "/v0/settings/"), {
    method: 'PATCH',
    body: JSON.stringify({
      email: details.businessEmail,
      firstname: firstName,
      lastname: lastName
    })
  });
};

var saveAccessLevel = function saveAccessLevel(teamUri, details, oldGroup, newGroup) {
  return webgateFetch("".concat(MARKETPLACE_MGMT_API, "/v0/team/organization/").concat(teamUri, "/member/").concat(details.username, "/group"), {
    method: 'PATCH',
    body: JSON.stringify({
      oldGroup: oldGroup,
      newGroup: newGroup
    })
  });
};

export var saveTeamMemberDetails = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(teamUri, newDetails, oldDetails, teamMemberIsCurrentUser) {
    var companyAndRolePromise, accessLevelPromise, detailsPromise, _yield$Promise$all, _yield$Promise$all2, companyAndRoleOk, accessLevelOk, detailsOk;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            teamDetailsAndMembersLoader.clear({
              teamUri: teamUri
            });
            companyAndRolePromise = oldDetails.role !== newDetails.role || oldDetails.company !== newDetails.company ? saveCompanyAndRole(teamUri, newDetails) : Promise.resolve({
              ok: true
            });
            accessLevelPromise = newDetails.accessLevel !== oldDetails.accessLevel ? saveAccessLevel(teamUri, newDetails, oldDetails.accessLevel, newDetails.accessLevel) : Promise.resolve({
              ok: true
            });
            detailsPromise = teamMemberIsCurrentUser && (oldDetails.fullName !== newDetails.fullName || oldDetails.businessEmail !== newDetails.businessEmail) ? saveNameAndEmail(newDetails) : Promise.resolve({
              ok: true
            });
            _context.next = 6;
            return Promise.all([companyAndRolePromise.catch(function () {
              return {
                ok: false
              };
            }), accessLevelPromise.catch(function () {
              return {
                ok: false
              };
            }), detailsPromise.catch(function () {
              return {
                ok: false
              };
            })]);

          case 6:
            _yield$Promise$all = _context.sent;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
            companyAndRoleOk = _yield$Promise$all2[0].ok;
            accessLevelOk = _yield$Promise$all2[1].ok;
            detailsOk = _yield$Promise$all2[2].ok;

            if (companyAndRoleOk && accessLevelOk && detailsOk) {
              _context.next = 13;
              break;
            }

            throw new Error('Something went wrong.');

          case 13:
            teamMemberLoader.clear({
              username: newDetails.username,
              teamUri: teamUri
            });

            if (teamMemberIsCurrentUser) {
              currentUserSettingsResource.invalidate();
            }

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function saveTeamMemberDetails(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();