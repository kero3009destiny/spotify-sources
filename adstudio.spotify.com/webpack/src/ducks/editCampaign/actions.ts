import { buildFetchErrorAction } from 'utils/asyncDucksHelpers';

import {
  EDIT_CAMPAIGN,
  EDIT_CAMPAIGN_FAILED,
  EDIT_CAMPAIGN_SUCCEEDED,
  EditCampaignErrorAction,
  EditCampaignStartAction,
  EditCampaignSuccessAction,
} from './types';
import { ExistingCampaign } from 'types/common/campaignHierarchy/types';

export const editCampaign = (payload: {
  campaign: ExistingCampaign;
}): EditCampaignStartAction => ({
  type: EDIT_CAMPAIGN,
  payload,
});

export const editCampaignSuccess = (): EditCampaignSuccessAction => ({
  type: EDIT_CAMPAIGN_SUCCEEDED,
});

export const editCampaignFailed = (error: Error): EditCampaignErrorAction =>
  buildFetchErrorAction(EDIT_CAMPAIGN_FAILED, error);
