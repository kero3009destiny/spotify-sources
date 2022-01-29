import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.edb4648f-e97c-4fc3-81e7-9c46d49557bb/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.edb4648f-e97c-4fc3-81e7-9c46d49557bb/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
import { toBillingInformationAPI } from './transformers';
import { saveBillingInformation } from './api';
export var updateBillingInformation = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(unsavedBillingInformation, orgUri) {
    var response;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return saveBillingInformation(orgUri, toBillingInformationAPI(unsavedBillingInformation));

          case 2:
            response = _context.sent;
            return _context.abrupt("return", unsavedBillingInformation);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function updateBillingInformation(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();