import * as types from 'ducks/routes/types';

export default function routes(
  state = {
    prevRoute: '',
    currentRoute: '',
    previousLocation: {},
  },

  action,
) {
  switch (action.type) {
    case types.SAVE_CURRENT_ROUTE:
      return {
        ...state,
        prevRoute: state.currentRoute,
        currentRoute: action.payload.route,
      };

    case types.SAVE_PREVIOUS_LOCATION:
      return {
        ...state,
        previousLocation: action.payload.location,
      };

    default:
      return state;
  }
}
