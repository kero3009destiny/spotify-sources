import { BuildHierarchyError } from 'ducks/buildCampaign/types';

import {
  BuildOrDuplicateFlightAction,
  CREATE_FLIGHT_AND_CREATIVE_FOR_CAMPAIGN,
  CREATE_FLIGHT_AND_CREATIVE_FOR_CAMPAIGN_FAILED,
  CREATE_FLIGHT_AND_CREATIVE_FOR_CAMPAIGN_SUCCEEDED,
  DUPLICATE_FLIGHT_WITH_CREATIVES,
  DUPLICATE_FLIGHT_WITH_CREATIVES_FAILED,
  DUPLICATE_FLIGHT_WITH_CREATIVES_SUCCEEDED,
  RESET_BUILD_FLIGHT,
} from './types';

export interface BuildFlightState {
  addingFlightToCampaign: boolean;
  addFlightToCampaignSuccess: boolean;
  addFlightToCampaignError?: BuildHierarchyError;
  duplicating: boolean;
  duplicationSuccess: boolean;
  duplicationError: boolean;
}

export const initialState: BuildFlightState = {
  addingFlightToCampaign: false,
  addFlightToCampaignSuccess: false,
  addFlightToCampaignError: undefined,
  duplicating: false,
  duplicationSuccess: false,
  duplicationError: false,
};

export default (
  state: BuildFlightState = initialState,
  action: BuildOrDuplicateFlightAction,
) => {
  switch (action.type) {
    case CREATE_FLIGHT_AND_CREATIVE_FOR_CAMPAIGN:
      return {
        ...state,
        addingFlightToCampaign: true,
        addFlightToCampaignSuccess: false,
        addFlightToCampaignError: undefined,
      };
    case CREATE_FLIGHT_AND_CREATIVE_FOR_CAMPAIGN_SUCCEEDED:
      return {
        ...state,
        addingFlightToCampaign: false,
        addFlightToCampaignSuccess: true,
        addFlightToCampaignError: undefined,
      };
    case CREATE_FLIGHT_AND_CREATIVE_FOR_CAMPAIGN_FAILED: {
      const error =
        action.payload.status === 403
          ? BuildHierarchyError.Forbidden
          : BuildHierarchyError.GenericError;

      return {
        ...state,
        addingFlightToCampaign: false,
        addFlightToCampaignSuccess: false,
        addFlightToCampaignError: error,
      };
    }
    case RESET_BUILD_FLIGHT:
      return {
        ...state,
        ...initialState,
      };

    case DUPLICATE_FLIGHT_WITH_CREATIVES:
      return {
        ...state,
        duplicating: true,
        duplicationSuccess: false,
        duplicationError: false,
      };
    case DUPLICATE_FLIGHT_WITH_CREATIVES_SUCCEEDED:
      return {
        ...state,
        duplicating: false,
        duplicationSuccess: true,
        duplicationError: false,
      };
    case DUPLICATE_FLIGHT_WITH_CREATIVES_FAILED: {
      return {
        ...state,
        duplicating: false,
        duplicationSuccess: false,
        duplicationError: true,
      };
    }
    default:
      return state;
  }
};
