import React from 'react';
import { IndexRoute, Route } from 'react-router';
import i18n from 'i18next';

import { logUserAction } from 'ducks/analytics/actions';
import { userLoggedOut } from 'ducks/auth/actions';

import AdAccountSelector from 'components/AdAccountSelector';
import GlobalNav from 'components/GlobalNav';
import MainComponent from 'components/MainComponent';
import MobileOverlay from 'components/MobileOverlay';
import NotFound from 'components/NotFound';
import AuthenticationRequired from 'components/Redirects/AuthenticationRequired';
import AuthorizationRequired from 'components/Redirects/AuthorizationRequired';
import ExternalRedirect from 'components/Redirects/ExternalRedirect';
import GreylistRedirect from 'components/Redirects/GreylistRedirect';
import InternalRedirect from 'components/Redirects/InternalRedirect';
import NoAuthorizationRequired from 'components/Redirects/NoAuthorizationRequired';
import RedirectReturn from 'components/Redirects/RedirectReturn';
import TermsRedirect from 'components/Redirects/TermsRedirect';
import StreamingConversionMetrics from 'components/StreamingConversionMetrics';
import TopnavContainer from 'components/TopnavContainer';

import { getComponentForImport } from 'utils/routeHelpers';

import {
  EXTERNAL_FAQ_ADDRESS,
  EXTERNAL_TERMS_ADDRESS,
  routeStrings as routes,
} from 'config/routes';

// chunk: home
const home = () => import(/* webpackChunkName: "home" */ 'components/Home');

// chunk: build-ad
const buildAd = () =>
  import(/* webpackChunkName: "build-ad" */ 'components/BuildAd');

// chunk: settings
const accountSettings = () =>
  import(
    /* webpackChunkName: "account-settings" */ 'components/AccountSettings'
  );
const accountAddress = () =>
  import(/* webpackChunkName: "account-settings" */ 'components/AddressForm');
const userSettings = () =>
  import(/* webpackChunkName: "user-settings" */ 'components/UserSettings');

// chunk: new-signup
const signupRoot = () =>
  import(/* webpackChunkName: "new-signup" */ 'components/Signup/Root');

const signupRootWhiteFullScreen = () =>
  import(
    /* webpackChunkName: "new-signup" */ 'components/Signup/Root/WhiteFullScreen'
  );

const signupAccountNotice = () =>
  import(
    /* webpackChunkName: "new-signup" */ 'components/Signup/AccountNotice'
  );

const signupForm = () =>
  import(/* webpackChunkName: "new-signup" */ 'components/Signup/Form');

const newSignupConfirmationPage = () =>
  import(/* webpackChunkName: "new-signup" */ 'components/Signup/Confirmation');
const newSignupLogin = () =>
  import(/* webpackChunkName: "new-signup" */ 'components/Signup/Login');

const popupWindow = () =>
  import(
    /* webpackChunkName: "new-signup" */ 'components/Signup/PopUp/RedirectLayout'
  );
const popupRedirect = () =>
  import(
    /* webpackChunkName: "new-signup" */ 'components/Signup/PopUp/CloseWindow'
  );

// chunk: Greylisted page
const greylistedPage = () =>
  import(
    /* webpackChunkName: "new-signup" */ 'components/common/GreylistedPage'
  );

const campaignCatalogue = () =>
  import(
    /* webpackChunkName: "catalogue-view" */ 'components/CampaignCatalogue'
  );

const flightCatalogue = () =>
  import(/* webpackChunkName: "catalogue-view" */ 'components/FlightCatalogue');

const flightDetails = () =>
  import(/* webpackChunkName: "flight-details" */ 'components/FlightDetails');

const creativeCatalogue = () =>
  import(
    /* webpackChunkName: "catalogue-view" */ 'components/CreativeCatalogue'
  );

const creativeDetails = () =>
  import(
    /* webpackChunkName: "creative-details" */ 'components/CreativeDetails'
  );

const campaignBuilder = () =>
  import(
    /* webpackChunkName: "campaign-builder" */ 'components/CampaignBuilder'
  );

const flightBuilder = () =>
  import(/* webpackChunkName: "flight-builder" */ 'components/FlightBuilder');

const creativeBuilder = () =>
  import(
    /* webpackChunkName: "creative-builder" */ 'components/CreativeBuilder'
  );

const editCampaignForm = () =>
  import(
    /* webpackChunkname: "edit-campaign-form" */ 'components/EditCampaign'
  );

const editFlightForm = () =>
  import(/* webpackChunkname: "edit-flight-form" */ 'components/EditFlight');

const editCreativeForm = () =>
  import(
    /* webpackChunkname: "edit-creative-form" */ 'components/EditCreative'
  );

const APITerms = () =>
  import(/* webpackChunkName: "api-terms" */ 'components/OpenAPITerms');

