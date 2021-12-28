import {GET_TEST_RESULTS, UPDATE_TEST_RESULTS, STOP_RUNNING_TESTS, CLOSE_PROMPT} from '../actions/types';

const initialState = {
  testResults: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TEST_RESULTS: {
      return {testResults: {...action.payload}};
    }
    case UPDATE_TEST_RESULTS: {
      const json = action.payload;
      const updatedTestresults = { ...state.testResults };
      updatedTestresults[json.id] = { testResult: json.testResult, event: json.event };
      return {testResults: updatedTestresults};
    }
    case STOP_RUNNING_TESTS: {
      const updatedTestresults = { ...state.testResults };

      // Validate all text fields
      Object.keys(updatedTestresults).map(key => {
        const testResult = updatedTestresults[key];
        if (testResult.testResult && testResult.testResult.status === 'RUNNING') {
          testResult.testResult.status = null;
        }
      });

      return {testResults: updatedTestresults};
    }
    case CLOSE_PROMPT: {
      const updatedTestresults = { ...state.testResults };

      Object.keys(updatedTestresults).map(key => {
        const testResult = updatedTestresults[key];
        if (testResult.testResult && testResult.testResult.status === 'PROMPT') {
          testResult.testResult.status = null;
        }
      });

      return {testResults: updatedTestresults};
    }
    default:
      return state;
  }
}
