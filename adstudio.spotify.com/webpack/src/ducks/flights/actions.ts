import {
  buildFetchErrorAction,
  responseOrUndefined,
  SagaFetchError,
} from 'utils/asyncDucksHelpers';

import {
  BUILD_FLIGHT_DOWNLOAD_FAILED,
  BUILD_FLIGHT_DOWNLOAD_START,
  BUILD_FLIGHT_DOWNLOAD_SUCCEEDED,
  BuildFlightDownloadErrorAction,
  BuildFlightDownloadStartAction,
  BuildFlightDownloadSuccessAction,
  FETCH_FLIGHT_COMBINED_AUDIENCE_STATS_FAILED,
  FETCH_FLIGHT_COMBINED_AUDIENCE_STATS_START,
  FETCH_FLIGHT_COMBINED_AUDIENCE_STATS_SUCCEEDED,
  FETCH_FLIGHT_DAILY_STATS_FAILED,
  FETCH_FLIGHT_DAILY_STATS_START,
  FETCH_FLIGHT_DAILY_STATS_SUCCEEDED,
  FETCH_FLIGHT_FAILED,
  FETCH_FLIGHT_LIFETIME_STATS_FAILED,
  FETCH_FLIGHT_LIFETIME_STATS_START,
  FETCH_FLIGHT_LIFETIME_STATS_SUCCEEDED,
  FETCH_FLIGHT_LIFETIME_STREAMING_STATS_FAILED,
  FETCH_FLIGHT_LIFETIME_STREAMING_STATS_START,
  FETCH_FLIGHT_LIFETIME_STREAMING_STATS_SUCCEEDED,
  FETCH_FLIGHT_START,
  FETCH_FLIGHT_SUCCEEDED,
  FETCH_FLIGHTS,
  FETCH_FLIGHTS_FAILED,
  FETCH_FLIGHTS_SUCCEEDED,
  FetchFlightCombinedAudienceStatsErrorAction,
  FetchFlightCombinedAudienceStatsStartAction,
  FetchFlightCombinedAudienceStatsSuccessAction,
  FetchFlightDailyStatsErrorAction,
  FetchFlightDailyStatsStartAction,
  FetchFlightDailyStatsSuccessAction,
  FetchFlightErrorAction,
  FetchFlightLifetimeStatsErrorAction,
  FetchFlightLifetimeStatsStartAction,
  FetchFlightLifetimeStatsSuccessAction,
  FetchFlightLifetimeStreamingStatsErrorAction,
  FetchFlightLifetimeStreamingStatsStartAction,
  FetchFlightLifetimeStreamingStatsSuccessAction,
  FetchFlightPayload,
  FetchFlightsErrorAction,
  FetchFlightsStartAction,
  FetchFlightsSuccessAction,
  FetchFlightStartAction,
  FetchFlightSuccessAction,
  FetchStatsStartPayload,
  FlightDownloadState,
  PAUSE_RESUME_FLIGHT_FAILED,
  PAUSE_RESUME_FLIGHT_START,
  PAUSE_RESUME_FLIGHT_SUCCEEDED,
  PauseResumeFlightErrorAction,
  PauseResumeFlightPayload,
  PauseResumeFlightStartAction,
  PauseResumeFlightSuccessAction,
  STOP_FLIGHT_FAILED,
  STOP_FLIGHT_START,
  STOP_FLIGHT_SUCCEEDED,
  StopFlightErrorAction,
  StopFlightPayload,
  StopFlightStartAction,
  StopFlightSuccessAction,
} from './types';
import { PaginationType } from 'types/common/pagination';
import {
  CombinedAudienceStatsResponse,
  CombinedDailyStatResponse,
  LifetimeStatsResponse,
  LifetimeStreamingConversionStatsResponse,
} from 'types/common/state/api/flight';
import {
  FlightsApiResponse,
  FlightsQueryParams,
} from 'types/common/state/api/flights';

export const getFlights = (
  queryParams: FlightsQueryParams,
  paginationType: PaginationType,
): FetchFlightsStartAction => ({
  type: FETCH_FLIGHTS,
  payload: {
    queryParams,
    paginationType,
  },
});

export const getFlightsSuccess = (
  response: FlightsApiResponse,
  paginationType: PaginationType,
): FetchFlightsSuccessAction => ({
  type: FETCH_FLIGHTS_SUCCEEDED,
  payload: {
    response,
    paginationType,
  },
});

export const getFlightsFailed = (
  payload: Error | Response,
): FetchFlightsErrorAction => ({
  type: FETCH_FLIGHTS_FAILED,
  payload,
});

export const getFlight = (payload: {
  adAccountId: string;
  flightId: string;
}): FetchFlightStartAction => ({
  type: FETCH_FLIGHT_START,
  payload,
});

export const getFlightSuccess = (
  payload: FetchFlightPayload,
): FetchFlightSuccessAction => ({
  type: FETCH_FLIGHT_SUCCEEDED,
  payload,
});

export const getFlightFailed = (error: Error): FetchFlightErrorAction => ({
  type: FETCH_FLIGHT_FAILED,
  payload: error,
  error,
});

