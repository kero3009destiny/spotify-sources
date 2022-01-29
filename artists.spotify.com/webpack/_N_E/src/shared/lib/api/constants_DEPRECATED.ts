// ignore-string-externalization
// DO NOT ADD TO THIS FILE. It is deprecated. A centralized file of constants,
// detached from where they are used/needed, spreads implementation details
// needlessly throughout the codebase. If you need a constant, put it into the
// feature that uses it! If multiple features need a constant, export it from
// one! But also consider: wouldn't that constant be better as a function that
// you could mock? Perhaps two features don't need the constant, but instead
// need the result of a Request. Share a function that makes that request!

/** @deprecated this constant is deprecated. inline the value or move closer to your feature. */
export var WEBGATE_DOMAIN = "https://generic.wg.spotify.com";
/** @deprecated this constant is deprecated. inline the value or move closer to your feature. */

export var WEBAPI_DOMAIN = 'https://api.spotify.com'; // webgate endpoints

/** @deprecated this constant is deprecated. inline the value or move closer to your feature. */

export var MANAGEMENT_API = "".concat(WEBGATE_DOMAIN, "/s4a-service");
/** @deprecated this constant is deprecated. inline the value or move closer to your feature. */

export var S4X_DATA_API = "".concat(WEBGATE_DOMAIN, "/s4x-insights-api");
/** @deprecated this constant is deprecated. inline the value or move closer to your feature. */

export var IDENTITY_API = "".concat(WEBGATE_DOMAIN, "/artist-identity-view");
/** @deprecated this constant is deprecated. inline the value or move closer to your feature. */

export var ONBOARDING_API = "".concat(WEBGATE_DOMAIN, "/s4a-onboarding");
/** @deprecated this constant is deprecated. inline the value or move closer to your feature. */

export var MARKETPLACE_MGMT_API = "".concat(WEBGATE_DOMAIN, "/marketplace-mgmt");
/** @deprecated this constant is deprecated. inline the value or move closer to your feature. */

export var WALLET_API = "".concat(WEBGATE_DOMAIN, "/s4x-wallet");
/** @deprecated this constant is deprecated. inline the value or move closer to your feature. */

export var ACTIVITY_API = "".concat(WEBGATE_DOMAIN, "/activity-feed");
/** @deprecated this constant is deprecated. inline the value or move closer to your feature. */

export var SOUNDBETTER_SEARCH_API = "".concat(WEBGATE_DOMAIN, "/sbsearch"); // external domains

/** @deprecated this constant is deprecated. inline the value or move closer to your feature. */

export var CSV_DOWNLOAD_API = 'https://artistinsights-downloads.spotify.com';
/** @deprecated this constant is deprecated. inline the value or move closer to your feature. */

export var MARQUEE_ADMIN_API = 'https://marqueeadmin.spotify.com';