const ConfigInspector = () =>
  import(
    /* webpackChunkName: "config-inspector" */ 'components/debug/ConfigInspector'
  );

const duplicateFlight = () =>
  import(
    /* webpackChunkName: "duplicate-flight" */ 'components/DuplicateFlight'
  );

const duplicateFlightWithCreatives = () =>
  import(
    /* webpackChunkName: "duplicate-flight-with-creatives" */ 'components/DuplicateFlightWithCreatives'
  );

const duplicateCreative = () =>
  import(
    /* webpackChunkName: "duplicate-creative" */ 'components/DuplicateCreative'
  );

const accountManagement = () =>
  import(
    /* webpackChunkName: "account-management" */ 'components/AccountManagement'
  );

const accountDetails = () =>
  import(
    /* webpackChunkName: "account-management" */ 'components/AccountManagement/AccountDetails'
  );

const billingCenter = () =>
  import(/* webpackChunkName: "billing-center" */ 'components/BillingCenter');

const campaignDraftCatalogue = () =>
  import(
    /* webpackChunkName: "campaign-draft-catalogue" */ 'components/CampaignDraftCatalogue'
  );

const audiences = () =>
  import(/* webpackChunkName: "audiences" */ 'components/AudiencesView');

const audienceCreation = () =>
  import(/* webpackChunkName: "audiences" */ 'components/AudienceCreation');

const flightDraftCatalogue = () =>
  import(
    /* webpackChunkName: "flight-draft-catalogue" */ 'components/FlightDraftCatalogue'
  );

const creativeDraftCatalogue = () =>
  import(
    /* webpackChunkName: "creative-draft-catalogue" */ 'components/CreativeDraftCatalogue'
  );

const draftRedirect = () =>
  import(/* webpackChunkName: "draft-redirect" */ 'components/DraftRedirect');

const assetLibrary = () =>
  import(/* webpackChunkName: "draft-redirect" */ 'components/AssetLibrary');

const FAQ = EXTERNAL_FAQ_ADDRESS[i18n.language]
  ? EXTERNAL_FAQ_ADDRESS[i18n.language].FAQ
  : EXTERNAL_FAQ_ADDRESS.en_US.FAQ;

