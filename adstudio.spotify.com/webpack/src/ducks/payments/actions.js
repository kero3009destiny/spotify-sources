import { logUserAction } from 'ducks/analytics/actions';
import { batchActions } from 'redux-batched-actions';

import * as types from './types';

export function fetchPaymentDetails(adAccount, clearCache = false) {
  return {
    type: types.FETCH_PAYMENT_DETAILS,
    payload: {
      adAccount,
      clearCache,
    },
  };
}

export function _fetchPaymentDetailsSuccess(recurringDetail) {
  return {
    type: types.FETCH_PAYMENT_DETAILS_SUCCESS,
    payload: recurringDetail,
  };
}

export const fetchPaymentDetailsSuccess = (
  recurringDetail,
  category = 'create_ad_flow',
) =>
  batchActions([
    _fetchPaymentDetailsSuccess(recurringDetail),
    logUserAction({
      category,
      label: 'saved_carded_loaded_successfully',
    }),
  ]);

export function fetchPaymentDetailsFailed(err) {
  return {
    type: types.FETCH_PAYMENT_DETAILS_FAILED,
    error: true,
    payload: err,
  };
}
