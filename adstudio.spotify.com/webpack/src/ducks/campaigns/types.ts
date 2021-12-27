import { Action } from 'redux';

import { GetCampaignResponse } from 'types/common/state/api/campaign';
import {
  CampaignsApiResponse,
  CampaignsQueryParams,
} from 'types/common/state/api/campaigns';

export const FETCH_CAMPAIGNS = 'FETCH_CAMPAIGNS';
export const FETCH_CAMPAIGNS_SUCCEEDED = 'FETCH_CAMPAIGNS_SUCCEEDED';
export const FETCH_CAMPAIGNS_FAILED = 'FETCH_CAMPAIGNS_FAILED';

export const FETCH_CAMPAIGN_START = 'FETCH_CAMPAIGN_START';
export const FETCH_CAMPAIGN_FAILED = 'FETCH_CAMPAIGN_FAILED';
export const FETCH_CAMPAIGN_SUCCEEDED = 'FETCH_CAMPAIGN_SUCCEEDED';

export interface FetchCampaignSuccessPayload {
  campaign: GetCampaignResponse;
  artistInfo?: Pick<SpotifyApi.Artist, 'name'>;
}

export interface FetchCampaignsStartAction {
  type: typeof FETCH_CAMPAIGNS;
  payload: CampaignsQueryParams;
}

export interface FetchCampaignsSuccessAction {
  type: typeof FETCH_CAMPAIGNS_SUCCEEDED;
  payload: CampaignsApiResponse;
}

export interface FetchCampaignsErrorAction {
  type: typeof FETCH_CAMPAIGNS_FAILED;
  payload: Error | Response;
}

export type FetchCampaignsAction =
  | FetchCampaignsStartAction
  | FetchCampaignsSuccessAction
  | FetchCampaignsErrorAction;

export interface FetchCampaignStartAction extends Action {
  type: typeof FETCH_CAMPAIGN_START;
  payload: {
    campaignId: string;
    adAccountId: string;
  };
}

export interface FetchCampaignSuccessAction {
  type: typeof FETCH_CAMPAIGN_SUCCEEDED;
  payload: FetchCampaignSuccessPayload;
}

export interface FetchCampaignErrorAction extends Action {
  type: typeof FETCH_CAMPAIGN_FAILED;
  payload: Error;
  error: Error;
}

export type FetchCampaignAction =
  | FetchCampaignStartAction
  | FetchCampaignSuccessAction
  | FetchCampaignErrorAction;