// IMPORTANT - for ad account switcher, most internal URLs are being switched to include the
// selected ad account ID.  These are identified by the suffix _ADACCOUNT.  We must retain the
// legacy URLs to handle embedded URLs in emails etc.
export const routeConfig = () => {
  return (
    <Route path={routes.MAIN} component={MainComponent}>
      <Route component={AuthenticationRequired}>
        <Route component={AuthorizationRequired}>
          <Route component={MobileOverlay}>
            <Route component={GlobalNav}>
              <Route component={AdAccountSelector}>
                <Route component={GreylistRedirect}>
                  {/* preserve until marketing site is updated */}
                  <Route
                    path={routes.BROWSE_ADS}
                    component={InternalRedirect}
                    redirectUrl={`/${routes.DASHBOARD}`}
                  />
                  {/* preserve until marketing site is updated */}
                  <Route
                    path={routes.BROWSE_ADS_ADACCOUNT}
                    component={InternalRedirect}
                    redirectUrl={`/${routes.DASHBOARD}`}
                  />
                  <Route
                    path={routes.BUILD_AD}
                    getComponent={getComponentForImport(buildAd)}
                  />
                  <Route
                    path={routes.DASHBOARD}
                    getComponent={getComponentForImport(campaignCatalogue)}
                  />
                  <Route
                    path={routes.CAMPAIGN_CATALOGUE}
                    getComponent={getComponentForImport(campaignCatalogue)}
                  />
                  <Route
                    path={routes.CAMPAIGN_DRAFT_CATALOGUE}
                    getComponent={getComponentForImport(campaignDraftCatalogue)}
                  />
                  <Route
                    path={routes.FLIGHT_CATALOGUE}
                    getComponent={getComponentForImport(flightCatalogue)}
                  />
                  <Route
                    path={routes.FLIGHT_DRAFT_CATALOGUE}
                    getComponent={getComponentForImport(flightDraftCatalogue)}
                  />
                  <Route
                    path={routes.FLIGHT_ENTITY}
                    getComponent={getComponentForImport(flightDetails)}
                  />
                  <Route
                    path={routes.FLIGHT_ENTITY_REPORT}
                    getComponent={getComponentForImport(flightDetails)}
                  />
                  <Route
                    path={routes.FLIGHT_ENTITY_DETAILS}
                    getComponent={getComponentForImport(flightDetails)}
                  />
                  <Route
                    path={routes.FLIGHT_ENTITY_ADS}
                    getComponent={getComponentForImport(flightDetails)}
                  />
                  <Route
                    path={routes.CREATIVE_CATALOGUE}
                    getComponent={getComponentForImport(creativeCatalogue)}
                  />
                  <Route
                    path={routes.CREATIVE_DRAFT_CATALOGUE}
                    getComponent={getComponentForImport(creativeDraftCatalogue)}
                  />
                  <Route
                    path={routes.CREATIVE_ENTITY}
                    getComponent={getComponentForImport(creativeDetails)}
                  />
                  <Route
                    path={routes.CREATIVE_ENTITY_DETAILS}
                    getComponent={getComponentForImport(creativeDetails)}
                  />
                  <Route
                    path={routes.CREATIVE_ENTITY_AD_SETS}
                    getComponent={getComponentForImport(creativeDetails)}
                  />
                  <Route
                    path={routes.BUILD_CAMPAIGN}
                    getComponent={getComponentForImport(campaignBuilder)}
                  />
                  <Route
                    path={routes.BUILD_CAMPAIGN_ADACCOUNT}
                    getComponent={getComponentForImport(campaignBuilder)}
                  />
                  <Route
                    path={routes.BUILD_FLIGHT}
                    getComponent={getComponentForImport(flightBuilder)}
                  />
                  <Route
                    path={routes.BUILD_CREATIVE}
                    getComponent={getComponentForImport(creativeBuilder)}
                  />
                  <Route
                    path={routes.EDIT_CAMPAIGN}
                    getComponent={getComponentForImport(editCampaignForm)}
                  />
                  <Route
                    path={routes.EDIT_CREATIVE}
                    getComponent={getComponentForImport(editCreativeForm)}
                  />
                  <Route
                    path={routes.EDIT_FLIGHT}
                    getComponent={getComponentForImport(editFlightForm)}
                  />
                  <Route
                    path={routes.DUPLICATE_FLIGHT}
                    getComponent={getComponentForImport(duplicateFlight)}
                  />
                  <Route
                    path={routes.DUPLICATE_FLIGHT_WITH_CREATIVES}
                    getComponent={getComponentForImport(
                      duplicateFlightWithCreatives,
                    )}
                  />
                  <Route
                    path={routes.DUPLICATE_CREATIVE}
                    getComponent={getComponentForImport(duplicateCreative)}
                  />
                  <Route
                    path={routes.ASSET_LIBRARY}
                    getComponent={getComponentForImport(assetLibrary)}
                  />
                </Route>
              </Route>
              <Route
                path={routes.AUDIENCE_CREATION}
                getComponent={getComponentForImport(audienceCreation)}
              />
              <Route
                path={routes.AUDIENCES}
                getComponent={getComponentForImport(audiences)}
              />
              <Route
                path={routes.AUDIENCES_ADACCOUNT}
                getComponent={getComponentForImport(audiences)}
              />
              <Route
                path={routes.GREYLISTED}
                getComponent={getComponentForImport(greylistedPage)}
              />
              <Route
                path={routes.ACCOUNT_SETTINGS}
                getComponent={getComponentForImport(accountSettings)}
              />
              <Route
                path={routes.ACCOUNT_ADDRESS}
                getComponent={getComponentForImport(accountAddress)}
              />
              <Route
                path={routes.ACCOUNT_SETTINGS_ADACCOUNT}
                getComponent={getComponentForImport(accountSettings)}
              />
              <Route
                path={routes.BILLING_CENTER}
                getComponent={getComponentForImport(billingCenter)}
              />
              <Route
                path={routes.USER_SETTINGS}
                getComponent={getComponentForImport(userSettings)}
              />
              <Route
                path={routes.API_TERMS}
                getComponent={getComponentForImport(APITerms)}
              />
              <Route
                getComponent={getComponentForImport(accountManagement)}
                path={routes.ACCOUNT_MANAGEMENT}
              />
              <Route
                getComponent={getComponentForImport(accountDetails)}
                path={routes.ACCOUNT_DETAILS}
              />
              <Route
                path={routes.DEBUG_CONFIG}
                getComponent={getComponentForImport(ConfigInspector)}
              />
              <Route
                path={routes.DRAFT_REDIRECT}
                getComponent={getComponentForImport(draftRedirect)}
              />
            </Route>
          </Route>
        </Route>
      </Route>

      {/**
       * the following routes are not wrapped in any nav.
       */}
      <Route
        component={TermsRedirect}
        path={routes.BETA_TERMS}
        redirectURL={EXTERNAL_TERMS_ADDRESS}
      />
      <Route component={ExternalRedirect} path={routes.FAQ} redirectUrl={FAQ} />
      <Route
        component={ExternalRedirect}
        path={routes.LOGIN}
        redirectUrl={`https://accounts.spotify.com/?continue=${window.location.origin}`}
        onRedirectAction={() =>
          logUserAction({
            category: 'landing_page',
            label: 'click_signin_button',
          })
        }
      />
      <Route
        component={ExternalRedirect}
        path={routes.SPOTIFY_SIGNUP}
        redirectUrl={`https://spotify.com/signup?forward-url=${window.location.origin}`}
      />
      <Route
        component={ExternalRedirect}
        path={routes.LOGOUT}
        redirectUrl={`https://accounts.spotify.com/logout?continue=${window.location.origin}`}
        onRedirectAction={userLoggedOut}
      />
      <Route
        component={ExternalRedirect}
        path={routes.ACCOUNT}
        redirectUrl="https://www.spotify.com/us/account/overview"
      />
      <Route
        component={ExternalRedirect}
        path={routes.CREATIVE_GUIDELINES}
        redirectUrl="https://go.pardot.com/l/52662/2019-12-02/kmq2t4/52662/238777/ad_studio_guidelines_2_1.pdf"
        localizedUrls={{
          es_ES:
            'https://go.pardot.com/l/52662/2020-09-25/kr7vn2/52662/267959/Spotify_Ad_Studio_Audio_Creative_Guidelines_ES_MX.pdf',
          es_MX:
            'https://go.pardot.com/l/52662/2020-09-29/ksj1ll/52662/268247/Spotify_Ad_Studio_Audio_Creative_Guidelines_ES_ES.pdf',
        }}
        onRedirectAction={() =>
          logUserAction({
            category: 'File',
            params: 'Creative Audio Guidelines',
            label: 'download',
          })
        }
      />

      <Route
        component={ExternalRedirect}
        path={routes.ARTIST_PROMO_CREATIVE_GUIDELINES}
        redirectUrl="https://storage.googleapis.com/adstudio-ui/assets/landingpage/Promote%20Your%20Artist%20Best%20Practices%203.0.pdf"
        onRedirectAction={() =>
          logUserAction({
            category: 'File',
            params: 'Artist Promo Audio Guidelines',
            label: 'download',
          })
        }
      />
      <Route
        component={ExternalRedirect}
        path={routes.LEARN_MORE_ABOUT_SCM}
        redirectUrl="https://adstudio.scdn.co/assets/streaming-conversion-metrics/learn-more-about-advanced-reporting.pdf"
        onRedirectAction={() =>
          logUserAction({
            category: 'File',
            params: 'Learn More About SCM',
            label: 'download',
          })
        }
      />
      <Route
        component={ExternalRedirect}
        path={routes.FEEDBACK}
        redirectUrl="https://docs.google.com/a/spotify.com/forms/d/e/1FAIpQLSdNNcS2m7u8VQNsAzAJGIHTS6Z1m38Lw-BFArEt0V8BQooPAA/viewform"
      />

      <Route
        component={InternalRedirect}
        path={routes.WAITLIST}
        redirectUrl={routes.ADSTUDIO_SIGNUP}
      />
      <Route
        component={InternalRedirect}
        path={routes.TERMS}
        redirectUrl={routes.BETA_TERMS}
      />

      <Route component={RedirectReturn} path={routes.REDIRECT} />

      <Route
        getComponent={getComponentForImport(popupRedirect)}
        path={routes.AUTHENTICATED_REDIRECT}
      />
      <Route
        getComponent={getComponentForImport(popupWindow)}
        path={routes.AUTHENTICATED_POPUP}
      />
      <Route path={routes.ADSTUDIO_SIGNUP} component={NoAuthorizationRequired}>
        <Route getComponent={getComponentForImport(signupRoot)}>
          <IndexRoute
            component={InternalRedirect}
            redirectUrl={`/${routes.ADSTUDIO_SIGNUP}/${routes.NEW_SIGNUP_ACCOUNT_NOTICE}`}
          />
          <Route
            getComponent={getComponentForImport(signupAccountNotice)}
            path={routes.NEW_SIGNUP_ACCOUNT_NOTICE}
          />
          <Route
            getComponent={getComponentForImport(newSignupLogin)}
            path={routes.LOGIN}
          />
        </Route>
        <Route getComponent={getComponentForImport(signupRootWhiteFullScreen)}>
          <Route
            getComponent={getComponentForImport(signupForm)}
            path={routes.NEW_SIGNUP_FORM}
          />
          <Route
            getComponent={getComponentForImport(newSignupConfirmationPage)}
            path={routes.NEW_SIGNUP_CONFIRMATION_PAGE}
          />
        </Route>
      </Route>

      <Route component={TopnavContainer}>
        <IndexRoute getComponent={getComponentForImport(home)} />
        <Route
          path={routes.STREAMING_CONVERSION_METRICS}
          component={StreamingConversionMetrics}
        />
        <Route path={routes.NOT_FOUND} component={NotFound} />
      </Route>
    </Route>
  );
};

export default routeConfig;
