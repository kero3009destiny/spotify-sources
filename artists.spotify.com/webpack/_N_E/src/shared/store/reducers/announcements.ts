import _toConsumableArray from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
// ignore-string-externalization
import { LOAD_ANNOUNCEMENTS, UPDATE_ANNOUNCEMENTS } from '../actionTypes';
import { loadReducer } from './helpers';
export var announcements = function announcements() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case LOAD_ANNOUNCEMENTS:
      {
        return loadReducer(state, action);
      }

    case UPDATE_ANNOUNCEMENTS:
      {
        return {
          data: [].concat(_toConsumableArray(state && state.data ? state.data : []), _toConsumableArray(action.payload.data))
        };
      }

    default:
      return state;
  }
};