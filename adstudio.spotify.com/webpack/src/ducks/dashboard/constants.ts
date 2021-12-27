import { DashboardState } from './types';

export const initialState: DashboardState = {
  selectedCampaigns: [],
  selectedFlights: [],
  selectedCreatives: [],
  selectedDrafts: [],
  onlyViewSelectedCampaigns: false,
  onlyViewSelectedFlights: false,
  onlyViewSelectedCreatives: false,
  onlyViewSelectedDrafts: false,
};
