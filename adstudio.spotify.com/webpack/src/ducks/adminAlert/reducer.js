import * as types from 'ducks/adminAlert/types';

export default function adminAlert(state = '', action) {
  if (action.type === types.FETCH_ADMIN_ALERT_SUCCESS) return action.payload;
  return state;
}
