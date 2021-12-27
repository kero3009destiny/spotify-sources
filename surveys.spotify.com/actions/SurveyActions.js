import ActionTypes from './ActionTypes';
import { createAction } from 'redux-actions';

export const startSurvey = createAction(
  ActionTypes.START_SURVEY,
  surveyId => surveyId
);

export const finishSurvey = createAction(
  ActionTypes.FINISH_SURVEY,
  surveyId => surveyId
);

export const resumeSurvey = createAction(
  ActionTypes.RESUME_SURVEY,
  (surveyId, questionId) => ({ surveyId, questionId })
);

export const fetchSurveyMetadata = createAction(
  ActionTypes.FETCH_SURVEY_METADATA,
  surveyId => surveyId
);

export const surveyMetadataFetched = createAction(
  ActionTypes.SURVEY_METADATA_FETCHED,
  (surveyId, meta) => ({ surveyId, meta })
);

export const surveyMetadataFetchFailed = createAction(
  ActionTypes.SURVEY_METADATA_FETCH_FAILED,
  (surveyId, error) => ({ surveyId, error })
);

export const fetchSurveyQuestionDetails = createAction(
  ActionTypes.FETCH_SURVEY_QUESTION_DETAILS,
  (surveyId, questionId) => ({ surveyId, questionId })
);

export const surveyQuestionDetailsFetchStarted = createAction(
  ActionTypes.FETCH_SURVEY_QUESTION_DETAILS_STARTED,
  (surveyId, questionId) => ({ surveyId, questionId })
);

export const surveyQuestionDetailsFetched = createAction(
  ActionTypes.SURVEY_QUESTION_DETAILS_FETCHED,
  (surveyId, questionId, details) => ({ surveyId, questionId, details })
);

export const surveyQuestionDetailsFetchFailed = createAction(
  ActionTypes.SURVEY_QUESTION_DETAILS_FETCH_FAILED,
  (surveyId, questionId, error) => ({ surveyId, questionId, error })
);

export const generatePlaylist = createAction(
  ActionTypes.GENERATE_PLAYLIST,
  (surveyId, questionId) => ({ surveyId, questionId })
);

export const playlistGenerated = createAction(
  ActionTypes.PLAYLIST_GENERATED,
  (surveyId, questionId, playlistUrl) => ({ surveyId, questionId, playlistUrl })
);

export const playlistGenerateFailed = createAction(
  ActionTypes.PLAYLIST_GENERATE_FAILED,
  (surveyId, questionId, error) => ({ surveyId, questionId, error })
);



// WEBPACK FOOTER //
// ./src/actions/SurveyActions.js