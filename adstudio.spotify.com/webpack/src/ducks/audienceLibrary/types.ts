export const FETCH_AUDIENCES = 'FETCH_AUDIENCES';
export const FETCH_AUDIENCES_SUCCEEDED = 'FETCH_AUDIENCES_SUCCEEDED';
export const FETCH_AUDIENCES_FAILED = 'FETCH_AUDIENCES_FAILED';

export interface FetchAudiencesStartAction {
  type: typeof FETCH_AUDIENCES;
}

export interface FetchAudiencesSuccessAction {
  type: typeof FETCH_AUDIENCES_SUCCEEDED;
  payload: Array<Audience>;
}

export interface FetchAudiencesErrorAction {
  type: typeof FETCH_AUDIENCES_FAILED;
  payload: Error | Response;
}

export type FetchAudiencesAction =
  | FetchAudiencesStartAction
  | FetchAudiencesSuccessAction
  | FetchAudiencesErrorAction;

export interface Audience {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  audienceRange: AudienceRange;
  status: string;
}

export interface AudienceRange {
  upperLimit: string;
  lowerLimit: string;
}
