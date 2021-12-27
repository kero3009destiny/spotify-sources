import * as types from './types';

export function setUtmString(utmString) {
  return {
    type: types.SET_UTM_STRING,
    payload: utmString,
  };
}
