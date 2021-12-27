import {
  FETCH_CAMPAIGN_FAILED,
  FETCH_CAMPAIGN_START,
  FETCH_CAMPAIGN_SUCCEEDED,
  FETCH_CAMPAIGNS,
  FETCH_CAMPAIGNS_FAILED,
  FETCH_CAMPAIGNS_SUCCEEDED,
  FetchCampaignErrorAction,
  FetchCampaignsErrorAction,
  FetchCampaignsStartAction,
  FetchCampaignsSuccessAction,
  FetchCampaignStartAction,
  FetchCampaignSuccessAction,
  FetchCampaignSuccessPayload,
} from './types';
import {
  CampaignsApiResponse,
  CampaignsQueryParams,
} from 'types/common/state/api/campaigns';

export const getCampaigns = (
  payload: CampaignsQueryParams,
): FetchCampaignsStartAction => ({
  type: FETCH_CAMPAIGNS,
  payload,
});

export const getCampaignsSuccess = (
  payload: CampaignsApiResponse,
): FetchCampaignsSuccessAction => ({
  type: FETCH_CAMPAIGNS_SUCCEEDED,
  payload,
});

export const getCampaignsFailed = (
  payload: Error | Response,
): FetchCampaignsErrorAction => ({
  type: FETCH_CAMPAIGNS_FAILED,
  payload,
});

export const getCampaignSuccess = (
  payload: FetchCampaignSuccessPayload,
): FetchCampaignSuccessAction => ({
  type: FETCH_CAMPAIGN_SUCCEEDED,
  payload,
});

export const getCampaign = (payload: {
  adAccountId: string;
  campaignId: string;
}): FetchCampaignStartAction => ({
  type: FETCH_CAMPAIGN_START,
  payload,
});

export const getCampaignFailed = (error: Error): FetchCampaignErrorAction => ({
  type: FETCH_CAMPAIGN_FAILED,
  payload: error,
  error,
});
