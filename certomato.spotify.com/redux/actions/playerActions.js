import {
  PLAYER_CONTEXT_PLAYER_STATE_CHANGED,
  LAST_ACTIVE_DEVICE_INFO_CHANGED,
  TRACK_PROGRESS_CHANGED,
} from './types';

/**
 */
export const contextPlayerStateChanged = (state) => dispatch => {
  dispatch({
    type: PLAYER_CONTEXT_PLAYER_STATE_CHANGED,
    payload: state,
  });
};

/**
 */
export const lastActiveDeviceInfoChanged = (state) => dispatch => {
  dispatch({
    type: LAST_ACTIVE_DEVICE_INFO_CHANGED,
    payload: state,
  });
};

/**
 */
export const trackProgressChanged = (state) => dispatch => {
  dispatch({
    type: TRACK_PROGRESS_CHANGED,
    payload: state,
  });
};
