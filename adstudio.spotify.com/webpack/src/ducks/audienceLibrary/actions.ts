import {
  Audience,
  FETCH_AUDIENCES,
  FETCH_AUDIENCES_FAILED,
  FETCH_AUDIENCES_SUCCEEDED,
  FetchAudiencesErrorAction,
  FetchAudiencesStartAction,
  FetchAudiencesSuccessAction,
} from './types';

export const getAudiences = (): FetchAudiencesStartAction => ({
  type: FETCH_AUDIENCES,
});

export const getAudiencesSuccess = (
  payload: Array<Audience>,
): FetchAudiencesSuccessAction => ({
  type: FETCH_AUDIENCES_SUCCEEDED,
  payload,
});

export const getAudiencesFailed = (
  payload: Error | Response,
): FetchAudiencesErrorAction => ({
  type: FETCH_AUDIENCES_FAILED,
  payload,
});
