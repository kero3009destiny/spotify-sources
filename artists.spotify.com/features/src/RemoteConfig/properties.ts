// ignore-string-externalization

import { defineBool, properties as definedProperties } from './define';

export const EmployeeBool = defineBool({
  name: 'employee',
  description: 'S4A employee flag',
  default: false,
});

export const RemoteConfigLoadedBool = defineBool({
  name: 'remote-config-loaded',
  description:
    'Use to prevent showing a UI or triggering a side effect until after remote config is loaded.',
  default: false,
});

export const S4XUnderstandTestFlagBool = defineBool({
  name: 's4x-understand-test-flag',
  description: 'Testing feature flag',
  default: false,
});

export const S4XUnderstandTestFlagTwoBool = defineBool({
  name: 's4x-understand-test-flag-two',
  description: 'Testing feature flag two',
  default: false,
});

export const DataDelayAlertBool = defineBool({
  name: 'data-delay-alert',
  description: 'Show an alert message in the app when there is a data delay.',
  default: false,
});

export const StartdustDataDelayAlertBool = defineBool({
  name: 'stardust-data-delay-alert',
  description:
    'Show an alert on the release stats page when there is a data delay.',
  default: false,
});

export const AlohomoraExperimentsBool = defineBool({
  name: 'alohomora-experiments',
  description: 'Alohomora experiment flag',
  default: false,
});

export const BillingContactAdminBool = defineBool({
  name: 'billing-contact-admin',
  description:
    'Controls whether new Billing Admin Contact feature is accessible',
  default: false,
});

export const BuyerExperienceAdminBool = defineBool({
  name: 'buyer-experience-admin',
  description: 'Buyer Experience admin tools feature flag',
  default: false,
});

export const BuyerExperienceMultipleCampaigns = defineBool({
  name: 'buyer-experience-multiple-campaigns-enabled',
  description: 'Rollout flag for buyer experience multiple campaigns feature',
  default: false,
});

export const BuyerExperienceNativeAdsDrafts = defineBool({
  name: 'native-ads-drafts',
  description: 'Feature flag for the drafts tab of drafts and approvals',
  default: false,
});

export const BuyerExperienceCatalogMetrics = defineBool({
  name: 'buyer-experience-catalog-metrics',
  description:
    'Feature flag to rollout changes to the reporting dashboard for Native Ads campaigns.',
  default: false,
});

export const S4ADiscoveryModeDraftCampaignsBool = defineBool({
  name: 's4a-dm-draft-campaigns',
  description:
    'Allows a user to create draft campagins via Track Eligibility tool.',
  default: false,
});

export const S4ADiscoveryModeSelfServeBool = defineBool({
  name: 's4a-dm-self-serve',
  description: 'Allows a user to access Discovery Mode Self-Serve tools',
  default: false,
});

export const S4ADiscoveryModeSidePanelBool = defineBool({
  name: 's4a-dm-side-panel',
  description: 'Allows a DM user to see the S4A side panel component.',
  default: false,
});

export const S4AHypeCampaignsBool = defineBool({
  name: 's4a-hype-campaigns',
  description: 'Allows an employee to manage HYPE campaigns',
  default: false,
});

export const CanvasInMaintenanceBool = defineBool({
  name: 'canvas-in-maintenance',
  description: 'Denotes the Canvas feature is under maintenance',
  default: false,
});

export const StorylinesCreationBool = defineBool({
  name: 'storylines-creation',
  description: 'Allows a user to upload Storylines to songs',
  default: false,
});

export const S4AProPayBool = defineBool({
  name: 's4a-pro-pay',
  description: "Display an organization's stored payment method",
  default: false,
});

export const AnalyticsMigrationOnboardingBool = defineBool({
  name: 'analytics-migration-onboarding',
  description: 'Display an onboarding announcement for new Label users of S4A',
  default: false,
});

export const S4AWebProfile1pRolloutBool = defineBool({
  name: 's4a-web-profile-1p-rollout',
  description: 'Give label teams access to S4A web profile',
  default: false,
});

export const S4AWebProfileMerchRolloutBool = defineBool({
  name: 's4a-web-profile-merch-rollout',
  description: 'Enable merch on profile',
  default: false,
});

export const AudienceCountryFiltersBool = defineBool({
  name: 'audience-country-filters',
  description: 'Country filters on the Audience section',
  default: false,
});

export const QualarooSurveyBool = defineBool({
  name: 'qualaroo-survey',
  description: 'Displays qualaroo survey for user',
  default: false,
});

