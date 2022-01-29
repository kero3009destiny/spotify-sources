import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { JoinRequestStatusType } from '../../model/JoinRequest';
import { removeJoinRequestApi } from '../../api/removeJoinRequestApi';
var BANNER_ID = 'remove-join-request-task';
export var removeJoinRequestTask = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref, _ref2) {
    var joinRequest, team, t, setJoinRequestStatus, optimisticallyCreateJoinRequest, optimisticallyDeleteJoinRequest, showErrorBanner, showSuccessBanner, showInformationBanner, trackEvent;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            joinRequest = _ref.joinRequest, team = _ref.team, t = _ref.t;
            setJoinRequestStatus = _ref2.setJoinRequestStatus, optimisticallyCreateJoinRequest = _ref2.optimisticallyCreateJoinRequest, optimisticallyDeleteJoinRequest = _ref2.optimisticallyDeleteJoinRequest, showErrorBanner = _ref2.showErrorBanner, showSuccessBanner = _ref2.showSuccessBanner, showInformationBanner = _ref2.showInformationBanner, trackEvent = _ref2.trackEvent;
            setJoinRequestStatus(joinRequest, JoinRequestStatusType.REJECTED);
            optimisticallyDeleteJoinRequest(joinRequest.id);
            trackEvent({
              action_target: 'join-flow:deny-request-button',
              action_type: 'join-flow:click',
              action_intent: 'join-flow:deny-request',
              action_meta_str_1: "rejection-reason:".concat(joinRequest.rejectionReason)
            });
            _context.prev = 5;
            showInformationBanner(t('JOIN_REQUEST_REJECTION_PROGRESS_MESSAGE', 'Removing {teamMemberName}...', 'This is a loading message that shows when a user is denied access to the team.', {
              teamMemberName: joinRequest.fullName
            }), {
              id: BANNER_ID,
              showDismissButton: false
            });
            _context.next = 9;
            return removeJoinRequestApi(joinRequest, team);

          case 9:
            showSuccessBanner(t('JOIN_REQUEST_REJECTION_SUCCESS_MESSAGE', '{teamMemberName} denied access to {teamName}.', 'This user was denied access to the team.', {
              teamMemberName: joinRequest.fullName,
              teamName: team.name
            }), {
              id: BANNER_ID
            });
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](5);
            showErrorBanner(t('JOIN_REQUEST_GENERIC_ERROR_MESSAGE', 'Something went wrong.', 'Something went wrong.'), {
              id: BANNER_ID
            });
            optimisticallyCreateJoinRequest(joinRequest);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 12]]);
  }));

  return function removeJoinRequestTask(_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();