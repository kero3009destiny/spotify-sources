import * as types from 'ducks/utm/types';

const initialState = null;

export default function utm(state = initialState, action) {
  switch (action.type) {
    case types.SET_UTM_STRING:
      return action.payload;
    default:
      return state;
  }
}
