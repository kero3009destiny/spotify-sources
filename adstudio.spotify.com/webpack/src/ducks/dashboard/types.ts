// state types

export interface DashboardState {
  selectedCampaigns: string[];
  selectedFlights: string[];
  selectedCreatives: string[];
  selectedDrafts: string[];
  onlyViewSelectedCampaigns: boolean;
  onlyViewSelectedFlights: boolean;
  onlyViewSelectedCreatives: boolean;
  onlyViewSelectedDrafts: boolean;
}

// action types

export const SELECT_CAMPAIGNS = 'SELECT_CAMPAIGNS';
export const SELECT_FLIGHTS = 'SELECT_FLIGHTS';
export const SELECT_CREATIVES = 'SELECT_CREATIVES';
export const SELECT_DRAFTS = 'SELECT_DRAFTS';
export const SELECT_FROM_SAVED_FILTER = 'SELECT_FROM_SAVED_FILTER';
export const DESELECT_CAMPAIGNS = 'DESELECT_CAMPAIGNS';
export const DESELECT_FLIGHTS = 'DESELECT_FLIGHTS';
export const DESELECT_CREATIVES = 'DESELECT_CREATIVES';
export const DESELECT_DRAFTS = 'DESELECT_DRAFTS';
export const DESELECT_ALL_ENTITIES = 'DESELECT_ALL_ENTITIES';
export const REPLACE_ALL_SELECTIONS_WITH_CAMPAIGN =
  'REPLACE_ALL_SELECTIONS_WITH_CAMPAIGN';
export const REPLACE_ALL_SELECTIONS_WITH_FLIGHT =
  'REPLACE_ALL_SELECTIONS_WITH_FLIGHT';
export const VIEW_SELECTED_CAMPAIGNS = 'VIEW_SELECTED_CAMPAIGNS';
export const VIEW_ALL_CAMPAIGNS = 'VIEW_ALL_CAMPAIGNS';
export const VIEW_SELECTED_FLIGHTS = 'VIEW_SELECTED_FLIGHTS';
export const VIEW_ALL_FLIGHTS = 'VIEW_ALL_FLIGHTS';
export const VIEW_SELECTED_CREATIVES = 'VIEW_SELECTED_CREATIVES';
export const VIEW_ALL_CREATIVES = 'VIEW_ALL_CREATIVES';
export const VIEW_ALL_DRAFTS = 'VIEW_ALL_DRAFTS';
export const VIEW_SELECTED_DRAFTS = 'VIEW_SELECTED_DRAFTS';

export interface SelectCampaignsAction {
  type: typeof SELECT_CAMPAIGNS;
  payload: string[];
}

export interface SelectFlightsAction {
  type: typeof SELECT_FLIGHTS;
  payload: string[];
}

export interface SelectCreativesAction {
  type: typeof SELECT_CREATIVES;
  payload: string[];
}

export interface SelectDraftsAction {
  type: typeof SELECT_DRAFTS;
  payload: string[];
}

export interface SelectFromSavedFilterAction {
  type: typeof SELECT_FROM_SAVED_FILTER;
  payload: {
    campaignIds: string[];
    flightIds: string[];
  };
}

export interface DeselectCampaignsAction {
  type: typeof DESELECT_CAMPAIGNS;
  payload: string[];
}

export interface DeselectFlightsAction {
  type: typeof DESELECT_FLIGHTS;
  payload: string[];
}

export interface DeselectCreativesAction {
  type: typeof DESELECT_CREATIVES;
  payload: string[];
}

export interface DeselectDraftsAction {
  type: typeof DESELECT_DRAFTS;
  payload: string[];
}

export interface ReplaceAllSelectionsWithCampaign {
  type: typeof REPLACE_ALL_SELECTIONS_WITH_CAMPAIGN;
  payload: string;
}

export interface ReplaceAllSelectionsWithFlight {
  type: typeof REPLACE_ALL_SELECTIONS_WITH_FLIGHT;
  payload: string;
}

export interface DeselectAllEntitiesAction {
  type: typeof DESELECT_ALL_ENTITIES;
}

export interface ViewSelectedCampaignsAction {
  type: typeof VIEW_SELECTED_CAMPAIGNS;
}

export interface ViewAllCampaignsAction {
  type: typeof VIEW_ALL_CAMPAIGNS;
}

export interface ViewSelectedFlightsAction {
  type: typeof VIEW_SELECTED_FLIGHTS;
}

export interface ViewAllFlightsAction {
  type: typeof VIEW_ALL_FLIGHTS;
}

export interface ViewSelectedCreativesAction {
  type: typeof VIEW_SELECTED_CREATIVES;
}

export interface ViewAllCreativesAction {
  type: typeof VIEW_ALL_CREATIVES;
}

export interface ViewSelectedDraftsAction {
  type: typeof VIEW_SELECTED_DRAFTS;
}

export interface ViewAllDraftsAction {
  type: typeof VIEW_ALL_DRAFTS;
}

export type MultiselectActionType =
  | SelectCampaignsAction
  | SelectFlightsAction
  | SelectCreativesAction
  | SelectDraftsAction
  | SelectFromSavedFilterAction
  | DeselectCampaignsAction
  | DeselectFlightsAction
  | DeselectCreativesAction
  | DeselectDraftsAction
  | ReplaceAllSelectionsWithCampaign
  | ReplaceAllSelectionsWithFlight
  | DeselectAllEntitiesAction
  | ViewSelectedCampaignsAction
  | ViewAllCampaignsAction
  | ViewSelectedFlightsAction
  | ViewAllFlightsAction
  | ViewSelectedCreativesAction
  | ViewAllCreativesAction
  | ViewSelectedDraftsAction
  | ViewAllDraftsAction;
