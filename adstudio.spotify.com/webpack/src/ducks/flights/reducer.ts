import { combineReducers, Reducer } from 'redux';

import { createAsyncReducers } from 'utils/asyncDucksHelpers';
import { extendAndFlagFrequencyCapSet } from 'utils/campaignHierarchy/frequencyCaps';
import { mapPaginationResponse } from 'utils/campaignHierarchy/paginationHelpers';

import {
  BUILD_FLIGHT_DOWNLOAD_FAILED,
  BUILD_FLIGHT_DOWNLOAD_START,
  BUILD_FLIGHT_DOWNLOAD_SUCCEEDED,
  BuildFlightDownloadAction,
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
  FetchFlightAction,
  FetchFlightCombinedAudienceStatsAction,
  FetchFlightCombinedAudienceStatsErrorAction,
  FetchFlightCombinedAudienceStatsStartAction,
  FetchFlightCombinedAudienceStatsSuccessAction,
  FetchFlightDailyStatsAction,
  FetchFlightDailyStatsErrorAction,
  FetchFlightDailyStatsStartAction,
  FetchFlightDailyStatsSuccessAction,
  FetchFlightErrorAction,
  FetchFlightLifetimeStatsAction,
  FetchFlightLifetimeStatsErrorAction,
  FetchFlightLifetimeStatsStartAction,
  FetchFlightLifetimeStatsSuccessAction,
  FetchFlightLifetimeStreamingStatsAction,
  FetchFlightLifetimeStreamingStatsErrorAction,
  FetchFlightLifetimeStreamingStatsStartAction,
  FetchFlightLifetimeStreamingStatsSuccessAction,
  FetchFlightsAction,
  FetchFlightStartAction,
  FetchFlightSuccessAction,
  FlightDownloadState,
  PAUSE_RESUME_FLIGHT_FAILED,
  PAUSE_RESUME_FLIGHT_START,
  PAUSE_RESUME_FLIGHT_SUCCEEDED,
  PauseResumeFlightErrorAction,
  PauseResumeFlightStartAction,
  PauseResumeFlightSuccessAction,
  STOP_FLIGHT_FAILED,
  STOP_FLIGHT_START,
  STOP_FLIGHT_SUCCEEDED,
  StopFlightErrorAction,
  StopFlightStartAction,
  StopFlightSuccessAction,
} from './types';
import { PaginationType } from 'types/common/pagination';
import { Paging } from 'types/common/state/api';
import {
  FlightCombinedAudienceStats,
  FlightCombinedDailyStats,
  FlightDetails,
  FlightLifetimeStats,
  FlightLifetimeStreamingConversionStats,
  PauseResumeFlightActionType,
} from 'types/common/state/api/flight';
import { FlightsCatalogueEntity } from 'types/common/state/api/flights';

export interface FlightsCatalogueState {
  items: FlightsCatalogueEntity[];
  loading: boolean;
  paging: Paging;
  error?: Response | Error; // should be Response unless an Error was unintentionally thrown from saga
}

export interface FlightDetailsState extends FlightDetails {
  artistName?: string;
  artistSpotifyLink?: string;
}

export interface FlightLifetimeStatsState extends FlightLifetimeStats {}

export interface FlightDailyStatsState extends FlightCombinedDailyStats {}

export interface FlightCombinedAudienceStatsState
  extends FlightCombinedAudienceStats {}

export interface FlightLifetimeStreamingStatsState
  extends FlightLifetimeStreamingConversionStats {}

export interface FlightsState {
  flightsCatalogue: FlightsCatalogueState;
  flight: FlightDetailsState;

  fetchingFlight: boolean;
  fetchFlightSuccess: boolean;
  fetchFlightError: string | boolean;

  flightLifetimeStats: FlightLifetimeStatsState;
  fetchingFlightLifetimeStats: boolean;
  fetchFlightLifetimeStatsSuccess: boolean;
  fetchFlightLifetimeStatsError: string | boolean;

  flightDailyStats: FlightDailyStatsState;
  fetchingFlightDailyStats: boolean;
  fetchFlightDailyStatsSuccess: boolean;
  fetchFlightDailyStatsError: string | boolean;

