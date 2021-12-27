import {
  EDIT_CAMPAIGN,
  EDIT_CAMPAIGN_FAILED,
  EDIT_CAMPAIGN_SUCCEEDED,
  EditCampaignAction,
} from './types';

export interface EditCampaignState {
  editingCampaign: boolean;
  editCampaignSuccess: boolean;
  editCampaignError: boolean;
}

export const defaultEditCampaignState: EditCampaignState = {
  editingCampaign: false,
  editCampaignSuccess: false,
  editCampaignError: false,
};

export default (
  state: EditCampaignState = defaultEditCampaignState,
  action: EditCampaignAction,
) => {
  switch (action.type) {
    case EDIT_CAMPAIGN:
      return {
        ...state,
        editingCampaign: true,
        editCampaignSuccess: false,
        editCampaignError: false,
      };

    case EDIT_CAMPAIGN_SUCCEEDED:
      return {
        ...state,
        editingCampaign: false,
        editCampaignSuccess: true,
        editCampaignError: false,
      };

    case EDIT_CAMPAIGN_FAILED:
      return {
        ...state,
        editingCampaign: false,
        editCampaignSuccess: false,
        editCampaignError: true,
      };

    default:
      return state;
  }
};
