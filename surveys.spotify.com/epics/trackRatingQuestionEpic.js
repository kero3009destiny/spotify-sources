import ActionTypes from '../actions/ActionTypes';
import { of } from 'rxjs/observable/of';
import { saveTrackRating } from '../actions/QuestionActions';

export default action$ =>
  action$
    .ofType(ActionTypes.UPDATE_ANSWER)
    .filter(
      ({ payload: { type } }) =>
        type === 'track_rating'
        || type === 'multi_track_confirm'
        || type === 'track_descriptor'
    )
    .mergeMap(action => {
      const { surveyId, questionId, answerOrFragment } = action.payload;
      const uri = Object.keys(answerOrFragment)[0];
      const rating = answerOrFragment[uri];

      return of(saveTrackRating(surveyId, questionId, uri, rating));
    });



// WEBPACK FOOTER //
// ./src/epics/trackRatingQuestionEpic.js