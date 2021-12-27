import { pullAll, uniq } from 'lodash';

import { initialState } from './constants';

import {
  DashboardState,
  DESELECT_ALL_ENTITIES,
  DESELECT_CAMPAIGNS,
  DESELECT_CREATIVES,
  DESELECT_DRAFTS,
  DESELECT_FLIGHTS,
  MultiselectActionType,
  REPLACE_ALL_SELECTIONS_WITH_CAMPAIGN,
  REPLACE_ALL_SELECTIONS_WITH_FLIGHT,
  SELECT_CAMPAIGNS,
  SELECT_CREATIVES,
  SELECT_DRAFTS,
  SELECT_FLIGHTS,
  SELECT_FROM_SAVED_FILTER,
  VIEW_ALL_CAMPAIGNS,
  VIEW_ALL_CREATIVES,
  VIEW_ALL_DRAFTS,
  VIEW_ALL_FLIGHTS,
  VIEW_SELECTED_CAMPAIGNS,
  VIEW_SELECTED_CREATIVES,
  VIEW_SELECTED_DRAFTS,
  VIEW_SELECTED_FLIGHTS,
} from './types';

export function dashboardReducer(
  state: DashboardState = initialState,
  action: MultiselectActionType,
): DashboardState {
  let updatedFlights;
  let updatedCampaigns;
  let updatedCreatives;
  let updatedDrafts;

  switch (action.type) {
    // select campaigns and deselect anything lower in the hierarchy if
    // views are being filtered by campaigns
    case SELECT_CAMPAIGNS:
      return {
        ...state,
        selectedCampaigns: uniq([
          ...state.selectedCampaigns,
          ...action.payload,
        ]),
        selectedFlights: state.selectedCampaigns.length
          ? state.selectedFlights
          : [],
        selectedCreatives: state.selectedCampaigns.length
          ? state.selectedCreatives
          : [],
        onlyViewSelectedFlights: state.selectedCampaigns.length
          ? state.onlyViewSelectedFlights
          : false,
        onlyViewSelectedCreatives: state.selectedCampaigns.length
          ? state.onlyViewSelectedCreatives
          : false,
      };
    // select flights and deselect anything lower in the hierarchy if views
    // are being filtered by flights
    case SELECT_FLIGHTS:
      return {
        ...state,
        selectedFlights: uniq([...state.selectedFlights, ...action.payload]),
        selectedCreatives: state.selectedFlights.length
          ? state.selectedCreatives
          : [],
        onlyViewSelectedCreatives: state.selectedFlights.length
          ? state.onlyViewSelectedCreatives
          : false,
      };
    // select creatives with no impact on the upper hierarchy
    case SELECT_CREATIVES:
      return {
        ...state,
        selectedCreatives: uniq([
          ...state.selectedCreatives,
          ...action.payload,
        ]),
      };
    case SELECT_DRAFTS:
      return {
        ...state,
        selectedDrafts: uniq([...state.selectedDrafts, ...action.payload]),
      };
    // allows for saved filters to set selected campaigns and flights at the same time and reset any other selections
    case SELECT_FROM_SAVED_FILTER:
      return {
        ...state,
        selectedCampaigns: uniq(action.payload.campaignIds),
        selectedFlights: uniq(action.payload.flightIds),
        selectedCreatives: [],
        selectedDrafts: [],
        onlyViewSelectedCampaigns: false,
        onlyViewSelectedFlights: false,
        onlyViewSelectedCreatives: false,
        onlyViewSelectedDrafts: false,
      };
    // deselect campaigns and clear anything lower in the hierarchy
    case DESELECT_CAMPAIGNS:
      updatedCampaigns = pullAll([...state.selectedCampaigns], action.payload);
      return {
        ...state,
        selectedCampaigns: updatedCampaigns,
        selectedFlights: [],
        selectedCreatives: [],
        onlyViewSelectedCampaigns:
          updatedCampaigns.length === 0
            ? false
            : state.onlyViewSelectedCampaigns,
        onlyViewSelectedFlights: false,
        onlyViewSelectedCreatives: false,
      };
    // deselect flights and clear anything lower in the hierarchy
    case DESELECT_FLIGHTS:
      updatedFlights = pullAll([...state.selectedFlights], action.payload);
      return {
        ...state,
        selectedFlights: updatedFlights,
        selectedCreatives: [],
        onlyViewSelectedFlights:
          updatedFlights.length === 0 ? false : state.onlyViewSelectedFlights,
        onlyViewSelectedCreatives: false,
      };
    // deselect creatives with no impact on the upper hierarchy
    case DESELECT_CREATIVES:
      updatedCreatives = pullAll([...state.selectedCreatives], action.payload);
      return {
        ...state,
        selectedCreatives: updatedCreatives,
        onlyViewSelectedCreatives:
          updatedCreatives.length === 0
            ? false
            : state.onlyViewSelectedCreatives,
      };
    // deselect creatives with no impact on the upper hierarchy
    case DESELECT_DRAFTS:
      updatedDrafts = pullAll([...state.selectedDrafts], action.payload);
      return {
        ...state,
        selectedDrafts: updatedDrafts,
        onlyViewSelectedDrafts:
          updatedDrafts.length === 0 ? false : state.onlyViewSelectedDrafts,
      };
    // clear existing campaign selections and select the one campaign, clearing anything
    // selected lower in the hierarchy
    case REPLACE_ALL_SELECTIONS_WITH_CAMPAIGN:
      return {
        ...state,
        selectedCampaigns: [action.payload],
        selectedFlights: [],
        selectedCreatives: [],
        onlyViewSelectedFlights: false,
        onlyViewSelectedCreatives: false,
      };
    // clear existing flight selections and select the one flight, clearing anything
    // selected lower in the hierarchy
    case REPLACE_ALL_SELECTIONS_WITH_FLIGHT:
      return {
        ...state,
        selectedFlights: [action.payload],
        selectedCreatives: [],
        onlyViewSelectedCreatives: false,
      };
    case VIEW_SELECTED_CAMPAIGNS:
      return {
        ...state,
        onlyViewSelectedCampaigns: true,
      };
    case VIEW_ALL_CAMPAIGNS:
      return {
        ...state,
        onlyViewSelectedCampaigns: false,
      };
    case VIEW_SELECTED_FLIGHTS:
      return {
        ...state,
        onlyViewSelectedFlights: true,
      };
    case VIEW_ALL_FLIGHTS:
      return {
        ...state,
        onlyViewSelectedFlights: false,
      };
    case VIEW_SELECTED_CREATIVES:
      return {
        ...state,
        onlyViewSelectedCreatives: true,
      };
    case VIEW_ALL_CREATIVES:
      return {
        ...state,
        onlyViewSelectedCreatives: false,
      };
    case VIEW_SELECTED_DRAFTS:
      return {
        ...state,
        onlyViewSelectedDrafts: true,
      };
    case VIEW_ALL_DRAFTS:
      return {
        ...state,
        onlyViewSelectedDrafts: false,
      };
    case DESELECT_ALL_ENTITIES:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

export default dashboardReducer;