  flightCombinedAudienceStats: FlightCombinedAudienceStatsState;
  fetchingFlightCombinedAudienceStats: boolean;
  fetchFlightCombinedAudienceStatsSuccess: boolean;
  fetchFlightCombinedAudienceStatsError: string | boolean;

  flightLifetimeStreamingStats: FlightLifetimeStreamingStatsState;
  fetchingFlightLifetimeStreamingStats: boolean;
  fetchFlightLifetimeStreamingStatsSuccess: boolean;
  fetchFlightLifetimeStreamingStatsError: string | boolean;

  flightDownload: FlightDownloadState;
  buildingFlightDownload: boolean;
  buildFlightDownloadSuccess: boolean;
  buildFlightDownloadError: string | boolean;

  stoppingFlight: boolean;
  stopFlightSuccess: boolean;
  stopFlightError: string | boolean;

  pausingResumingFlight: boolean;
  pauseResumeFlightSuccess: boolean;
  pauseResumeFlightError: string | boolean;
}

export const flightsDefaultState: FlightsCatalogueState = {
  items: [],
  loading: false,
  paging: {
    limit: 20,
    offset: 0,
    total: 0,
  },
};

export const flightsReducer = (
  state: FlightsCatalogueState = flightsDefaultState,
  action: FetchFlightsAction,
) => {
  let updatedItems;
  switch (action.type) {
    case PAUSE_RESUME_FLIGHT_START:
      updatedItems = state.items.map(item => {
        if (action.payload.flightId === item.flightId) {
          item.isActive =
            action.payload.action === PauseResumeFlightActionType.RESUME;
        }
        return item;
      });
      return {
        ...state,
        items: [...updatedItems],
      };
    case PAUSE_RESUME_FLIGHT_FAILED:
      updatedItems = state.items.map(item => {
        if (action.meta.flightId === item.flightId) {
          item.isActive =
            action.meta.action !== PauseResumeFlightActionType.RESUME;
        }
        return item;
      });
      return {
        ...state,
        items: [...updatedItems],
      };
    case FETCH_FLIGHTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_FLIGHTS:
      return {
        ...state,
        loading: true,
      };

    case FETCH_FLIGHTS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        items:
          action.payload.paginationType === PaginationType.INFINITE_SCROLL
            ? [...state.items, ...action.payload.response.items]
            : action.payload.response.items,
        paging: mapPaginationResponse(action.payload.response.paging),
      };

    default:
      return state;
  }
};

const flightDefaultState: FlightDetailsState = {};

const flightReducer = (
  state: FlightDetailsState = flightDefaultState,
  action: FetchFlightAction,
): FlightDetailsState => {
  switch (action.type) {
    case FETCH_FLIGHT_START:
    case FETCH_FLIGHT_FAILED:
      return flightDefaultState;
    case FETCH_FLIGHT_SUCCEEDED:
      return {
        flightId: action.payload.flight.flightId!,
        adAccountId: action.payload.flight.adAccountId!,
        name: action.payload.flight.name!,
        dateBegin: action.payload.flight.dateBegin,
        dateEnd: action.payload.flight.dateEnd,
        flightState: action.payload.flight.flightState,
        frequencyCaps: action.payload.flight.frequencyCaps,
        targeting: action.payload.flight.targeting,
        totalBudget: action.payload.flight.totalBudget,
        objective: action.payload.flight.objective!,
        adId: action.payload.flight.adId,
        artistId: action.payload.flight.artistId!,
        campaignId: action.payload.flight.campaignId!,
        pricingModel: action.payload.flight.pricingModel!,
        format: action.payload.flight.format!,
        serveOnMegaphone: !!action.payload.flight.serveOnMegaphone,
        aspectRatio: action.payload.flight.aspectRatio!,
        isActive: action.payload.flight.isActive!,
        artistName: action.payload.artistInfo
          ? action.payload.artistInfo!.name
          : '',
        artistSpotifyLink: action.payload.artistInfo
          ? action.payload.artistInfo!.artistSpotifyLink
          : '',
        campaign: {
          ...action.payload.flight.campaign,
          artistName: action.payload.artistInfo?.name,
        },
        ...extendAndFlagFrequencyCapSet(action.payload.flight.frequencyCaps),
      };
    default:
      return state;
  }
};

