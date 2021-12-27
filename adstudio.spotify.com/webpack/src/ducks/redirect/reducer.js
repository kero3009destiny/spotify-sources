import { combineReducers } from 'redux';

import { SET_REDIRECTING } from 'ducks/redirect/types';
import * as types from 'ducks/window/types';

export function redirecting(state = null, action) {
  if (action.type === SET_REDIRECTING) return action.payload;
  if (action.type === types.HARD_REDIRECT_TRIGGERED) return true;
  return state;
}

export default combineReducers({ redirecting });
