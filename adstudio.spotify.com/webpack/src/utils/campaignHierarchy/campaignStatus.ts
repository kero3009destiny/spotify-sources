import i18n from 'i18next';

import { FlightStateGroup } from 'types/common/state/api/campaigns';
import { BffFlightState, FlightState } from 'types/common/state/api/flights';

// TODO: This is a placeholder until we know what copy we want
export const FlightIssueString = i18n.t(
  'I18N_THERE_ARE_AD_SETS',
  'There are ad sets that require attention',
);

export enum DerivedCampaignStatus {
  ACTIVE = 'ACTIVE',
  REJECTED = 'REJECTED',
  READY = 'READY',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  STOPPED = 'STOPPED',
  UNKNOWN = 'UNKNOWN',
}

export const getDerivedCampaignStatusAndIssues = (
  flightStateGroup: FlightStateGroup,
): [DerivedCampaignStatus, string] => {
  if (!flightStateGroup.flightStatuses.length) {
    return [DerivedCampaignStatus.PENDING_APPROVAL, ''];
  }

  const flightStatuses = new Set(
    flightStateGroup.flightStatuses.reduce(
      (accum: BffFlightState[], flight) => {
        accum.push(flight.flightState);
        return accum;
      },
      [],
    ),
  );

  if (
    flightStatuses.has(FlightState.ACTIVE) &&
    (flightStatuses.has(FlightState.REJECTED) ||
      flightStatuses.has(FlightState.PENDING_APPROVAL) ||
      flightStateGroup.pausedCount! >= 1)
  ) {
    return [DerivedCampaignStatus.ACTIVE, FlightIssueString];
  }

  if (flightStatuses.has(FlightState.ACTIVE)) {
    return [DerivedCampaignStatus.ACTIVE, ''];
  }

  if (flightStatuses.has(FlightState.REJECTED)) {
    return [DerivedCampaignStatus.REJECTED, FlightIssueString];
  }

  if (flightStatuses.has(FlightState.READY)) {
    return [DerivedCampaignStatus.READY, ''];
  }

  if (flightStatuses.has(FlightState.PENDING_APPROVAL)) {
    return [DerivedCampaignStatus.PENDING_APPROVAL, ''];
  }

  if (flightStatuses.size === 1 && flightStatuses.has(FlightState.COMPLETED)) {
    return [DerivedCampaignStatus.COMPLETED, ''];
  }

  if (flightStatuses.size === 1 && flightStatuses.has(FlightState.STOPPED)) {
    return [DerivedCampaignStatus.STOPPED, ''];
  }

  return [DerivedCampaignStatus.UNKNOWN, ''];
};
