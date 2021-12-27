import isEmpty from 'lodash/isEmpty';
import moment from 'moment';

import { FlightDetailsState, FlightsState } from 'ducks/flights/reducer';

import { getStatsForPricingModel } from 'components/FlightDetails/ReportsTab/chart-common/ChartUtils';

import { isSameDay } from 'utils/statsHelpers';

import { hasDatePassed } from './dateHelpers';

import { PAUSABLE_STATES } from 'ducks/flights/constants';

import {
  FrequencyCap,
  FrequencyCapAPIResponse,
  FrequencyCapAPIResponseTimeUnitMapper,
} from '../types/common/campaignHierarchy/types';
import { AgeRange } from 'types/common/state/api/flight';
import { FlightState } from 'types/common/state/api/flights';
import { Quartiles } from 'types/common/state/api/flush';

export const NO_STATS_AVAILABLE_STATUS = 'No stats available.';

export const FLIGHT_STATUS_TYPES_WITH_METRICS = [
  FlightState.ACTIVE,
  FlightState.COMPLETED,
  FlightState.STOPPED,
];

export const FLIGHT_STATUS_TYPES_WITHOUT_METRICS = [
  FlightState.READY,
  FlightState.PENDING_APPROVAL,
  FlightState.REJECTED,
];

export const isFlightStateOneOf = (
  flight: FlightDetailsState,
  states:
    | typeof FLIGHT_STATUS_TYPES_WITH_METRICS
    | typeof FLIGHT_STATUS_TYPES_WITHOUT_METRICS,
) => states.some(state => state === flight.flightState);

export const doesFlightStartToday = (flight: FlightDetailsState) =>
  isSameDay(flight.dateBegin, moment());

export const nowIsLessThanOneDaySince = (sinceDate: string) =>
  moment().diff(sinceDate, 'days') < 1;

export const flightStartedLessThan24HoursAgo = (flight: FlightDetailsState) =>
  isSameDay(flight.dateBegin, moment()) ||
  nowIsLessThanOneDaySince(flight.dateBegin!);

export const hasStartDatePassed = (flight: FlightDetailsState) =>
  // @ts-ignore
  hasDatePassed(flight.dateBegin);

export const flightHasMetrics = (flight: FlightDetailsState) =>
  hasStartDatePassed(flight) &&
  isFlightStateOneOf(flight, FLIGHT_STATUS_TYPES_WITH_METRICS);

export const isFlightRejected = (flight: FlightDetailsState) =>
  flight.flightState === FlightState.REJECTED;

export const isFlightPaused = (flight: FlightDetailsState): boolean =>
  !flight.isActive && PAUSABLE_STATES.includes(flight.flightState!);

export const isFetchingFlight = (flightsState: FlightsState) =>
  flightsState.fetchingFlight;

export const isFetchingAnyStats = (flightsState: FlightsState) =>
  flightsState.fetchingFlightCombinedAudienceStats ||
  flightsState.fetchingFlightDailyStats ||
  flightsState.fetchingFlightLifetimeStreamingStats ||
  flightsState.fetchingFlightLifetimeStats;

// Both overlay selectors rely on a base set of state assumptions
export const canTestOverlayAssertions = (flightsState: FlightsState) => {
  return (
    isFlightRejected(flightsState.flight) ||
    (!isFetchingFlight(flightsState) && !isFetchingAnyStats(flightsState))
  );
};

export const shouldShowFullOverlay = (flightsState: FlightsState) => {
  if (!canTestOverlayAssertions(flightsState)) {
    return false;
  }

  const dailyStats = getStatsForPricingModel(
    flightsState.flightDailyStats,
    flightsState.flight.pricingModel!,
  );
  return (
    isFlightStateOneOf(
      flightsState.flight,
      FLIGHT_STATUS_TYPES_WITHOUT_METRICS,
    ) ||
    !hasStartDatePassed(flightsState.flight) ||
    doesFlightStartToday(flightsState.flight) ||
    (flightHasMetrics(flightsState.flight) && isEmpty(dailyStats))
  );
};

export const shouldShowAudienceInsightsOverlay = (
  flightsState: FlightsState,
) => {
  if (!canTestOverlayAssertions(flightsState)) {
    return false;
  }
  // Daily stats exist and no audience insights stats found
  return (
    !shouldShowFullOverlay(flightsState) &&
    hasStartDatePassed(flightsState.flight) &&
    (isEmpty(flightsState.flightCombinedAudienceStats) ||
      // TODO: This last conditional should eventually be replaced by a check
      // for some explicit signal from the backend that min threshold is not reached
      !!flightsState.fetchFlightCombinedAudienceStatsError)
  );
};

const hasQuartileData = (quartiles: Quartiles) =>
  !!(
    quartiles.firstQuartile ||
    quartiles.midpoint ||
    quartiles.thirdQuartile ||
    quartiles.complete
  );

export const flightHasQuartilesData = (quartiles: Quartiles) =>
  !isEmpty(quartiles) && hasQuartileData(quartiles);

export const formatFlightFrequencyCapApiResponseToReduxFormat = (
  frequencyCaps: Array<FrequencyCapAPIResponse>,
) => {
  const mappedCaps = frequencyCaps.map(
    frequencyCap =>
      ({
        ...frequencyCap,
        timeUnit: FrequencyCapAPIResponseTimeUnitMapper[frequencyCap.timeUnit],
      } as FrequencyCap),
  );
  const sortedCaps = mappedCaps.sort((a, b) => a.timeUnit - b.timeUnit);
  return sortedCaps;
};

const isValidAgeRange = (ageRange: AgeRange, isPodcast: boolean) => {
  if (ageRange.ageMin === 13 && ageRange.ageMax === 17) return !isPodcast;
  if (ageRange.ageMin === 14 && ageRange.ageMax === 17) return !isPodcast;
  if (ageRange.ageMin === 15 && ageRange.ageMax === 17) return !isPodcast;
  if (ageRange.ageMin === 16 && ageRange.ageMax === 17) return !isPodcast;
  if (ageRange.ageMin === 17 && ageRange.ageMax === 17) return !isPodcast;
  if (ageRange.ageMin === 18 && ageRange.ageMax === 24) return true;
  if (ageRange.ageMin === 21 && ageRange.ageMax === 24) return true;
  if (ageRange.ageMin === 25 && ageRange.ageMax === 34) return true;
  if (ageRange.ageMin === 35 && ageRange.ageMax === 44) return true;
  if (ageRange.ageMin === 45 && ageRange.ageMax === 54) return true;
  if (ageRange.ageMin === 55 && ageRange.ageMax === 64) return true;
  if (ageRange.ageMin === 65 && ageRange.ageMax === undefined) return true;

  return false;
};

export const containsInvalidAgeRange = (
  ageRanges: AgeRange[],
  isPodcast: boolean,
) => {
  return !ageRanges.every(range => {
    return isValidAgeRange(range, isPodcast);
  });
};
