import {
  CREATE_AUDIENCE,
  CREATE_AUDIENCE_FAILED,
  CREATE_AUDIENCE_RESET,
  CREATE_AUDIENCE_SUCCEEDED,
  CREATE_AUDIENCE_UPLOAD_PROGRESS,
  CreateAudienceAction,
  CreateAudienceErrorAction,
  CreateAudienceResetAction,
  CreateAudienceSuccessAction,
  CreateAudienceUploadProgressAction,
} from './types';

export interface AudienceCreationState {
  loading: Boolean;
  progress: undefined | number;
  error?: Response | Error; // should be Response unless an Error was unintentionally thrown from saga
}

export const createAudienceDefaultState: AudienceCreationState = {
  loading: false,
  error: undefined,
  progress: undefined,
};

export const createAudienceReducer = (
  state = createAudienceDefaultState,
  action:
    | CreateAudienceAction
    | CreateAudienceSuccessAction
    | CreateAudienceUploadProgressAction
    | CreateAudienceErrorAction
    | CreateAudienceResetAction,
) => {
  switch (action.type) {
    case CREATE_AUDIENCE:
      return {
        ...state,
        progress: 0,
        loading: true,
      };
    case CREATE_AUDIENCE_SUCCEEDED:
      return {
        ...state,
        loading: false,
        // createdAudience: thing?
      };
    case CREATE_AUDIENCE_FAILED: {
      return {
        ...state,
        loading: false,
        progress: undefined,
        error: action.payload,
      };
    }
    case CREATE_AUDIENCE_UPLOAD_PROGRESS: {
      return {
        ...state,
        progress: action.payload,
      };
    }
    case CREATE_AUDIENCE_RESET: {
      return createAudienceDefaultState;
    }
    default:
      return state;
  }
};

export default createAudienceReducer;
