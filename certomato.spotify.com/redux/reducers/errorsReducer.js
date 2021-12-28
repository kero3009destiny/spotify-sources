import {API_ERROR, DISMISS_API_ERROR} from '../actions/types';
import Utils from '../../utils/Utils';

const initialState = {
  apiErrors: null,
};

const parseError = (error) => {
  switch (error.status) {
    case 404: {
      return {apiErrors:
          {
            apiErrorStatus: error.status,
            apiErrorUrl: null,
            apiErrorMessage: 'Page does not exist. Incorrect url?',
          }};
    }
    case 401: {
      return {apiErrors:
          {
            apiErrorStatus: error.status,
            apiErrorUrl: null,
            apiErrorMessage: 'Unauthorized, please log out and in again.',
          }};
    }
    default: {
      return {apiErrors:
          {
            apiErrorStatus: null,
            apiErrorUrl: null,
            apiErrorMessage: 'Unknown error occured. Bad network?',
          }};
    }
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case API_ERROR: {
      if (Utils.exists(action.payload.data, action.payload.data.error)) {
        const error = action.payload;
        return {
          apiErrors:
            {
              apiErrorStatus: error.status,
              apiErrorUrl: Utils.exists(error.config) ? error.config.url : '',
              apiErrorMessage: (Utils.exists(error.data, error.data.error) ? (error.data.error.message) : ''),
            },
        };
      }
      return parseError(action.payload);
    }
    case DISMISS_API_ERROR: {
      return {apiErrors: null};
    }
    default:
      return state;
  }
}
