import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.edb4648f-e97c-4fc3-81e7-9c46d49557bb/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.edb4648f-e97c-4fc3-81e7-9c46d49557bb/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
import { transformFetchedBillingSettingsAPI } from '../transformers';
import { fetchBillingInformation } from '../api';
import { createLoader } from '@spotify-internal/creator-data-loading';
export var INITIAL_BILLING_INFORMATION_STATE = {
  country: '',
  email: '',
  billingContactId: '',
  isInvoiced: false
};

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

            return _context.abrupt("return", Promise.resolve(INITIAL_BILLING_INFORMATION_STATE));

          case 2:
            _context.next = 4;
            return fetchBillingInformation(teamUri);

          case 4:
            response = _context.sent;

            if (!(response.status === 403)) {
              _context.next = 9;
              break;
            }

            throw new Error("".concat(response.status, " Unauthorized"));

          case 9:
            _context.next = 11;
            return response.json();

          case 11:
            data = _context.sent;

          case 12:
            return _context.abrupt("return", transformFetchedBillingSettingsAPI(data));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function load(_x) {
    return _ref.apply(this, arguments);
  };
}();

export var BillingInformationLoader = createLoader(load);