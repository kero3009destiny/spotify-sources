import {API_ERROR, GET_TESTS} from './types';
import * as api from '../../api/api';
import Utils from '../../utils/Utils';

/**
 Loads all tests.
 */
export const getTests = (certificationId) => dispatch => {
  api.getTests(certificationId).then((payload) => {
    if (payload !== undefined) {
      dispatch({
        type: GET_TESTS,
        payload: payload.data.groups,
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

/**
 Starts a test
 */
export const startTest = (testId, alternative, dut1, dut2, connectionId, input, certificationId) => dispatch => {
  api.startTest(testId, alternative, dut1, dut2, connectionId, input, certificationId).then((payload) => {
    if (!payload.ok) {
      const error = {
        config: {
          url: payload.url,
        },
        data: {
          message: payload.statusText,
          error: {
            message: payload.status,
          },
        },
      };
      dispatch({
        type: API_ERROR,
        payload: error,
      });
    }
  });
};

/**
 Sets tests not applicable
 */
export const startNotApplicable = (testId, alternative, dut1, dut2, connectionId, input, certificationId) => dispatch => {
  api.startNotApplicable(testId, alternative, dut1, dut2, connectionId, input, certificationId).then((payload) => {
    if (!payload.ok) {
      const error = {
        config: {
          url: payload.url,
        },
        data: {
          message: payload.statusText,
          error: {
            message: payload.status,
          },
        },
      };
      dispatch({
        type: API_ERROR,
        payload: error,
      });
    }
  });
};

/**
 Clear tests
 */
export const startClearSection = (testId, alternative, dut1, dut2, connectionId, input, certificationId) => dispatch => {
  api.startClearSection(testId, alternative, dut1, dut2, connectionId, input, certificationId).then((payload) => {
    if (!payload.ok) {
      const error = {
        config: {
          url: payload.url,
        },
        data: {
          message: payload.statusText,
          error: {
            message: payload.status,
          },
        },
      };
      dispatch({
        type: API_ERROR,
        payload: error,
      });
    }
  });
};
