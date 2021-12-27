import appErrors from './appErrors';
import auth from './auth';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import surveyMeta from './surveyMeta';
import surveyQuestionDetails from './surveyQuestionDetails';
import surveyQuestionMeta from './surveyQuestionMeta';

export default combineReducers({
  appErrors,
  auth,
  surveyMeta,
  surveyQuestionDetails,
  surveyQuestionMeta,

  // plugins/middleware reducers
  router: routerReducer,
});



// WEBPACK FOOTER //
// ./src/reducers/index.js