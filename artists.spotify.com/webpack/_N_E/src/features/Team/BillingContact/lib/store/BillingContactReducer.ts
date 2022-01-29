import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { assertUnreachable } from '../../../lib/util/assertUnreachable';
import { BillingContactActionType } from './BillingContactAction';
export var billingContactReducer = function billingContactReducer(state, action) {
  switch (action.type) {
    case BillingContactActionType.OPTIMISTICALLY_UPDATE_BILLING_CONTACT_ID:
      return _objectSpread(_objectSpread({}, state), {}, {
        billingContactId: action.billingContactId
      });

    case BillingContactActionType.SET_BILLING_INFORMATION:
      return _objectSpread(_objectSpread({}, state), {}, {
        billingContactId: action.billingContactId,
        billingCountry: action.billingCountry
      });

    case BillingContactActionType.SHOW_BILLING_CONTACT_SPEEDBUMP:
      return _objectSpread(_objectSpread({}, state), {}, {
        confirmBillingContactChange: action.confirmBillingContactChange,
        removeSelectedTeamMember: action.removeSelectedTeamMember
      });

    case BillingContactActionType.HIDE_BILLING_CONTACT_SPEEDBUMP:
      return _objectSpread(_objectSpread({}, state), {}, {
        confirmBillingContactChange: null
      });

    default:
      return assertUnreachable(action);
  }
};