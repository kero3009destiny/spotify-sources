import {
  CurrentHierarchyDraftState,
  DraftAsyncRequestState,
  DraftTableState,
  HierarchyDraftState,
  ReviewableDraftState,
} from './types';

export const initialTableState: DraftTableState = {
  items: [],
  paging: {
    limit: 20,
    offset: 0,
  },
  loading: false,
  error: null,
  markedForDeletion: [],
};

export const initialReviewableDraftState: ReviewableDraftState = {
  items: [],
  paging: {
    limit: 20,
    offset: 0,
  },
  loading: false,
  error: null,
};

export const initialDismissalState: DraftAsyncRequestState = {
  started: false,
  succeeded: false,
  failed: false,
};

export const initialDeleteHierarchyDraftsState: DraftAsyncRequestState = {
  started: false,
  succeeded: false,
  failed: false,
};

export const initialCreateHierarchyDraftState: DraftAsyncRequestState = {
  started: false,
  succeeded: false,
  failed: false,
};

export const initialCurrentHierarchyDraftState: CurrentHierarchyDraftState = {
  hierarchyDraftId: null,
  campaignDraftId: null,
  flightDraftId: null,
  creativeDraftId: null,
};

export const initialUpdateState: DraftAsyncRequestState = {
  started: false,
  succeeded: false,
  failed: false,
};

export const initialState: HierarchyDraftState = {
  campaignDrafts: { ...initialTableState },
  flightDrafts: { ...initialTableState },
  creativeDrafts: { ...initialTableState },
  dismissReview: { ...initialDismissalState },
  deleteHierarchyDrafts: { ...initialDeleteHierarchyDraftsState },
  reviewableDrafts: { ...initialReviewableDraftState },
  createHierarchyDraft: { ...initialCreateHierarchyDraftState },
  currentHierarchyDraft: { ...initialCurrentHierarchyDraftState },
  updateCampaignDraft: { ...initialUpdateState },
  updateFlightDraft: { ...initialUpdateState },
  updateCreativeDraft: { ...initialUpdateState },
  enrichedHierarchyDraft: { ...initialUpdateState },
};

export const SAVE_DRAFT_DEBOUNCE_TIME = 3000;
