// ignore-string-externalization
import { createSelector } from 'reselect';
import { captureException } from '@sentry/browser';
export var WELCOME_MODAL = 'welcome-modal';
export var ALGO_PLAYLIST_BANNER = 'algo-playlist-banner-1';
export var MARQUEE_ONBOARDING_CALLOUT = 'marquee-onboarding-callout-v1';
export var MARQUEE_ONBOARDING_BANNER = 'marquee-onboarding-banner';
export var RELEASE_PAGE_CALLOUT = 'release-page-callout';
export var selectAnnouncements = createSelector(function (state) {
  return state.announcements;
}, function (announcements) {
  return !announcements ? undefined : {
    data: announcements.data,
    isLoading: !!announcements.loadingId,
    hasError: !!announcements.error
  };
});
var announcementsDataSelector = createSelector(function (state) {
  return state.announcements;
}, function (announcements) {
  return announcements && announcements.data || [];
});
var isLoadingSelector = createSelector(function (state) {
  return state.announcements;
}, function (announcements) {
  return !announcements || !!announcements.loadingId;
});
var hasErrorSelector = createSelector(function (state) {
  return state.announcements;
}, function (announcements) {
  return !!(announcements && announcements.error);
});
export var hasSeenS4AOnboardingSelector = createSelector(announcementsDataSelector, function (announcements) {
  // see https://sentry.io/organizations/spotify/issues/1120502672/?project=231405&referrer=slack
  try {
    return announcements.includes(WELCOME_MODAL);
  } catch (error) {
    captureException(error); // graceful fallback to false

    return false;
  }
});
export var hasSeenMarqueeOnboardingCalloutSelector = createSelector(announcementsDataSelector, function (announcements) {
  try {
    return announcements.includes(MARQUEE_ONBOARDING_CALLOUT);
  } catch (error) {
    captureException(error); // graceful fallback to false

    return false;
  }
});
export var hasSeenMarqueeOnboardingBannerSelector = createSelector(announcementsDataSelector, function (announcements) {
  try {
    return announcements.includes(MARQUEE_ONBOARDING_BANNER);
  } catch (error) {
    captureException(error); // graceful fallback to false

    return false;
  }
});
export var showS4AOnboardingSelector = createSelector(isLoadingSelector, hasErrorSelector, hasSeenS4AOnboardingSelector, function (isLoading, hasError, hasSeenS4A) {
  return !isLoading && !hasError && !hasSeenS4A;
});
export var showAlgoPlaylistBanner = createSelector(isLoadingSelector, hasErrorSelector, function (isLoading, hasError) {
  return !isLoading && !hasError;
});
export var showMarqueeOnboardingCallout = createSelector(isLoadingSelector, hasErrorSelector, hasSeenMarqueeOnboardingCalloutSelector, function (isLoading, hasError, hasSeenMarqueeCallout) {
  return !isLoading && !hasError && !hasSeenMarqueeCallout;
});
export var showMarqueeOnboardingBanner = createSelector(isLoadingSelector, hasErrorSelector, hasSeenMarqueeOnboardingBannerSelector, function (isLoading, hasError, hasSeenMarqueeBanner) {
  return !isLoading && !hasError && !hasSeenMarqueeBanner;
});