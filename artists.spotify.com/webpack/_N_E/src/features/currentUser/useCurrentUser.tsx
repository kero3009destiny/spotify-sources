import _defineProperty from "/var/jenkins_home/workspace/tingle.3b6a912d-4d0a-4635-8445-e49fdb128ace/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.3b6a912d-4d0a-4635-8445-e49fdb128ace/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.3b6a912d-4d0a-4635-8445-e49fdb128ace/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { createLoader, useRead } from '@spotify-internal/creator-data-loading';
import { Logger } from '@mrkt/features/Platform';
import { webgateFetch, WEBGATE_DOMAIN } from '../../shared/lib/api';
import { withHooks } from '@mrkt/features/withHooks';
export var endpoint = "".concat(WEBGATE_DOMAIN, "/s4x-me/v0/me");
var eventName = 'load-currentuser';
export var currentUserLoader = createLoader(
/*#__PURE__*/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_key) {
    var response, data, formatted;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return webgateFetch(endpoint);

          case 3:
            response = _context.sent;

            if (!(response.status === 401)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", null);

          case 6:
            if (response.ok) {
              _context.next = 8;
              break;
            }

            throw new Error("".concat(response.status, " ").concat(response.url));

          case 8:
            _context.next = 10;
            return response.json();

          case 10:
            data = _context.sent;
            formatted = _objectSpread({
              email: data.loginEmail
            }, data);
            Logger.logSuccess(eventName);
            return _context.abrupt("return", formatted);

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](0);
            Logger.logError(eventName, _context.t0);
            throw _context.t0;

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 16]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}(), {
  cacheKeyFn: function cacheKeyFn() {
    return 0;
  }
});
export function useCurrentUser() {
  return useRead(currentUserLoader, 0);
}
export var withCurrentUser = withHooks(function () {
  return {
    currentUser: useCurrentUser()
  };
});