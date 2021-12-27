import { Action } from 'redux';

import { FetchErrorAction } from 'utils/asyncDucksHelpers';

import {
  CampaignFormValues,
  CreateCreativeFormValues,
  CreateFlightFormValues,
  CreateFormValues,
  FlightFormValues,
  PreSavedCreativeFormValues,
} from 'types/common/campaignHierarchy/types';
import { Paging } from 'types/common/state/api';
import {
  CampaignDraftQueryParams,
  CatalogueDraft,
  CatalogueDraftApiResponse,
  CreateColdStartDraftResponse,
  CreateDraftForExistingCampaignResponse,
  CreateDraftForExistingFlightResponse,
  CreativeDraft,
  CreativeDraftQueryParams,
  EnrichedCampaignDraft,
  EnrichedDraftApiResponse,
  EnrichedFlightDraft,
  FlightDraftQueryParams,
  HierarchyDraft,
  ReviewableDraftQueryParams,
} from 'types/common/state/api/drafts';
import { FormatType } from 'types/common/state/api/format';

// STATE TYPES

export interface DraftTableState<DraftType = CatalogueDraft> {
  items: DraftType[];
  paging: Paging;
  loading: boolean;
  error: Response | null;
  markedForDeletion: string[];
}

export type ReviewableDraftState = Omit<
  DraftTableState<CatalogueDraft>,
  'markedForDeletion'
>;

export interface DraftAsyncRequestState {
  started: boolean;
  succeeded: boolean;
  failed: boolean;
}

export interface HierarchyDraftState {
  campaignDrafts: DraftTableState;
  flightDrafts: DraftTableState;
  creativeDrafts: DraftTableState;
  dismissReview: DraftAsyncRequestState;
  deleteHierarchyDrafts: DraftAsyncRequestState;
  reviewableDrafts: ReviewableDraftState;
  createHierarchyDraft: DraftAsyncRequestState;
  currentHierarchyDraft: CurrentHierarchyDraftState;
  updateCampaignDraft: DraftAsyncRequestState;
  updateFlightDraft: DraftAsyncRequestState;
  updateCreativeDraft: DraftAsyncRequestState;
  enrichedHierarchyDraft: DraftAsyncRequestState;
}

export type HierarchyDraftEntity = keyof Pick<
  HierarchyDraftState,
  'campaignDrafts' | 'flightDrafts' | 'creativeDrafts'
>;

export interface DeleteHierarchyDraftsState {
  started: boolean;
  succeeded: boolean;
  failed: boolean;
}

export interface CreateHierarchyDraftState {
  started: boolean;
  succeeded: boolean;
  failed: boolean;
}

export interface CurrentHierarchyDraftState {
  hierarchyDraftId: string | null;
  campaignDraftId: string | null;
  flightDraftId: string | null;
  creativeDraftId: string | null;
  draft?: {
    bffHierarchyDraft: HierarchyDraft;
    campaignDraft?: EnrichedCampaignDraft;
    flightDraft?: EnrichedFlightDraft;
    creativeDraft?: CreativeDraft;
  };
}

// ACTION TYPES

// global

export const RESET_HIERARCHY_DRAFT = 'RESET_HIERARCHY_DRAFT';

export interface ResetHierarchyDraftAction {
  type: typeof RESET_HIERARCHY_DRAFT;
}

// campaign drafts

export const FETCH_CAMPAIGN_DRAFTS_START = 'FETCH_CAMPAIGN_DRAFTS';
export const FETCH_CAMPAIGN_DRAFTS_SUCCEEDED =
  'FETCH_CAMPAIGN_DRAFTS_SUCCEEDED';
export const FETCH_CAMPAIGN_DRAFTS_FAILED = 'FETCH_CAMPAIGN_DRAFTS_FAILED';
export const TOGGLE_CAMPAIGN_DRAFT_FOR_DELETION =
  'TOGGLE_CAMPAIGN_DRAFT_FOR_DELETION';
