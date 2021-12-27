import {
  BUILD_CAMPAIGN_HIERARCHY,
  BUILD_CAMPAIGN_HIERARCHY_FAILED,
  BUILD_CAMPAIGN_HIERARCHY_SUCCEEDED,
  BuildCampaignHierarchyAction,
  BuildHierarchyError,
  RESET_CAMPAIGN_HIERARCHY,
} from './types';

export interface BuildCampaignState {
  buildingCampaignHierarchy: boolean;
  buildCampaignHierarchySuccess: boolean;
  buildCampaignHierarchyError?: BuildHierarchyError;
  builtCampaignId?: string;
}

export const initialState: BuildCampaignState = {
  buildingCampaignHierarchy: false,
  buildCampaignHierarchySuccess: false,
  buildCampaignHierarchyError: undefined,
  builtCampaignId: undefined,
};

export default (
  state: BuildCampaignState = initialState,
  action: BuildCampaignHierarchyAction,
) => {
  switch (action.type) {
    case BUILD_CAMPAIGN_HIERARCHY:
      return {
        ...state,
        buildingCampaignHierarchy: true,
        buildCampaignHierarchySuccess: false,
        buildCampaignHierarchyError: undefined,
        builtCampaignId: undefined,
      };
    case BUILD_CAMPAIGN_HIERARCHY_SUCCEEDED:
      return {
        ...state,
        buildingCampaignHierarchy: false,
        buildCampaignHierarchySuccess: true,
        buildCampaignHierarchyError: undefined,
        builtCampaignId: action.payload.id,
      };
    case BUILD_CAMPAIGN_HIERARCHY_FAILED: {
      const error =
        action.payload.status === 403
          ? BuildHierarchyError.Forbidden
          : BuildHierarchyError.GenericError;

      return {
        ...state,
        buildingCampaignHierarchy: false,
        buildCampaignHierarchySuccess: false,
        buildCampaignHierarchyError: error,
        builtCampaignId: undefined,
      };
    }
    case RESET_CAMPAIGN_HIERARCHY:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};
