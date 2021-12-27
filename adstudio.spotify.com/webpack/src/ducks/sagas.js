import { all } from 'redux-saga/effects';

import accountSagas from './account/sagas';
import accountManagementSaga from './accountManagement/sagas';
import accountsSaga from './accounts/sagas';
import adBlockerSaga from './adBlocker/sagas';
import adminAlertSaga from './adminAlert/sagas';
import adOptionsSaga from './adOptions/sagas';
import adReviewSagas from './adReview/sagas';
import analyticsSaga from './analytics/sagas';
import assetLibrary from './assetLibrary/sagas';
import assetReviewSaga from './assetReview/sagas';
import audienceCreationSaga from './audienceCreation/sagas';
import audienceLibrarySaga from './audienceLibrary/sagas';
import authSaga from './auth/sagas';
import billingSaga from './billing/sagas';
import buildCampaignSaga from './buildCampaign/sagas';
import buildCreativeSaga from './buildCreative/sagas';
import buildFlightSaga from './buildFlight/sagas';
import bulksheetsSaga from './bulksheets/sagas';
import campaignsSaga from './campaigns/sagas';
import columnsSaga from './columns/sagas';
import configSaga from './config/sagas';
import creativesSaga from './creatives/sagas';
import editCampaignSaga from './editCampaign/sagas';
import editCreativeSaga from './editCreative/sagas';
import editFlightSaga from './editFlight/sagas';
import flightLinksSaga from './flightlinks/sagas';
import flightsSaga from './flights/sagas';
import hierarchyDraftsSaga from './hierarchyDrafts/sagas';
import hierarchyExportSaga from './hierarchyExport/sagas';
import i18nSaga from './i18n/sagas';
import newFeatureSaga from './newFeatures/sagas';
import offersSaga from './offers/sagas';
import onboardingSaga from './onboarding/sagas';
import payments from './payments/sagas';
import redirectSaga from './redirect/sagas';
import reduxFormSaga from './reduxForm/sagas';
import savedQueriesSaga from './savedQueries/sagas';
import scheduledReportingSaga from './scheduledReporting/sagas';
import sentrySaga from './sentry/sagas';
import addAccountSaga from './signup/sagas';
import stockMusicSaga from './stockMusic/sagas';
import unauthorized from './unauthorized/sagas';
import userSaga from './user/sagas';
import userDetailsSaga from './userDetails/sagas';
import userPreferences from './userPreferences/sagas';
import utmSaga from './utm/sagas';
import windowSaga from './window/sagas';

export default function* rootSaga() {
  yield all([
    accountSagas(),
    accountManagementSaga(),
    accountsSaga(),
    audienceLibrarySaga(),
    audienceCreationSaga(),
    adBlockerSaga(),
    addAccountSaga(),
    adminAlertSaga(),
    adReviewSagas(),
    analyticsSaga(),
    adOptionsSaga(),
    assetLibrary(),
    authSaga(),
    assetReviewSaga(),
    billingSaga(),
    buildCampaignSaga(),
    bulksheetsSaga(),
    campaignsSaga(),
    creativesSaga(),
    columnsSaga(),
    configSaga(),
    editCampaignSaga(),
    editCreativeSaga(),
    editFlightSaga(),
    flightsSaga(),
    hierarchyDraftsSaga(),
    hierarchyExportSaga(),
    i18nSaga(),
    onboardingSaga(),
    payments(),
    redirectSaga(),
    reduxFormSaga(),
    sentrySaga(),
    stockMusicSaga(),
    newFeatureSaga(),
    unauthorized(),
    userDetailsSaga(),
    userSaga(),
    userPreferences(),
    utmSaga(),
    windowSaga(),
    buildFlightSaga(),
    buildCreativeSaga(),
    flightLinksSaga(),
    offersSaga(),
    savedQueriesSaga(),
    scheduledReportingSaga(),
  ]);
}
