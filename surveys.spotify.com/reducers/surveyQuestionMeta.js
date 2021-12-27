import ActionTypes from '../actions/ActionTypes';

const INITIALIZERS = {
  track_rating() {
    return {
      currentTrack: 0,
      ratings: {},
      loading: false,
      error: null,
      canUndoRating: false,
      playlistUrl: null,
    };
  },

  track_descriptor() {
    return {
      currentTrack: 0,
      ratings: {},
      loading: false,
      error: null,
      canUndoRating: false,
      playlistUrl: null,
    };
  },

  multi_track_confirm() {
    return {
      currentTrack: 0,
      ratings: {},
      loading: false,
      error: null,
      canUndoRating: true,
      resumeAfterFetch: false,
    };
  },
};

const defaultInitializer = () => ({});

function updateAnswer(surveyId, questionType, answerOrFragment, value) {
  switch (questionType) {
    case 'track_rating':
      return {
        ...value,
        ratings: {
          ...value.ratings,
          ...answerOrFragment,
        },
      };
    case 'multi_track_confirm':
      return {
        ...value,
        ratings: {
          ...value.ratings,
          ...answerOrFragment,
        },
      };
    case 'track_descriptor':
      return {
        ...value,
        ratings: {
          ...value.ratings,
          ...answerOrFragment,
        },
      };
    default:
      return answerOrFragment;
  }
}

function updateQuestionState(state, surveyId, questionId, updater) {
  const surveyState = Array.prototype.slice.call(state[surveyId]);
  surveyState[questionId] = {
    ...surveyState[questionId],
    ...updater(surveyState[questionId]),
  };

  return {
    ...state,
    [surveyId]: surveyState,
  };
}

export default function surveyQuestionMeta(state = {}, action) {
  switch (action.type) {
    case ActionTypes.SURVEY_METADATA_FETCHED: {
      const { surveyId, meta: { questions } } = action.payload;

      return {
        ...state,
        [surveyId]: questions.map(question => {
          const initializer = INITIALIZERS[question.type] || defaultInitializer;
          return initializer(question);
        }),
      };
    }

    case ActionTypes.UPDATE_ANSWER: {
      const { surveyId, questionId, type, answerOrFragment } = action.payload;
      const surveyState = Array.prototype.slice.call(state[surveyId]);
      surveyState[questionId] = updateAnswer(
        surveyId,
        type,
        answerOrFragment,
        surveyState[questionId]
      );

      return {
        ...state,
        [surveyId]: surveyState,
      };
    }

    case ActionTypes.TRACK_RATING_SET_TRACK: {
      const { surveyId, questionId, trackIndex } = action.payload;
      const surveyState = Array.prototype.slice.call(state[surveyId]);

      surveyState[questionId] = {
        ...surveyState[questionId],
        currentTrack: trackIndex,
      };

      return {
        ...state,
        [surveyId]: surveyState,
      };
    }

    case ActionTypes.SAVE_TRACK_RATING: {
      const { surveyId, questionId } = action.payload;
      const surveyState = Array.prototype.slice.call(state[surveyId]);
      surveyState[questionId] = {
        ...surveyState[questionId],
        loading: true,
      };
      return {
        ...state,
        [surveyId]: surveyState,
      };
    }

    case ActionTypes.TRACK_RATING_INCREMENT_TRACK: {
      const { surveyId, questionId } = action.payload;
      const surveyState = Array.prototype.slice.call(state[surveyId]);

      surveyState[questionId] = {
        ...surveyState[questionId],
        canUndoRating: true,
      };
      return {
        ...state,
        [surveyId]: surveyState,
      };
    }
    case ActionTypes.TRACK_RATING_DECREMENT_TRACK: {
      const { surveyId, questionId } = action.payload;
      const surveyState = Array.prototype.slice.call(state[surveyId]);
      surveyState[questionId] = {
        ...surveyState[questionId],
        canUndoRating: false,
      };
      return {
        ...state,
        [surveyId]: surveyState,
      };
    }

    case ActionTypes.SURVEY_QUESTION_DETAILS_FETCHED: {
      const { surveyId, questionId, details } = action.payload;

      if (Array.isArray(details)) {
        const surveyState = Array.prototype.slice.call(state[surveyId]);
        const extraUpdates = {};

        if (surveyState[questionId].resumeAfterFetch) {
          extraUpdates.currentTrack = surveyState[questionId].currentTrack + 1;
        }

        surveyState[questionId] = {
          ...surveyState[questionId],
          ...extraUpdates,
          latestBatchSize: details.length,
          resumeAfterFetch: false,
        };

        return {
          ...state,
          [surveyId]: surveyState,
        };
      }

      return state;
    }

    case ActionTypes.FETCH_MORE_TRACKS: {
      const { surveyId, questionId } = action.payload;
      const surveyState = Array.prototype.slice.call(state[surveyId]);
      surveyState[questionId] = {
        ...surveyState[questionId],
        resumeAfterFetch: true,
      };

      return {
        ...state,
        [surveyId]: surveyState,
      };
    }

    case ActionTypes.FETCH_SURVEY_QUESTION_DETAILS_STARTED: {
      const { surveyId, questionId } = action.payload;
      const surveyState = Array.prototype.slice.call(state[surveyId]);
      surveyState[questionId] = {
        ...surveyState[questionId],
        latestBatchSize: -1,
      };

      return {
        ...state,
        [surveyId]: surveyState,
      };
    }

    case ActionTypes.TRACK_RATING_SAVED:
    case ActionTypes.TRACK_RATING_SAVE_FAILED: {
      const { surveyId, questionId } = action.payload;
      return updateQuestionState(state, surveyId, questionId, () => ({
        loading: false,
      }));
    }

    case ActionTypes.PLAYLIST_GENERATED: {
      const { surveyId, questionId, playlistUrl } = action.payload;
      return updateQuestionState(state, surveyId, questionId, () => ({
        playlistUrl: playlistUrl,
      }));
    }

    default:
      return state;
  }
}



// WEBPACK FOOTER //
// ./src/reducers/surveyQuestionMeta.js