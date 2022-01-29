import _toConsumableArray from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { FETCH_ARTIST_HISTORY, MORE_ARTIST_HISTORY, UNLOAD_CURRENT_ARTIST } from '../actionTypes';
import { loadReducer } from './helpers';
export function artistHistory() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case FETCH_ARTIST_HISTORY:
      return loadReducer(state, action);

    case MORE_ARTIST_HISTORY:
      if (action.payload && !action.error && state.data) {
        return _objectSpread(_objectSpread({}, state), {}, {
          data: _objectSpread(_objectSpread({}, state.data), {}, {
            records: [].concat(_toConsumableArray(state.data.records || []), _toConsumableArray(action.payload.records || [])),
            cursor: action.payload.cursor
          })
        });
      }

      return state;

    case UNLOAD_CURRENT_ARTIST:
      return null;

    default:
      return state;
  }
}