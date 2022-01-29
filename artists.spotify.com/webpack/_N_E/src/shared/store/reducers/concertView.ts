// ignore-string-externalization
import { FETCH_CONCERT_VIEW, UNLOAD_CURRENT_ARTIST } from '../actionTypes';
import { loadReducer } from './helpers';
export function concertView() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case FETCH_CONCERT_VIEW:
      return loadReducer(state, action);

    case UNLOAD_CURRENT_ARTIST:
      return null;

    default:
      return state;
  }
}