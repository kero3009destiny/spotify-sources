import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';

import { TableState } from '@spotify-internal/adstudio-shared/lib/components/TSTableBrowser/types';

import {
  doesFlightStartToday as doesFlightStartTodayHelper,
  flightHasMetrics as flightHasMetricsHelper,
  flightStartedLessThan24HoursAgo as flightStartedLessThan24HoursAgoHelper,
  isFlightStateOneOf,
  NO_STATS_AVAILABLE_STATUS,
  shouldShowAudienceInsightsOverlay,
  shouldShowFullOverlay,
} from 'utils/flightHelpers';

import {
  FlightCombinedAudienceStatsState,
  FlightDailyStatsState,
  FlightDetailsState,
  FlightLifetimeStatsState,
  FlightLifetimeStreamingStatsState,
  FlightsState,
} from './reducer';

import { TERMINAL_STATES } from './constants';
import { ARTIST_PROMO } from 'config/adCreation';
import { PAID_LISTENS_MODEL } from 'config/pricing';
import { ScmStatsCutoffDate } from 'config/stats';

import { PersistenceState } from 'types/common/campaignHierarchy/types';
import { FlightState } from 'types/common/state/api/flights';
import { Format, FormatType } from 'types/common/state/api/format';

export const getFlightsState = (state: TSFixMe): FlightsState => {
  return {
    ...state.flights,
    persistenceState: PersistenceState.EXISTING,
  };
};

export const getFlightState = (state: TSFixMe): FlightDetailsState => {
  return getFlightsState(state).flight;
};

export const getFlightsTableState = (state: TSFixMe): TableState => {
  const { flightsCatalogue } = getFlightsState(state);

  return {
    rows: flightsCatalogue.items,
    loading: flightsCatalogue.loading,
    empty: flightsCatalogue.items.length === 0 && !flightsCatalogue.loading,
    paging: flightsCatalogue.paging,
  };
};

export const canLoadNextPage = (state: TSFixMe) => {
  const { rows, paging } = getFlightsTableState(state);
  return rows.length > 0 && !!paging.total && rows.length < paging.total;
};

export const getFlightLifetimeStats = (
  state: TSFixMe,
): FlightLifetimeStatsState => {
  return getFlightsState(state).flightLifetimeStats;
};

export const getFlightDailyStats = (state: TSFixMe): FlightDailyStatsState => {
  return getFlightsState(state).flightDailyStats;
};

export const getFlightCombinedAudienceStats = (
  state: TSFixMe,
): FlightCombinedAudienceStatsState => {
  return getFlightsState(state).flightCombinedAudienceStats;
};

export const getFlightLifetimeStreamingStats = (
  state: TSFixMe,
): FlightLifetimeStreamingStatsState => {
  return getFlightsState(state).flightLifetimeStreamingStats;
};

export const getStatsDownloadLink = (state: TSFixMe): string => {
  return getFlightsState(state).flightDownload.downloadUri;
};

// flights stats

export const getFetchAudienceSuccess = (state: TSFixMe) => {
  return getFlightsState(state).fetchFlightCombinedAudienceStatsSuccess;
};

export const getFetchFlightSuccess = (state: TSFixMe) => {
  return getFlightsState(state).fetchFlightSuccess;
};

export const isFlightPromotingContent = (state: TSFixMe) => {
  const flight = getFlightState(state);
  return !!flight.artistId && flight.objective === ARTIST_PROMO;
};

export const isflightStartDateAfterSCMCutoff = (state: TSFixMe) => {
  const flight = getFlightState(state);

  if (!flight.dateBegin) return false;

  return moment(flight.dateBegin).isSameOrAfter(ScmStatsCutoffDate);
};

export const flightIsCpcl = (state: TSFixMe) => {
  const flight = getFlightState(state);
  return get(flight, 'pricingModel') === PAID_LISTENS_MODEL;
};

export const flightIsPodcastFormat = (state: TSFixMe) => {
  const flight = getFlightState(state);
  return flight?.format === Format.AUDIO_PODCAST;
};

export const flightNoLongerServing = (state: TSFixMe) => {
  const flight = getFlightState(state);

  return (
    isFlightStateOneOf(flight, [FlightState.COMPLETED, FlightState.STOPPED]) ||
    !flight.isActive
  );
};

export const flightFetchAudienceError = (state: TSFixMe) => {
  const flightsState = getFlightsState(state);
  return !!flightsState.fetchFlightCombinedAudienceStatsError;
};

