import {DISMISS_API_BANNER, DISPLAY_API_BANNER} from '../actions/types';

const initialState = {
  apiCallSuccessful: null,
  responseText: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DISMISS_API_BANNER: {
      return {apiCallSuccessful: null, responseText: ''};
    }
    case DISPLAY_API_BANNER: {
      if (action.payload.status === 200 || action.payload.status === 201) {
        return {apiCallSuccessful: true, responseText: action.payload.responseText};
      }
      return {apiCallSuccessful: false, responseText: action.payload.responseText};
    }
    default:
      return state;
  }
}
