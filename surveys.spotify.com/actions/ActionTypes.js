import keyMirror from 'key-mirror';

export default keyMirror({
  START_SURVEY: null,
  FINISH_SURVEY: null,
  RESUME_SURVEY: null,

  REDIRECT_TO_EXTERNAL_URL: null,

  FETCH_SURVEY_METADATA: null,
  SURVEY_METADATA_FETCHED: null,
  SURVEY_METADATA_FETCH_FAILED: null,

  FETCH_SURVEY_QUESTION_DETAILS: null,
  FETCH_SURVEY_QUESTION_DETAILS_STARTED: null,
  SURVEY_QUESTION_DETAILS_FETCHED: null,
  SURVEY_QUESTION_DETAILS_FETCH_FAILED: null,

  OAUTH_TOKEN_ACQUIRED: null,
  OAUTH_TOKEN_ACQUIRE_FAILED: null,

  UPDATE_ANSWER: null,

  TRACK_RATING_INCREMENT_TRACK: null,
  TRACK_RATING_DECREMENT_TRACK: null,
  TRACK_RATING_SET_TRACK: null,
  TRACK_RATING_REPLACE_TRACK: null,

  TRACK_DESCRIPTOR_INCREMENT_TRACK: null,
  TRACK_DESCRIPTOR_DECREMENT_TRACK: null,
  TRACK_DESCRIPTOR_SET_TRACK: null,
  TRACK_DESCRIPTOR_REPLACE_TRACK: null,

  SAVE_DESCRIPTOR_RATING: null,
  TRACK_DESCRIPTOR_SAVED: null,
  TRACK_DESCRIPTOR_SAVE_FAILED: null,

  SAVE_TRACK_RATING: null,
  TRACK_RATING_SAVED: null,
  TRACK_RATING_SAVE_FAILED: null,

  GENERATE_PLAYLIST: null,
  PLAYLIST_GENERATED: null,
  PLAYLIST_GENERATE_FAILED: null,

  DISMISS_ERROR: null,

  FETCH_MORE_TRACKS: null,

  ANNOTATION_POST_ERROR: null,
  SKIP_TRACK_DESCRIPTORS: null,
});



// WEBPACK FOOTER //
// ./src/actions/ActionTypes.js