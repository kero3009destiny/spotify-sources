import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.edb4648f-e97c-4fc3-81e7-9c46d49557bb/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.edb4648f-e97c-4fc3-81e7-9c46d49557bb/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
import { webgateFetch } from '../../../shared/lib/api';
import { PaymentLoader } from '../PaymentLoader';
import { WALLET_API, MARQUEE_PRODUCT_TYPE } from '../constants';
export var useGetCheckout = function useGetCheckout() {
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(orgUri, checkoutId) {
      var response, data, card;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return webgateFetch("".concat(WALLET_API, "/v1/organization/").concat(orgUri, "/checkout/").concat(checkoutId, "?productType=").concat(MARQUEE_PRODUCT_TYPE));

            case 3:
              response = _context.sent;

              if (!response.ok) {
                _context.next = 11;
                break;
              }

              _context.next = 7;
              return response.json();

            case 7:
              data = _context.sent;
              card = data.card;
              PaymentLoader.clear(orgUri).prime(orgUri, [card]);
              return _context.abrupt("return", [card]);

            case 11:
              return _context.abrupt("return", []);

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", []);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 14]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};