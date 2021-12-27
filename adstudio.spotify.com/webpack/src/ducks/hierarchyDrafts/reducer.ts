import { combineReducers } from 'redux';

import { mapPaginationResponse } from 'utils/campaignHierarchy/paginationHelpers';

import {
  initialCreateHierarchyDraftState,
  initialCurrentHierarchyDraftState,
  initialDeleteHierarchyDraftsState,
  initialDismissalState,
  initialReviewableDraftState,
  initialTableState,
  initialUpdateState,
} from './constants';

import {
  CREATE_ADD_TO_CAMPAIGN_HIERARCHY_DRAFT,
  CREATE_ADD_TO_CAMPAIGN_HIERARCHY_DRAFT_SUCCEEDED,
  CREATE_ADD_TO_FLIGHT_HIERARCHY_DRAFT,
  CREATE_ADD_TO_FLIGHT_HIERARCHY_DRAFT_SUCCEEDED,
  CREATE_COLD_START_HIERARCHY_DRAFT,
  CREATE_COLD_START_HIERARCHY_DRAFT_SUCCEEDED,
  CREATE_HIERARCHY_DRAFT_FAILED,
  CreateHierarchyDraftAction,
  CurrentHierarchyDraftState,
  DELETE_HIERARCHY_DRAFTS_FAILED,
  DELETE_HIERARCHY_DRAFTS_START,
  DELETE_HIERARCHY_DRAFTS_SUCCEEDED,
  DeleteHierarchyDraftsAction,
  DISMISS_REVIEW_FAILED,
  DISMISS_REVIEW_START,
  DISMISS_REVIEW_SUCCEEDED,
  DismissReviewAction,
  DraftAsyncRequestState,
  DraftTableState,
  FETCH_CAMPAIGN_DRAFTS_FAILED,
  FETCH_CAMPAIGN_DRAFTS_START,
  FETCH_CAMPAIGN_DRAFTS_SUCCEEDED,
  FETCH_CREATIVE_DRAFTS_FAILED,
  FETCH_CREATIVE_DRAFTS_START,
  FETCH_CREATIVE_DRAFTS_SUCCEEDED,
  FETCH_ENRICHED_HIERARCHY_DRAFT,
  FETCH_ENRICHED_HIERARCHY_DRAFT_FAILED,
  FETCH_ENRICHED_HIERARCHY_DRAFT_SUCCEEDED,
  FETCH_FLIGHT_DRAFTS_FAILED,
  FETCH_FLIGHT_DRAFTS_START,
  FETCH_FLIGHT_DRAFTS_SUCCEEDED,
  FETCH_REVIEWABLE_DRAFTS_FAILED,
  FETCH_REVIEWABLE_DRAFTS_START,
  FETCH_REVIEWABLE_DRAFTS_SUCCEEDED,
  FetchCampaignDraftsAction,
  FetchCreativeDraftsAction,
  FetchEnrichedHierarchyDraft,
  FetchFlightDraftsAction,
  FetchReviewableDraftsAction,
  HierarchyDraftState,
  RESET_HIERARCHY_DRAFT,
  ReviewableDraftState,
  UPDATE_CAMPAIGN_DRAFT,
  UPDATE_CAMPAIGN_DRAFT_FAILED,
  UPDATE_CAMPAIGN_DRAFT_SUCCEEDED,
  UPDATE_CREATIVE_DRAFT,
  UPDATE_CREATIVE_DRAFT_FAILED,
  UPDATE_CREATIVE_DRAFT_SUCCEEDED,
  UPDATE_FLIGHT_DRAFT,
  UPDATE_FLIGHT_DRAFT_FAILED,
  UPDATE_FLIGHT_DRAFT_SUCCEEDED,
  UpdateCampaignDraftAction,
  UpdateCreativeDraftAction,
  UpdateFlightDraftAction,
} from './types';

export function campaignDraftsReducer(
  state: DraftTableState = initialTableState,
  action: FetchCampaignDraftsAction,
): DraftTableState {
  switch (action.type) {
    case FETCH_CAMPAIGN_DRAFTS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CAMPAIGN_DRAFTS_SUCCEEDED:
      return {
        ...state,
        items: action.payload.items,
        paging: mapPaginationResponse(action.payload.paging),
        loading: false,
        error: null,
      };
    case FETCH_CAMPAIGN_DRAFTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error as Response,
      };

    default:
      return state;
  }
}

export function flightDraftsReducer(
  state: DraftTableState = initialTableState,
  action: FetchFlightDraftsAction,
): DraftTableState {
  switch (action.type) {
    case FETCH_FLIGHT_DRAFTS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_FLIGHT_DRAFTS_SUCCEEDED:
      return {
        ...state,
        items: action.payload.items,
        paging: mapPaginationResponse(action.payload.paging),
        loading: false,
        error: null,
      };
    case FETCH_FLIGHT_DRAFTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error as Response,
      };

    default:
      return state;
  }
}

