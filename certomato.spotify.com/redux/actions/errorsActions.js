import {DISMISS_API_ERROR} from './types';

/**
 Dismisses an api error.
 */
export const dismissApiError = () => dispatch => {
  dispatch({
    type: DISMISS_API_ERROR,
  });
};
