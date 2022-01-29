import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.edb4648f-e97c-4fc3-81e7-9c46d49557bb/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _classCallCheck from "/var/jenkins_home/workspace/tingle.edb4648f-e97c-4fc3-81e7-9c46d49557bb/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _inherits from "/var/jenkins_home/workspace/tingle.edb4648f-e97c-4fc3-81e7-9c46d49557bb/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.edb4648f-e97c-4fc3-81e7-9c46d49557bb/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.edb4648f-e97c-4fc3-81e7-9c46d49557bb/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _wrapNativeSuper from "/var/jenkins_home/workspace/tingle.edb4648f-e97c-4fc3-81e7-9c46d49557bb/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/wrapNativeSuper";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.edb4648f-e97c-4fc3-81e7-9c46d49557bb/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import { createLoader } from '@spotify-internal/creator-data-loading';
import { fetchPaymentMethod } from '../api';
export var NotAuthorizedError = /*#__PURE__*/function (_Error) {
  _inherits(NotAuthorizedError, _Error);

  var _super = _createSuper(NotAuthorizedError);

  function NotAuthorizedError() {
    _classCallCheck(this, NotAuthorizedError);

    return _super.apply(this, arguments);
  }

  return NotAuthorizedError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
var INITIAL_PAYMENT_METHOD_STATE = [];

var load = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(teamUri) {
    var response, data;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (teamUri) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", Promise.resolve(INITIAL_PAYMENT_METHOD_STATE));

          case 2:
            _context.next = 4;
            return fetchPaymentMethod(teamUri);

          case 4:
            response = _context.sent;

            if (!(response.status === 403)) {
              _context.next = 7;
              break;
            }

            throw new NotAuthorizedError();

          case 7:
            _context.prev = 7;

            if (response.ok) {
              _context.next = 10;
              break;
            }

            throw new Error();

          case 10:
            _context.next = 12;
            return response.json();

          case 12:
            data = _context.sent;
            return _context.abrupt("return", data.cards || []);

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](7);
            return _context.abrupt("return", []);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[7, 16]]);
  }));

  return function load(_x) {
    return _ref.apply(this, arguments);
  };
}();

export var PaymentMethodLoader = createLoader(load);