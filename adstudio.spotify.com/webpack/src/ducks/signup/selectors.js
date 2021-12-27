import { getFormAsyncErrors, getFormSyncErrors } from 'redux-form';

import { ACCOUNT_REDUX_FORM_ID } from 'config/account';

export const getSignupState = state => state.signup;
export const getSignupSuccess = state => getSignupState(state).success;
export const getSignupVixPixel = state =>
  getSignupState(state).VIQPixelVariable;
export const getSignupAlert = state => getSignupState(state).errorMsg;
export const getSignUpLoading = state => getSignupState(state).loading;
export const getSignupErrors = state => {
  const formAsyncErrors =
    getFormAsyncErrors(ACCOUNT_REDUX_FORM_ID)(state) || {};
  const formSyncErrors = getFormSyncErrors(ACCOUNT_REDUX_FORM_ID)(state) || {};
  return { ...formSyncErrors, ...formAsyncErrors };
};