const fetchingFlight = 'fetchingFlight';
const fetchFlightSuccess = 'fetchFlightSuccess';
const fetchFlightError = 'fetchFlightError';

const flightReducers = createAsyncReducers<
  FetchFlightStartAction,
  FetchFlightSuccessAction,
  FetchFlightErrorAction
>(
  fetchingFlight,
  FETCH_FLIGHT_START,
  fetchFlightSuccess,
  FETCH_FLIGHT_SUCCEEDED,
  fetchFlightError,
  FETCH_FLIGHT_FAILED,
);

const fetchingFlightLifetimeStats = 'fetchingFlightLifetimeStats';
const fetchFlightLifetimeStatsSuccess = 'fetchFlightLifetimeStatsSuccess';
const fetchFlightLifetimeStatsError = 'fetchFlightLifetimeStatsError';

const flightLifetimeStatsReducers = createAsyncReducers<
  FetchFlightLifetimeStatsStartAction,
  FetchFlightLifetimeStatsSuccessAction,
  FetchFlightLifetimeStatsErrorAction
>(
  fetchingFlightLifetimeStats,
  FETCH_FLIGHT_LIFETIME_STATS_START,
  fetchFlightLifetimeStatsSuccess,
  FETCH_FLIGHT_LIFETIME_STATS_SUCCEEDED,
  fetchFlightLifetimeStatsError,
  FETCH_FLIGHT_LIFETIME_STATS_FAILED,
);

const flightLifetimeStatsDefaultState: FlightLifetimeStatsState = {};

const flightLifetimeStatsReducer = (
  state: FlightLifetimeStatsState = flightLifetimeStatsDefaultState,
  action: FetchFlightLifetimeStatsAction,
): FlightLifetimeStatsState => {
  let castAction;
  switch (action.type) {
    case FETCH_FLIGHT_LIFETIME_STATS_START:
    case FETCH_FLIGHT_LIFETIME_STATS_FAILED:
      return flightLifetimeStatsDefaultState;
    case FETCH_FLIGHT_LIFETIME_STATS_SUCCEEDED:
      castAction = action as FetchFlightLifetimeStatsSuccessAction;
      return {
        lifetimeCpmStats: castAction.payload.lifetimeCpmStats,
        lifetimeCpclStats: castAction.payload.lifetimeCpclStats,
      };
    default:
      return state;
  }
};

const fetchingFlightDailyStats = 'fetchingFlightDailyStats';
const fetchFlightDailyStatsSuccess = 'fetchFlightDailyStatsSuccess';
const fetchFlightDailyStatsError = 'fetchFlightDailyStatsError';

const flightDailyStatsReducers = createAsyncReducers<
  FetchFlightDailyStatsStartAction,
  FetchFlightDailyStatsSuccessAction,
  FetchFlightDailyStatsErrorAction
>(
  fetchingFlightDailyStats,
  FETCH_FLIGHT_DAILY_STATS_START,
  fetchFlightDailyStatsSuccess,
  FETCH_FLIGHT_DAILY_STATS_SUCCEEDED,
  fetchFlightDailyStatsError,
  FETCH_FLIGHT_DAILY_STATS_FAILED,
);

const flightDailyStatsDefaultState: FlightDailyStatsState = {};

const flightDailyStatsReducer = (
  state: FlightDailyStatsState = flightDailyStatsDefaultState,
  action: FetchFlightDailyStatsAction,
): FlightDailyStatsState => {
  let castAction;
  switch (action.type) {
    case FETCH_FLIGHT_DAILY_STATS_START:
    case FETCH_FLIGHT_DAILY_STATS_FAILED:
      return flightDailyStatsDefaultState;
    case FETCH_FLIGHT_DAILY_STATS_SUCCEEDED:
      castAction = action as FetchFlightDailyStatsSuccessAction;
      return {
        flightData: castAction.payload.flightData,
        dailyCpmStats: castAction.payload.dailyCpmStats!,
        dailyCpclStats: castAction.payload.dailyCpclStats!,
      };
    default:
      return state;
  }
};

