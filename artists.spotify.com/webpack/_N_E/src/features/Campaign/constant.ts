import { BannerType } from '../Banner/BannerState';
export var DELIVERY_METRICS_SLO = 3; // hours

export var ENGAGEMENT_METRICS_SLO = 30; // hours

export var SCM_WINDOW = 14; // days

export var PREVIEW_HEIGHT = 500;
export var PREVIEW_WIDTH = 280;
export var MAX_BUDGET = 10000;
export var MAX_BUDGET_INVOICED = 200000;
export var MIN_BUDGET = 250;
export var ISO_DATE_FORMAT = 'YYYY-MM-DD';
export var NON_RELEASE_METRICS_CUTOFF_DATE = '2021-11-09';
export var CampaignSteps;

(function (CampaignSteps) {
  CampaignSteps["ChooseTeam"] = "choose-team";
  CampaignSteps["PreviewContent"] = "preview-content";
  CampaignSteps["SetupCampaign"] = "setup-campaign";
  CampaignSteps["AddBudget"] = "add-budget";
  CampaignSteps["Billing"] = "billing";
  CampaignSteps["ReviewCampaign"] = "review-campaign";
})(CampaignSteps || (CampaignSteps = {}));

export var MARQUEE_CAMPAIGN_ACTION = 'marquee-campaign.create-action';
export var SLO_DAYS = 3;
export var MAX_DAYS_AFTER_RELEASE = 21;
export var MAX_CAMPAIGN_LENGTH = 7; // days

export var defaultNavSteps = [{
  id: CampaignSteps.ChooseTeam,
  label: 'Choose team',
  path: '/team'
}, {
  id: CampaignSteps.SetupCampaign,
  label: 'Set up campaign',
  path: '/setup'
}, {
  id: CampaignSteps.Billing,
  label: 'Billing',
  path: '/billing'
}, {
  id: CampaignSteps.ReviewCampaign,
  label: 'Review campaign',
  path: '/review'
}];
export var editNavSteps = [{
  id: CampaignSteps.PreviewContent,
  label: 'Set up campaign',
  path: '/preview'
}, {
  id: CampaignSteps.AddBudget,
  label: 'Add budget',
  path: '/budget'
}, {
  id: CampaignSteps.ReviewCampaign,
  label: 'Review campaign',
  path: '/review'
}];
export var defaultArtistTargeting = {
  error: false,
  forecastedBudget: {
    maxLikelyBudget: 0,
    impossibleBudget: 0
  },
  reach: 0,
  ctr: 0
}; // States for messaging users about incidents / outages with campaigns functionality
// These are functions because jest cannot mock primitives for testing

export var campaignPageBanner = function campaignPageBanner() {
  return {
    id: 'campaignPageBanner',
    colorSet: BannerType.ERROR,
    message: '',
    display: false
  };
};
export var reportingPageBanner = function reportingPageBanner() {
  return {
    id: 'reportingPageBanner',
    colorSet: BannerType.ERROR,
    message: '',
    display: false
  };
};
export var bookingFlowBanner = function bookingFlowBanner() {
  return {
    id: 'bookingFlowBanner',
    colorSet: 'negative',
    // Booking flow does not use the shared banner (in modal)
    message: '',
    display: false
  };
};