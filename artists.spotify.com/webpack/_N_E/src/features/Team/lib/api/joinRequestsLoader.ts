import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { createLoader } from '@spotify-internal/creator-data-loading';
import { JoinRequestRejectionReason } from '../model/JoinRequest';
import { webgateFetchJson } from '@mrkt/features/webgate-fetch';
import { MARKETPLACE_MGMT_API } from '../../../../shared/lib/api';

var rawJoinRequestToJoinRequest = function rawJoinRequestToJoinRequest(_ref) {
  var accessRequestId = _ref.accessRequestId,
      company = _ref.company,
      email = _ref.email,
      fullName = _ref.fullName,
      role = _ref.role,
      status = _ref.status,
      createdAt = _ref.createdAt;
  return {
    status: status,
    fullName: fullName,
    role: role,
    company: company,
    accessLevel: null,
    businessEmail: email,
    id: accessRequestId,
    timestamp: new Date(createdAt),
    rejectionReason: JoinRequestRejectionReason.NO_REASON_SELECTED
  };
};

var rawResponseToResponse = function rawResponseToResponse(_ref2) {
  var accessRequests = _ref2.accessRequests,
      nextPageToken = _ref2.nextPageToken;
  var convertedPendingRequests = accessRequests.map(rawJoinRequestToJoinRequest);
  return {
    accessRequests: convertedPendingRequests,
    nextPageToken: nextPageToken
  };
};

export var joinRequestsLoader = createLoader( /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref3) {
    var teamUri;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            teamUri = _ref3.teamUri;
            return _context.abrupt("return", webgateFetchJson("".concat(MARKETPLACE_MGMT_API, "/v0/organization/").concat(teamUri, "/accessRequest?statusFilter=PENDING")).then(function (response) {
              return rawResponseToResponse(response);
            }).catch(function (error) {
              return error;
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref4.apply(this, arguments);
  };
}());