import { get } from 'lodash';
import { combineReducers } from 'redux';

import * as types from 'ducks/payments/types';

import {
  DEFAULT_BUDGET_THRESHOLDS,
  DEFAULT_ERROR_MESSAGE,
} from 'config/payments';

// leave this in place, even though these are constant values. we have implemented custom budget
// thresholds for non 1:1 currency markets through the selector
export function budgetThresholds(state = DEFAULT_BUDGET_THRESHOLDS, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export function paymentsConnected(state = false, action) {
  switch (action.type) {
    case types.FETCH_PAYMENT_DETAILS_SUCCESS:
      return !!action.payload && !!action.payload.type;
    case types.FETCH_PAYMENT_DETAILS_FAILED:
      return false;
    default:
      return state;
  }
}

export function paymentDetails(state = null, action) {
  switch (action.type) {
    case types.FETCH_PAYMENT_DETAILS_SUCCESS:
      return action.payload ? action.payload : null;
    case types.FETCH_PAYMENT_DETAILS_FAILED:
    case types.FETCH_PAYMENT_DETAILS:
      return null;
    default:
      return state;
  }
}

export function error(state = null, action) {
  switch (action.type) {
    case types.FETCH_PAYMENT_DETAILS_SUCCESS:
      return null;
    case types.FETCH_PAYMENT_DETAILS_FAILED:
      return get(action, 'payload.message', DEFAULT_ERROR_MESSAGE);
    default:
      return state;
  }
}

export default combineReducers({
  paymentDetails,
  paymentsConnected,
  budgetThresholds,
  error,
});
