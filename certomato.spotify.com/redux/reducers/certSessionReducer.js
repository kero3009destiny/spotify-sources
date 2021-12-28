import {CLEAR_CERT_SESSION, RESUME_CERT_SESSION, SET_NO_DEVICE, START_CERT_SESSION} from '../actions/types';

const initialState = {
  certSession: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case START_CERT_SESSION: {
      return {certSession: action.payload};
    }
    case RESUME_CERT_SESSION:
      return {certSession: action.payload};
    case CLEAR_CERT_SESSION: {
      return {certSession: null};
    }
    case SET_NO_DEVICE:
      return {certSession: action.payload};
    default:
      return state;
  }
}
