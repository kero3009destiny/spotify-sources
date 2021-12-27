import * as types from './types';

// Types
export interface SetUserOnboardedAction {
  type: typeof types.SET_USER_ONBOARDED;
}

export interface ResetUserOnboardedAction {
  type: typeof types.RESET_USER_ONBOARDED;
}

export interface CloseOnboardingModalAction {
  type: typeof types.CLOSE_ONBOARDING_MODAL;
}

export interface userRequestsOnboardingAgainAction {
  type: typeof types.USER_REQUESTS_ONBOARDING_AGAIN;
}

export interface HasUserBeenOnboardedAction {
  type: typeof types.USER_HAS_ALREADY_BEEN_ONBOARDED;
}

export interface MarkAllOnboardingStepsViewedAction {
  type: typeof types.ALL_ONBOARDING_STEPS_VIEWED;
}

export interface FetchUserHasSeenCopyExistingOnboarding {
  type: typeof types.FETCH_USER_HAS_SEEN_COPY_EXISTING_ONBOARDING;
}

export interface SetUserSeenCopyExistingOnboarding {
  type: typeof types.SET_USER_SEEN_COPY_EXISTING_ONBOARDING;
}

export interface FetchUserHasSeenAdSetDupeOnboarding {
  type: typeof types.FETCH_USER_HAS_SEEN_AD_SET_DUPE_ONBOARDING;
}

export interface SetUserHasSeenAdSetDupeOnboarding {
  type: typeof types.SET_USER_HAS_SEEN_AD_SET_DUPE_ONBOARDING;
}

export interface FetchUserHasSeenHierarchyDraftsOnboarding {
  type: typeof types.FETCH_USER_HAS_SEEN_HIERARCHY_DRAFTS_ONBOARDING;
}

export interface SetUserHasSeenHierarchyDraftsOnboarding {
  type: typeof types.SET_USER_HAS_SEEN_HIERARCHY_DRAFTS_ONBOARDING;
}

export interface RequestAccountHierarchyOnboarding {
  type: typeof types.REQUEST_ACCOUNT_HIERARCHY_ONBOARDING;
  payload: {
    forceOnboardingAgain: boolean;
  };
}

export interface FetchUserHasSeenBulksheetsOnboarding {
  type: typeof types.FETCH_USER_HAS_SEEN_BULKSHEETS_ONBOARDING;
}

export interface SetUserHasSeenBulksheetsOnboarding {
  type: typeof types.SET_USER_HAS_SEEN_BULKSHEETS_ONBOARDING;
}

export interface ShowBulksheetOnboardingPhase {
  type: typeof types.SHOW_BULKSHEET_ONBOARDING_PHASE;
  payload: {
    phase: types.BulksheetOnboardingPhase;
  };
}

export interface SetAccountHierarchyOnboardingStateAction {
  type: typeof types.SET_ACCOUNT_HIERARCHY_ONBOARDING_STATE;
  payload: {
    active: boolean;
  };
}

// Action Creators
export function markAllOnboardingStepsViewed(): MarkAllOnboardingStepsViewedAction {
  return {
    type: types.ALL_ONBOARDING_STEPS_VIEWED,
  };
}

export function setUserOnboarded(): SetUserOnboardedAction {
  return {
    type: types.SET_USER_ONBOARDED,
  };
}

export function resetUserOnboarded(): ResetUserOnboardedAction {
  return {
    type: types.RESET_USER_ONBOARDED,
  };
}

export function userRequestsOnboardingAgain(): userRequestsOnboardingAgainAction {
  return {
    type: types.USER_REQUESTS_ONBOARDING_AGAIN,
  };
}

export function hasUserBeenOnboarded(): HasUserBeenOnboardedAction {
  return {
    type: types.USER_HAS_ALREADY_BEEN_ONBOARDED,
  };
}

export function closeOnboardingModal(): CloseOnboardingModalAction {
  return {
    type: types.CLOSE_ONBOARDING_MODAL,
  };
}

export function requestAccountHierarchyOnboarding(
  forceOnboardingAgain?: boolean,
): RequestAccountHierarchyOnboarding {
  return {
    type: types.REQUEST_ACCOUNT_HIERARCHY_ONBOARDING,
    payload: {
      forceOnboardingAgain: !!forceOnboardingAgain,
    },
  };
}

export function setAccountHierarchyOnboardingState(
  active: boolean,
): SetAccountHierarchyOnboardingStateAction {
  return {
    type: types.SET_ACCOUNT_HIERARCHY_ONBOARDING_STATE,
    payload: {
      active,
    },
  };
}

export function fetchUserHasSeenCopyExistingOnboarding(): FetchUserHasSeenCopyExistingOnboarding {
  return {
    type: types.FETCH_USER_HAS_SEEN_COPY_EXISTING_ONBOARDING,
  };
}

export function setUserSeenCopyExistingOnboarding(): SetUserSeenCopyExistingOnboarding {
  return {
    type: types.SET_USER_SEEN_COPY_EXISTING_ONBOARDING,
  };
}

export function fetchUserHasSeenAdSetDupeOnboarding(): FetchUserHasSeenAdSetDupeOnboarding {
  return {
    type: types.FETCH_USER_HAS_SEEN_AD_SET_DUPE_ONBOARDING,
  };
}

export function setUserHasSeenAdSetDupeOnboarding(): SetUserHasSeenAdSetDupeOnboarding {
  return {
    type: types.SET_USER_HAS_SEEN_AD_SET_DUPE_ONBOARDING,
  };
}

export function fetchUserHasSeenHierarchyDraftsOnboarding(): FetchUserHasSeenHierarchyDraftsOnboarding {
  return {
    type: types.FETCH_USER_HAS_SEEN_HIERARCHY_DRAFTS_ONBOARDING,
  };
}

export function setUserHasSeenHierarchyDraftsOnboarding(): SetUserHasSeenHierarchyDraftsOnboarding {
  return {
    type: types.SET_USER_HAS_SEEN_HIERARCHY_DRAFTS_ONBOARDING,
  };
}

export function fetchUserHasSeenBulksheetsOnboarding(): FetchUserHasSeenBulksheetsOnboarding {
  return {
    type: types.FETCH_USER_HAS_SEEN_BULKSHEETS_ONBOARDING,
  };
}

export function setUserHasSeenBulksheetsOnboarding(): SetUserHasSeenBulksheetsOnboarding {
  return {
    type: types.SET_USER_HAS_SEEN_BULKSHEETS_ONBOARDING,
  };
}

export function showBulksheetOnboardingPhase(
  phase: types.BulksheetOnboardingPhase,
): ShowBulksheetOnboardingPhase {
  return {
    type: types.SHOW_BULKSHEET_ONBOARDING_PHASE,
    payload: {
      phase,
    },
  };
}
