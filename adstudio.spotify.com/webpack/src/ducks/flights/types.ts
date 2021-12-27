import { Action } from 'redux';

import { FetchErrorAction, MetaResponse } from 'utils/asyncDucksHelpers';

import { PaginationType } from 'types/common/pagination';
import {
  CombinedAudienceStatsResponse,
  CombinedDailyStatResponse,
  GetFlightResponse,
  LifetimeStatsResponse,
  LifetimeStreamingConversionStatsResponse,
  PauseResumeFlightActionType,
} from 'types/common/state/api/flight';
import {
  FlightsApiResponse,
  FlightsQueryParams,
} from 'types/common/state/api/flights';

export const FETCH_FLIGHTS = 'FETCH_FLIGHTS';
export const FETCH_FLIGHTS_SUCCEEDED = 'FETCH_FLIGHTS_SUCCEEDED';
export const FETCH_FLIGHTS_FAILED = 'FETCH_FLIGHTS_FAILED';

export const FETCH_FLIGHT_START = 'FETCH_FLIGHT_START';
export const FETCH_FLIGHT_SUCCEEDED = 'FETCH_FLIGHT_SUCCEEDED';
export const FETCH_FLIGHT_FAILED = 'FETCH_FLIGHT_FAILED';

export const FETCH_FLIGHT_LIFETIME_STATS_START =
  'FETCH_FLIGHT_LIFETIME_STATS_START';
export const FETCH_FLIGHT_LIFETIME_STATS_SUCCEEDED =
  'FETCH_FLIGHT_LIFETIME_STATS_SUCCEEDED';
export const FETCH_FLIGHT_LIFETIME_STATS_FAILED =
  'FETCH_FLIGHT_LIFETIME_STATS_FAILED';

export const FETCH_FLIGHT_DAILY_STATS_START = 'FETCH_FLIGHT_DAILY_STATS_START';
export const FETCH_FLIGHT_DAILY_STATS_SUCCEEDED =
  'FETCH_FLIGHT_DAILY_STATS_SUCCEEDED';
export const FETCH_FLIGHT_DAILY_STATS_FAILED =
  'FETCH_FLIGHT_DAILY_STATS_FAILED';

export const FETCH_FLIGHT_COMBINED_AUDIENCE_STATS_START =
  'FETCH_FLIGHT_COMBINED_AUDIENCE_STATS_START';
export const FETCH_FLIGHT_COMBINED_AUDIENCE_STATS_SUCCEEDED =
  'FETCH_FLIGHT_COMBINED_AUDIENCE_STATS_SUCCEEDED';
export const FETCH_FLIGHT_COMBINED_AUDIENCE_STATS_FAILED =
  'FETCH_FLIGHT_COMBINED_AUDIENCE_STATS_FAILED';

export const FETCH_FLIGHT_LIFETIME_STREAMING_STATS_START =
  'FETCH_FLIGHT_LIFETIME_STREAMING_STATS_START';
export const FETCH_FLIGHT_LIFETIME_STREAMING_STATS_SUCCEEDED =
  'FETCH_FLIGHT_LIFETIME_STREAMING_STATS_SUCCEEDED';
export const FETCH_FLIGHT_LIFETIME_STREAMING_STATS_FAILED =
  'FETCH_FLIGHT_LIFETIME_STREAMING_STATS_FAILED';
export const BUILD_FLIGHT_DOWNLOAD_START = 'BUILD_FLIGHT_DOWNLOAD_START';
export const BUILD_FLIGHT_DOWNLOAD_SUCCEEDED =
  'BUILD_FLIGHT_DOWNLOAD_SUCCEEDED';
export const BUILD_FLIGHT_DOWNLOAD_FAILED = 'BUILD_FLIGHT_DOWNLOAD_FAILED';

export const STOP_FLIGHT_START = 'STOP_FLIGHT_START';
export const STOP_FLIGHT_SUCCEEDED = 'STOP_FLIGHT_SUCCEEDED';
export const STOP_FLIGHT_FAILED = 'STOP_FLIGHT_FAILED';

