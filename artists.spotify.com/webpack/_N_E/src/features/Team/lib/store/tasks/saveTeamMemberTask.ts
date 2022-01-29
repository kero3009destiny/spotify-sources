import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
import { saveTeamMemberDetails } from '../../api/saveTeamMemberDetails';
var BANNER_ID = 'save-team-member-task';
export var saveTeamMemberTask = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref, _ref2) {
    var team, oldDetails, newDetails, isCurrentUser, t, optimisticallyUpdateTeamMember, showErrorBanner, showSuccessBanner;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            team = _ref.team, oldDetails = _ref.oldDetails, newDetails = _ref.newDetails, isCurrentUser = _ref.isCurrentUser, t = _ref.t;
            optimisticallyUpdateTeamMember = _ref2.optimisticallyUpdateTeamMember, showErrorBanner = _ref2.showErrorBanner, showSuccessBanner = _ref2.showSuccessBanner;
            _context.prev = 2;
            _context.next = 5;
            return saveTeamMemberDetails(team.uri, newDetails, oldDetails, isCurrentUser);

          case 5:
            optimisticallyUpdateTeamMember(oldDetails.id, newDetails);
            showSuccessBanner(t('TEAM_MEMBER_DETAILS_UPDATED_SUCCESS_MESSAGE', 'Details updated', "This team member's details have been successfully updated."), {
              id: BANNER_ID
            });
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](2);
            showErrorBanner(t('TEAM_GENERIC_ERROR_MESSAGE', 'Something went wrong.', 'Something went wrong.'), {
              id: BANNER_ID
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 9]]);
  }));

  return function saveTeamMemberTask(_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();