import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
import { webgateFetch } from '@mrkt/features/webgate-fetch';
import { MARKETPLACE_MGMT_API } from '../../../../shared/lib/api';
export var approveJoinRequestApi = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(joinRequest, team) {
    var res, body;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return webgateFetch("".concat(MARKETPLACE_MGMT_API, "/v0/organization/").concat(team.uri, "/accessRequest/").concat(joinRequest.id, "/approve"), {
              method: 'POST',
              body: JSON.stringify({
                group: joinRequest.accessLevel
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
            return _context.abrupt("return", Promise.reject(body));

          case 8:
            return _context.abrupt("return", {});

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function approveJoinRequestApi(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();