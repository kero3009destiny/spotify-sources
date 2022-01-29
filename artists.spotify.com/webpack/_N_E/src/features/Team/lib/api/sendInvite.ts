import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _classCallCheck from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _inherits from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _wrapNativeSuper from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/wrapNativeSuper";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// ignore-string-externalization
import { MARKETPLACE_MGMT_API, webgateFetch } from '../../../../shared/lib/api';
import { teamDetailsAndMembersLoader } from './teamDetailsAndMembersLoader';
export var AlreadyInvitedError = /*#__PURE__*/function (_Error) {
  _inherits(AlreadyInvitedError, _Error);

  var _super = _createSuper(AlreadyInvitedError);

  function AlreadyInvitedError() {
    _classCallCheck(this, AlreadyInvitedError);

    return _super.apply(this, arguments);
  }

  return AlreadyInvitedError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
export var sendInvite = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(team, inviteDetails) {
    var res, body;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return webgateFetch("".concat(MARKETPLACE_MGMT_API, "/v0/team/organization/").concat(team.uri, "/invite"), {
              method: 'POST',
              body: JSON.stringify({
                fullName: inviteDetails.fullName,
                email: inviteDetails.businessEmail,
                role: inviteDetails.role,
                company: inviteDetails.company,
                accessGroup: inviteDetails.accessLevel,
                template: 'message-editor-590'
              })
            });

          case 2:
            res = _context.sent;

            if (res.ok) {
              _context.next = 8;
              break;
            }

            _context.next = 6;
            return res.text();

          case 6:
            body = _context.sent;
            throw body === 'email-already-invited' ? new AlreadyInvitedError() : new Error();

          case 8:
            teamDetailsAndMembersLoader.clear({
              teamUri: team.uri
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sendInvite(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();