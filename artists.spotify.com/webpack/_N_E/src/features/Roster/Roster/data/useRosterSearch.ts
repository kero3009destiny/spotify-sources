import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { createSwrHook } from '@spotify-internal/creator-data-loading';
import { webgateFetch, WEBGATE_DOMAIN } from '@mrkt/features/webgate-fetch';
import { logRosterPrimerFailure } from '../logging/sloLogger';
var ROSTER_URL = "".concat(WEBGATE_DOMAIN, "/roster-view-service/v1/artists"); // The ordering of these params matters!
// To cache hit when preloading, ensure that useRosterSearchParams
// and this object have defined their keys in the same order top to bottom.
// Oh! the Perils of JSON.stringify() as a cache key...

var initialParams = {
  limit: 20,
  offset: 0
};

var _createSwrHook = createSwrHook( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(params) {
    var offset, response;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            offset = params.offset;
            _context.next = 3;
            return webgateFetch("".concat(ROSTER_URL, "?offset=").concat(offset));

          case 3:
            response = _context.sent;

            if (!(response.status === 200)) {
              _context.next = 10;
              break;
            }

            _context.t0 = Date.now();
            _context.next = 8;
            return response.json();

          case 8:
            _context.t1 = _context.sent;
            return _context.abrupt("return", {
              status: 'success',
              requestTime: _context.t0,
              payload: _context.t1
            });

          case 10:
            if (!(response.status === 403)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", {
              status: 'forbidden'
            });

          case 12:
            return _context.abrupt("return", {
              status: 'unknown'
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}(), {
  shouldRetryOnError: false
}),
    _createSwrHook2 = _slicedToArray(_createSwrHook, 2),
    useGetRosterData = _createSwrHook2[0],
    preloadRosterData = _createSwrHook2[1];

export function useRosterSearch() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialParams;
  return useGetRosterData(params);
} // ensure that this only gets called once ever.

var hasBeenInvoked = false;
export function primeInitialPage() {
  return _primeInitialPage.apply(this, arguments);
}

function _primeInitialPage() {
  _primeInitialPage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!hasBeenInvoked) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return");

          case 2:
            hasBeenInvoked = true;
            _context2.prev = 3;
            _context2.next = 6;
            return preloadRosterData(initialParams);

          case 6:
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](3);
            logRosterPrimerFailure(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 8]]);
  }));
  return _primeInitialPage.apply(this, arguments);
}