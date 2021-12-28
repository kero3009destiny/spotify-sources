import {
  FETCH_SELECT_COMPANY_BEGIN,
  FETCH_SELECT_COMPANY_SUCCESS,
  FETCH_SELECT_COMPANY_FAILURE
} from '../actions/fetchSelectedCompany';

const initialState = {
  id: 0,
  parent_id: 0,
  company_name: ''
}

export default function selectedCompany(state = initialState, action:any) {
  switch(action.type) {
    case FETCH_SELECT_COMPANY_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
      break;
    case FETCH_SELECT_COMPANY_SUCCESS:
      return {
        ...state,
        ...action.payload.company,
        loading: false,
        error: null
      }
      break;
    case FETCH_SELECT_COMPANY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    default:
      return state;
  }
}