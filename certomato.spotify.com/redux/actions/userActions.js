import {API_ERROR, DISMISS_WARNING, GET_USER_INFO} from './types';
import * as api from '../../api/api';
import Utils from '../../utils/Utils';

/**
 * Get if user is part of 'spotify' organization list in backend.
 * Get what Spotify license user has (premium/mft).
 */
export const getUserInfo = () => dispatch => {
  api.getUserInfo().then((payload) => {
    if (payload !== undefined) {
      dispatch({
        type: GET_USER_INFO,
        payload: payload.data,
      });
    }
  }).catch(error => {
    if (Utils.exists(error.response)) {
      dispatch({
        type: API_ERROR,
        payload: error.response,
      });
    }
  });
};

/**
 Dismisses warning banner.
 */
export const dismissWarning = () => dispatch => {
  dispatch({
    type: DISMISS_WARNING,
  });
};
