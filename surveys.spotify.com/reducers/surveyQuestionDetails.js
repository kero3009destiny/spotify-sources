import ActionTypes from '../actions/ActionTypes';
import findIndex from 'lodash/findIndex';
import get from 'lodash/get';
import set from 'lodash/set';

export default function surveyQuestionDetails(state = {}, action) {
  switch (action.type) {
    case ActionTypes.SURVEY_QUESTION_DETAILS_FETCHED: {
      const { surveyId, questionId, details } = action.payload;
      const currentDetails = get(state, [surveyId, String(questionId)]);
      let newDetails = details;

      if (Array.isArray(newDetails) && Array.isArray(currentDetails)) {
        newDetails = [...currentDetails, ...newDetails];
      } else if (
        currentDetails &&
        typeof currentDetails === 'object' &&
        typeof newDetails === 'object'
      ) {
        newDetails = {
          ...currentDetails,
          ...newDetails,
        };
      }

      return {
        ...set(state, [surveyId, String(questionId)], newDetails),
      };
    }

    case ActionTypes.TRACK_RATING_REPLACE_TRACK: {
      const { surveyId, questionId, trackUri, newTrack } = action.payload;
      const newDetails = [...get(state, [surveyId, String(questionId)])];

      const trackIndex = findIndex(newDetails, track => track.uri === trackUri);
      if (trackIndex >= 0) {
        newDetails.splice(trackIndex, 1, newTrack);
      }

      return {
        ...set(state, [surveyId, String(questionId)], newDetails),
      };
    }

    case ActionTypes.SKIP_TRACK_DESCRIPTORS: {
      /*
      Find the first track that is different from the current track and make
      the array of questions start on that track.
      Example: If track1 is the current track in the survey
      [(track1, desc1), (track1, desc2), (track2, desc1), (track3, desc1)]
      becomes
      [(track2, desc1), (track3, desc1)]
       */
      const surveyId = action.payload.surveyId;
      const questionId = action.payload.questionId;
      const trackUri = action.payload.trackUri;
      const currentSurveyState = [...get(state, [surveyId, String(questionId)])];
      let newSurveyState;
      const trackIndex = findIndex(currentSurveyState, track => track.uri !== trackUri);

      if (trackIndex >= 0) {
        newSurveyState = currentSurveyState.slice(trackIndex, currentSurveyState.length);
      }
      // Update state
      return {
        ...set(state, [surveyId, String(questionId)], newSurveyState),
      };
    }

    default:
      return state;
  }
}



// WEBPACK FOOTER //
// ./src/reducers/surveyQuestionDetails.js