export const getFlightLifetimeStats = (
  payload: FetchStatsStartPayload,
): FetchFlightLifetimeStatsStartAction => ({
  type: FETCH_FLIGHT_LIFETIME_STATS_START,
  payload,
});

export const getFlightLifetimeStatsSuccess = (
  payload: LifetimeStatsResponse,
): FetchFlightLifetimeStatsSuccessAction => ({
  type: FETCH_FLIGHT_LIFETIME_STATS_SUCCEEDED,
  payload,
});

export const getFlightLifetimeStatsFailed = (
  error: Error,
): FetchFlightLifetimeStatsErrorAction => ({
  type: FETCH_FLIGHT_LIFETIME_STATS_FAILED,
  payload: error,
  error,
});

export const getFlightDailyStats = (
  payload: FetchStatsStartPayload,
): FetchFlightDailyStatsStartAction => ({
  type: FETCH_FLIGHT_DAILY_STATS_START,
  payload,
});

export const getFlightDailyStatsSuccess = (
  payload: CombinedDailyStatResponse,
): FetchFlightDailyStatsSuccessAction => ({
  type: FETCH_FLIGHT_DAILY_STATS_SUCCEEDED,
  payload,
});

export const getFlightDailyStatsFailed = (
  error: Error,
): FetchFlightDailyStatsErrorAction => ({
  type: FETCH_FLIGHT_DAILY_STATS_FAILED,
  payload: error,
  error,
});

export const getFlightCombinedAudienceStats = (
  payload: FetchStatsStartPayload,
): FetchFlightCombinedAudienceStatsStartAction => ({
  type: FETCH_FLIGHT_COMBINED_AUDIENCE_STATS_START,
  payload,
});

export const getFlightCombinedAudienceStatsSuccess = (
  payload: CombinedAudienceStatsResponse,
): FetchFlightCombinedAudienceStatsSuccessAction => ({
  type: FETCH_FLIGHT_COMBINED_AUDIENCE_STATS_SUCCEEDED,
  payload,
});

export const getFlightCombinedAudienceStatsFailed = (
  error: string,
): FetchFlightCombinedAudienceStatsErrorAction => ({
  type: FETCH_FLIGHT_COMBINED_AUDIENCE_STATS_FAILED,
  payload: error,
  error,
});

export const getFlightLifetimeStreamingStats = (
  payload: FetchStatsStartPayload,
): FetchFlightLifetimeStreamingStatsStartAction => ({
  type: FETCH_FLIGHT_LIFETIME_STREAMING_STATS_START,
  payload,
});

export const getFlightLifetimeStreamingStatsSuccess = (
  payload: LifetimeStreamingConversionStatsResponse,
): FetchFlightLifetimeStreamingStatsSuccessAction => ({
  type: FETCH_FLIGHT_LIFETIME_STREAMING_STATS_SUCCEEDED,
  payload,
});

export const getFlightLifetimeStreamingStatsFailed = (
  error: Error,
): FetchFlightLifetimeStreamingStatsErrorAction => ({
  type: FETCH_FLIGHT_LIFETIME_STREAMING_STATS_FAILED,
  payload: error,
  error,
});

export const buildFlightDownload = (): BuildFlightDownloadStartAction => ({
  type: BUILD_FLIGHT_DOWNLOAD_START,
});

export const buildFlightDownloadSuccess = (
  payload: FlightDownloadState,
): BuildFlightDownloadSuccessAction => ({
  type: BUILD_FLIGHT_DOWNLOAD_SUCCEEDED,
  payload,
});

export const buildFlightDownloadFailed = (
  error: Error,
  meta: any,
): BuildFlightDownloadErrorAction => ({
  type: BUILD_FLIGHT_DOWNLOAD_FAILED,
  payload: error,
  error,
  meta,
});

export const stopFlight = (
  payload: StopFlightPayload,
): StopFlightStartAction => ({
  type: STOP_FLIGHT_START,
  payload,
});

export const stopFlightSuccess = (): StopFlightSuccessAction => ({
  type: STOP_FLIGHT_SUCCEEDED,
});

export const stopFlightError = (error: Error): StopFlightErrorAction =>
  buildFetchErrorAction(STOP_FLIGHT_FAILED, error);

export function pauseResumeFlight(
  payload: PauseResumeFlightPayload,
): PauseResumeFlightStartAction {
  return {
    type: PAUSE_RESUME_FLIGHT_START,
    payload,
  };
}

export function pauseResumeFlightSucceeded(): PauseResumeFlightSuccessAction {
  return {
    type: PAUSE_RESUME_FLIGHT_SUCCEEDED,
  };
}

export function pauseResumeFlightFailed(
  startActionPayload: PauseResumeFlightPayload,
  error: SagaFetchError,
): PauseResumeFlightErrorAction {
  return {
    type: PAUSE_RESUME_FLIGHT_FAILED,
    error: true,
    payload: error,
    meta: {
      response: responseOrUndefined(error),
      ...startActionPayload,
    },
  };
}