export const PAUSE_RESUME_FLIGHT_START = 'PAUSE_RESUME_FLIGHT_START';
export const PAUSE_RESUME_FLIGHT_SUCCEEDED = 'PAUSE_RESUME_FLIGHT_SUCCEEDED';
export const PAUSE_RESUME_FLIGHT_FAILED = 'PAUSE_RESUME_FLIGHT_FAILED';

export interface FetchFlightsStartAction {
  type: typeof FETCH_FLIGHTS;
  payload: {
    queryParams: FlightsQueryParams;
    paginationType: PaginationType;
  };
}

export interface FetchFlightsSuccessAction {
  type: typeof FETCH_FLIGHTS_SUCCEEDED;
  payload: {
    response: FlightsApiResponse;
    paginationType: PaginationType;
  };
}

export interface FetchFlightsErrorAction {
  type: typeof FETCH_FLIGHTS_FAILED;
  payload: Error | Response;
}

export interface FetchFlightStartAction extends Action {
  type: typeof FETCH_FLIGHT_START;
  payload: {
    flightId: string;
    adAccountId: string;
  };
}

export interface FetchFlightSuccessAction extends Action {
  type: typeof FETCH_FLIGHT_SUCCEEDED;
  payload: FetchFlightPayload;
}

export interface FetchFlightErrorAction extends Action {
  type: typeof FETCH_FLIGHT_FAILED;
  payload: Error;
  error: Error;
}

export interface FetchStatsStartPayload {
  adAccountId: string;
  flightId: string;
}

export interface FetchFlightPayload {
  flight: GetFlightResponse;
  artistInfo?: { name: string; artistSpotifyLink: string };
}

export interface StopFlightPayload {
  flightId: string;
  adAccountId: string;
}

export interface PauseResumeFlightPayload {
  flightId: string;
  adAccountId: string;
  action: PauseResumeFlightActionType;
}

export interface FlightDownloadState {
  downloadUri: string;
}

export interface FetchFlightLifetimeStatsStartAction extends Action {
  type: typeof FETCH_FLIGHT_LIFETIME_STATS_START;
  payload: FetchStatsStartPayload;
}

export interface FetchFlightLifetimeStatsSuccessAction extends Action {
  type: typeof FETCH_FLIGHT_LIFETIME_STATS_SUCCEEDED;
  payload: LifetimeStatsResponse;
}

export interface FetchFlightLifetimeStatsErrorAction extends Action {
  type: typeof FETCH_FLIGHT_LIFETIME_STATS_FAILED;
  payload: Error;
  error: Error;
}

export interface FetchFlightDailyStatsStartAction extends Action {
  type: typeof FETCH_FLIGHT_DAILY_STATS_START;
  payload: FetchStatsStartPayload;
}

export interface FetchFlightDailyStatsSuccessAction extends Action {
  type: typeof FETCH_FLIGHT_DAILY_STATS_SUCCEEDED;
  payload: CombinedDailyStatResponse;
}

export interface FetchFlightDailyStatsErrorAction extends Action {
  type: typeof FETCH_FLIGHT_DAILY_STATS_FAILED;
  payload: Error;
  error: Error;
}

export interface FetchFlightCombinedAudienceStatsStartAction extends Action {
  type: typeof FETCH_FLIGHT_COMBINED_AUDIENCE_STATS_START;
  payload: FetchStatsStartPayload;
}

export interface FetchFlightCombinedAudienceStatsSuccessAction extends Action {
  type: typeof FETCH_FLIGHT_COMBINED_AUDIENCE_STATS_SUCCEEDED;
  payload: CombinedAudienceStatsResponse;
}

export interface FetchFlightCombinedAudienceStatsErrorAction extends Action {
  type: typeof FETCH_FLIGHT_COMBINED_AUDIENCE_STATS_FAILED;
  payload: string;
  error: string;
}

