import { combineReducers } from 'redux';

import * as types from 'ducks/userDetails/types';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  createdAt: '',
  lastModified: '',
};

export function error(state = null, action) {
  switch (action.type) {
    case types.FETCH_USER_DETAILS:
      return null;
    case types.FETCH_USER_DETAILS_FAILED:
      return action.payload;
    default:
      return state;
  }
}

export function fetched(state = false, action) {
  switch (action.type) {
    case types.FETCH_USER_DETAILS:
      return true;
    case types.FETCH_USER_DETAILS_FAILED:
      return true;
    default:
      return state;
  }
}

export function details(state = initialState, action) {
  switch (action.type) {
    case types.SET_USER_DETAILS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

export default combineReducers({
  error,
  fetched,
  details,
});