const fetchingFlightCombinedAudienceStats =
  'fetchingFlightCombinedAudienceStats';
const fetchFlightCombinedAudienceStatsSuccess =
  'fetchFlightCombinedAudienceStatsSuccess';
const fetchFlightCombinedAudienceStatsError =
  'fetchFlightCombinedAudienceStatsError';

const flightCombinedAudienceStatsReducers = createAsyncReducers<
  FetchFlightCombinedAudienceStatsStartAction,
  FetchFlightCombinedAudienceStatsSuccessAction,
  FetchFlightCombinedAudienceStatsErrorAction
>(
  fetchingFlightCombinedAudienceStats,
  FETCH_FLIGHT_COMBINED_AUDIENCE_STATS_START,
  fetchFlightCombinedAudienceStatsSuccess,
  FETCH_FLIGHT_COMBINED_AUDIENCE_STATS_SUCCEEDED,
  fetchFlightCombinedAudienceStatsError,
  FETCH_FLIGHT_COMBINED_AUDIENCE_STATS_FAILED,
);

const flightCombinedAudienceStatsDefaultState: FlightCombinedAudienceStatsState = {};

const flightCombinedAudienceStatsReducer = (
  state: FlightCombinedAudienceStatsState = flightCombinedAudienceStatsDefaultState,
  action: FetchFlightCombinedAudienceStatsAction,
): FlightCombinedAudienceStatsState => {
  let castAction;
  switch (action.type) {
    case FETCH_FLIGHT_COMBINED_AUDIENCE_STATS_START:
    case FETCH_FLIGHT_COMBINED_AUDIENCE_STATS_FAILED:
      return flightCombinedAudienceStatsDefaultState;
    case FETCH_FLIGHT_COMBINED_AUDIENCE_STATS_SUCCEEDED:
      castAction = action as FetchFlightCombinedAudienceStatsSuccessAction;
      return {
        platformInsights: castAction.payload.platformInsights,
        ageInsights: castAction.payload.ageInsights,
        genderInsights: castAction.payload.genderInsights,
        genreInsights: castAction.payload.genreInsights,
      };
    default:
      return state;
  }
};

const fetchingFlightLifetimeStreamingStats =
  'fetchingFlightLifetimeStreamingStats';
const fetchFlightLifetimeStreamingStatsSuccess =
  'fetchFlightLifetimeStreamingStatsSuccess';
const fetchFlightLifetimeStreamingStatsError =
  'fetchFlightLifetimeStreamingStatsError';

const flightLifetimeStreamingStatsReducers = createAsyncReducers<
  FetchFlightLifetimeStreamingStatsStartAction,
  FetchFlightLifetimeStreamingStatsSuccessAction,
  FetchFlightLifetimeStreamingStatsErrorAction
>(
  fetchingFlightLifetimeStreamingStats,
  FETCH_FLIGHT_LIFETIME_STREAMING_STATS_START,
  fetchFlightLifetimeStreamingStatsSuccess,
  FETCH_FLIGHT_LIFETIME_STREAMING_STATS_SUCCEEDED,
  fetchFlightLifetimeStreamingStatsError,
  FETCH_FLIGHT_LIFETIME_STREAMING_STATS_FAILED,
);

const flightLifetimeStreamingStatsDefaultState: FlightLifetimeStreamingStatsState = {};

const flightLifetimeStreamingStatsReducer = (
  state: FlightLifetimeStreamingStatsState = flightLifetimeStreamingStatsDefaultState,
  action: FetchFlightLifetimeStreamingStatsAction,
): FlightLifetimeStreamingStatsState => {
  let castAction;
  switch (action.type) {
    case FETCH_FLIGHT_LIFETIME_STREAMING_STATS_START:
    case FETCH_FLIGHT_LIFETIME_STREAMING_STATS_FAILED:
      return flightLifetimeStreamingStatsDefaultState;
    case FETCH_FLIGHT_LIFETIME_STREAMING_STATS_SUCCEEDED:
      castAction = action as FetchFlightLifetimeStreamingStatsSuccessAction;
      return {
        listeners: castAction.payload.listeners,
        newListeners: castAction.payload.newListeners,
        conversionRate: castAction.payload.conversionRate,
        newListenerConversionRate: castAction.payload.newListenerConversionRate,
        streams: castAction.payload.streams,
        newListenerStreams: castAction.payload.newListenerStreams,
        intentRate: castAction.payload.intentRate,
        averageStreams: castAction.payload.averageStreams,
        newListenerAverageStreams: castAction.payload.newListenerAverageStreams,
      };
    default:
      return state;
  }
};

