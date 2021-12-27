import { DashboardState } from './types';

export const getDashboardState = (state: TSFixMe): DashboardState => {
  return state.dashboard;
};

export const getSelectedCampaignCount = (state: TSFixMe): number => {
  return getDashboardState(state).selectedCampaigns.length;
};

export const getSelectedFlightCount = (state: TSFixMe): number => {
  return getDashboardState(state).selectedFlights.length;
};

export const getSelectedCreativeCount = (state: TSFixMe): number => {
  return getDashboardState(state).selectedCreatives.length;
};

export const getSelectedDraftCount = (state: TSFixMe): number => {
  return getDashboardState(state).selectedDrafts.length;
};

export const getAllSelectedEntitiesCount = (state: TSFixMe): number => {
  return (
    getSelectedCampaignCount(state) +
    getSelectedFlightCount(state) +
    getSelectedCreativeCount(state)
  );
};

const entitiesAreSelected = (
  state: TSFixMe,
  entityIds: string[],
  selectedEntityKey: keyof Pick<
    DashboardState,
    | 'selectedCampaigns'
    | 'selectedFlights'
    | 'selectedCreatives'
    | 'selectedDrafts'
  >,
): boolean => {
  const selectedEntities = getDashboardState(state)[selectedEntityKey];

  for (let i = 0; i < entityIds.length; i++) {
    if (!selectedEntities.includes(entityIds[i])) {
      return false;
    }
  }

  return true;
};

export const getCampaignsAreSelected = (
  state: TSFixMe,
  campaignIds: string[],
): boolean => {
  return entitiesAreSelected(state, campaignIds, 'selectedCampaigns');
};

export const getFlightsAreSelected = (
  state: TSFixMe,
  flightIds: string[],
): boolean => {
  return entitiesAreSelected(state, flightIds, 'selectedFlights');
};

export const getCreativesAreSelected = (
  state: TSFixMe,
  creativeIds: string[],
): boolean => {
  return entitiesAreSelected(state, creativeIds, 'selectedCreatives');
};

export const getDraftsAreSelected = (
  state: TSFixMe,
  draftIds: string[],
): boolean => {
  return entitiesAreSelected(state, draftIds, 'selectedDrafts');
};

export const getSelectedCampaigns = (state: TSFixMe) =>
  getDashboardState(state).selectedCampaigns;

export const getSelectedFlights = (state: TSFixMe) =>
  getDashboardState(state).selectedFlights;

export const getSelectedCreatives = (state: TSFixMe) =>
  getDashboardState(state).selectedCreatives;

export const getSelectedDrafts = (state: TSFixMe) =>
  getDashboardState(state).selectedDrafts;

export const getShouldOnlyViewSelectedCampaigns = (state: TSFixMe) =>
  getDashboardState(state).onlyViewSelectedCampaigns;

export const getShouldOnlyViewSelectedFlights = (state: TSFixMe) =>
  getDashboardState(state).onlyViewSelectedFlights;

export const getShouldOnlyViewSelectedCreatives = (state: TSFixMe) =>
  getDashboardState(state).onlyViewSelectedCreatives;

export const getShouldOnlyViewSelectedDrafts = (state: TSFixMe) =>
  getDashboardState(state).onlyViewSelectedDrafts;

export const getAnyEntitiesAreSelected = (state: TSFixMe): boolean => {
  return !!(
    getSelectedCampaigns(state).length ||
    getSelectedFlights(state).length ||
    getSelectedCreatives(state).length
  );
};