export const GlobalStatsCsvDownloadButtonBool = defineBool({
  name: 'stats-csv-download-button',
  description: 'Displays CSV download button on Song entity page',
  default: false,
});

export const CountryStatsCsvDownloadButtonBool = defineBool({
  name: 'country-stats-csv-download-button',
  description: 'Displays CSV download button on Song entity page',
  default: false,
});

export const DisplayRealtimeRecordingStreamsBool = defineBool({
  name: 'display-realtime-recording-streams',
  description:
    'Displays realtime recording streams for all recordings including those older than 7 days',
  default: false,
});

export const UseArtistGraphqlBool = defineBool({
  name: 'use-artist-graphql',
  description: 'Enable graphql endpoint for useArtist hook',
  default: false,
});

export const S4AWebProfileUseSoundbetterSocialLinksBool = defineBool({
  name: 's4a-web-profile-use-soundbetter-social-links',
  description: 'Enable Soundbetter profile links in artist social links',
  default: true,
});

export const S4AHackUserAnnotationsBool = defineBool({
  name: 's4a-hack-user-annotations',
  description:
    'Let users create, delete, and view custom Audience timeline annotations',
  default: false,
});

export const RollingWindowFilterUpdateBool = defineBool({
  name: 'rolling-window-filter-update',
  description:
    'Change relevant filters in S4A from "Since 2015" to "Since 2016" starting 01/01/2021.',
  default: false,
});

export const S4AEmailPreferencesOptOut = defineBool({
  name: 's4a-email-preferences-opt-out',
  description: 'Enable more granular opt out options for email preferences',
  default: false,
});

export const ReleasesFirstBool = defineBool({
  name: 'music-releases-first',
  description:
    'Place the Releases tab first and make it the default route for the Music page.',
  default: false,
});

export const ShowChartsAlphaTabBool = defineBool({
  name: 'show-charts-alpha-tab',
  description: 'Show the tab link to the charts experience',
  default: false,
});

export const InspiredByBool = defineBool({
  name: 'inspired-by',
  description: 'Flag to show inspired-by hack idea',
  default: false,
});

export const LanguageSelectionBool = defineBool({
  name: 'language-selection',
  description: 'Enable user to select language under settings',
  default: false,
});

export const ReleaseStatsBool = defineBool({
  name: 'release-stats-page',
  description: 'Rollout flag for the Release Stats entity page',
  default: false,
});

export const I18nNMSCitySearch = defineBool({
  name: 'i18n-nms-city-search',
  description: 'use an i18n-backed city search or not',
  default: false,
});

export const I18nSongSummaryTable = defineBool({
  name: 'i18n-song-summary-table',
  description: 'Localized summary table on the song entity page.',
  default: false,
});

export const QualtricsBannerBool = defineBool({
  name: 'qualtrics-banner',
  description:
    'Display a banner to users eligible for the stats Qualtrics survey',
  default: false,
});

export const EngagementMetricsBool = defineBool({
  name: 'engagement-metrics',
  description: 'Displays the engagement metrics on the Audience page',
  default: false,
});

export const EngagementMetricsBoolV2 = defineBool({
  name: 'engagement-metrics-v2',
  description:
    'Displays the engagement metrics (design v2) on the Audience page',
  default: false,
});

export const EngagementSegmentationBool = defineBool({
  name: 'engagement-segmentation',
  description:
    'Displays the engagement source of streams segmentation on the Audience page',
  default: false,
});

export const AccessControlsUpdatesBool = defineBool({
  name: 'access-controls-updates',
  description: 'Use the new functional components in Access Controls',
  default: false,
});

export const InfluencesTabBool = defineBool({
  name: 'influences-tab',
  description: 'Displays influences tab on the artist profile page',
  default: false,
});

export const InvoicingPaymentMethodBool = defineBool({
  name: 'invoicing-payment-method',
  description: 'Enable invoicing payment method display',
  default: false,
});

export const InternationalPaymentBool = defineBool({
  name: 'international-payment',
  description: 'Enable international payment',
  default: false,
});

export const PaymentHistoryBool = defineBool({
  name: 'payment-history',
  description: 'Enable payment history display',
  default: false,
});

export const TwoFactorAuthStatusBool = defineBool({
  name: 'two-factor-auth-status',
  description:
    "Display a user's two factor authentication status on User Settings page",
  default: false,
});

export const LivePersonRolloutBool = defineBool({
  name: 'live-person-roll-out',
  description:
    'Feature flag to rollout submission of CS requests to Live Person',
  default: false,
});

// eslint-disable-next-line import/no-default-export
export default {
  version: '1.0.0',
  properties: [...definedProperties],
};
