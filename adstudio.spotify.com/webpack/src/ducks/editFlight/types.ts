import { Action } from 'redux';

import { FetchErrorAction } from 'utils/asyncDucksHelpers';

import { ExistingFlight } from 'types/common/campaignHierarchy/types';

export const EDIT_FLIGHT = 'EDIT_FLIGHT';
export const EDIT_FLIGHT_FAILED = 'EDIT_FLIGHT_FAILED';
export const EDIT_FLIGHT_SUCCEEDED = 'EDIT_FLIGHT_SUCCEEDED';

export interface EditFlightStartAction extends Action {
  type: typeof EDIT_FLIGHT;
  payload: {
    flight: ExistingFlight;
  };
}

export interface EditFlightSuccessAction {
  type: typeof EDIT_FLIGHT_SUCCEEDED;
}

export interface EditFlightErrorAction extends FetchErrorAction {
  type: typeof EDIT_FLIGHT_FAILED;
}

export type EditFlightAction =
  | EditFlightStartAction
  | EditFlightSuccessAction
  | EditFlightErrorAction;
