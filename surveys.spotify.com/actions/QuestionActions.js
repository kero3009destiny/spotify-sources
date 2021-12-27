import ActionTypes from './ActionTypes';
import { createAction } from 'redux-actions';

export const updateAnswer = createAction(
  ActionTypes.UPDATE_ANSWER,
  (surveyId, questionId, type, answerOrFragment) => ({
    surveyId,
    questionId,
    answerOrFragment,
    type,
  })
);

export const incrementTrackRatingTrack = createAction(
  ActionTypes.TRACK_RATING_INCREMENT_TRACK,
  (surveyId, questionId, forceIncrement = false) => ({
    surveyId,
    questionId,
    forceIncrement,
  })
);

export const decrementTrackRatingTrack = createAction(
  ActionTypes.TRACK_RATING_DECREMENT_TRACK,
  (surveyId, questionId, forceIncrement = false) => ({
    surveyId,
    questionId,
    forceIncrement,
  })
);

export const setTrackRatingTrack = createAction(
  ActionTypes.TRACK_RATING_SET_TRACK,
  (surveyId, questionId, trackIndex) => ({ surveyId, questionId, trackIndex })
);

export const saveTrackRating = createAction(
  ActionTypes.SAVE_TRACK_RATING,
  (surveyId, questionId, uri, rating) => ({ surveyId, questionId, uri, rating })
);

export const trackRatingSaved = createAction(
  ActionTypes.TRACK_RATING_SAVED,
  (surveyId, questionId, uri, rating) => ({ surveyId, questionId, uri, rating })
);

export const trackDescriptorSaved = createAction(
  ActionTypes.TRACK_RATING_SAVED,
  (surveyId, questionId, uri, descriptor, rating) => ({ surveyId, questionId, uri, descriptor, rating })
);

export const trackRatingSaveFailed = createAction(
  ActionTypes.TRACK_RATING_SAVE_FAILED,
  (surveyId, questionId, uri, error) => ({ surveyId, questionId, uri, error })
);

export const trackDescriptorSaveFailed = createAction(
  ActionTypes.TRACK_RATING_SAVE_FAILED,
  (surveyId, questionId, uri, descriptor, error) => ({ surveyId, questionId, uri, descriptor, error })
);

export const skipTrack = (surveyId, questionId, uri) =>
  saveTrackRating(surveyId, questionId, uri, null);

export const replaceTrack = createAction(
  ActionTypes.TRACK_RATING_REPLACE_TRACK,
  (surveyId, questionId, trackUri, newTrack) => ({
    surveyId,
    questionId,
    trackUri,
    newTrack,
  })
);

export const skipTrackDescriptors = createAction(
  ActionTypes.SKIP_TRACK_DESCRIPTORS,
  (surveyId, questionId, trackUri) => ({
    surveyId,
    questionId,
    trackUri,
  })
);

export const fetchMoreTracks = createAction(
  ActionTypes.FETCH_MORE_TRACKS,
  (surveyId, questionId) => ({
    surveyId,
    questionId,
  })
);



// WEBPACK FOOTER //
// ./src/actions/QuestionActions.js