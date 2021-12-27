import {
  CREATE_AUDIENCE,
  CREATE_AUDIENCE_FAILED,
  CREATE_AUDIENCE_RESET,
  CREATE_AUDIENCE_SUCCEEDED,
  CREATE_AUDIENCE_UPLOAD_PROGRESS,
  CreateAudienceAction,
  CreateAudienceErrorAction,
  CreateAudiencePayload,
  CreateAudienceResetAction,
  CreateAudienceSuccessAction,
  CreateAudienceUploadProgressAction,
} from './types';

export const createAudience = (
  payload: CreateAudiencePayload,
): CreateAudienceAction => ({
  type: CREATE_AUDIENCE,
  payload,
});

export const createAudienceSuccess = (): CreateAudienceSuccessAction => ({
  type: CREATE_AUDIENCE_SUCCEEDED,
});

export const createAudienceFailed = (
  payload: Error | Response,
): CreateAudienceErrorAction => ({
  type: CREATE_AUDIENCE_FAILED,
  payload,
});

export const createAudienceUploadProgress = (
  payload: number,
): CreateAudienceUploadProgressAction => ({
  type: CREATE_AUDIENCE_UPLOAD_PROGRESS,
  payload,
});

export const createAudienceReset = (): CreateAudienceResetAction => ({
  type: CREATE_AUDIENCE_RESET,
});
