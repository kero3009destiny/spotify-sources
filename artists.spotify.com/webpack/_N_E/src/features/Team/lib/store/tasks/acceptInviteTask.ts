import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { PendingInviteState } from '../../model/PendingInvite';
import { acceptInvite, ExpiredTokenException } from '../../api/acceptInvite';
import { currentUserLoader } from '../../../../currentUser';
import { teamDetailsAndMembersLoader } from '../../api/teamDetailsAndMembersLoader';
import { manageableTeamsLoader } from '../../api/manageableTeamsLoader';
import { TeamType } from '../../model/Team';
import { assertUnreachable } from '../../util/assertUnreachable';
export var acceptInviteTask = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref, _ref2) {
    var pendingInvite, t, setPendingInvite, showSuccessBanner, goToHomePage, teamUri, teamType, teamId, teamName, successMessage;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pendingInvite = _ref.pendingInvite, t = _ref.t;
            setPendingInvite = _ref2.setPendingInvite, showSuccessBanner = _ref2.showSuccessBanner, goToHomePage = _ref2.goToHomePage;
            teamUri = pendingInvite.teamUri, teamType = pendingInvite.teamType, teamId = pendingInvite.teamId, teamName = pendingInvite.teamName;

            if (pendingInvite.submitError) {
              setPendingInvite(_objectSpread(_objectSpread({}, pendingInvite), {}, {
                submitError: null
              }));
            }

            _context.prev = 4;
            _context.next = 7;
            return acceptInvite(pendingInvite);

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](4);
            setPendingInvite(_objectSpread(_objectSpread({}, pendingInvite), {}, {
              state: _context.t0 instanceof ExpiredTokenException ? PendingInviteState.expired : pendingInvite.state,
              submitError: t('TEAM_ACCEPT_INVITE_GENERIC_ERROR', 'Something went wrong', 'Something went wrong')
            }));
            return _context.abrupt("return");

          case 13:
            // since the team member's details (firstName etc) may have updated when accepting the invite
            currentUserLoader.clear(0); // special case for god-mode

            teamDetailsAndMembersLoader.clear({
              teamUri: teamUri
            }); // since the teams the user can manage have now changed

            manageableTeamsLoader.clearAll();
            goToHomePage({
              team: {
                uri: teamUri,
                id: teamId,
                type: teamType
              },
              replace: true
            });

            successMessage = function () {
              switch (teamType) {
                case TeamType.artist:
                  return t('ACCEPT_INVITE_ARTIST_TEAM_WELCOME_MESSAGE', 'Welcome to {teamName}’s team!', 'Welcome to your new artist team.', {
                    teamName: teamName
                  });

                case TeamType.label:
                  return t('ACCEPT_INVITE_LABEL_TEAM_WELCOME_MESSAGE', 'Welcome to {teamName}!', 'Welcome to your new label team.', {
                    teamName: teamName
                  });

                default:
                  return assertUnreachable(teamType);
              }
            }();

            showSuccessBanner(successMessage, {
              dismissOnRouteChange: false
            });

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 9]]);
  }));

  return function acceptInviteTask(_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();