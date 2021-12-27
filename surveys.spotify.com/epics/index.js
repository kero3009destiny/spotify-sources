import '../lib/rxjs';

import auth from './authEpic';
import { combineEpics } from 'redux-observable';
import { empty } from 'rxjs/observable/empty';
import fetchSurvey from './fetchSurveyEpic';
import fetchSurveyQuestionDetailsEpic from './fetchSurveyQuestionDetailsEpic';
import generatePlaylistEpic from './generatePlaylistEpic';
import saveTrackRatingEpic from './saveTrackRatingEpic';
import trackRatingProgressEpic from './trackRatingProgressEpic';
import trackRatingQuestionEpic from './trackRatingQuestionEpic';

function logEpicError(error) {
  if (window.Raven && window.Raven.captureException) {
    window.Raven.captureException(error);
  }

  if (window.console && window.console.error) {
    // eslint-disable-next-line no-console
    console.error('Unexpected error in epic stream', error);
  }

  return empty();
}

const epics = [
  auth,
  fetchSurvey,
  fetchSurveyQuestionDetailsEpic,
  trackRatingQuestionEpic,
  trackRatingProgressEpic,
  saveTrackRatingEpic,
  generatePlaylistEpic,
].map(epic => {
  return (actions$, store) => epic(actions$, store).catch(logEpicError);
});

export default combineEpics(...epics);



// WEBPACK FOOTER //
// ./src/epics/index.js