export const TOGGLE_ALL_CAMPAIGN_DRAFTS_FOR_DELETION =
  'TOGGLE_ALL_CAMPAIGN_DRAFTS_FOR_DELETION';

export interface FetchCampaignDraftsStartAction extends Action {
  type: typeof FETCH_CAMPAIGN_DRAFTS_START;
  payload: CampaignDraftQueryParams;
}

export interface FetchCampaignDraftsSucceededAction extends Action {
  type: typeof FETCH_CAMPAIGN_DRAFTS_SUCCEEDED;
  payload: CatalogueDraftApiResponse;
}

export interface FetchCampaignDraftsFailedAction extends FetchErrorAction {
  type: typeof FETCH_CAMPAIGN_DRAFTS_FAILED;
}

export type FetchCampaignDraftsAction =
  | FetchCampaignDraftsStartAction
  | FetchCampaignDraftsSucceededAction
  | FetchCampaignDraftsFailedAction;

// flight drafts

export const FETCH_FLIGHT_DRAFTS_START = 'FETCH_FLIGHT_DRAFTS';
export const FETCH_FLIGHT_DRAFTS_SUCCEEDED = 'FETCH_FLIGHT_DRAFTS_SUCCEEDED';
export const FETCH_FLIGHT_DRAFTS_FAILED = 'FETCH_FLIGHT_DRAFTS_FAILED';
export const TOGGLE_FLIGHT_DRAFT_FOR_DELETION =
  'TOGGLE_FLIGHT_DRAFT_FOR_DELETION';
export const TOGGLE_ALL_FLIGHT_DRAFTS_FOR_DELETION =
  'TOGGLE_ALL_FLIGHT_DRAFTS_FOR_DELETION';

export interface FetchFlightDraftsStartAction extends Action {
  type: typeof FETCH_FLIGHT_DRAFTS_START;
  payload: FlightDraftQueryParams;
}

export interface FetchFlightDraftsSucceededAction extends Action {
  type: typeof FETCH_FLIGHT_DRAFTS_SUCCEEDED;
  payload: CatalogueDraftApiResponse;
}

export interface FetchFlightDraftsFailedAction extends FetchErrorAction {
  type: typeof FETCH_FLIGHT_DRAFTS_FAILED;
}

export type FetchFlightDraftsAction =
  | FetchFlightDraftsStartAction
  | FetchFlightDraftsSucceededAction
  | FetchFlightDraftsFailedAction;

// creative drafts

export const FETCH_CREATIVE_DRAFTS_START = 'FETCH_CREATIVE_DRAFTS';
export const FETCH_CREATIVE_DRAFTS_SUCCEEDED =
  'FETCH_CREATIVE_DRAFTS_SUCCEEDED';
export const FETCH_CREATIVE_DRAFTS_FAILED = 'FETCH_CREATIVE_DRAFTS_FAILED';
export const TOGGLE_CREATIVE_DRAFT_FOR_DELETION =
  'TOGGLE_CREATIVE_DRAFT_FOR_DELETION';
export const TOGGLE_ALL_CREATIVE_DRAFTS_FOR_DELETION =
  'TOGGLE_ALL_CREATIVE_DRAFTS_FOR_DELETION';

export interface FetchCreativeDraftsStartAction extends Action {
  type: typeof FETCH_CREATIVE_DRAFTS_START;
  payload: CreativeDraftQueryParams;
}

export interface FetchCreativeDraftsSucceededAction extends Action {
  type: typeof FETCH_CREATIVE_DRAFTS_SUCCEEDED;
  payload: CatalogueDraftApiResponse;
}

export interface FetchCreativeDraftsFailedAction extends FetchErrorAction {
  type: typeof FETCH_CREATIVE_DRAFTS_FAILED;
}

export type FetchCreativeDraftsAction =
  | FetchCreativeDraftsStartAction
  | FetchCreativeDraftsSucceededAction
  | FetchCreativeDraftsFailedAction;

