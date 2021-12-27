import debug from 'debug';
import isEmpty from 'lodash/isEmpty';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { isUndefined } from 'util';

import * as Actions from './actions';
import * as artistActions from 'ducks/artist/actions';
import { getCampaignSuccess } from 'ducks/campaigns/actions';
import {
  getFlightCombinedAudienceStats,
  getFlightDailyStats,
  getFlightLifetimeStats,
  getFlightLifetimeStreamingStats,
  getFlightsState,
} from './selectors';
import {
  AUDIENCE_STATS_KEY,
  DAILY_STATS_KEY,
  getActiveFlightStorageKey,
  LIFETIME_STATS_KEY,
  retrieveActiveFlightStatsByKey,
  storeActiveFlightStatsByKey,
  STREAMING_CONVERSION_STATS_KEY,
} from 'utils/storeActiveFlightStats';

import {
  getLifetimeStatsForPricingModel,
  getStatsForPricingModel,
} from 'components/FlightDetails/ReportsTab/chart-common/ChartUtils';

import * as artistApi from 'api/artist';
import * as Api from 'api/flights';

import { wait } from 'utils/asyncHelpers';
import {
  formatFlightFrequencyCapApiResponseToReduxFormat,
  NO_STATS_AVAILABLE_STATUS,
} from 'utils/flightHelpers';
import { createDownloadUri } from 'utils/flightStatsCsvHelper';

import { FlightsState } from './reducer';

import {
  CombinedAudienceStatsResponse,
  CombinedDailyStatResponse,
  GetFlightResponse,
  LifetimeStatsResponse,
  LifetimeStreamingConversionStatsResponse,
} from '../../types/common/state/api/flight';
import {
  BUILD_FLIGHT_DOWNLOAD_START,
  FETCH_FLIGHT_COMBINED_AUDIENCE_STATS_START,
  FETCH_FLIGHT_DAILY_STATS_START,
  FETCH_FLIGHT_LIFETIME_STATS_START,
  FETCH_FLIGHT_LIFETIME_STREAMING_STATS_START,
  FETCH_FLIGHT_START,
  FETCH_FLIGHTS,
  FetchFlightCombinedAudienceStatsStartAction,
  FetchFlightDailyStatsStartAction,
  FetchFlightLifetimeStatsStartAction,
  FetchFlightLifetimeStreamingStatsStartAction,
  FetchFlightPayload,
  FetchFlightsStartAction,
  FetchFlightStartAction,
  PAUSE_RESUME_FLIGHT_START,
  PauseResumeFlightStartAction,
  STOP_FLIGHT_START,
  StopFlightStartAction,
} from './types';
import { GetCampaignResponse } from 'types/common/state/api/campaign';
import { DailyCPCL, DailyCPM } from 'types/common/state/api/flush';

const log = debug('sagas:stats');

export function* fetchFlights(action: FetchFlightsStartAction) {
  try {
    const flights = yield call(Api.fetchFlights, action.payload.queryParams);
    yield put(
      Actions.getFlightsSuccess(flights, action.payload.paginationType),
    );
  } catch (e) {
    yield put(Actions.getFlightsFailed(e));
  }
}

export function* fetchFlight(action: FetchFlightStartAction) {
  let artistInfo: SpotifyApi.Artist | undefined;

  try {
    const flight: GetFlightResponse = yield call(
      Api.fetchFlight,
      action.payload.flightId,
      action.payload.adAccountId,
    );
    const campaign: GetCampaignResponse = flight.campaign;

    if (flight.artistId) {
      try {
        artistInfo = yield call(artistApi.fetchArtist, flight.artistId);
      } catch (res) {
        yield put(
          artistActions.fetchArtistFailed(
            res.statusText,
            flight.artistId,
            flight.flightId,
          ),
        );
      }
    }

    yield put(
      getCampaignSuccess({
        campaign,
        artistInfo,
      }),
    );

    const payload: FetchFlightPayload = { flight: flight };
    if (artistInfo) {
      payload.artistInfo = {
        name: artistInfo.name,
        artistSpotifyLink: (artistInfo.external_urls || {}).spotify,
      };
    }
    if (flight.frequencyCaps) {
      payload.flight.frequencyCaps = formatFlightFrequencyCapApiResponseToReduxFormat(
        flight.frequencyCaps,
      );
    }
    yield put(Actions.getFlightSuccess(payload));
  } catch (e) {
    yield put(Actions.getFlightFailed(e));
  }
}