const buildingFlightDownload = 'buildingFlightDownload';
const buildFlightDownloadSuccess = 'buildFlightDownloadSuccess';
const buildFlightDownloadError = 'fetchFlightLifetimeStreamingStatsError';

const buildFlightDownloadReducers = createAsyncReducers<
  BuildFlightDownloadStartAction,
  BuildFlightDownloadSuccessAction,
  BuildFlightDownloadErrorAction
>(
  buildingFlightDownload,
  BUILD_FLIGHT_DOWNLOAD_START,
  buildFlightDownloadSuccess,
  BUILD_FLIGHT_DOWNLOAD_SUCCEEDED,
  buildFlightDownloadError,
  BUILD_FLIGHT_DOWNLOAD_FAILED,
);

export const flightDownloadDefaultState: FlightDownloadState = {
  downloadUri: '',
};

const flightDownloadReducer = (
  state: FlightDownloadState = flightDownloadDefaultState,
  action: BuildFlightDownloadAction,
): FlightDownloadState => {
  switch (action.type) {
    case BUILD_FLIGHT_DOWNLOAD_SUCCEEDED:
      return {
        ...state,
        downloadUri: action.payload.downloadUri,
      };

    default:
      return state;
  }
};

const stoppingFlight = 'stoppingFlight';
const stopFlightSuccess = 'stopFlightSuccess';
const stopFlightError = 'stopFlightError';

const stopFlightReducer = createAsyncReducers<
  StopFlightStartAction,
  StopFlightSuccessAction,
  StopFlightErrorAction
>(
  stoppingFlight,
  STOP_FLIGHT_START,
  stopFlightSuccess,
  STOP_FLIGHT_SUCCEEDED,
  stopFlightError,
  STOP_FLIGHT_FAILED,
);

const pausingResumingFlight = 'pausingResumingFlight';
const pauseResumeFlightSuccess = 'pauseResumeFlightSuccess';
const pauseResumeFlightError = 'pauseResumeFlightError';

const pauseResumeFlightReducer = createAsyncReducers<
  PauseResumeFlightStartAction,
  PauseResumeFlightSuccessAction,
  PauseResumeFlightErrorAction
>(
  pausingResumingFlight,
  PAUSE_RESUME_FLIGHT_START,
  pauseResumeFlightSuccess,
  PAUSE_RESUME_FLIGHT_SUCCEEDED,
  pauseResumeFlightError,
  PAUSE_RESUME_FLIGHT_FAILED,
);