export const noAudienceStatsAvailable = (state: TSFixMe) => {
  const flightsState = getFlightsState(state);
  return (
    !!flightsState.fetchFlightCombinedAudienceStatsError &&
    flightsState.fetchFlightCombinedAudienceStatsError ===
      NO_STATS_AVAILABLE_STATUS
  );
};

export const getFlightArtistInfo = (state: TSFixMe) => {
  const flight = getFlightState(state);
  return {
    artistName: flight.artistName,
    artistSpotifyLink: flight.artistSpotifyLink,
  };
};

export const getFlightPricingModel = (state: TSFixMe) => {
  const flight = getFlightState(state);
  return flight.pricingModel!;
};

export const showFullOverlay = (state: TSFixMe) => {
  const flightsState = getFlightsState(state);
  return shouldShowFullOverlay(flightsState);
};

export const flightHasMetrics = (state: TSFixMe) => {
  const flight = getFlightState(state);
  return flightHasMetricsHelper(flight);
};

export const doesFlightStartToday = (state: TSFixMe) => {
  const flight = getFlightState(state);
  return doesFlightStartTodayHelper(flight);
};

export const flightStartedLessThan24HoursAgo = (state: TSFixMe) => {
  const flight = getFlightState(state);
  return flightStartedLessThan24HoursAgoHelper(flight);
};

export const showAudienceInsightsOverlay = (state: TSFixMe) => {
  const flightsState = getFlightsState(state);
  return shouldShowAudienceInsightsOverlay(flightsState);
};

export const didFlightStartTwoOrMoreDaysAgo = (state: TSFixMe) => {
  const flight = getFlightState(state);
  const twoDaysAfterStart = moment(flight.dateBegin).add(48, 'hours');
  return moment().isSameOrAfter(twoDaysAfterStart);
};

const EDITABLE_STATES = [
  FlightState.PENDING_APPROVAL,
  FlightState.ACTIVE,
  FlightState.READY,
  FlightState.REJECTED,
];

export const flightIsEditable = (state: TSFixMe) => {
  const flight = getFlightState(state);
  return EDITABLE_STATES.includes(flight.flightState!) || !flight.isActive;
};

export const shouldShowSurvey = (state: TSFixMe) => {
  const flightsState = getFlightsState(state);
  const flight = getFlightState(state);

  const moreThan48hFromStartDate = moment().isAfter(
    moment(flight.dateBegin).add(2, 'days'),
  );

  const allowedStates = [FlightState.COMPLETED, FlightState.ACTIVE];
  const hasAudienceMetrics = !isEmpty(flightsState.flightCombinedAudienceStats);

  if (
    allowedStates.includes(flight.flightState!) &&
    moreThan48hFromStartDate &&
    hasAudienceMetrics
  ) {
    return true;
  }
  return false;
};

export const getFetchFlightState = (
  state: TSFixMe,
): Pick<
  FlightsState,
  'fetchingFlight' | 'fetchFlightSuccess' | 'fetchFlightError'
> => {
  const {
    fetchingFlight,
    fetchFlightSuccess,
    fetchFlightError,
  } = getFlightsState(state);

  return {
    fetchingFlight,
    fetchFlightSuccess,
    fetchFlightError,
  };
};

export const getFlightIsInTerminalState = (state: TSFixMe) => {
  const flightStatus = getFlightState(state).flightState;
  return flightStatus ? TERMINAL_STATES.includes(flightStatus) : false;
};

export const getFlightFormat = (state: TSFixMe) => {
  const flightState = getFlightState(state);
  return flightState.format as FormatType;
};

export const getStoppingFlight = (state: TSFixMe) => {
  return getFlightsState(state).stoppingFlight;
};

export const getStopFlightSuccess = (state: TSFixMe) => {
  return getFlightsState(state).stopFlightSuccess;
};

export const getStopFlightError = (state: TSFixMe) => {
  return getFlightsState(state).stopFlightError;
};

export const getFlightsCatalogueServerError = (state: TSFixMe): boolean => {
  const { flightsCatalogue } = getFlightsState(state);

  if (
    flightsCatalogue.error &&
    (flightsCatalogue.error as Response)?.status &&
    (flightsCatalogue.error as Response)?.status !== 404
  ) {
    return true;
  }

  return false;
};

/* Pause Or Resume */
export const isPausingOrResuming = (state: TSFixMe): boolean =>
  getFlightsState(state).pausingResumingFlight;

export const pauseOrResumeSucceeded = (state: TSFixMe): boolean =>
  getFlightsState(state).pauseResumeFlightSuccess;

export const pauseOrResumeError = (state: TSFixMe): boolean | string =>
  getFlightsState(state).pauseResumeFlightError;
