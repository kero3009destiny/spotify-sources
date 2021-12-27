import { Action } from 'redux';

import {
  CreateCreativeFormValues,
  DuplicateCreativeFormValues,
} from 'types/common/campaignHierarchy/types';

export const CREATE_CREATIVE_FOR_FLIGHT = 'CREATE_CREATIVE_FOR_FLIGHT';
export const CREATE_CREATIVE_FOR_FLIGHT_SUCCEEDED =
  'CREATE_CREATIVE_FOR_FLIGHT_SUCCEEDED';
export const CREATE_CREATIVE_FOR_FLIGHT_FAILED =
  'CREATE_CREATIVE_FOR_FLIGHT_FAILED';
export const DUPLICATE_CREATIVE = 'DUPLICATE_CREATIVE';
export const DUPLICATE_CREATIVE_SUCCEEDED = 'DUPLICATE_CREATIVE_SUCCEEDED';
export const DUPLICATE_CREATIVE_FAILED = 'DUPLICATE_CREATIVE_FAILED';
export const RESET_BUILD_CREATIVE = 'RESET_BUILD_CREATIVE';

export interface CreateCreativeForFlightStartAction extends Action {
  type: typeof CREATE_CREATIVE_FOR_FLIGHT;
  payload: CreateCreativeFormValues;
}

export interface CreateCreativeForFlightSuccessAction extends Action {
  type: typeof CREATE_CREATIVE_FOR_FLIGHT_SUCCEEDED;
}

export interface CreateCreativeForFlightErrorAction extends Action {
  type: typeof CREATE_CREATIVE_FOR_FLIGHT_FAILED;
  error: true;
  payload: Response;
}

export interface DuplicateCreativeAction extends Action {
  type: typeof DUPLICATE_CREATIVE;
  payload: DuplicateCreativeFormValues;
}

export interface DuplicateCreativeSuccessAction extends Action {
  type: typeof DUPLICATE_CREATIVE_SUCCEEDED;
}

export interface DuplicateCreativeErrorAction extends Action {
  type: typeof DUPLICATE_CREATIVE_FAILED;
  error: true;
}

export interface ResetBuildCreativeAction extends Action {
  type: typeof RESET_BUILD_CREATIVE;
}

export type BuildCreativeAction =
  | CreateCreativeForFlightStartAction
  | CreateCreativeForFlightSuccessAction
  | CreateCreativeForFlightErrorAction
  | DuplicateCreativeAction
  | DuplicateCreativeSuccessAction
  | DuplicateCreativeErrorAction
  | ResetBuildCreativeAction;
