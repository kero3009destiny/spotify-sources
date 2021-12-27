import { isSuperAdmin } from 'ducks/account/selectors';

import { OnboardingState } from './reducer';

import { BulksheetOnboardingPhase } from './types';

export interface AppState {
  onboarding: OnboardingState;
}

export const getAllOnboardingStepsViewed = (state: AppState) =>
  state.onboarding.allStepsViewed;
export const shouldShowOnboarding = (state: AppState) => state.onboarding.show;

export const shouldSkipWelcomeScreen = (state: AppState) =>
  state.onboarding.shouldSkipWelcomeScreen;

export const shouldShowAccountHierarchyOnboarding = (state: AppState) =>
  state.onboarding.showAccountHierarchyOnboarding;

export const shouldShowUserCopyExistingOnboarding = (state: AppState) =>
  state.onboarding.shouldShowCopyExistingOnboarding;

// ensure draft coachmark doesn't interfere with 1XY onboarding
export const shouldShowHierarchyDraftsOnboardingOnCampaignCatalogue = (
  state: AppState,
) =>
  state.onboarding.shouldShowHierarchyDraftsOnboarding &&
  !state.onboarding.show &&
  !state.onboarding.shouldCheck;

export const shouldShowHierarchyDraftsOnboardingOnFlightOrCreativeCatalogue = (
  state: AppState,
) => state.onboarding.shouldShowHierarchyDraftsOnboarding;

// prioritize showing draft onboarding first
export const shouldShowAdSetDupeOnboarding = (state: AppState) =>
  state.onboarding.shouldShowAdSetDupeOnboarding &&
  !shouldShowHierarchyDraftsOnboardingOnFlightOrCreativeCatalogue(state);

export const shouldShowBulksheetsOnboarding = (state: AppState): boolean =>
  !shouldShowHierarchyDraftsOnboardingOnCampaignCatalogue(state) &&
  state.onboarding.shouldShowBulksheetsOnboarding &&
  !isSuperAdmin(state);

export const getBulksheetOnboardingPhase = (
  state: AppState,
): BulksheetOnboardingPhase | undefined =>
  shouldShowBulksheetsOnboarding(state)
    ? state.onboarding.bulksheetOnboardingPhase
    : undefined;
