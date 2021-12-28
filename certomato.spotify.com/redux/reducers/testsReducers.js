import {
  GET_TESTS,
} from '../actions/types';

const initialState = {
  tests: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TESTS: {
      return {tests: {running: false, groups: action.payload}};
    }
    default:
      return state;
  }
}
