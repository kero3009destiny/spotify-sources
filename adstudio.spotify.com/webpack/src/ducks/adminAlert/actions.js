import * as types from './types';

export function fetchAdminAlertSuccess(res) {
  return {
    type: types.FETCH_ADMIN_ALERT_SUCCESS,
    payload: res,
  };
}
