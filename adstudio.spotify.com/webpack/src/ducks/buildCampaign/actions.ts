import {
  BUILD_CAMPAIGN_HIERARCHY,
  BUILD_CAMPAIGN_HIERARCHY_FAILED,
  BUILD_CAMPAIGN_HIERARCHY_SUCCEEDED,
  BuildCampaignHierarchyErrorAction,
  BuildCampaignHierarchyStartAction,
  BuildCampaignHierarchySuccessAction,
  RESET_CAMPAIGN_HIERARCHY,
  ResetCampaignHierarchyAction,
} from './types';
import { CreateFormValues } from 'types/common/campaignHierarchy/types';
import { CreateResponse } from 'types/common/state/api/bff';

export const buildCampaignHierarchy = (
  payload: CreateFormValues,
): BuildCampaignHierarchyStartAction => ({
  type: BUILD_CAMPAIGN_HIERARCHY,
  payload,
});

export const buildCampaignHierarchySuccess = (
  payload: CreateResponse,
): BuildCampaignHierarchySuccessAction => ({
  type: BUILD_CAMPAIGN_HIERARCHY_SUCCEEDED,
  payload,
});

export const buildCampaignHierarchyError = (
  response: Response,
): BuildCampaignHierarchyErrorAction => ({
  type: BUILD_CAMPAIGN_HIERARCHY_FAILED,
  error: true,
  payload: response,
});

export const resetCampaignHierarchy = (): ResetCampaignHierarchyAction => ({
  type: RESET_CAMPAIGN_HIERARCHY,
});
