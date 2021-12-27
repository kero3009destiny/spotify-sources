import { combineReducers, Reducer } from 'redux';

import { createAsyncReducers } from 'utils/asyncDucksHelpers';
import { mapPaginationResponse } from 'utils/campaignHierarchy/paginationHelpers';

import {
  FETCH_CAMPAIGN_FAILED,
  FETCH_CAMPAIGN_START,
  FETCH_CAMPAIGN_SUCCEEDED,
  FETCH_CAMPAIGNS,
  FETCH_CAMPAIGNS_FAILED,
  FETCH_CAMPAIGNS_SUCCEEDED,
  FetchCampaignAction,
  FetchCampaignErrorAction,
  FetchCampaignsAction,
  FetchCampaignStartAction,
  FetchCampaignSuccessAction,
} from './types';
import { Paging } from 'types/common/state/api';
import { CampaignDetails } from 'types/common/state/api/campaign';
import { CampaignsCatalogueEntity } from 'types/common/state/api/campaigns';

export interface CampaignCatalogueState {
  items: CampaignsCatalogueEntity[];
  loading: boolean;
  paging: Paging;
  error?: Response | Error; // should be Response unless an Error was unintentionally thrown from saga
}

export interface CampaignsState {
  campaignsCatalogue: CampaignCatalogueState;
  campaign: CampaignDetailsState;
  fetchingCampaign: boolean;
  fetchCampaignSuccess: boolean;
  fetchCampaignError: string | boolean;
}

export interface CampaignDetailsState extends CampaignDetails {}

export const campaignsDefaultState: CampaignCatalogueState = {
  items: [],
  loading: false,
  paging: {
    limit: 20,
    offset: 0,
    total: 0,
  },
};

export const campaignsReducer = (
  state = campaignsDefaultState,
  action: FetchCampaignsAction,
) => {
  switch (action.type) {
    case FETCH_CAMPAIGNS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_CAMPAIGNS:
      return {
        ...state,
        loading: true,
      };

    case FETCH_CAMPAIGNS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        items: action.payload.items,
        paging: mapPaginationResponse(action.payload.paging),
      };

    default:
      return state;
  }
};

const campaignDefaultState: CampaignDetailsState = {};

const campaignReducer = (
  state: CampaignDetailsState = campaignDefaultState,
  action: FetchCampaignAction,
): CampaignDetailsState => {
  let castAction;
  switch (action.type) {
    case FETCH_CAMPAIGN_START:
    case FETCH_CAMPAIGN_FAILED:
      return campaignDefaultState;
    case FETCH_CAMPAIGN_SUCCEEDED:
      castAction = action as FetchCampaignSuccessAction;
      return {
        campaignId: castAction.payload.campaign.campaignId!,
        adAccountId: castAction.payload.campaign.adAccountId!,
        name: castAction.payload.campaign.name!,
        objective: castAction.payload.campaign.objective!,
        campaignState: castAction.payload.campaign.campaignState!,
        purchaseOrderNumber: castAction.payload.campaign.purchaseOrderNumber!,
        artistId: castAction.payload.campaign.artistId!,
        artistName: castAction.payload.artistInfo?.name,
      };
    default:
      return state;
  }
};

const fetchingCampaign = 'fetchingCampaign';
const fetchCampaignSuccess = 'fetchCampaignSuccess';
const fetchCampaignError = 'fetchCampaignError';

const campaignReducers = createAsyncReducers<
  FetchCampaignStartAction,
  FetchCampaignSuccessAction,
  FetchCampaignErrorAction
>(
  fetchingCampaign,
  FETCH_CAMPAIGN_START,
  fetchCampaignSuccess,
  FETCH_CAMPAIGN_SUCCEEDED,
  fetchCampaignError,
  FETCH_CAMPAIGN_FAILED,
);

export default combineReducers<CampaignsState>({
  campaignsCatalogue: campaignsReducer,
  campaign: campaignReducer,
  fetchingCampaign: campaignReducers[fetchingCampaign] as Reducer<
    boolean,
    FetchCampaignStartAction
  >,
  fetchCampaignSuccess: campaignReducers[fetchCampaignSuccess] as Reducer<
    boolean,
    FetchCampaignSuccessAction
  >,
  fetchCampaignError: campaignReducers[fetchCampaignError] as Reducer<
    string | boolean,
    FetchCampaignErrorAction
  >,
});
