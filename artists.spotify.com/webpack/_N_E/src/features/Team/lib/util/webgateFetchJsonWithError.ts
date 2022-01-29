import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _classCallCheck from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _inherits from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _wrapNativeSuper from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/wrapNativeSuper";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import { webgateFetch } from '@mrkt/features/webgate-fetch';
export var WebgateFetchError = /*#__PURE__*/function (_Error) {
  _inherits(WebgateFetchError, _Error);

  var _super = _createSuper(WebgateFetchError);

  function WebgateFetchError(status, body) {
    var _this;

    _classCallCheck(this, WebgateFetchError);

    _this = _super.call(this);
    _this.status = status;
    _this.body = body;
    return _this;
  }

  return WebgateFetchError;
}( /*#__PURE__*/_wrapNativeSuper(Error)); // this function allows us to access the error message sent from the backend

export function webgateFetchJsonWithError(_x, _x2) {
  return _webgateFetchJsonWithError.apply(this, arguments);
}

function _webgateFetchJsonWithError() {
  _webgateFetchJsonWithError = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(input, init) {
    var response;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return webgateFetch(input, init);

          case 2:
            response = _context.sent;

            if (response.ok) {
              _context.next = 10;
              break;
            }

            _context.t0 = WebgateFetchError;
            _context.t1 = response.status;
            _context.next = 8;
            return response.text();

          case 8:
            _context.t2 = _context.sent;
            throw new _context.t0(_context.t1, _context.t2);

          case 10:
            _context.next = 12;
            return response.json();

          case 12:
            return _context.abrupt("return", _context.sent);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _webgateFetchJsonWithError.apply(this, arguments);
}

export function webgateFetchWithError(_x3, _x4) {
  return _webgateFetchWithError.apply(this, arguments);
}

function _webgateFetchWithError() {
  _webgateFetchWithError = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(input, init) {
    var response;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return webgateFetch(input, init);

          case 2:
            response = _context2.sent;

            if (response.ok) {
              _context2.next = 10;
              break;
            }

            _context2.t0 = WebgateFetchError;
            _context2.t1 = response.status;
            _context2.next = 8;
            return response.text();

          case 8:
            _context2.t2 = _context2.sent;
            throw new _context2.t0(_context2.t1, _context2.t2);

          case 10:
            _context2.next = 12;
            return response;

          case 12:
            return _context2.abrupt("return", _context2.sent);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _webgateFetchWithError.apply(this, arguments);
}