import { buildFetchErrorAction, SagaFetchError } from 'utils/asyncDucksHelpers';

import {
  CREATE_ADD_TO_CAMPAIGN_HIERARCHY_DRAFT,
  CREATE_ADD_TO_CAMPAIGN_HIERARCHY_DRAFT_SUCCEEDED,
  CREATE_ADD_TO_FLIGHT_HIERARCHY_DRAFT,
  CREATE_ADD_TO_FLIGHT_HIERARCHY_DRAFT_SUCCEEDED,
  CREATE_COLD_START_HIERARCHY_DRAFT,
  CREATE_COLD_START_HIERARCHY_DRAFT_SUCCEEDED,
  CREATE_HIERARCHY_DRAFT_FAILED,
  CreateAddToCampaignHierarchyDraftAction,
  CreateAddToCampaignHierarchyDraftSucceededAction,
  CreateAddToFlightHierarchyDraftAction,
  CreateAddToFlightHierarchyDraftSucceededAction,
  CreateColdStartHierarchyDraftAction,
  CreateColdStartHierarchyDraftSucceededAction,
  CreateHierarchyDraftFailedAction,
  DELETE_HIERARCHY_DRAFTS_FAILED,
  DELETE_HIERARCHY_DRAFTS_START,
  DELETE_HIERARCHY_DRAFTS_SUCCEEDED,
  DeleteHierarchyDraftsFailedAction,
  DeleteHierarchyDraftsStartAction,
  DeleteHierarchyDraftsSucceededAction,
  DISMISS_REVIEW_FAILED,
  DISMISS_REVIEW_START,
  DISMISS_REVIEW_SUCCEEDED,
  DismissReviewFailedAction,
  DismissReviewStartAction,
  DismissReviewSucceededAction,
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
  FetchCampaignDraftsFailedAction,
  FetchCampaignDraftsStartAction,
  FetchCampaignDraftsSucceededAction,
  FetchCreativeDraftsFailedAction,
  FetchCreativeDraftsStartAction,
  FetchCreativeDraftsSucceededAction,
  FetchEnrichedHierarchyDraftFailedAction,
  FetchEnrichedHierarchyDraftStartAction,
  FetchEnrichedHierarchyDraftSucceededAction,
  FetchFlightDraftsFailedAction,
  FetchFlightDraftsStartAction,
  FetchFlightDraftsSucceededAction,
  FetchReviewableDraftsFailedAction,
  FetchReviewableDraftsStartAction,
  FetchReviewableDraftsSucceededAction,
  RESET_HIERARCHY_DRAFT,
  ResetHierarchyDraftAction,
  UPDATE_CAMPAIGN_DRAFT,
  UPDATE_CAMPAIGN_DRAFT_FAILED,
  UPDATE_CAMPAIGN_DRAFT_SUCCEEDED,
  UPDATE_CREATIVE_DRAFT,
  UPDATE_CREATIVE_DRAFT_FAILED,
  UPDATE_CREATIVE_DRAFT_SUCCEEDED,
  UPDATE_FLIGHT_DRAFT,
  UPDATE_FLIGHT_DRAFT_FAILED,
  UPDATE_FLIGHT_DRAFT_SUCCEEDED,
  UpdateCampaignDraftFailedAction,
  UpdateCampaignDraftStartAction,
  UpdateCampaignDraftSucceededAction,
  UpdateCreativeDraftFailedAction,
  UpdateCreativeDraftStartAction,
  UpdateCreativeDraftSucceededAction,
  UpdateFlightDraftFailedAction,
  UpdateFlightDraftStartAction,
  UpdateFlightDraftSucceededAction,
} from './types';
import {
  CampaignFormValues,
  CreateCreativeFormValues,
  CreateFlightFormValues,
  CreateFormValues,
  FlightFormValues,
  PreSavedCreativeFormValues,
} from 'types/common/campaignHierarchy/types';
import {
  CampaignDraftQueryParams,
  CatalogueDraftApiResponse,
  CreateColdStartDraftResponse,
  CreateDraftForExistingCampaignResponse,
  CreateDraftForExistingFlightResponse,
  CreativeDraftQueryParams,
  EnrichedDraftApiResponse,
  FlightDraftQueryParams,
  ReviewableDraftQueryParams,
} from 'types/common/state/api/drafts';
import { FormatType } from 'types/common/state/api/format';

export const getCampaignDrafts = (
  payload: CampaignDraftQueryParams,
): FetchCampaignDraftsStartAction => ({
  type: FETCH_CAMPAIGN_DRAFTS_START,
  payload,
});

