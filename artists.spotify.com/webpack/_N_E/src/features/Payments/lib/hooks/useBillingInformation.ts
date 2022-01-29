import _defineProperty from "/var/jenkins_home/workspace/tingle.edb4648f-e97c-4fc3-81e7-9c46d49557bb/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.edb4648f-e97c-4fc3-81e7-9c46d49557bb/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.edb4648f-e97c-4fc3-81e7-9c46d49557bb/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { useRead, usePut } from '@spotify-internal/creator-data-loading';
import { BillingInformationLoader } from '../loaders/BillingInformationLoader';
import { updateBillingInformation } from '../updateBillingInformation';
export var useBillingInformation = function useBillingInformation(teamUri) {
  var billingSettings = useRead(BillingInformationLoader, teamUri);
  var updateBillingInformationCache = usePut(BillingInformationLoader, teamUri);

  function setBillingInformation(_x) {
    return _setBillingInformation.apply(this, arguments);
  }

  function _setBillingInformation() {
    _setBillingInformation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(newBillingInformation) {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (teamUri) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              _context.next = 4;
              return updateBillingInformation(newBillingInformation, teamUri);

            case 4:
              updateBillingInformationCache(_objectSpread(_objectSpread({}, billingSettings), newBillingInformation));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _setBillingInformation.apply(this, arguments);
  }

  return {
    billingSettings: billingSettings,
    setBillingInformation: setBillingInformation,
    updateBillingInformationCache: updateBillingInformationCache
  };
};