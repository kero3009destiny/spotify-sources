import {
  FETCH_SELECT_ACCOUNT_BEGIN,
  FETCH_SELECT_ACCOUNT_SUCCESS,
  FETCH_SELECT_ACCOUNT_FAILURE
} from '../actions/fetchSelectedAccount';

const initialState = {
  user: {
    id: 0,
    first_name: "",
    last_name: "",
    company_email: "",
    company_id: 0,
    position_id: 0,
    spotify_id: "",
    company_title: "",
    position_name: "",
    company_name: "",
    country_id: 0,
    country_name: "",
    state_id: 0,
    state_name: ""
  }
}

export default function selectedAccount(state = initialState, action:any) {
  switch(action.type) {
    case FETCH_SELECT_ACCOUNT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
      break;
    case FETCH_SELECT_ACCOUNT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: null
      }
      break;
    case FETCH_SELECT_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    default:
      return state;
  }
}