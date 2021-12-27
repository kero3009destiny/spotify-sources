import { combineReducers } from 'redux';

import * as types from './types';

export function hasUserSeenNewFeature(state = {}, action) {
  switch (action.type) {
    case types.SET_NEW_FEATURE_SHOWN:
      return {
        ...state,
        [action.payload.featureName]: true,
      };

    default:
      return state;
  }
}

export default combineReducers({
  hasUserSeenNewFeature,
});
