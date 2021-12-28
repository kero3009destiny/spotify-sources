import {GET_ORGANIZATION} from '../actions/types';

const initialState = {
  organization: {
    name: '',
    jiraOrgId: '',
    isAutoApproved: false,
  },
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORGANIZATION: {
      return {
        ...state,
        organization: action.payload,
      };
    }
    default:
      return state;
  }
}
