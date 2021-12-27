import {
  Audience,
  FETCH_AUDIENCES,
  FETCH_AUDIENCES_FAILED,
  FETCH_AUDIENCES_SUCCEEDED,
  FetchAudiencesErrorAction,
  FetchAudiencesStartAction,
  FetchAudiencesSuccessAction,
} from './types';

export interface AudienceLibraryState {
  audiences: Audience[];
  loading: boolean;
  error?: Response | Error; // should be Response unless an Error was unintentionally thrown from saga
}

export const audienceLibraryDefaultState: AudienceLibraryState = {
  audiences: [],
  loading: false,
  error: undefined,
};

export const audienceLibraryReducer = (
  state = audienceLibraryDefaultState,
  action:
    | FetchAudiencesStartAction
    | FetchAudiencesSuccessAction
    | FetchAudiencesErrorAction,
) => {
  switch (action.type) {
    case FETCH_AUDIENCES:
      return {
        ...state,
        loading: true,
      };
    case FETCH_AUDIENCES_SUCCEEDED:
      return {
        ...state,
        loading: false,
        audiences: action.payload,
      };
    case FETCH_AUDIENCES_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default audienceLibraryReducer;
