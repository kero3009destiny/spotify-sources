import ActionTypes from '../actions/ActionTypes';

const INITIAL_STATE = {
  error: null,
};

export default function appErrors(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.SURVEY_QUESTION_DETAILS_FETCH_FAILED:
    case ActionTypes.SURVEY_METADATA_FETCH_FAILED:
      return {
        ...state,
        error: 'The survey didn’t load. Refresh this page and try again.',
      };
    case ActionTypes.PLAYLIST_GENERATE_FAILED:
      return {
        ...state,
        error: 'We couldn’t load your playlist right now. You can find it later in Your Library.',
      };
    case ActionTypes.TRACK_RATING_SAVE_FAILED:
      return {
        ...state,
        error: "Your rating didn't save. Try again?",
      };
    case ActionTypes.DISMISS_ERROR:
      return {
        ...state,
        error: null,
      };
    case ActionTypes.ANNOTATION_POST_ERROR:
      return {
        ...state,
        error: 'Descriptor was not able to be updated. Please try again.',
      };
    default:
      return state;
  }
}



// WEBPACK FOOTER //
// ./src/reducers/appErrors.js