export const getCampaignDraftsSucceeded = (
  payload: CatalogueDraftApiResponse,
): FetchCampaignDraftsSucceededAction => ({
  type: FETCH_CAMPAIGN_DRAFTS_SUCCEEDED,
  payload,
});

export const getCampaignDraftsFailed = (
  error: SagaFetchError,
): FetchCampaignDraftsFailedAction =>
  buildFetchErrorAction(FETCH_CAMPAIGN_DRAFTS_FAILED, error);

export const getFlightDrafts = (
  payload: FlightDraftQueryParams,
): FetchFlightDraftsStartAction => ({
  type: FETCH_FLIGHT_DRAFTS_START,
  payload,
});

export const getFlightDraftsSucceeded = (
  payload: CatalogueDraftApiResponse,
): FetchFlightDraftsSucceededAction => ({
  type: FETCH_FLIGHT_DRAFTS_SUCCEEDED,
  payload,
});

export const getFlightDraftsFailed = (
  error: SagaFetchError,
): FetchFlightDraftsFailedAction =>
  buildFetchErrorAction(FETCH_FLIGHT_DRAFTS_FAILED, error);

export const getCreativeDrafts = (
  payload: CreativeDraftQueryParams,
): FetchCreativeDraftsStartAction => ({
  type: FETCH_CREATIVE_DRAFTS_START,
  payload,
});

export const getCreativeDraftsSucceeded = (
  payload: CatalogueDraftApiResponse,
): FetchCreativeDraftsSucceededAction => ({
  type: FETCH_CREATIVE_DRAFTS_SUCCEEDED,
  payload,
});

export const getCreativeDraftsFailed = (
  error: SagaFetchError,
): FetchCreativeDraftsFailedAction =>
  buildFetchErrorAction(FETCH_CREATIVE_DRAFTS_FAILED, error);

export const dismissReview = (
  hierarchyDraftId: string,
): DismissReviewStartAction => ({
  type: DISMISS_REVIEW_START,
  payload: {
    hierarchyDraftId,
  },
});

export const dismissReviewSucceeded = (): DismissReviewSucceededAction => ({
  type: DISMISS_REVIEW_SUCCEEDED,
});

export const dismissReviewFailed = (
  error: Response,
): DismissReviewFailedAction => ({
  type: DISMISS_REVIEW_FAILED,
  error,
  meta: {
    response: error,
  },
});

export function deleteHierarchyDrafts(
  ids: Array<string>,
  cb?: () => void,
): DeleteHierarchyDraftsStartAction {
  return {
    type: DELETE_HIERARCHY_DRAFTS_START,
    payload: {
      ids,
      cb,
    },
  };
}

export function deleteHierarchyDraftsSucceeded(): DeleteHierarchyDraftsSucceededAction {
  return {
    type: DELETE_HIERARCHY_DRAFTS_SUCCEEDED,
  };
}

export function deleteHierarchyDraftsFailed(
  error: Response,
): DeleteHierarchyDraftsFailedAction {
  return {
    type: DELETE_HIERARCHY_DRAFTS_FAILED,
    error,
    meta: {
      response: error,
    },
  };
}

export function getReviewableDrafts(
  payload: ReviewableDraftQueryParams,
): FetchReviewableDraftsStartAction {
  return {
    type: FETCH_REVIEWABLE_DRAFTS_START,
    payload,
  };
}

export function getReviewableDraftsSucceeded(
  payload: CatalogueDraftApiResponse,
): FetchReviewableDraftsSucceededAction {
  return {
    type: FETCH_REVIEWABLE_DRAFTS_SUCCEEDED,
    payload,
  };
}

export function getReviewableDraftsFailed(
  response: Response,
): FetchReviewableDraftsFailedAction {
  return {
    type: FETCH_REVIEWABLE_DRAFTS_FAILED,
    error: response,
    meta: {
      response,
    },
  };
}

export function resetHierarchyDrafts(): ResetHierarchyDraftAction {
  return {
    type: RESET_HIERARCHY_DRAFT,
  };
}

export function createColdStartHierarchyDraft(
  payload: CreateFormValues,
): CreateColdStartHierarchyDraftAction {
  return {
    type: CREATE_COLD_START_HIERARCHY_DRAFT,
    payload,
  };
}

export function createColdStartHierarchyDraftSucceeded(
  payload: CreateColdStartDraftResponse,
): CreateColdStartHierarchyDraftSucceededAction {
  return {
    type: CREATE_COLD_START_HIERARCHY_DRAFT_SUCCEEDED,
    payload,
  };
}

