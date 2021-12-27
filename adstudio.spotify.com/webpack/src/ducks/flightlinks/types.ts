import { Action } from 'redux';

import {
  ErrorAction,
  FetchErrorAction,
  MetaResponse,
} from 'utils/asyncDucksHelpers';

import { CreativeRotationParameters } from 'types/common/state/api/creative';
import { FlightLinkPauseResumeActionType } from 'types/common/state/api/flightLink';

export const RESET_FLIGHT_LINKS = 'RESET_FLIGHT_LINKS';

export const PAUSE_RESUME_FLIGHT_LINK_START = 'PAUSE_RESUME_FLIGHT_LINK_START';
export const PAUSE_RESUME_FLIGHT_LINK_SUCCEEDED =
  'PAUSE_RESUME_FLIGHT_LINK_SUCCEEDED';
export const PAUSE_RESUME_FLIGHT_LINK_FAILED =
  'PAUSE_RESUME_FLIGHT_LINK_FAILED';

export const EDIT_FLIGHT_LINKS_START = 'EDIT_FLIGHT_LINKS_START';
export const EDIT_FLIGHT_LINKS_SUCCEEDED = 'EDIT_FLIGHT_LINKS_SUCCEEDED';
export const EDIT_FLIGHT_LINKS_FAILED = 'EDIT_FLIGHT_LINKS_FAILED';

export interface PauseResumeFlightLinkPayload {
  adAccountId: string;
  flightId: string;
  creativeId: string;
  action: FlightLinkPauseResumeActionType;
}

export interface FlightLinkParameters {
  flightLinkId: string;
  creativeRotationParameters: CreativeRotationParameters;
}

export interface EditFlightLinksPayload {
  adAccountId: string;
  flightLinks: FlightLinkParameters[];
}

export interface ResetFlightLinksAction extends Action {
  type: typeof RESET_FLIGHT_LINKS;
}

export interface PauseResumeFlightLinkStartAction extends Action {
  type: typeof PAUSE_RESUME_FLIGHT_LINK_START;
  payload: PauseResumeFlightLinkPayload;
}

export interface PauseResumeFlightLinkSuccessAction extends Action {
  type: typeof PAUSE_RESUME_FLIGHT_LINK_SUCCEEDED;
  payload: PauseResumeFlightLinkPayload;
}

export interface PauseResumeFlightLinkErrorAction extends FetchErrorAction {
  type: typeof PAUSE_RESUME_FLIGHT_LINK_FAILED;
  meta: MetaResponse & PauseResumeFlightLinkPayload;
}

export type PauseResumeFlightLinkAction =
  | PauseResumeFlightLinkStartAction
  | PauseResumeFlightLinkSuccessAction
  | PauseResumeFlightLinkErrorAction;

export interface EditFlightLinksStartAction extends Action {
  type: typeof EDIT_FLIGHT_LINKS_START;
  payload: EditFlightLinksPayload;
}

export interface EditFlightLinksSuccessAction extends Action {
  type: typeof EDIT_FLIGHT_LINKS_SUCCEEDED;
  payload: EditFlightLinksPayload;
}

export interface EditFlightLinksErrorAction extends ErrorAction {
  type: typeof EDIT_FLIGHT_LINKS_FAILED;
  payload: EditFlightLinksPayload;
  error: Error;
}

export type EditFlightLinksAction =
  | EditFlightLinksStartAction
  | EditFlightLinksSuccessAction
  | EditFlightLinksErrorAction;