export function creativeDraftsReducer(
  state: DraftTableState = initialTableState,
  action: FetchCreativeDraftsAction,
): DraftTableState {
  switch (action.type) {
    case FETCH_CREATIVE_DRAFTS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CREATIVE_DRAFTS_SUCCEEDED:
      return {
        ...state,
        items: action.payload.items,
        paging: mapPaginationResponse(action.payload.paging),
        loading: false,
        error: null,
      };
    case FETCH_CREATIVE_DRAFTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error as Response,
      };

    default:
      return state;
  }
}

export function dismissReviewReducer(
  state: DraftAsyncRequestState = initialDismissalState,
  action: DismissReviewAction,
): DraftAsyncRequestState {
  switch (action.type) {
    case DISMISS_REVIEW_START:
      return {
        ...state,
        started: true,
        succeeded: false,
        failed: false,
      };
    case DISMISS_REVIEW_SUCCEEDED:
      return {
        ...state,
        started: false,
        succeeded: true,
        failed: false,
      };
    case DISMISS_REVIEW_FAILED:
      return {
        ...state,
        started: false,
        succeeded: false,
        failed: true,
      };
    default:
      return state;
  }
}

export function deleteHierarchyDraftsReducer(
  state: DraftAsyncRequestState = initialDeleteHierarchyDraftsState,
  action: DeleteHierarchyDraftsAction,
): DraftAsyncRequestState {
  switch (action.type) {
    case DELETE_HIERARCHY_DRAFTS_START:
      return {
        ...state,
        started: true,
        succeeded: false,
        failed: false,
      };
    case DELETE_HIERARCHY_DRAFTS_SUCCEEDED:
      return {
        ...state,
        started: false,
        succeeded: true,
        failed: false,
      };
    case DELETE_HIERARCHY_DRAFTS_FAILED:
      return {
        ...state,
        started: false,
        succeeded: false,
        failed: true,
      };
    default:
      return state;
  }
}

export function reveiwableDraftReducer(
  state: ReviewableDraftState = initialReviewableDraftState,
  action: FetchReviewableDraftsAction,
): ReviewableDraftState {
  switch (action.type) {
    case FETCH_REVIEWABLE_DRAFTS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_REVIEWABLE_DRAFTS_SUCCEEDED:
      return {
        ...state,
        items: action.payload.items,
        paging: mapPaginationResponse(action.payload.paging),
        loading: false,
        error: null,
      };
    case FETCH_REVIEWABLE_DRAFTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error as Response,
      };
    default:
      return state;
  }
}

export function createHierarchyDraftReducer(
  state: DraftAsyncRequestState = initialCreateHierarchyDraftState,
  action: CreateHierarchyDraftAction,
): DraftAsyncRequestState {
  switch (action.type) {
    case CREATE_COLD_START_HIERARCHY_DRAFT:
    case CREATE_ADD_TO_CAMPAIGN_HIERARCHY_DRAFT:
    case CREATE_ADD_TO_FLIGHT_HIERARCHY_DRAFT:
      return {
        ...state,
        started: true,
        succeeded: false,
        failed: false,
      };

    case CREATE_COLD_START_HIERARCHY_DRAFT_SUCCEEDED:
    case CREATE_ADD_TO_CAMPAIGN_HIERARCHY_DRAFT_SUCCEEDED:
    case CREATE_ADD_TO_FLIGHT_HIERARCHY_DRAFT_SUCCEEDED:
      return {
        ...state,
        started: false,
        succeeded: true,
        failed: false,
      };

    case CREATE_HIERARCHY_DRAFT_FAILED:
      return {
        ...state,
        started: false,
        succeeded: false,
        failed: true,
      };

    case RESET_HIERARCHY_DRAFT:
      return {
        ...state,
        ...initialCreateHierarchyDraftState,
      };

    default:
      return state;
  }
}

