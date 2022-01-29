import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { createLoader } from '@spotify-internal/creator-data-loading';
import { webgateFetchJson } from '@mrkt/features/webgate-fetch';
import { MARKETPLACE_MGMT_API } from '../../../../shared/lib/api';
import { Logger } from '@mrkt/features/Platform';

var toUrl = function toUrl(params) {
  return "".concat(params.artistUri, "/").concat(params.labelUri);
};

export var artistTeamMembersLoader = createLoader( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(params) {
    var response;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return webgateFetchJson("".concat(MARKETPLACE_MGMT_API, "/v1/organization/").concat(toUrl(params), "/simplemembers "));

          case 3:
            response = _context.sent;
            return _context.abrupt("return", response.members);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            Logger.logError('artist-team-transparency', _context.t0);
            throw new Error(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}(), {
  cacheKeyFn: function cacheKeyFn(params) {
    return toUrl(params);
  }
});