// impersonation

export const DISMISS_REVIEW_START = 'DISMISS_REVIEW_START';
export const DISMISS_REVIEW_SUCCEEDED = 'DISMISS_REVIEW_SUCCEEDED';
export const DISMISS_REVIEW_FAILED = 'DISMISS_REVIEW_FAILED';

export interface DismissReviewStartAction extends Action {
  type: typeof DISMISS_REVIEW_START;
  payload: { hierarchyDraftId: string };
}

export interface DismissReviewSucceededAction extends Action {
  type: typeof DISMISS_REVIEW_SUCCEEDED;
}

export interface DismissReviewFailedAction extends FetchErrorAction {
  type: typeof DISMISS_REVIEW_FAILED;
}

export type DismissReviewAction =
  | DismissReviewStartAction
  | DismissReviewSucceededAction
  | DismissReviewFailedAction;

// DELETE DRAFTS
export const DELETE_HIERARCHY_DRAFTS_START = 'DELETE_HIERARCHY_DRAFTS_START';
export const DELETE_HIERARCHY_DRAFTS_SUCCEEDED =
  'DELETE_HIERARCHY_DRAFTS_SUCCEEDED';
export const DELETE_HIERARCHY_DRAFTS_FAILED = 'DELETE_HIERARCHY_DRAFTS_FAILED';

export interface DeleteHierarchyDraftsStartAction extends Action {
  type: typeof DELETE_HIERARCHY_DRAFTS_START;
  payload: {
    ids: Array<string>;
    cb?: () => void;
  };
}

export interface DeleteHierarchyDraftsSucceededAction extends Action {
  type: typeof DELETE_HIERARCHY_DRAFTS_SUCCEEDED;
}

export interface DeleteHierarchyDraftsFailedAction extends FetchErrorAction {
  type: typeof DELETE_HIERARCHY_DRAFTS_FAILED;
}

export type DeleteHierarchyDraftsAction =
  | DeleteHierarchyDraftsStartAction
  | DeleteHierarchyDraftsSucceededAction
  | DeleteHierarchyDraftsFailedAction;

export const FETCH_REVIEWABLE_DRAFTS_START = 'FETCH_REVIEWABLE_DRAFTS_START';
export const FETCH_REVIEWABLE_DRAFTS_SUCCEEDED =
  'FETCH_REVIEWABLE_DRAFTS_SUCCEEDED';
export const FETCH_REVIEWABLE_DRAFTS_FAILED = 'FETCH_REVIEWABLE_DRAFTS_FAILED';

export interface FetchReviewableDraftsStartAction extends Action {
  type: typeof FETCH_REVIEWABLE_DRAFTS_START;
  payload: ReviewableDraftQueryParams;
}

export interface FetchReviewableDraftsSucceededAction extends Action {
  type: typeof FETCH_REVIEWABLE_DRAFTS_SUCCEEDED;
  payload: CatalogueDraftApiResponse;
}

export interface FetchReviewableDraftsFailedAction extends FetchErrorAction {
  type: typeof FETCH_REVIEWABLE_DRAFTS_FAILED;
}

export type FetchReviewableDraftsAction =
  | FetchReviewableDraftsStartAction
  | FetchReviewableDraftsSucceededAction
  | FetchReviewableDraftsFailedAction;

// CREATE DRAFTS

export const CREATE_COLD_START_HIERARCHY_DRAFT =
  'CREATE_COLD_START_HIERARCHY_DRAFT';
export const CREATE_COLD_START_HIERARCHY_DRAFT_SUCCEEDED =
  'CREATE_COLD_START_HIERARCHY_DRAFT_SUCCEEDED';
export const CREATE_ADD_TO_CAMPAIGN_HIERARCHY_DRAFT =
  'CREATE_ADD_TO_CAMPAIGN_HIERARCHY_DRAFT';
