import * as types from './types';

export function fetchUserDetails() {
  return {
    type: types.FETCH_USER_DETAILS,
  };
}

export function setUserDetails(userData) {
  return {
    type: types.SET_USER_DETAILS,
    payload: userData,
  };
}

export function fetchUserDetailsFailed(error) {
  return {
    type: types.FETCH_USER_DETAILS_FAILED,
    error: true,
    payload: error,
  };
}