export interface FetchFlightLifetimeStreamingStatsStartAction extends Action {
  type: typeof FETCH_FLIGHT_LIFETIME_STREAMING_STATS_START;
  payload: FetchStatsStartPayload;
}

export interface FetchFlightLifetimeStreamingStatsSuccessAction extends Action {
  type: typeof FETCH_FLIGHT_LIFETIME_STREAMING_STATS_SUCCEEDED;
  payload: LifetimeStreamingConversionStatsResponse;
}

export interface FetchFlightLifetimeStreamingStatsErrorAction extends Action {
  type: typeof FETCH_FLIGHT_LIFETIME_STREAMING_STATS_FAILED;
  payload: Error;
  error: Error;
}

export interface BuildFlightDownloadStartAction extends Action {
  type: typeof BUILD_FLIGHT_DOWNLOAD_START;
}

export interface BuildFlightDownloadSuccessAction extends Action {
  type: typeof BUILD_FLIGHT_DOWNLOAD_SUCCEEDED;
  payload: FlightDownloadState;
}

export interface BuildFlightDownloadErrorAction extends Action {
  type: typeof BUILD_FLIGHT_DOWNLOAD_FAILED;
  payload: Error;
  error: Error;
  meta: any;
}

export interface StopFlightStartAction extends Action {
  type: typeof STOP_FLIGHT_START;
  payload: StopFlightPayload;
}

export interface StopFlightSuccessAction extends Action {
  type: typeof STOP_FLIGHT_SUCCEEDED;
}

export interface StopFlightErrorAction extends FetchErrorAction {
  type: typeof STOP_FLIGHT_FAILED;
}

export interface PauseResumeFlightStartAction extends Action {
  type: typeof PAUSE_RESUME_FLIGHT_START;
  payload: PauseResumeFlightPayload;
}

export interface PauseResumeFlightSuccessAction extends Action {
  type: typeof PAUSE_RESUME_FLIGHT_SUCCEEDED;
}

export interface PauseResumeFlightErrorAction extends FetchErrorAction {
  type: typeof PAUSE_RESUME_FLIGHT_FAILED;
  meta: MetaResponse & PauseResumeFlightPayload;
}

export type PauseResumeFlightAction =
  | PauseResumeFlightStartAction
  | PauseResumeFlightSuccessAction
  | PauseResumeFlightErrorAction;

export type FetchFlightsAction =
  | PauseResumeFlightAction
  | FetchFlightsStartAction
  | FetchFlightsSuccessAction
  | FetchFlightsErrorAction;

export type FetchFlightAction =
  | FetchFlightStartAction
  | FetchFlightSuccessAction
  | FetchFlightErrorAction;

export type FetchFlightLifetimeStatsAction =
  | FetchFlightLifetimeStatsStartAction
  | FetchFlightLifetimeStatsSuccessAction
  | FetchFlightLifetimeStatsErrorAction;

export type FetchFlightDailyStatsAction =
  | FetchFlightDailyStatsStartAction
  | FetchFlightDailyStatsSuccessAction
  | FetchFlightDailyStatsErrorAction;

export type FetchFlightCombinedAudienceStatsAction =
  | FetchFlightCombinedAudienceStatsStartAction
  | FetchFlightCombinedAudienceStatsSuccessAction
  | FetchFlightCombinedAudienceStatsErrorAction;

export type FetchFlightLifetimeStreamingStatsAction =
  | FetchFlightLifetimeStreamingStatsStartAction
  | FetchFlightLifetimeStreamingStatsSuccessAction
  | FetchFlightLifetimeStreamingStatsErrorAction;

export type BuildFlightDownloadAction =
  | BuildFlightDownloadStartAction
  | BuildFlightDownloadSuccessAction
  | BuildFlightDownloadErrorAction;

export type StopFlightAction =
  | StopFlightStartAction
  | StopFlightSuccessAction
  | StopFlightErrorAction;
