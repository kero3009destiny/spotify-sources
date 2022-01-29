import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
// ARTIST CLAIM: POST `${ONBOARDING_API}/v0/access/request/${requestId}/submit`
// JOIN: PUT  https://generic.wg.spotify.com/s4a-onboarding/v0/access/team/preverified
// CREATE LABEL: POST  https://generic.wg.spotify.com/s4a-onboarding/v0/access/team/preverified
import { submitJoinOrCreateRequest } from '../api/submitJoinOrCreateRequest';
import { submitClaimRequest } from '../api/submitClaimRequest';
import { getStoredRequestId } from '../../utils/stateStorage';
import { SPOTIFY_SYNTHETIC_TESTER_ROLE } from '../../../components/TeamMemberDetailsForm/TeamMemberDetails';
var BANNER_ID = 'submit-add-team-flow-details';
export var submitAddTeamsRequestTask = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref, _ref2) {
    var details, currentUserDetails, teamType, history, continueUrl, hideBanner, setRequestSubmissionError, requestId, res;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            details = _ref.details, currentUserDetails = _ref.currentUserDetails, teamType = _ref.teamType, history = _ref.history, continueUrl = _ref.continueUrl;
            hideBanner = _ref2.hideBanner, setRequestSubmissionError = _ref2.setRequestSubmissionError;
            requestId = getStoredRequestId();
            hideBanner(BANNER_ID);

            if (!(details.role === SPOTIFY_SYNTHETIC_TESTER_ROLE)) {
              _context.next = 7;
              break;
            }

            history.push(continueUrl);
            return _context.abrupt("return");

          case 7:
            if (!requestId) {
              _context.next = 13;
              break;
            }

            _context.next = 10;
            return submitClaimRequest(requestId, details);

          case 10:
            _context.t0 = _context.sent;
            _context.next = 16;
            break;

          case 13:
            _context.next = 15;
            return submitJoinOrCreateRequest(details, currentUserDetails, teamType);

          case 15:
            _context.t0 = _context.sent;

          case 16:
            res = _context.t0;

            if (!(res instanceof Response && !res.ok)) {
              _context.next = 20;
              break;
            }

            if (res.status === 409) {
              setRequestSubmissionError('You have a pending request to join this team.');
            } else {
              setRequestSubmissionError('Something went wrong.');
            }

            return _context.abrupt("return");

          case 20:
            history.push(continueUrl);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function submitAddTeamsRequestTask(_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();