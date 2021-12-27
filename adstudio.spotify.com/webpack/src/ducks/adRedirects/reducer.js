import { combineReducers } from 'redux';

import * as types from './types';

export function byId(state = {}, action) {
  switch (action.type) {
    case types.FETCH_AD_ACCOUNT_REDIRECT_SUCCESS:
      return {
        ...state,
        [action.meta.adId]: {
          ...state[action.meta.adId],
          adAccountRedirect: (action.payload || {}).adAccountRedirect,
        },
      };

    default:
      return state;
  }
}

export default combineReducers({
  byId,
});