export function* fetchFlightLifetimeStats(
  action: FetchFlightLifetimeStatsStartAction,
) {
  try {
    const flightLifetimeStats = yield call(
      retrieveActiveFlightStatsByKey,
      getActiveFlightStorageKey(
        action.payload.adAccountId,
        action.payload.flightId,
      ),
      LIFETIME_STATS_KEY,
    );

    if (flightLifetimeStats) {
      yield put(Actions.getFlightLifetimeStatsSuccess(flightLifetimeStats));
    } else {
      const stats: LifetimeStatsResponse = yield call(
        Api.fetchLifetimeStats,
        action.payload.adAccountId,
        action.payload.flightId,
      );

      yield call(
        storeActiveFlightStatsByKey,
        getActiveFlightStorageKey(
          action.payload.adAccountId,
          action.payload.flightId,
        ),
        LIFETIME_STATS_KEY,
        stats,
      );

      yield put(Actions.getFlightLifetimeStatsSuccess(stats));
    }
  } catch (e) {
    yield put(Actions.getFlightLifetimeStatsFailed(e));
  }
}

export function* fetchFlightDailyStats(
  action: FetchFlightDailyStatsStartAction,
) {
  try {
    const flightDailyStats = yield call(
      retrieveActiveFlightStatsByKey,
      getActiveFlightStorageKey(
        action.payload.adAccountId,
        action.payload.flightId,
      ),

      DAILY_STATS_KEY,
    );

    if (flightDailyStats) {
      yield put(Actions.getFlightDailyStatsSuccess(flightDailyStats));
    } else {
      const stats: CombinedDailyStatResponse = yield call(
        Api.fetchAllDailyStats,
        action.payload.adAccountId,
        action.payload.flightId,
      );
      yield call(
        storeActiveFlightStatsByKey,
        getActiveFlightStorageKey(
          action.payload.adAccountId,
          action.payload.flightId,
        ),
        DAILY_STATS_KEY,
        stats,
      );
      yield put(Actions.getFlightDailyStatsSuccess(stats));
    }

    yield put(Actions.buildFlightDownload());
  } catch (e) {
    yield put(Actions.getFlightDailyStatsFailed(e));
  }
}

export function* fetchFlightCombinedAudienceStats(
  action: FetchFlightCombinedAudienceStatsStartAction,
) {
  try {
    const flightAudienceStats = yield call(
      retrieveActiveFlightStatsByKey,
      getActiveFlightStorageKey(
        action.payload.adAccountId,
        action.payload.flightId,
      ),

      AUDIENCE_STATS_KEY,
    );

    if (flightAudienceStats) {
      yield put(
        Actions.getFlightCombinedAudienceStatsSuccess(flightAudienceStats),
      );
    } else {
      const stats: CombinedAudienceStatsResponse = yield call(
        Api.fetchCombinedAudienceInsights,
        action.payload.adAccountId,
        action.payload.flightId,
      );
      yield call(
        storeActiveFlightStatsByKey,
        getActiveFlightStorageKey(
          action.payload.adAccountId,
          action.payload.flightId,
        ),

        AUDIENCE_STATS_KEY,
        stats,
      );
      yield put(Actions.getFlightCombinedAudienceStatsSuccess(stats));
    }
  } catch (e) {
    switch (e.status) {
      case 403:
        yield put(
          Actions.getFlightCombinedAudienceStatsFailed(
            NO_STATS_AVAILABLE_STATUS,
          ),
        );
        return;
      default:
    }
    yield put(Actions.getFlightCombinedAudienceStatsFailed(e));
  }
}

export function* fetchFlightLifetimeStreamingStats(
  action: FetchFlightLifetimeStreamingStatsStartAction,
) {
  try {
    const flightStreamingStats = yield call(
      retrieveActiveFlightStatsByKey,
      getActiveFlightStorageKey(
        action.payload.adAccountId,
        action.payload.flightId,
      ),

      STREAMING_CONVERSION_STATS_KEY,
    );

    if (flightStreamingStats) {
      yield put(
        Actions.getFlightLifetimeStreamingStatsSuccess(flightStreamingStats),
      );
    } else {
      const stats: LifetimeStreamingConversionStatsResponse = yield call(
        Api.fetchLifetimeStreamingConversionStats,
        action.payload.adAccountId,
        action.payload.flightId,
      );
      yield call(
        storeActiveFlightStatsByKey,
        getActiveFlightStorageKey(
          action.payload.adAccountId,
          action.payload.flightId,
        ),

        STREAMING_CONVERSION_STATS_KEY,
        stats,
      );

      yield put(Actions.getFlightLifetimeStreamingStatsSuccess(stats));
    }
  } catch (e) {
    yield put(Actions.getFlightLifetimeStreamingStatsFailed(e));
  }
}

