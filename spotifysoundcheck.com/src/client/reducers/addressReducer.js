import {
  FETCH_ADDRESS_BEGIN,
  FETCH_ADDRESS_SUCCESS,
  FETCH_ADDRESS_FAILURE
} from '../actions/getAddressAction';

const initialAddressState = {
  loading: true,
  error: null
}

export default function address(state = initialAddressState, action) {
  switch(action.type) {
    case FETCH_ADDRESS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
      break;
    case FETCH_ADDRESS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: null
      }
      break;
    case FETCH_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    default:
      return state;
  }
}