import { combineReducers } from 'redux';
import connectDevicesReducer from './connectDevicesReducer';
import certSessionReducer from './certSessionReducer';
import certificationsReducer from './certificationsReducer';
import organizationsReducer from './organizationsReducer';
import errorsReducer from './errorsReducer';
import testsReducer from './testsReducers';
import testResultsReducer from './testResultsReducer';
import submissionReducer from './submissionReducer';
import playerReducer from './playerReducer';
import getUserInfo from './userReducers';
import accessManagementReducers from './accessManagementReducers';

export default combineReducers({
  devices: connectDevicesReducer,
  apiErrors: errorsReducer,
  certifications: certificationsReducer,
  organization: organizationsReducer,
  certSession: certSessionReducer,
  tests: testsReducer,
  testResults: testResultsReducer,
  submission: submissionReducer,
  playerState: playerReducer,
  userInfo: getUserInfo,
  apiCallSuccessful: accessManagementReducers,
});
