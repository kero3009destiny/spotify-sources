import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
import { toPaymentTransaction } from '../transformers';
import { fetchPaymentTransactions } from '../api';
import { createLoader } from '@spotify-internal/creator-data-loading';

var load = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(teamUri) {
    var response, data, paymentTransactions;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetchPaymentTransactions(teamUri);

          case 2:
            response = _context.sent;
            _context.next = 5;
            return response.json();

          case 5:
            data = _context.sent;
            paymentTransactions = data.payments.map(function (paymentTransactionAPI) {
              return toPaymentTransaction(paymentTransactionAPI);
            });
            return _context.abrupt("return", {
              payments: paymentTransactions,
              page: data.page
            });

          case 8:
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

export var PaymentHistoryLoader = createLoader(load);