// TODO(CAC-3870): when we add logic to fetch an enriched draft,
// map relevant IDs here
export function currentHierarchyDraftReducer(
  state: CurrentHierarchyDraftState = initialCurrentHierarchyDraftState,
  action: CreateHierarchyDraftAction | FetchEnrichedHierarchyDraft,
): CurrentHierarchyDraftState {
  switch (action.type) {
    case CREATE_COLD_START_HIERARCHY_DRAFT:
    case CREATE_ADD_TO_CAMPAIGN_HIERARCHY_DRAFT:
    case CREATE_ADD_TO_FLIGHT_HIERARCHY_DRAFT:
    case CREATE_HIERARCHY_DRAFT_FAILED:
    case RESET_HIERARCHY_DRAFT:
      return {
        ...initialCurrentHierarchyDraftState,
      };

    case CREATE_COLD_START_HIERARCHY_DRAFT_SUCCEEDED:
      return {
        ...state,
        hierarchyDraftId: action.payload.hierarchyDraftId,
        campaignDraftId: action.payload.campaignDraftId,
        flightDraftId: action.payload.flightDraftId,
        creativeDraftId: action.payload.creativeDraftId,
      };

    case CREATE_ADD_TO_CAMPAIGN_HIERARCHY_DRAFT_SUCCEEDED:
      return {
        ...state,
        hierarchyDraftId: action.payload.hierarchyDraftId,
        flightDraftId: action.payload.flightDraftId,
        creativeDraftId: action.payload.creativeDraftId,
      };

    case CREATE_ADD_TO_FLIGHT_HIERARCHY_DRAFT_SUCCEEDED:
      return {
        ...state,
        hierarchyDraftId: action.payload.hierarchyDraftId,
        creativeDraftId: action.payload.creativeDraftId,
      };

    case FETCH_ENRICHED_HIERARCHY_DRAFT_SUCCEEDED:
      return {
        ...state,
        hierarchyDraftId: action.payload.bffHierarchyDraft.id,
        campaignDraftId: action.payload.enrichedCampaignDraft?.id || null,
        flightDraftId: action.payload.enrichedFlightDraft?.id || null,
        creativeDraftId: action.payload.enrichedCreativeDraft?.id || null,
        draft: action.payload,
      };

    default:
      return state;
  }
}

export function updateCampaignDraftReducer(
  state: DraftAsyncRequestState = initialUpdateState,
  action: UpdateCampaignDraftAction,
): DraftAsyncRequestState {
  switch (action.type) {
    case UPDATE_CAMPAIGN_DRAFT:
      return {
        ...state,
        started: true,
        succeeded: false,
        failed: false,
      };
    case UPDATE_CAMPAIGN_DRAFT_SUCCEEDED:
      return {
        ...state,
        started: false,
        succeeded: true,
        failed: false,
      };
    case UPDATE_CAMPAIGN_DRAFT_FAILED:
      return {
        ...state,
        started: false,
        succeeded: false,
        failed: true,
      };
    default:
      return state;
  }
}

export function updateFlightDraftReducer(
  state: DraftAsyncRequestState = initialUpdateState,
  action: UpdateFlightDraftAction,
): DraftAsyncRequestState {
  switch (action.type) {
    case UPDATE_FLIGHT_DRAFT:
      return {
        ...state,
        started: true,
        succeeded: false,
        failed: false,
      };
    case UPDATE_FLIGHT_DRAFT_SUCCEEDED:
      return {
        ...state,
        started: false,
        succeeded: true,
        failed: false,
      };
    case UPDATE_FLIGHT_DRAFT_FAILED:
      return {
        ...state,
        started: false,
        succeeded: false,
        failed: true,
      };
    default:
      return state;
  }
}

export function updateCreativeDraftReducer(
  state: DraftAsyncRequestState = initialUpdateState,
  action: UpdateCreativeDraftAction,
): DraftAsyncRequestState {
  switch (action.type) {
    case UPDATE_CREATIVE_DRAFT:
      return {
        ...state,
        started: true,
        succeeded: false,
        failed: false,
      };
    case UPDATE_CREATIVE_DRAFT_SUCCEEDED:
      return {
        ...state,
        started: false,
        succeeded: true,
        failed: false,
      };
    case UPDATE_CREATIVE_DRAFT_FAILED:
      return {
        ...state,
        started: false,
        succeeded: false,
        failed: true,
      };
    default:
      return state;
  }
}

export function enrichedHierarchyDraftReducer(
  state: DraftAsyncRequestState = initialUpdateState,
  action: FetchEnrichedHierarchyDraft,
): DraftAsyncRequestState {
  switch (action.type) {
    case FETCH_ENRICHED_HIERARCHY_DRAFT:
      return {
        ...state,
        started: true,
        succeeded: false,
        failed: false,
      };
    case FETCH_ENRICHED_HIERARCHY_DRAFT_SUCCEEDED:
      return {
        ...state,
        started: false,
        succeeded: true,
        failed: false,
      };
    case FETCH_ENRICHED_HIERARCHY_DRAFT_FAILED:
      return {
        ...state,
        started: false,
        succeeded: false,
        failed: true,
      };

    case RESET_HIERARCHY_DRAFT:
      return {
        ...initialUpdateState,
      };
    default:
      return state;
  }
}

export default combineReducers<HierarchyDraftState>({
  campaignDrafts: campaignDraftsReducer,
  flightDrafts: flightDraftsReducer,
  creativeDrafts: creativeDraftsReducer,
  dismissReview: dismissReviewReducer,
  deleteHierarchyDrafts: deleteHierarchyDraftsReducer,
  reviewableDrafts: reveiwableDraftReducer,
  createHierarchyDraft: createHierarchyDraftReducer,
  currentHierarchyDraft: currentHierarchyDraftReducer,
  updateCampaignDraft: updateCampaignDraftReducer,
  updateFlightDraft: updateFlightDraftReducer,
  updateCreativeDraft: updateCreativeDraftReducer,
  enrichedHierarchyDraft: enrichedHierarchyDraftReducer,
});
