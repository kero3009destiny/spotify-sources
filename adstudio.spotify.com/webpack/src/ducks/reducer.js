import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import account from './account/reducer';
import accountManagement from './accountManagement/reducer';
import accounts from './accounts/reducer';
import adBlocker from './adBlocker/reducer';
import adminAlert from './adminAlert/reducer';
import adOptions from './adOptions/reducer';
import adRedirects from './adRedirects/reducer';
import adReview from './adReview/reducer';
import analytics from './analytics/reducer';
import assetLibrary from './assetLibrary/reducer';
import assetReview from './assetReview/reducer';
import audienceCreation from './audienceCreation/reducer';
import audienceLibrary from './audienceLibrary/reducer';
import auth from './auth/reducer';
import billing from './billing/reducer';
import buildCampaign from './buildCampaign/reducer';
import buildCreative from './buildCreative/reducer';
import buildFlight from './buildFlight/reducer';
import bulksheets from './bulksheets/reducer';
import campaigns from './campaigns/reducer';
import columns from './columns/reducer';
import config from './config/reducer';
import creatives from './creatives/reducer';
import dashboard from './dashboard/reducer';
import editCampaign from './editCampaign/reducer';
import editCreative from './editCreative/reducer';
import editFlight from './editFlight/reducer';
import flightlinks from './flightlinks/reducer';
import flights from './flights/reducer';
import globalDialog from './globalDialog/reducer';
import hierarchyDrafts from './hierarchyDrafts/reducer';
import hierarchyExport from './hierarchyExport/reducer';
import i18n from './i18n/reducer';
import network from './network/reducer';
import newFeatures from './newFeatures/reducer';
import notifications from './notifications/reducer';
import offers from './offers/reducer';
import onboarding from './onboarding/reducer';
import payments from './payments/reducer';
import redirect from './redirect/reducer';
import routes from './routes/reducer';
import savedQueries from './savedQueries/reducer';
import scheduledReporting from './scheduledReporting/reducer';
import signup from './signup/reducer';
import stockMusic from './stockMusic/reducer';
import unauthorized from './unauthorized/reducer';
import user from './user/reducer';
import userDetails from './userDetails/reducer';
import userPreferences from './userPreferences/reducer';
import utm from './utm/reducer';

export default combineReducers({
  account,
  audienceLibrary,
  accountManagement,
  audienceCreation,
  accounts,
  adminAlert,
  adBlocker,
  adOptions,
  adRedirects,
  adReview,
  analytics,
  assetLibrary,
  assetReview,
  auth,
  billing,
  buildCampaign,
  buildCreative,
  buildFlight,
  bulksheets,
  campaigns,
  columns,
  config,
  creatives,
  dashboard,
  editCampaign,
  editCreative,
  editFlight,
  globalDialog,
  flightlinks,
  flights,
  form,
  hierarchyDrafts,
  hierarchyExport,
  i18n,
  network,
  newFeatures,
  notifications,
  offers,
  onboarding,
  payments,
  redirect,
  routes,
  routing,
  savedQueries,
  scheduledReporting,
  signup,
  stockMusic,
  unauthorized,
  user,
  userDetails,
  userPreferences,
  utm,
});
