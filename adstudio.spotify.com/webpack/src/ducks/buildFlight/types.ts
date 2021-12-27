import { Action } from 'redux';

import {
  CreateFlightFormValues,
  DuplicateFlightWithCreativesFormValues,
} from 'types/common/campaignHierarchy/types';

export const CREATE_FLIGHT_AND_CREATIVE_FOR_CAMPAIGN =
  'CREATE_FLIGHT_AND_CREATIVE_FOR_CAMPAIGN';
export const CREATE_FLIGHT_AND_CREATIVE_FOR_CAMPAIGN_SUCCEEDED =
  'CREATE_FLIGHT_AND_CREATIVE_FOR_CAMPAIGN_SUCCEEDED';
export const CREATE_FLIGHT_AND_CREATIVE_FOR_CAMPAIGN_FAILED =
  'CREATE_FLIGHT_FOR_CAMPAIGN_FAILED';
export const RESET_BUILD_FLIGHT = 'RESET_BUILD_FLIGHT';
export const DUPLICATE_FLIGHT_WITH_CREATIVES =
  'DUPLICATE_FLIGHT_WITH_CREATIVES';
export const DUPLICATE_FLIGHT_WITH_CREATIVES_SUCCEEDED =
  'DUPLICATE_FLIGHT_WITH_CREATIVES_SUCCEEDED';
export const DUPLICATE_FLIGHT_WITH_CREATIVES_FAILED =
  'DUPLICATE_FLIGHT_WITH_CREATIVES_FAILED';

export interface CreateFlightAndCreativeForCampaignStartAction extends Action {
  type: typeof CREATE_FLIGHT_AND_CREATIVE_FOR_CAMPAIGN;
  payload: {
    formValues: CreateFlightFormValues;
    analyticsCategory: string;
  };
}

export interface CreateFlightAndCreativeForCampaignSuccessAction
  extends Action {
  type: typeof CREATE_FLIGHT_AND_CREATIVE_FOR_CAMPAIGN_SUCCEEDED;
}

export interface CreateFlightAndCreativeForCampaignErrorAction extends Action {
  type: typeof CREATE_FLIGHT_AND_CREATIVE_FOR_CAMPAIGN_FAILED;
  error: true;
  payload: Response;
}

export interface ResetBuildFlightAction extends Action {
  type: typeof RESET_BUILD_FLIGHT;
}

export interface DuplicateFlightWithCreativesStartAction extends Action {
  type: typeof DUPLICATE_FLIGHT_WITH_CREATIVES;
  payload: {
    accountId: string;
    values: DuplicateFlightWithCreativesFormValues;
  };
}

export interface DuplicateFlightWithCreativesSuccessAction extends Action {
  type: typeof DUPLICATE_FLIGHT_WITH_CREATIVES_SUCCEEDED;
}

export interface DuplicateFlightWithCreativesErrorAction extends Action {
  type: typeof DUPLICATE_FLIGHT_WITH_CREATIVES_FAILED;
  error: Error;
}

export type BuildFlightAction =
  | CreateFlightAndCreativeForCampaignStartAction
  | CreateFlightAndCreativeForCampaignSuccessAction
  | CreateFlightAndCreativeForCampaignErrorAction
  | ResetBuildFlightAction;

export type DuplicateFlightWithCreativesAction =
  | DuplicateFlightWithCreativesStartAction
  | DuplicateFlightWithCreativesSuccessAction
  | DuplicateFlightWithCreativesErrorAction;

export type BuildOrDuplicateFlightAction =
  | BuildFlightAction
  | DuplicateFlightWithCreativesAction;