export function createAddToCampaignHierarchyDraft(
  payload: CreateFlightFormValues,
): CreateAddToCampaignHierarchyDraftAction {
  return {
    type: CREATE_ADD_TO_CAMPAIGN_HIERARCHY_DRAFT,
    payload,
  };
}

export function createAddToCampaignHierarchyDraftSucceeded(
  payload: CreateDraftForExistingCampaignResponse,
): CreateAddToCampaignHierarchyDraftSucceededAction {
  return {
    type: CREATE_ADD_TO_CAMPAIGN_HIERARCHY_DRAFT_SUCCEEDED,
    payload,
  };
}

export function createAddToFlightHierarchyDraft(
  payload: CreateCreativeFormValues,
): CreateAddToFlightHierarchyDraftAction {
  return {
    type: CREATE_ADD_TO_FLIGHT_HIERARCHY_DRAFT,
    payload,
  };
}

export function createAddToFlightHierarchyDraftSucceeded(
  payload: CreateDraftForExistingFlightResponse,
): CreateAddToFlightHierarchyDraftSucceededAction {
  return {
    type: CREATE_ADD_TO_FLIGHT_HIERARCHY_DRAFT_SUCCEEDED,
    payload,
  };
}

export function createHierarchyDraftFailed(
  error: Response,
): CreateHierarchyDraftFailedAction {
  return buildFetchErrorAction(CREATE_HIERARCHY_DRAFT_FAILED, error);
}

export function updateCampaignDraft(payload: {
  formValues: CampaignFormValues;
  hierarchyDraftId: string;
  campaignDraftId: string;
}): UpdateCampaignDraftStartAction {
  return {
    type: UPDATE_CAMPAIGN_DRAFT,
    payload,
  };
}

export function updateCampaignDraftSucceeded(): UpdateCampaignDraftSucceededAction {
  return {
    type: UPDATE_CAMPAIGN_DRAFT_SUCCEEDED,
  };
}

export function updateCampaignDraftFailed(
  error: SagaFetchError,
): UpdateCampaignDraftFailedAction {
  return buildFetchErrorAction(UPDATE_CAMPAIGN_DRAFT_FAILED, error);
}

export function updateFlightDraft(payload: {
  formValues: FlightFormValues;
  hierarchyDraftId: string;
  flightDraftId: string;
  duplicatedFlightId?: string;
}): UpdateFlightDraftStartAction {
  return {
    type: UPDATE_FLIGHT_DRAFT,
    payload,
  };
}

export function updateFlightDraftSucceeded(): UpdateFlightDraftSucceededAction {
  return {
    type: UPDATE_FLIGHT_DRAFT_SUCCEEDED,
  };
}

export function updateFlightDraftFailed(
  error: SagaFetchError,
): UpdateFlightDraftFailedAction {
  return buildFetchErrorAction(UPDATE_FLIGHT_DRAFT_FAILED, error);
}

export function updateCreativeDraft(payload: {
  formValues: PreSavedCreativeFormValues;
  format?: FormatType;
  hierarchyDraftId: string;
  creativeDraftId: string;
}): UpdateCreativeDraftStartAction {
  return {
    type: UPDATE_CREATIVE_DRAFT,
    payload,
  };
}

export function updateCreativeDraftSucceeded(): UpdateCreativeDraftSucceededAction {
  return {
    type: UPDATE_CREATIVE_DRAFT_SUCCEEDED,
  };
}

export function updateCreativeDraftFailed(
  error: SagaFetchError,
): UpdateCreativeDraftFailedAction {
  return buildFetchErrorAction(UPDATE_CREATIVE_DRAFT_FAILED, error);
}

export function fetchEnrichedHierarchyDraft(
  hierarchyDraftId: string,
): FetchEnrichedHierarchyDraftStartAction {
  return {
    type: FETCH_ENRICHED_HIERARCHY_DRAFT,
    payload: {
      hierarchyDraftId,
    },
  };
}

export function fetchEnrichedHierarchyDraftSucceeded(
  payload: EnrichedDraftApiResponse,
): FetchEnrichedHierarchyDraftSucceededAction {
  return {
    type: FETCH_ENRICHED_HIERARCHY_DRAFT_SUCCEEDED,
    payload,
  };
}

export function fetchEnrichedHierarchyDraftFailed(
  error: SagaFetchError,
): FetchEnrichedHierarchyDraftFailedAction {
  return buildFetchErrorAction(FETCH_ENRICHED_HIERARCHY_DRAFT_FAILED, error);
}