export function* buildDownloadUri() {
  let retries = 0;
  let flightsState: FlightsState = yield select(getFlightsState);

  let areAllDailyFetched = flightsState.fetchFlightDailyStatsSuccess;
  let isLifetimeFetched = flightsState.fetchFlightLifetimeStatsSuccess;
  let isSCMLifetimeFetched =
    flightsState.fetchFlightLifetimeStreamingStatsSuccess;
  let haveAudienceStatsFetched =
    flightsState.fetchFlightCombinedAudienceStatsSuccess;
  let isFlightFetched = flightsState.fetchFlightSuccess;

  while (
    !areAllDailyFetched ||
    !isLifetimeFetched ||
    !isSCMLifetimeFetched ||
    !haveAudienceStatsFetched ||
    !isFlightFetched
  ) {
    retries += 1;
    yield call(wait, 1000);
    flightsState = yield select(getFlightsState);

    areAllDailyFetched = flightsState.fetchFlightDailyStatsSuccess;
    isLifetimeFetched = flightsState.fetchFlightLifetimeStatsSuccess;
    isSCMLifetimeFetched =
      flightsState.fetchFlightLifetimeStreamingStatsSuccess;
    haveAudienceStatsFetched =
      flightsState.fetchFlightCombinedAudienceStatsSuccess;
    isFlightFetched = flightsState.fetchFlightSuccess;

    if (retries === 3) break;
  }

  const flight = flightsState.flight;

  const allDailyStats = yield select(getFlightDailyStats);
  const dailyStats = getStatsForPricingModel(
    allDailyStats,
    flight.pricingModel!,
  );
  const allLifetimeStats = yield select(getFlightLifetimeStats);
  const lifetimeStats = getLifetimeStatsForPricingModel(
    allLifetimeStats,
    flight.pricingModel!,
  );
  const scmLifetimeStats = yield select(getFlightLifetimeStreamingStats);
  const audienceStats = yield select(getFlightCombinedAudienceStats);
  const scmStatsEmpty = !dailyStats.some(
    (stat: DailyCPCL | DailyCPM) => !isUndefined(stat.scm),
  );

  if (
    isEmpty(lifetimeStats) ||
    isEmpty(flight) ||
    (flight.artistId && scmStatsEmpty)
  )
    return;

  try {
    const downloadUri = yield call(createDownloadUri, {
      flight,
      dailyStats,
      lifetimeStats,
      scmLifetimeStats,
      audienceStats,
    });

    yield put(Actions.buildFlightDownloadSuccess({ downloadUri: downloadUri }));
  } catch (err) {
    log(`error creating download uri for flight: ${flight.flightId}`);
    yield put(Actions.buildFlightDownloadFailed(err, { flight }));
  }
}

export function* stopFlight(action: StopFlightStartAction) {
  try {
    yield call(Api.stopFlight, action.payload);
    yield put(Actions.stopFlightSuccess());
  } catch (e) {
    yield put(Actions.stopFlightError(e));
  }
}

export function* pauseOrResumeFlight(action: PauseResumeFlightStartAction) {
  try {
    yield call(Api.pauseResumeFlight, action.payload);
    yield put(Actions.pauseResumeFlightSucceeded());
  } catch (e) {
    yield put(Actions.pauseResumeFlightFailed(action.payload, e));
  }
}

function* watchForGetFlights() {
  yield takeLatest(FETCH_FLIGHTS, fetchFlights);
}

function* watchForGetFlight() {
  yield takeLatest(FETCH_FLIGHT_START, fetchFlight);
}

function* watchForGetFlightLifetimeStats() {
  yield takeLatest(FETCH_FLIGHT_LIFETIME_STATS_START, fetchFlightLifetimeStats);
}

function* watchForGetFlightDailyStats() {
  yield takeLatest(FETCH_FLIGHT_DAILY_STATS_START, fetchFlightDailyStats);
}

function* watchForGetFlightCombinedAudienceStats() {
  yield takeLatest(
    FETCH_FLIGHT_COMBINED_AUDIENCE_STATS_START,
    fetchFlightCombinedAudienceStats,
  );
}

function* watchForGetFlightLifetimeStreamingStats() {
  yield takeLatest(
    FETCH_FLIGHT_LIFETIME_STREAMING_STATS_START,
    fetchFlightLifetimeStreamingStats,
  );
}

function* watchBuildDownload() {
  yield takeLatest(BUILD_FLIGHT_DOWNLOAD_START, buildDownloadUri);
}

function* watchStopFlight() {
  yield takeLatest(STOP_FLIGHT_START, stopFlight);
}

function* watchPauseResumeFlight() {
  yield takeLatest(PAUSE_RESUME_FLIGHT_START, pauseOrResumeFlight);
}

export default function* getFlightsSaga() {
  yield all([
    watchForGetFlights(),
    watchForGetFlight(),
    watchForGetFlightLifetimeStats(),
    watchForGetFlightDailyStats(),
    watchForGetFlightCombinedAudienceStats(),
    watchForGetFlightLifetimeStreamingStats(),
    watchBuildDownload(),
    watchStopFlight(),
    watchPauseResumeFlight(),
  ]);
}
