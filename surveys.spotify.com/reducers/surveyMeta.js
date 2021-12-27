import ActionTypes from '../actions/ActionTypes';

export default function surveyMeta(state = {}, action) {
  switch (action.type) {
    case ActionTypes.SURVEY_METADATA_FETCHED: {
      const { surveyId, meta } = action.payload;
      return {
        ...state,
        [surveyId]: {
          ...meta,
        },
      };
    }
    case ActionTypes.START_SURVEY: {
      const surveyId = action.payload;
      return {
        ...state,
        [surveyId]: {
          ...(state[surveyId] || {}),
          hideStartPage: true,
        },
      };
    }
    case ActionTypes.FINISH_SURVEY: {
      const surveyId = action.payload;
      return {
        ...state,
        [surveyId]: {
          ...(state[surveyId] || {}),
          showEndPage: true,
          reachedEndPage: true,
        },
      };
    }
    case ActionTypes.RESUME_SURVEY: {
      const { surveyId } = action.payload;
      return {
        ...state,
        [surveyId]: {
          ...(state[surveyId] || {}),
          showEndPage: false,
        },
      };
    }
    default:
      return state;
  }
}



// WEBPACK FOOTER //
// ./src/reducers/surveyMeta.js