import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
import { useState } from 'react';
import { useRead, usePut } from '@spotify-internal/creator-data-loading';
import { PaymentHistoryLoader } from '../loaders/PaymentHistoryLoader';
import { fetchPaymentTransactions } from '../api/api';
import { toPaymentTransaction } from '../transformers';
export var usePaymentHistory = function usePaymentHistory(teamUri) {
  var _useState = useState(false),
      isLoading = _useState[0],
      setIsLoading = _useState[1];

  var paymentHistory = useRead(PaymentHistoryLoader, teamUri);
  var updatePaymentHistoryCache = usePut(PaymentHistoryLoader, teamUri);

  function updatePaymentHistory(_x) {
    return _updatePaymentHistory.apply(this, arguments);
  }

  function _updatePaymentHistory() {
    _updatePaymentHistory = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(pageNumber) {
      var response, data, paymentTransactions;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setIsLoading(true);
              _context.next = 3;
              return fetchPaymentTransactions(teamUri, pageNumber);

            case 3:
              response = _context.sent;
              _context.next = 6;
              return response.json();

            case 6:
              data = _context.sent;
              paymentTransactions = data.payments.map(function (paymentTransactionAPI) {
                return toPaymentTransaction(paymentTransactionAPI);
              });
              updatePaymentHistoryCache({
                payments: paymentTransactions,
                page: data.page
              });
              setIsLoading(false);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _updatePaymentHistory.apply(this, arguments);
  }

  return {
    isLoading: isLoading,
    paymentHistory: paymentHistory,
    updatePaymentHistory: updatePaymentHistory
  };
};