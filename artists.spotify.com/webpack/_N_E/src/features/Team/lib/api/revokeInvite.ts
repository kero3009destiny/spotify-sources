import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { MARKETPLACE_MGMT_API, webgateFetch } from '../../../../shared/lib/api';
import { teamDetailsAndMembersLoader } from './teamDetailsAndMembersLoader';
export var revokeInvite = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(teamUri, inviteUuid) {
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            teamDetailsAndMembersLoader.clear({
              teamUri: teamUri
            });
            return _context2.abrupt("return", webgateFetch("".concat(MARKETPLACE_MGMT_API, "/v0/invite/").concat(inviteUuid, "/organization/").concat(teamUri), {
              method: 'DELETE'
            }).then( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(res) {
                return _regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        teamDetailsAndMembersLoader.clear({
                          teamUri: teamUri
                        });

                        if (res.ok) {
                          _context.next = 7;
                          break;
                        }

                        _context.t0 = Promise;
                        _context.next = 5;
                        return res.text();

                      case 5:
                        _context.t1 = _context.sent;
                        return _context.abrupt("return", _context.t0.reject.call(_context.t0, _context.t1));

                      case 7:
                        return _context.abrupt("return", null);

                      case 8:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function revokeInvite(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();