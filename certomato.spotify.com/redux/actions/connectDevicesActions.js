import {API_ERROR, GET_CONNECT_DEVICES, LOAD_CONNECT_DEVICES} from './types';
import * as api from '../../api/api';
import Utils from '../../utils/Utils';

/**
 Loads connect devices, used to populate eg a device picker.
 */
export const getConnectDevices = () => (dispatch, getState) => {
  if (getState().devices.loading) {
    return;
  }
  dispatch({
    type: LOAD_CONNECT_DEVICES,
  });
  api.getConnectDevices().then((payload) => {
    if (payload !== undefined) {
      dispatch({
        type: GET_CONNECT_DEVICES,
        payload: payload.data.devices,
      });
    }
  }).catch(error => {
    if (Utils.exists(error.response)) {
      dispatch({
        type: API_ERROR,
        payload: error.response,
      });
    }
  });
};
