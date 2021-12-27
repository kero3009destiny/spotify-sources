import { TableState } from '@spotify-internal/adstudio-shared/lib/components/TSTableBrowser/types';

import { CampaignDetailsState, CampaignsState } from './reducer';

import { PersistenceState } from 'types/common/campaignHierarchy/types';

export const getCampaignsState = (state: TSFixMe): CampaignsState => {
  return state.campaigns;
};

export const isCampaignsCatalogueEmpty = (state: TSFixMe): boolean => {
  const { campaignsCatalogue } = getCampaignsState(state);
  return campaignsCatalogue.items.length === 0 && !campaignsCatalogue.loading;
};

export const getCampaignsTableState = (state: TSFixMe): TableState => {
  const { campaignsCatalogue } = getCampaignsState(state);

  return {
    rows: campaignsCatalogue.items,
    loading: campaignsCatalogue.loading,
    empty: isCampaignsCatalogueEmpty(state),
    paging: campaignsCatalogue.paging,
  };
};

export const getFetchingCampaignState = (
  state: TSFixMe,
): Omit<CampaignsState, 'campaignsCatalogue' | 'campaign'> => {
  return {
    fetchingCampaign: state.campaigns.fetchingCampaign,
    fetchCampaignSuccess: state.campaigns.fetchCampaignSuccess,
    fetchCampaignError: state.campaigns.fetchCampaignError,
  };
};

export const getCampaignState = (state: TSFixMe): CampaignDetailsState => {
  return {
    ...state.campaigns.campaign,
    persistenceState: PersistenceState.EXISTING,
  };
};

export const getCampaignCatalogueServerError = (state: TSFixMe): boolean => {
  const { campaignsCatalogue } = getCampaignsState(state);

  if (
    campaignsCatalogue.error &&
    (campaignsCatalogue.error as Response).status &&
    (campaignsCatalogue.error as Response).status !== 404
  ) {
    return true;
  }

  return false;
};
