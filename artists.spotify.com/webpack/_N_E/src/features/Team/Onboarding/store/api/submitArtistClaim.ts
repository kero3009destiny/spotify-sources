import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { ONBOARDING_API } from '../../../../../shared/lib/api';
import { webgateFetchWithError } from '../../../lib/util/webgateFetchJsonWithError';
export var submitArtistClaim = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(caseId, businessEmail, token) {
    var response;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return webgateFetchWithError("".concat(ONBOARDING_API, "/v1/access/request/").concat(caseId, "/submit?emailVerificationCode=").concat(token, "&businessEmail=").concat(encodeURIComponent(businessEmail)), {
              method: 'POST'
            });

          case 2:
            response = _context.sent;
            return _context.abrupt("return", response.submissionStatus);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function submitArtistClaim(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();