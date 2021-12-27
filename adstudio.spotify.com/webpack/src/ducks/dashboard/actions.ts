import {
  DESELECT_ALL_ENTITIES,
  DESELECT_CAMPAIGNS,
  DESELECT_CREATIVES,
  DESELECT_DRAFTS,
  DESELECT_FLIGHTS,
  DeselectAllEntitiesAction,
  DeselectCampaignsAction,
  DeselectCreativesAction,
  DeselectDraftsAction,
  DeselectFlightsAction,
  REPLACE_ALL_SELECTIONS_WITH_CAMPAIGN,
  REPLACE_ALL_SELECTIONS_WITH_FLIGHT,
  ReplaceAllSelectionsWithCampaign,
  ReplaceAllSelectionsWithFlight,
  SELECT_CAMPAIGNS,
  SELECT_CREATIVES,
  SELECT_DRAFTS,
  SELECT_FLIGHTS,
  SELECT_FROM_SAVED_FILTER,
  SelectCampaignsAction,
  SelectCreativesAction,
  SelectDraftsAction,
  SelectFlightsAction,
  SelectFromSavedFilterAction,
  VIEW_ALL_CAMPAIGNS,
  VIEW_ALL_CREATIVES,
  VIEW_ALL_DRAFTS,
  VIEW_ALL_FLIGHTS,
  VIEW_SELECTED_CAMPAIGNS,
  VIEW_SELECTED_CREATIVES,
  VIEW_SELECTED_DRAFTS,
  VIEW_SELECTED_FLIGHTS,
  ViewAllCampaignsAction,
  ViewAllCreativesAction,
  ViewAllDraftsAction,
  ViewAllFlightsAction,
  ViewSelectedCampaignsAction,
  ViewSelectedCreativesAction,
  ViewSelectedDraftsAction,
  ViewSelectedFlightsAction,
} from './types';

export const selectCampaigns = (payload: string[]): SelectCampaignsAction => ({
  type: SELECT_CAMPAIGNS,
  payload,
});

export const selectFlights = (payload: string[]): SelectFlightsAction => ({
  type: SELECT_FLIGHTS,
  payload,
});

export const selectCreatives = (payload: string[]): SelectCreativesAction => ({
  type: SELECT_CREATIVES,
  payload,
});

export const selectDrafts = (payload: string[]): SelectDraftsAction => ({
  type: SELECT_DRAFTS,
  payload,
});

export const selectFromSavedFilter = (payload: {
  campaignIds: string[];
  flightIds: string[];
}): SelectFromSavedFilterAction => ({
  type: SELECT_FROM_SAVED_FILTER,
  payload,
});

export const deselectCampaigns = (
  payload: string[],
): DeselectCampaignsAction => ({
  type: DESELECT_CAMPAIGNS,
  payload,
});

export const deselectFlights = (payload: string[]): DeselectFlightsAction => ({
  type: DESELECT_FLIGHTS,
  payload,
});

export const deselectCreatives = (
  payload: string[],
): DeselectCreativesAction => ({
  type: DESELECT_CREATIVES,
  payload,
});

export const deselectDrafts = (payload: string[]): DeselectDraftsAction => ({
  type: DESELECT_DRAFTS,
  payload,
});

export const replaceAllSelectionsWithCampaign = (
  payload: string,
): ReplaceAllSelectionsWithCampaign => ({
  type: REPLACE_ALL_SELECTIONS_WITH_CAMPAIGN,
  payload,
});

export const replaceAllSelectionsWithFlight = (
  payload: string,
): ReplaceAllSelectionsWithFlight => ({
  type: REPLACE_ALL_SELECTIONS_WITH_FLIGHT,
  payload,
});

export const deselectAllEntities = (): DeselectAllEntitiesAction => ({
  type: DESELECT_ALL_ENTITIES,
});

export const viewSelectedCampaigns = (): ViewSelectedCampaignsAction => ({
  type: VIEW_SELECTED_CAMPAIGNS,
});

export const viewSelectedFlights = (): ViewSelectedFlightsAction => ({
  type: VIEW_SELECTED_FLIGHTS,
});

export const viewSelectedCreatives = (): ViewSelectedCreativesAction => ({
  type: VIEW_SELECTED_CREATIVES,
});

export const viewSelectedDrafts = (): ViewSelectedDraftsAction => ({
  type: VIEW_SELECTED_DRAFTS,
});

export const viewAllCampaigns = (): ViewAllCampaignsAction => ({
  type: VIEW_ALL_CAMPAIGNS,
});

export const viewAllFlights = (): ViewAllFlightsAction => ({
  type: VIEW_ALL_FLIGHTS,
});

export const viewAllCreatives = (): ViewAllCreativesAction => ({
  type: VIEW_ALL_CREATIVES,
});

export const viewAllDrafts = (): ViewAllDraftsAction => ({
  type: VIEW_ALL_DRAFTS,
});
