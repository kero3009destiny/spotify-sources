import { Action } from 'redux';

import { FetchErrorAction, SagaFetchError } from 'utils/asyncDucksHelpers';

import {
  CreateSavedQueryResponse,
  SavedQueriesResponse,
  SavedQuery,
} from 'types/common/state/api/savedQueries';

export const GET_SAVED_QUERIES = 'GET_SAVED_QUERIES';
export const GET_SAVED_QUERIES_SUCCEEDED = 'GET_SAVED_QUERIES_SUCCEEDED';
export const GET_SAVED_QUERIES_FAILED = 'GET_SAVED_QUERIES_FAILED';
export const TOGGLE_SAVED_QUERIES = 'TOGGLE_SAVED_QUERIES';
export const SELECT_SAVED_QUERY = 'SELECT_SAVED_QUERY';
export const CREATE_SAVED_QUERY = 'CREATE_SAVED_QUERY';
export const CREATE_SAVED_QUERY_SUCCEEDED = 'CREATE_SAVED_QUERY_SUCCEEDED';
export const CREATE_SAVED_QUERY_FAILED = 'CREATE_SAVED_QUERY_FAILED';
export const CLEAR_RECENTLY_CREATED = 'CLEAR_RECENTLY_CREATED';
export const RESTORE_SAVED_QUERY = 'RESTORE_SAVED_QUERY';
export const RESTORE_SAVED_QUERY_SUCCEEDED = 'RESTORE_SAVED_QUERY_SUCCEEDED';
export const RESTORE_SAVED_QUERY_FAILED = 'RESTORE_SAVED_QUERY_FAILED';
export const DELETE_SAVED_QUERY = 'DELETE_SAVED_QUERY';
export const DELETE_SAVED_QUERY_SUCCEEDED = 'DELETE_SAVED_QUERY_SUCCEEDED';
export const DELETE_SAVED_QUERY_FAILED = 'DELETE_SAVED_QUERY_FAILED';
export const SET_USER_HAS_SEEN_SAVED_QUERIES =
  'SET_USER_HAS_SEEN_SAVED_QUERIES';
export const FETCH_USER_HAS_SEEN_SAVED_QUERIES =
  'FETCH_USER_HAS_SEEN_SAVED_QUERIES';

export interface DunderErrorResponse extends Response {
  errorDetails?: {
    code?: number;
    message?: string;
    details?: {
      errorMessageCode: string;
      errorValues: string[];
    }[];
  };
}

export type DunderFetchError = DunderErrorResponse | SagaFetchError;

export interface GetSavedQueriesStartAction extends Action {
  type: typeof GET_SAVED_QUERIES;
  payload: {
    iamDomain: string;
  };
}

export interface GetSavedQueriesSuccessAction extends Action {
  type: typeof GET_SAVED_QUERIES_SUCCEEDED;
  payload: SavedQueriesResponse;
}

export interface GetSavedQueriesErrorAction extends FetchErrorAction {
  type: typeof GET_SAVED_QUERIES_FAILED;
}

export interface ToggleSavedQueriesAction extends Action {
  type: typeof TOGGLE_SAVED_QUERIES;
  payload: {
    isOpen: boolean;
  };
}

export interface SelectSavedQueryAction extends Action {
  type: typeof SELECT_SAVED_QUERY;
  payload: {
    uuid: string;
    params: string;
    campaignIds: string[];
    flightIds: string[];
  };
}

export type GetSavedQueriesAction =
  | GetSavedQueriesStartAction
  | GetSavedQueriesSuccessAction
  | GetSavedQueriesErrorAction
  | ToggleSavedQueriesAction
  | SelectSavedQueryAction
  | CreateSavedQueryStartAction
  | CreateSavedQuerySuccessAction
  | CreateSavedQueryErrorAction
  | ClearRecentlyCreatedAction
  | RestoreSavedQueryStartAction
  | RestoreSavedQuerySuccessAction
  | RestoreSavedQueryErrorAction
  | DeleteSavedQueryAction
  | DeleteSavedQuerySuccessAction
  | DeleteSavedQueryErrorAction
  | SetUserHasSeenSavedQueriesAction
  | FetchUserHasSeenSavedQueriesAction;

export interface SavedQueriesState extends SavedQueriesResponse {
  loading: boolean;
  error?: DunderFetchError;
  currentIamDomain: string;
  isOpen: boolean;
  currentSelection: {
    uuid: string;
    params: string;
    campaignIds: string[];
    flightIds: string[];
  };
  creating: boolean;
  createSuccess: boolean;
  createError?: DunderFetchError;
  recentlyCreated?: string;
  recentlyDeleted: string[];
  restoring: boolean;
  restoreError?: DunderFetchError;
  deleting: boolean;
  deleteError?: DunderFetchError;
  showNewTag: boolean;
}

export interface CreateSavedQueryStartAction extends Action {
  type: typeof CREATE_SAVED_QUERY;
  payload: {
    savedQuery: SavedQuery;
    params: string;
  };
}

export interface CreateSavedQuerySuccessAction extends Action {
  type: typeof CREATE_SAVED_QUERY_SUCCEEDED;
  payload: CreateSavedQueryResponse;
}

export interface CreateSavedQueryErrorAction extends FetchErrorAction {
  type: typeof CREATE_SAVED_QUERY_FAILED;
}

export interface ClearRecentlyCreatedAction extends Action {
  type: typeof CLEAR_RECENTLY_CREATED;
}

export interface RestoreSavedQueryStartAction extends Action {
  type: typeof RESTORE_SAVED_QUERY;
  payload: {
    savedQueryUuid: string;
    iamDomain: string;
  };
}

export interface RestoreSavedQuerySuccessAction extends Action {
  type: typeof RESTORE_SAVED_QUERY_SUCCEEDED;
  payload: {
    savedQueryUuid: string;
  };
}

export interface RestoreSavedQueryErrorAction extends FetchErrorAction {
  type: typeof RESTORE_SAVED_QUERY_FAILED;
}

export interface DeleteSavedQueryAction extends Action {
  type: typeof DELETE_SAVED_QUERY;
  payload: {
    savedQueryUuid: string;
    iamDomain: string;
  };
}

export interface DeleteSavedQuerySuccessAction extends Action {
  type: typeof DELETE_SAVED_QUERY_SUCCEEDED;
  payload: {
    savedQueryUuid: string;
  };
}

export interface DeleteSavedQueryErrorAction extends FetchErrorAction {
  type: typeof DELETE_SAVED_QUERY_FAILED;
}

export interface SetUserHasSeenSavedQueriesAction extends Action {
  type: typeof SET_USER_HAS_SEEN_SAVED_QUERIES;
}

export interface FetchUserHasSeenSavedQueriesAction extends Action {
  type: typeof FETCH_USER_HAS_SEEN_SAVED_QUERIES;
}
