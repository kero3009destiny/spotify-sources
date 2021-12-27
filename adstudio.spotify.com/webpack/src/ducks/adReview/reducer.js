import { combineReducers } from 'redux';

import * as types from './types';

export function createMixPreview(state = false, action) {
  switch (action.type) {
    case types.MIX_PREVIEW_SUBMITTED:
    case types.MIX_PREVIEW_SUCCEEDED:
      return {
        status: action.type,
        payload: action.payload,
      };
    case types.MIX_PREVIEW_FAILED:
      return {
        status: action.type,
        error: action.payload,
      };
    case types.MIX_PREVIEW_CLEAR:
      return {
        status: action.type,
      };
    default:
      return state;
  }
}

export function getMixHistory(state = false, action) {
  switch (action.type) {
    case types.MIX_HISTORY_REQUESTED:
    case types.MIX_HISTORY_SUCCEEDED:
      return {
        status: action.type,
        payload: action.payload,
      };
    default:
      return state;
  }
}

export default combineReducers({
  createMixPreview,
  getMixHistory,
});
