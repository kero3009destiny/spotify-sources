import { logUserAction } from 'ducks/analytics/actions';
import { batchActions } from 'redux-batched-actions';

import * as types from './types';

export function _createAccountRequested(account) {
  return {
    type: types.CREATE_ACCOUNT_REQUESTED,
    payload: { account },
  };
}

export const addAccount = (account, partnerID) =>
  batchActions([
    _createAccountRequested(account),
    logUserAction({
      category: 'Account Setup',
      label: `user_submit ${partnerID}`,
    }),
  ]);

export function _createAccountSucceeded(VIQPixelVariable) {
  return {
    type: types.CREATE_ACCOUNT_SUCCEEDED,
    payload: VIQPixelVariable,
  };
}

export const addAccountSucceeded = (signupStatus, VIQPixelVariable) =>
  batchActions([
    _createAccountSucceeded(VIQPixelVariable),
    logUserAction({
      category: 'Account Setup',
      label: 'User_submit_success',
      params: {
        signupStatus:
          typeof signupStatus !== 'string'
            ? signupStatus.status || signupStatus.signUpStatus
            : signupStatus,
      },
    }),
  ]);

export function _createAccountFailure(err) {
  return {
    type: types.CREATE_ACCOUNT_FAILED,
    error: true,
    payload: err,
  };
}

export const addAccountFailure = error =>
  batchActions([
    _createAccountFailure(error),
    logUserAction({
      category: 'Account Setup',
      label: 'error_on_submit',
    }),
  ]);
