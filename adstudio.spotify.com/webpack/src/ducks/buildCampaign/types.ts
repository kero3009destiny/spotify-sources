import { Action } from 'redux';

import { CreateFormValues } from 'types/common/campaignHierarchy/types';
import { CreateResponse } from 'types/common/state/api/bff';

// action types for full cold start create flow
export const BUILD_CAMPAIGN_HIERARCHY = 'BUILD_CAMPAIGN_HIERARCHY';
export const BUILD_CAMPAIGN_HIERARCHY_SUCCEEDED =
  'BUILD_CAMPAIGN_HIERARCHY_SUCCEEDED';
export const BUILD_CAMPAIGN_HIERARCHY_FAILED =
  'BUILD_CAMPAIGN_HIERARCHY_FAILED';
export const RESET_CAMPAIGN_HIERARCHY = 'RESET_CAMPAIGN_HIERARCHY';

// Indicates type of error creating a hierarchy entity (shared by campaign/flight/creative)
export enum BuildHierarchyError {
  Forbidden = 'Forbidden',
  GenericError = 'GenericError',
}

export interface BuildCampaignHierarchyStartAction extends Action {
  type: typeof BUILD_CAMPAIGN_HIERARCHY;
  payload: CreateFormValues;
}

export interface BuildCampaignHierarchySuccessAction extends Action {
  type: typeof BUILD_CAMPAIGN_HIERARCHY_SUCCEEDED;
  payload: CreateResponse;
}

export interface BuildCampaignHierarchyErrorAction extends Action {
  type: typeof BUILD_CAMPAIGN_HIERARCHY_FAILED;
  error: true;
  payload: Response;
}

export interface ResetCampaignHierarchyAction extends Action {
  type: typeof RESET_CAMPAIGN_HIERARCHY;
}

export type BuildCampaignHierarchyAction =
  | BuildCampaignHierarchyStartAction
  | BuildCampaignHierarchySuccessAction
  | BuildCampaignHierarchyErrorAction
  | ResetCampaignHierarchyAction;
