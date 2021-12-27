import * as types from 'ducks/signup/types';

import { SIGNUP_REQUEST_FAILED_MESSAGE } from 'config/signup';

export const initialState = {
  loading: false,
  success: false,
  error: false,
  errorMsg: '',
  VIQPixelVariable: null,
};

export default (state = initialState, action) => {
  let err;

  switch (action.type) {
    case types.CREATE_ACCOUNT_SUCCEEDED:
      return {
        ...initialState,
        success: true,
        VIQPixelVariable: action.payload,
      };

    case types.CREATE_ACCOUNT_FAILED:
      if (action.payload.statusText) {
        err = action.payload.statusText.replace(/(\[|\])/g, '');
      } else if (action.payload.errors) {
        err = action.payload.errors.join(' ');
      } else if (action.payload.message) {
        err = action.payload.message;
      }
      return {
        ...initialState,
        error: true,
        errorMsg: err || SIGNUP_REQUEST_FAILED_MESSAGE,
      };

    case types.CREATE_ACCOUNT_REQUESTED:
      return { ...initialState, loading: true };

    default:
      return state;
  }
};
