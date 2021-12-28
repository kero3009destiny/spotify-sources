import {
  CHECK_USER_ACCESS_BEGIN,
  CHECK_USER_ACCESS_SUCCESS,
  CHECK_USER_ACCESS_FAILURE
} from '../actions/checkUserAccess';

const initialAddressState = {
  loading: true,
  auth: false
}

export default function userAccess(state = initialAddressState, action) {
  switch(action.type) {
    case CHECK_USER_ACCESS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
      break;
    case CHECK_USER_ACCESS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: null
      }
      break;
    case CHECK_USER_ACCESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    default:
      return state;
  }
}
