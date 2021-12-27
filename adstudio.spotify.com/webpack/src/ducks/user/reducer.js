import * as types from 'ducks/user/types';

const initialState = {
  displayName: '',
  email: '',
  fetched: false,
  id: '',
  imgSrc: '',
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case types.SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
        fetched: true,
      };

    default:
      return state;
  }
}
