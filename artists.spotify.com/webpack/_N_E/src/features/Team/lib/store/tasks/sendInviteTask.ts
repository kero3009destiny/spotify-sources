import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
import { AlreadyInvitedError, sendInvite } from '../../api/sendInvite';
import { teamDetailsAndMembersLoader } from '../../api/teamDetailsAndMembersLoader';
var BANNER_ID = 'send-invite-task';
export var sendInviteTask = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref, _ref2) {
    var inviteDetails, team, t, goToTeamPage, showErrorBanner, showSuccessBanner, setCurrentTeamDetails, setCurrentTeamMembers;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            inviteDetails = _ref.inviteDetails, team = _ref.team, t = _ref.t;
            goToTeamPage = _ref2.goToTeamPage, showErrorBanner = _ref2.showErrorBanner, showSuccessBanner = _ref2.showSuccessBanner, setCurrentTeamDetails = _ref2.setCurrentTeamDetails, setCurrentTeamMembers = _ref2.setCurrentTeamMembers;
            _context.prev = 2;
            _context.next = 5;
            return sendInvite(team, inviteDetails);

          case 5:
            showSuccessBanner(t('TEAM_INVITE_SENT_SUCCESS_MESSAGE', 'Invitation sent to {teamMemberName}', 'The invitation was sent successfully', {
              teamMemberName: inviteDetails.fullName
            }), {
              id: BANNER_ID
            });
            goToTeamPage(team);
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](2);

            if (_context.t0 instanceof AlreadyInvitedError) {
              showErrorBanner(t('TEAM_INVITE_ERROR_MESSAGE_ALREADY_SENT', 'Invitation already sent to {businessEmail}', 'An error occurred because an invitation was already sent to this email address', {
                businessEmail: inviteDetails.businessEmail
              }), {
                id: BANNER_ID
              });
            } else {
              showErrorBanner(t('TEAM_INVITE_ERROR_MESSAGE_TRY_AGAIN', 'Something went wrong, please try again.', 'Something went wrong, please try again.'), {
                id: BANNER_ID
              });
            }

          case 12:
            teamDetailsAndMembersLoader.clear({
              teamUri: team.uri
            });
            teamDetailsAndMembersLoader.load({
              teamUri: team.uri
            }).then(function (result) {
              var teamMemberCount = result.members.filter(function (tm) {
                return tm.status === 'active';
              }).length;
              setCurrentTeamMembers(result.members, teamMemberCount);
              setCurrentTeamDetails(result);
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 9]]);
  }));

  return function sendInviteTask(_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();