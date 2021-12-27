import * as types from './types';

export function saveCurrentRoute(route) {
  return {
    type: types.SAVE_CURRENT_ROUTE,
    payload: {
      route,
    },
  };
}

export function savePreviousLocation() {
  return {
    type: types.SAVE_PREVIOUS_LOCATION,
    payload: {
      location: {
        ...window.location,
      },
    },
  };
}
