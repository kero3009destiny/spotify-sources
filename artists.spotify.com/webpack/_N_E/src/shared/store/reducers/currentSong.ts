// ignore-string-externalization
import { UNLOAD_CURRENT_ARTIST } from '../actionTypes';
export var currentSong = function currentSong() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case UNLOAD_CURRENT_ARTIST:
      return null;

    default:
      return state;
  }
};