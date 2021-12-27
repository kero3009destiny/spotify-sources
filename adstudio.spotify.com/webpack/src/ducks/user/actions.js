import { get } from 'lodash';

import * as types from './types';

// TODO split into a mapper
export function setUserData(userData) {
  return {
    type: types.SET_USER_DATA,
    payload: {
      displayName: userData.display_name,
      id: userData.id,
      imgSrc: get(userData, 'images.0.url', null),
    },
  };
}

export function fetchUserDataFailed(error) {
  return {
    type: types.FETCH_USER_DATA_FAILED,
    error: true,
    payload: error,
  };
}
