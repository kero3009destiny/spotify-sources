import {DISMISS_WARNING, GET_USER_INFO} from '../actions/types';

const initialState = {
  userInfo: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_INFO: {
      return {userInfo: action.payload};
    }
    case DISMISS_WARNING: {
      const updatedUserInfo = { ...state.userInfo };
      if (updatedUserInfo.license === 'premium') {
        updatedUserInfo.license = null;
      }
      return {userInfo: updatedUserInfo};
    }
    default:
      return state;
  }
}
