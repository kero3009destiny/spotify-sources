import {API_ERROR, GET_TEST_RESULTS, UPDATE_TEST_RESULTS, STOP_RUNNING_TESTS, CLOSE_PROMPT} from './types';
import * as api from '../../api/api';
import Utils from '../../utils/Utils';

/**
 * Fetches results from backend for a given certification session and restores the state.
 * @param {string} certSession Id of the session to restore test results from.
 */
export const getTestResults = (certSessionId) => dispatch => {
  api.getTestResults(certSessionId).then((payload) => {
    if (payload !== undefined && payload.data.testResult !== undefined) {
      const testResults = payload.data.testResult;
      payload.data.testResult.map(testResult => {
        if (testResult.status !== 'PROMPT') {
          testResults[testResult.name] = {
            testResult: testResult,
          };
        }
      });
      dispatch({
        type: GET_TEST_RESULTS,
        payload: testResults,
      });
    }
    if (payload.data.testResult === undefined) {
      dispatch({
        type: GET_TEST_RESULTS,
        payload: null,
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
 Updates test results from a JSON blob, containing the test and the result for a specific test.
 Used to update for example visual status of tests (checkmark, failed icon etc).
 */
export const updateTestResults = (json) => dispatch => {
  dispatch({
    type: UPDATE_TEST_RESULTS,
    payload: json,
  });
};

/**
 Stops all tests marked as "RUNNING", removing the RUNNING status.
 */
export const stopRunningTests = () => dispatch => {
  dispatch({
    type: STOP_RUNNING_TESTS,
  });
};

export const closePrompt = () => dispatch => {
  dispatch({
    type: CLOSE_PROMPT,
  });
};
