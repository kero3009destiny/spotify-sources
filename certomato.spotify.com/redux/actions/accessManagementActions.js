import {DISMISS_API_BANNER, DISPLAY_API_BANNER} from './types';

/**
 Dismisses api banner.
 */
export const dismissApiBanner = () => dispatch => {
  dispatch({
    type: DISMISS_API_BANNER,
  });
};

/**
 Displays api banner.
 */
export const displayApiBanner = (status, responseText) => dispatch => {
  dispatch({
    type: DISPLAY_API_BANNER,
    payload: {status, responseText},
  });
};
