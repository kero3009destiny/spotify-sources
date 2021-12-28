import {
  API_ERROR, GET_ORGANIZATION,
} from './types';
import * as api from '../../api/api';
import Utils from '../../utils/Utils';

export const getOrganization = (uri) => dispatch => {
  api.getOrganization(uri).then((payload) => {
    if (payload !== undefined && !(payload.data.constructor === Object && Object.entries(payload.data).length === 0)) {
      dispatch({
        type: GET_ORGANIZATION,
        payload: payload.data,
      });
    } else {
      dispatch({
        type: GET_ORGANIZATION,
        payload: {},
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
