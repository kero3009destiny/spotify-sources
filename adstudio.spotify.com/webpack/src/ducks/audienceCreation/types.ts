export const CREATE_AUDIENCE = 'CREATE_AUDIENCE';
export const CREATE_AUDIENCE_FAILED = 'CREATE_AUDIENCE_FAILED';
export const CREATE_AUDIENCE_SUCCEEDED = 'CREATE_AUDIENCE_SUCCEEDED';
export const CREATE_AUDIENCE_UPLOAD_PROGRESS =
  'CREATE_AUDIENCE_UPLOAD_PROGRESS';
export const CREATE_AUDIENCE_RESET = 'CREATE_AUDIENCE_RESET';

export interface CreateAudiencePayload {
  name: string;
  description: string;
  file: File;
}

export interface CreateAudienceAction {
  type: typeof CREATE_AUDIENCE;
  payload: CreateAudiencePayload;
}

export interface CreateAudienceUploadProgressAction {
  type: typeof CREATE_AUDIENCE_UPLOAD_PROGRESS;
  payload: number;
}

export interface CreateAudienceSuccessAction {
  type: typeof CREATE_AUDIENCE_SUCCEEDED;
}

export interface CreateAudienceErrorAction {
  type: typeof CREATE_AUDIENCE_FAILED;
  payload: Error | Response;
}

export interface CreateAudienceResetAction {
  type: typeof CREATE_AUDIENCE_RESET;
}
