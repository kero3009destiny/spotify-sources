import {
  SET_FAB_FORM
} from '../actions/fabAction';

type CompanyType = {
  type: 'company' | 'sub-company' | 'member';
}
const initialState:CompanyType = {
  type: 'company'
}

export default function fab(state = initialState, action:any) {
  switch(action.type) {
    case SET_FAB_FORM:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}

