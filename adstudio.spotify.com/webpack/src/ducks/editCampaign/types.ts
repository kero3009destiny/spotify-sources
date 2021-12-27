import { Action } from 'redux';

import { FetchErrorAction } from 'utils/asyncDucksHelpers';

import { ExistingCampaign } from 'types/common/campaignHierarchy/types';

export const EDIT_CAMPAIGN = 'EDIT_CAMPAIGN';
export const EDIT_CAMPAIGN_FAILED = 'EDIT_CAMPAIGN_FAILED';
export const EDIT_CAMPAIGN_SUCCEEDED = 'EDIT_CAMPAIGN_SUCCEEDED';

export interface EditCampaignStartAction extends Action {
  type: typeof EDIT_CAMPAIGN;
  payload: {
    campaign: ExistingCampaign;
  };
}

export interface EditCampaignSuccessAction {
  type: typeof EDIT_CAMPAIGN_SUCCEEDED;
}

export interface EditCampaignErrorAction extends FetchErrorAction {
  type: typeof EDIT_CAMPAIGN_FAILED;
}

export type EditCampaignAction =
  | EditCampaignStartAction
  | EditCampaignSuccessAction
  | EditCampaignErrorAction;