export default combineReducers<FlightsState>({
  flightsCatalogue: flightsReducer,

  flight: flightReducer,
  fetchingFlight: flightReducers[fetchingFlight] as Reducer<
    boolean,
    FetchFlightStartAction
  >,
  fetchFlightSuccess: flightReducers[fetchFlightSuccess] as Reducer<
    boolean,
    FetchFlightSuccessAction
  >,
  fetchFlightError: flightReducers[fetchFlightError] as Reducer<
    string | boolean,
    FetchFlightErrorAction
  >,

  flightLifetimeStats: flightLifetimeStatsReducer,
  fetchingFlightLifetimeStats: flightLifetimeStatsReducers[
    fetchingFlightLifetimeStats
  ] as Reducer<boolean, FetchFlightLifetimeStatsStartAction>,
  fetchFlightLifetimeStatsSuccess: flightLifetimeStatsReducers[
    fetchFlightLifetimeStatsSuccess
  ] as Reducer<boolean, FetchFlightLifetimeStatsSuccessAction>,
  fetchFlightLifetimeStatsError: flightLifetimeStatsReducers[
    fetchFlightLifetimeStatsError
  ] as Reducer<string | boolean, FetchFlightLifetimeStatsErrorAction>,

  flightDailyStats: flightDailyStatsReducer,
  fetchingFlightDailyStats: flightDailyStatsReducers[
    fetchingFlightDailyStats
  ] as Reducer<boolean, FetchFlightDailyStatsStartAction>,
  fetchFlightDailyStatsSuccess: flightDailyStatsReducers[
    fetchFlightDailyStatsSuccess
  ] as Reducer<boolean, FetchFlightDailyStatsSuccessAction>,
  fetchFlightDailyStatsError: flightDailyStatsReducers[
    fetchFlightDailyStatsError
  ] as Reducer<string | boolean, FetchFlightDailyStatsErrorAction>,

  flightCombinedAudienceStats: flightCombinedAudienceStatsReducer,
  fetchingFlightCombinedAudienceStats: flightCombinedAudienceStatsReducers[
    fetchingFlightCombinedAudienceStats
  ] as Reducer<boolean, FetchFlightCombinedAudienceStatsStartAction>,
  fetchFlightCombinedAudienceStatsSuccess: flightCombinedAudienceStatsReducers[
    fetchFlightCombinedAudienceStatsSuccess
  ] as Reducer<boolean, FetchFlightCombinedAudienceStatsSuccessAction>,
  fetchFlightCombinedAudienceStatsError: flightCombinedAudienceStatsReducers[
    fetchFlightCombinedAudienceStatsError
  ] as Reducer<string | boolean, FetchFlightCombinedAudienceStatsErrorAction>,

  flightLifetimeStreamingStats: flightLifetimeStreamingStatsReducer,
  fetchingFlightLifetimeStreamingStats: flightLifetimeStreamingStatsReducers[
    fetchingFlightLifetimeStreamingStats
  ] as Reducer<boolean, FetchFlightLifetimeStreamingStatsStartAction>,
  fetchFlightLifetimeStreamingStatsSuccess: flightLifetimeStreamingStatsReducers[
    fetchFlightLifetimeStreamingStatsSuccess
  ] as Reducer<boolean, FetchFlightLifetimeStreamingStatsSuccessAction>,
  fetchFlightLifetimeStreamingStatsError: flightLifetimeStreamingStatsReducers[
    fetchFlightLifetimeStreamingStatsError
  ] as Reducer<string | boolean, FetchFlightLifetimeStreamingStatsErrorAction>,

  flightDownload: flightDownloadReducer,
  buildingFlightDownload: buildFlightDownloadReducers[
    buildingFlightDownload
  ] as Reducer<boolean, BuildFlightDownloadStartAction>,
  buildFlightDownloadSuccess: buildFlightDownloadReducers[
    buildFlightDownloadSuccess
  ] as Reducer<boolean, BuildFlightDownloadSuccessAction>,
  buildFlightDownloadError: buildFlightDownloadReducers[
    buildFlightDownloadError
  ] as Reducer<string | boolean, BuildFlightDownloadErrorAction>,

  stoppingFlight: stopFlightReducer[stoppingFlight] as Reducer<
    boolean,
    StopFlightStartAction
  >,
  stopFlightSuccess: stopFlightReducer[stopFlightSuccess] as Reducer<
    boolean,
    StopFlightSuccessAction
  >,
  stopFlightError: stopFlightReducer[stopFlightError] as Reducer<
    string | boolean,
    StopFlightErrorAction
  >,

  pausingResumingFlight: pauseResumeFlightReducer[
    pausingResumingFlight
  ] as Reducer<boolean, PauseResumeFlightStartAction>,
  pauseResumeFlightSuccess: pauseResumeFlightReducer[
    pauseResumeFlightSuccess
  ] as Reducer<boolean, PauseResumeFlightSuccessAction>,
  pauseResumeFlightError: pauseResumeFlightReducer[
    pauseResumeFlightError
  ] as Reducer<string | boolean, PauseResumeFlightErrorAction>,
});