export const CREATE_ADD_TO_CAMPAIGN_HIERARCHY_DRAFT_SUCCEEDED =
  'CREATE_ADD_TO_CAMPAIGN_HIERARCHY_DRAFT_SUCCEEDED';
export const CREATE_ADD_TO_FLIGHT_HIERARCHY_DRAFT =
  'CREATE_ADD_TO_FLIGHT_HIERARCHY_DRAFT';
export const CREATE_ADD_TO_FLIGHT_HIERARCHY_DRAFT_SUCCEEDED =
  'CREATE_ADD_TO_FLIGHT_HIERARCHY_DRAFT_SUCCEEDED';
export const CREATE_HIERARCHY_DRAFT_FAILED = 'CREATE_HIERARCHY_DRAFT_FAILED';

export interface CreateColdStartHierarchyDraftAction extends Action {
  type: typeof CREATE_COLD_START_HIERARCHY_DRAFT;
  payload: CreateFormValues;
}

export interface CreateColdStartHierarchyDraftSucceededAction extends Action {
  type: typeof CREATE_COLD_START_HIERARCHY_DRAFT_SUCCEEDED;
  payload: CreateColdStartDraftResponse;
}

export interface CreateAddToCampaignHierarchyDraftAction extends Action {
  type: typeof CREATE_ADD_TO_CAMPAIGN_HIERARCHY_DRAFT;
  payload: CreateFlightFormValues;
}

export interface CreateAddToCampaignHierarchyDraftSucceededAction
  extends Action {
  type: typeof CREATE_ADD_TO_CAMPAIGN_HIERARCHY_DRAFT_SUCCEEDED;
  payload: CreateDraftForExistingCampaignResponse;
}

export interface CreateAddToFlightHierarchyDraftAction extends Action {
  type: typeof CREATE_ADD_TO_FLIGHT_HIERARCHY_DRAFT;
  payload: CreateCreativeFormValues;
}

export interface CreateAddToFlightHierarchyDraftSucceededAction extends Action {
  type: typeof CREATE_ADD_TO_FLIGHT_HIERARCHY_DRAFT_SUCCEEDED;
  payload: CreateDraftForExistingFlightResponse;
}

export interface CreateHierarchyDraftFailedAction extends FetchErrorAction {
  type: typeof CREATE_HIERARCHY_DRAFT_FAILED;
}

export type CreateHierarchyDraftAction =
  | CreateColdStartHierarchyDraftAction
  | CreateColdStartHierarchyDraftSucceededAction
  | CreateAddToCampaignHierarchyDraftAction
  | CreateAddToCampaignHierarchyDraftSucceededAction
  | CreateAddToFlightHierarchyDraftAction
  | CreateAddToFlightHierarchyDraftSucceededAction
  | CreateHierarchyDraftFailedAction
  | ResetHierarchyDraftAction;

// UPDATE DRAFTS

export const UPDATE_CAMPAIGN_DRAFT = 'UPDATE_CAMPAIGN_DRAFT';
export const UPDATE_CAMPAIGN_DRAFT_SUCCEEDED =
  'UPDATE_CAMPAIGN_DRAFT_SUCCEEDED';
export const UPDATE_CAMPAIGN_DRAFT_FAILED = 'UPDATE_CAMPAIGN_DRAFT_FAILED';

export interface UpdateCampaignDraftStartAction extends Action {
  type: typeof UPDATE_CAMPAIGN_DRAFT;
  payload: {
    formValues: CampaignFormValues;
    campaignDraftId: string;
    hierarchyDraftId: string;
  };
}

export interface UpdateCampaignDraftSucceededAction extends Action {
  type: typeof UPDATE_CAMPAIGN_DRAFT_SUCCEEDED;
}

export interface UpdateCampaignDraftFailedAction extends FetchErrorAction {
  type: typeof UPDATE_CAMPAIGN_DRAFT_FAILED;
}

export type UpdateCampaignDraftAction =
  | UpdateCampaignDraftStartAction
  | UpdateCampaignDraftSucceededAction
  | UpdateCampaignDraftFailedAction;

