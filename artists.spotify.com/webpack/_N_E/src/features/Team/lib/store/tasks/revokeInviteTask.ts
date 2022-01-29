import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
import { revokeInvite } from '../../api/revokeInvite';
var BANNER_ID = 'revoke-invite-task';
export var revokeInviteTask = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref, _ref2) {
    var teamMember, team, t, optimisticallyCreateTeamMember, optimisticallyDeleteTeamMember, showErrorBanner, showSuccessBanner, showInformationBanner, _ref4, _ref5, pendingMessage, successMessage;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            teamMember = _ref.teamMember, team = _ref.team, t = _ref.t;
            optimisticallyCreateTeamMember = _ref2.optimisticallyCreateTeamMember, optimisticallyDeleteTeamMember = _ref2.optimisticallyDeleteTeamMember, showErrorBanner = _ref2.showErrorBanner, showSuccessBanner = _ref2.showSuccessBanner, showInformationBanner = _ref2.showInformationBanner;
            _ref4 = teamMember.status === 'invited' ? [t('TEAM_INVITE_CANCELLATION_PROGRESS_MESSAGE', 'Cancelling invitation to {teamMemberName}...', 'This is a loading message that shows when an invitation is cancelled.', {
              teamMemberName: teamMember.fullName
            }), t('TEAM_INVITE_CANCELLATION_SUCCESS_MESSAGE', 'Invitation to {teamMemberName} cancelled', 'You have successfully cancelled this invitation.', {
              teamMemberName: teamMember.fullName
            })] : [t('TEAM_CLEAR_INVITE_PROGRESS_MESSAGE', 'Clearing invitation to {teamMemberName}...', 'This is a loading message that shows when an invitation is cleared.', {
              teamMemberName: teamMember.fullName
            }), t('TEAM_CLEAR_INVITE_SUCCESS_MESSAGE', 'Invitation to {teamMemberName} cleared', 'You have successfully cleared this invitation.', {
              teamMemberName: teamMember.fullName
            })], _ref5 = _slicedToArray(_ref4, 2), pendingMessage = _ref5[0], successMessage = _ref5[1];
            optimisticallyDeleteTeamMember(teamMember.id);
            showInformationBanner(pendingMessage, {
              id: BANNER_ID,
              showDismissButton: false
            });
            _context.prev = 5;
            _context.next = 8;
            return revokeInvite(team.uri, teamMember.inviteUuid);

          case 8:
            showSuccessBanner(successMessage, {
              id: BANNER_ID
            });
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](5);
            showErrorBanner(t('TEAM_GENERIC_ERROR_MESSAGE', 'Something went wrong.', 'Something went wrong.'), {
              id: BANNER_ID
            });
            optimisticallyCreateTeamMember(teamMember);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 11]]);
  }));

  return function revokeInviteTask(_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();