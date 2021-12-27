import {
  surveyQuestionDetailsFetchFailed,
  surveyQuestionDetailsFetchStarted,
  surveyQuestionDetailsFetched,
} from '../actions/SurveyActions';

import ActionTypes from '../actions/ActionTypes';
import TrackRatingQuestionWrapper from '../lib/TrackRatingQuestionWrapper';
import { fetchQuestionDetails } from '../api/surveyorClient';
import { merge } from 'rxjs/observable/merge';
import { of } from 'rxjs/observable/of';

export default (actions$, store) =>
  merge(
    actions$
      .ofType(ActionTypes.FETCH_SURVEY_QUESTION_DETAILS)
      .filter(({ payload: { surveyId, questionId } }) => {
        const questionDetails = store.getState().surveyQuestionDetails[
          surveyId
        ];
        return !(questionDetails && questionDetails[questionId]);
      }),
    actions$
      .ofType(ActionTypes.FINISH_SURVEY)
      .map(action => ({
        ...action,
        payload: {
          surveyId: action.payload,
          questionId: 0,
        },
      }))
      .filter(
        ({ payload: { surveyId, questionId } }) =>
          new TrackRatingQuestionWrapper(store.getState(), surveyId, questionId)
            .allTracksRatedOrSkipped
      ),
    actions$.ofType(ActionTypes.FETCH_MORE_TRACKS)
  ).switchMap(({ payload: { surveyId, questionId } }) =>

    fetchQuestionDetails(surveyId)
      .map(surveyQuestionDetailsFetched.bind(undefined, surveyId, questionId))
      .catch(error => of(surveyQuestionDetailsFetchFailed(surveyId, questionId, error)))
      .startWith(surveyQuestionDetailsFetchStarted(surveyId, questionId))
  );



// WEBPACK FOOTER //
// ./src/epics/fetchSurveyQuestionDetailsEpic.js