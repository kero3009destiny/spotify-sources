import {
  FETCH_CAMPAIGNS_SUCCEEDED,
  FetchCampaignsSuccessAction,
} from 'ducks/campaigns/types';
import * as types from 'ducks/onboarding/types';
import {
  CloseOnboardingModalAction,
  FetchUserHasSeenBulksheetsOnboarding,
  ResetUserOnboardedAction,
  SetAccountHierarchyOnboardingStateAction,
  SetUserHasSeenAdSetDupeOnboarding,
  SetUserHasSeenBulksheetsOnboarding,
  SetUserHasSeenHierarchyDraftsOnboarding,
  SetUserOnboardedAction,
  SetUserSeenCopyExistingOnboarding,
  ShowBulksheetOnboardingPhase,
} from 'ducks/onboarding/actions';

// Types
export type OnboardingAction =
  | SetUserOnboardedAction
  | CloseOnboardingModalAction
  | ResetUserOnboardedAction
  | FetchCampaignsSuccessAction
  | SetAccountHierarchyOnboardingStateAction
  | SetUserSeenCopyExistingOnboarding
  | SetUserHasSeenAdSetDupeOnboarding
  | SetUserHasSeenHierarchyDraftsOnboarding
  | FetchUserHasSeenBulksheetsOnboarding
  | SetUserHasSeenBulksheetsOnboarding
  | ShowBulksheetOnboardingPhase;

export interface OnboardingState {
  allStepsViewed: boolean;
  show: boolean;
  showAccountHierarchyOnboarding: boolean;
  shouldSkipWelcomeScreen: boolean;
  shouldCheck: boolean;
  shouldCheckAccountHierarchy: boolean;
  shouldShowCopyExistingOnboarding: boolean;
  shouldShowAdSetDupeOnboarding: boolean;
  shouldShowHierarchyDraftsOnboarding: boolean;
  shouldShowBulksheetsOnboarding: boolean;
  bulksheetOnboardingPhase: types.BulksheetOnboardingPhase;
}

export const initialState: OnboardingState = {
  allStepsViewed: false,
  show: false,
  showAccountHierarchyOnboarding: false,
  shouldSkipWelcomeScreen: false,
  shouldCheck: true,
  shouldCheckAccountHierarchy: true,
  shouldShowCopyExistingOnboarding: true,
  shouldShowAdSetDupeOnboarding: true,
  shouldShowHierarchyDraftsOnboarding: true,
  shouldShowBulksheetsOnboarding: true,
  bulksheetOnboardingPhase: types.BulksheetOnboardingPhase.TABLE_ROW,
};

// Reducer
export default function onboarding(
  state: OnboardingState = initialState,
  action: OnboardingAction,
) {
  switch (action.type) {
    case FETCH_CAMPAIGNS_SUCCEEDED:
      if (state.shouldCheck) {
        return {
          ...state,
          shouldCheck: false,
          show: action.payload && action.payload.items.length === 0,
          shouldSkipWelcomeScreen: false,
        };
      }

      return state;

    case types.SET_USER_ONBOARDED:
      return {
        ...state,
        allStepsViewed: true,
      };

    case types.RESET_USER_ONBOARDED:
      return {
        ...state,
        allStepsViewed: false,
        shouldSkipWelcomeScreen: true,
        show: true,
      };

    case types.CLOSE_ONBOARDING_MODAL:
      return {
        ...state,
        shouldCheck: false,
        shouldCheckHierarchy: false,
        show: false,
      };

    case types.SET_ACCOUNT_HIERARCHY_ONBOARDING_STATE:
      return {
        ...state,
        showAccountHierarchyOnboarding: action.payload.active,
      };

    case types.SET_USER_SEEN_COPY_EXISTING_ONBOARDING:
      return {
        ...state,
        shouldShowCopyExistingOnboarding: false,
      };

    case types.SET_USER_HAS_SEEN_AD_SET_DUPE_ONBOARDING:
      return {
        ...state,
        shouldShowAdSetDupeOnboarding: false,
      };

    case types.SET_USER_HAS_SEEN_HIERARCHY_DRAFTS_ONBOARDING:
      return {
        ...state,
        shouldShowHierarchyDraftsOnboarding: false,
      };

    case types.SET_USER_HAS_SEEN_BULKSHEETS_ONBOARDING:
      return {
        ...state,
        shouldShowBulksheetsOnboarding: false,
        bulksheetOnboardingPhase: undefined,
      };

    case types.SHOW_BULKSHEET_ONBOARDING_PHASE:
      return {
        ...state,
        bulksheetOnboardingPhase: action.payload.phase,
      };

    default:
      return state;
  }
}
