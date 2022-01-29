import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
import { removeTeamMember } from '../../api/removeTeamMember';
import { manageableTeamsLoader } from '../../api/manageableTeamsLoader';
var BANNER_ID = 'remove-team-member-task';
export var removeTeamMemberTask = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref, _ref2) {
    var teamMember, team, t, teamMemberIsCurrentUser, optimisticallyCreateTeamMember, optimisticallyDeleteTeamMember, optimisticallyDeleteTeam, showErrorBanner, showSuccessBanner, showInformationBanner, goToTeamPage, goToTeamsPage;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            teamMember = _ref.teamMember, team = _ref.team, t = _ref.t, teamMemberIsCurrentUser = _ref.teamMemberIsCurrentUser;
            optimisticallyCreateTeamMember = _ref2.optimisticallyCreateTeamMember, optimisticallyDeleteTeamMember = _ref2.optimisticallyDeleteTeamMember, optimisticallyDeleteTeam = _ref2.optimisticallyDeleteTeam, showErrorBanner = _ref2.showErrorBanner, showSuccessBanner = _ref2.showSuccessBanner, showInformationBanner = _ref2.showInformationBanner, goToTeamPage = _ref2.goToTeamPage, goToTeamsPage = _ref2.goToTeamsPage;
            optimisticallyDeleteTeamMember(teamMember === null || teamMember === void 0 ? void 0 : teamMember.id);
            goToTeamPage(team);
            _context.prev = 4;
            showInformationBanner(t('TEAM_MEMBER_REMOVAL_PROGRESS_MESSAGE', 'Removing {teamMemberName}...', 'This is a loading message that shows when a user is removed from the team.', {
              teamMemberName: teamMember === null || teamMember === void 0 ? void 0 : teamMember.fullName
            }), {
              id: BANNER_ID,
              showDismissButton: false
            });
            _context.next = 8;
            return removeTeamMember(team.uri, teamMember.username).then(function () {
              if (teamMemberIsCurrentUser) {
                manageableTeamsLoader.clearAll();
                optimisticallyDeleteTeam(team.uri);
                goToTeamsPage({
                  replace: true
                });
              } else {
                showSuccessBanner(t('TEAM_MEMBER_REMOVAL_SUCCESS_MESSAGE', 'You removed {teamMemberName}.', 'You removed this team member from the team.', {
                  teamMemberName: teamMember === null || teamMember === void 0 ? void 0 : teamMember.fullName
                }), {
                  id: BANNER_ID
                });
              }
            });

          case 8:
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](4);
            showErrorBanner(t('TEAM_GENERIC_ERROR_MESSAGE', 'Something went wrong.', 'Something went wrong.'), {
              id: BANNER_ID
            });
            optimisticallyCreateTeamMember(teamMember);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 10]]);
  }));

  return function removeTeamMemberTask(_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();