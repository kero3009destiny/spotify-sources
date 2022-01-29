import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { createLoader } from '@spotify-internal/creator-data-loading';
import { ONBOARDING_API } from '../../../../../shared/lib/api';
import { webgateFetchJson } from '@mrkt/features/webgate-fetch';

function load(_x) {
  return _load.apply(this, arguments);
}

function _load() {
  _load = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(id) {
    var data;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (id) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", null);

          case 3:
            _context.next = 5;
            return webgateFetchJson("".concat(ONBOARDING_API, "/v0/access/request/").concat(id));

          case 5:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", null);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));
  return _load.apply(this, arguments);
}

export var requestDetailsLoader = createLoader(load);