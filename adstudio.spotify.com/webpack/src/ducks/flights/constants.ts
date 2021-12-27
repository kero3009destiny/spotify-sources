import { BffFlightState, FlightState } from 'types/common/state/api/flights';

export const TERMINAL_STATES: BffFlightState[] = [
  FlightState.STOPPED,
  FlightState.COMPLETED,
];

export const PAUSABLE_STATES = [
  FlightState.ACTIVE,
  FlightState.PENDING_APPROVAL,
  FlightState.READY,
];

export const UNEDITABLE_FLIGHT_STATES: BffFlightState[] = [...TERMINAL_STATES];
