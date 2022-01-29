import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _classCallCheck from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _inherits from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _wrapNativeSuper from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/wrapNativeSuper";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import { MARKETPLACE_MGMT_API, webgateFetch } from '../../../../shared/lib/api';
import { toFullName } from '..';
import { ArtistsResource } from '../../../artists/src/useArtists';
export var ExpiredTokenException = /*#__PURE__*/function (_Error) {
  _inherits(ExpiredTokenException, _Error);

  var _super = _createSuper(ExpiredTokenException);

  function ExpiredTokenException() {
    _classCallCheck(this, ExpiredTokenException);

    return _super.apply(this, arguments);
  }

  return ExpiredTokenException;
}( /*#__PURE__*/_wrapNativeSuper(Error));
export var acceptInvite = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(pendingInvite) {
    var res, body;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (pendingInvite.didAcceptTerms) {
              _context.next = 2;
              break;
            }

            throw new Error('User did not accept terms and conditions.');

          case 2:
            _context.next = 4;
            return webgateFetch("".concat(MARKETPLACE_MGMT_API, "/v0/invite/").concat(pendingInvite.inviteUuid, "/redeem"), {
              method: 'POST',
              body: JSON.stringify({
                fullName: toFullName(pendingInvite.firstName, pendingInvite.lastName),
                email: pendingInvite.businessEmail
              })
            });

          case 4:
            res = _context.sent;

            if (res.ok) {
              _context.next = 12;
              break;
            }

            _context.next = 8;
            return res.text();

          case 8:
            body = _context.sent;

            if (!body.toLocaleLowerCase().includes('expired token')) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", Promise.reject(new ExpiredTokenException()));

          case 11:
            return _context.abrupt("return", Promise.reject(body));

          case 12:
            ArtistsResource.invalidate();
            return _context.abrupt("return", {});

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function acceptInvite(_x) {
    return _ref.apply(this, arguments);
  };
}();