export const UPDATE_FLIGHT_DRAFT = 'UPDATE_FLIGHT_DRAFT';
export const UPDATE_FLIGHT_DRAFT_SUCCEEDED = 'UPDATE_FLIGHT_DRAFT_SUCCEEDED';
export const UPDATE_FLIGHT_DRAFT_FAILED = 'UPDATE_FLIGHT_DRAFT_FAILED';

export interface UpdateFlightDraftStartAction extends Action {
  type: typeof UPDATE_FLIGHT_DRAFT;
  payload: {
    formValues: FlightFormValues;
    flightDraftId: string;
    hierarchyDraftId: string;
    duplicatedFlightId?: string;
  };
}

export interface UpdateFlightDraftSucceededAction extends Action {
  type: typeof UPDATE_FLIGHT_DRAFT_SUCCEEDED;
}

export interface UpdateFlightDraftFailedAction extends FetchErrorAction {
  type: typeof UPDATE_FLIGHT_DRAFT_FAILED;
}

export type UpdateFlightDraftAction =
  | UpdateFlightDraftStartAction
  | UpdateFlightDraftSucceededAction
  | UpdateFlightDraftFailedAction;

export const UPDATE_CREATIVE_DRAFT = 'UPDATE_CREATIVE_DRAFT';
export const UPDATE_CREATIVE_DRAFT_SUCCEEDED =
  'UPDATE_CREATIVE_DRAFT_SUCCEEDED';
export const UPDATE_CREATIVE_DRAFT_FAILED = 'UPDATE_CREATIVE_DRAFT_FAILED';

export interface UpdateCreativeDraftStartAction extends Action {
  type: typeof UPDATE_CREATIVE_DRAFT;
  payload: {
    formValues: PreSavedCreativeFormValues;
    format?: FormatType;
    creativeDraftId: string;
    hierarchyDraftId: string;
  };
}

export interface UpdateCreativeDraftSucceededAction extends Action {
  type: typeof UPDATE_CREATIVE_DRAFT_SUCCEEDED;
}

export interface UpdateCreativeDraftFailedAction extends FetchErrorAction {
  type: typeof UPDATE_CREATIVE_DRAFT_FAILED;
}

export type UpdateCreativeDraftAction =
  | UpdateCreativeDraftStartAction
  | UpdateCreativeDraftSucceededAction
  | UpdateCreativeDraftFailedAction;
// FETCH ENRICHED DRAFTS
export const FETCH_ENRICHED_HIERARCHY_DRAFT = 'FETCH_ENRICHED_HIERARCHY_DRAFT';
export const FETCH_ENRICHED_HIERARCHY_DRAFT_SUCCEEDED =
  'FETCH_ENRICHED_HIERARCHY_DRAFT_SUCCEEDED';
export const FETCH_ENRICHED_HIERARCHY_DRAFT_FAILED =
  'FETCH_ENRICHED_HIERARCHY_DRAFT_FAILED';

export interface FetchEnrichedHierarchyDraftStartAction extends Action {
  type: typeof FETCH_ENRICHED_HIERARCHY_DRAFT;
  payload: {
    hierarchyDraftId: string;
  };
}

export interface FetchEnrichedHierarchyDraftSucceededAction extends Action {
  type: typeof FETCH_ENRICHED_HIERARCHY_DRAFT_SUCCEEDED;
  payload: EnrichedDraftApiResponse;
}

export interface FetchEnrichedHierarchyDraftFailedAction
  extends FetchErrorAction {
  type: typeof FETCH_ENRICHED_HIERARCHY_DRAFT_FAILED;
}

export type FetchEnrichedHierarchyDraft =
  | FetchEnrichedHierarchyDraftStartAction
  | FetchEnrichedHierarchyDraftSucceededAction
  | FetchEnrichedHierarchyDraftFailedAction
  | ResetHierarchyDraftAction;
