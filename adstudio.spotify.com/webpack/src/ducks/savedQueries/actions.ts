import { buildFetchErrorAction } from 'utils/asyncDucksHelpers';

import * as types from './types';
import {
  ClearRecentlyCreatedAction,
  CreateSavedQueryErrorAction,
  CreateSavedQueryStartAction,
  CreateSavedQuerySuccessAction,
  DeleteSavedQueryAction,
  DeleteSavedQueryErrorAction,
  DeleteSavedQuerySuccessAction,
  DunderFetchError,
  FetchUserHasSeenSavedQueriesAction,
  GetSavedQueriesErrorAction,
  GetSavedQueriesStartAction,
  GetSavedQueriesSuccessAction,
  RestoreSavedQueryErrorAction,
  RestoreSavedQueryStartAction,
  RestoreSavedQuerySuccessAction,
  SelectSavedQueryAction,
  SetUserHasSeenSavedQueriesAction,
  ToggleSavedQueriesAction,
} from './types';
import {
  CreateSavedQueryResponse,
  SavedQueriesResponse,
  SavedQuery,
} from 'types/common/state/api/savedQueries';

export function getSavedQueries(iamDomain: string): GetSavedQueriesStartAction {
  return {
    type: types.GET_SAVED_QUERIES,
    payload: {
      iamDomain,
    },
  };
}

export function getSavedQueriesSucceeded(
  payload: SavedQueriesResponse,
): GetSavedQueriesSuccessAction {
  return {
    type: types.GET_SAVED_QUERIES_SUCCEEDED,
    payload,
  };
}

export function getSavedQueriesFailed(
  err: DunderFetchError,
): GetSavedQueriesErrorAction {
  return buildFetchErrorAction(types.GET_SAVED_QUERIES_FAILED, err);
}

export function toggleSavedQueries(isOpen: boolean): ToggleSavedQueriesAction {
  return {
    type: types.TOGGLE_SAVED_QUERIES,
    payload: {
      isOpen,
    },
  };
}

export function selectSavedQuery(
  uuid: string,
  params: string,
  campaignIds: string[],
  flightIds: string[],
): SelectSavedQueryAction {
  return {
    type: types.SELECT_SAVED_QUERY,
    payload: {
      uuid: uuid,
      params: params,
      campaignIds: campaignIds,
      flightIds: flightIds,
    },
  };
}

export function createSavedQuery(
  savedQuery: SavedQuery,
  params: string,
): CreateSavedQueryStartAction {
  return {
    type: types.CREATE_SAVED_QUERY,
    payload: {
      savedQuery: savedQuery,
      params: params,
    },
  };
}

export function createSavedQuerySucceeded(
  payload: CreateSavedQueryResponse,
): CreateSavedQuerySuccessAction {
  return {
    type: types.CREATE_SAVED_QUERY_SUCCEEDED,
    payload: payload,
  };
}

export function createSavedQueryFailed(
  err: DunderFetchError,
): CreateSavedQueryErrorAction {
  return buildFetchErrorAction(types.CREATE_SAVED_QUERY_FAILED, err);
}

export function clearRecentlyCreated(): ClearRecentlyCreatedAction {
  return {
    type: types.CLEAR_RECENTLY_CREATED,
  };
}

export function restoreSavedQuery(
  savedQueryUuid: string,
  iamDomain: string,
): RestoreSavedQueryStartAction {
  return {
    type: types.RESTORE_SAVED_QUERY,
    payload: {
      savedQueryUuid: savedQueryUuid,
      iamDomain: iamDomain,
    },
  };
}

export function restoreSavedQuerySucceeded(
  savedQueryUuid: string,
): RestoreSavedQuerySuccessAction {
  return {
    type: types.RESTORE_SAVED_QUERY_SUCCEEDED,
    payload: {
      savedQueryUuid: savedQueryUuid,
    },
  };
}

export function restoreSavedQueryFailed(
  err: DunderFetchError,
): RestoreSavedQueryErrorAction {
  return buildFetchErrorAction(types.RESTORE_SAVED_QUERY_FAILED, err);
}

export function deleteSavedQuery(
  savedQueryUuid: string,
  iamDomain: string,
): DeleteSavedQueryAction {
  return {
    type: types.DELETE_SAVED_QUERY,
    payload: {
      savedQueryUuid,
      iamDomain,
    },
  };
}

export function deleteSavedQuerySucceeded(
  savedQueryUuid: string,
): DeleteSavedQuerySuccessAction {
  return {
    type: types.DELETE_SAVED_QUERY_SUCCEEDED,
    payload: {
      savedQueryUuid,
    },
  };
}

export function deleteSavedQueryFailed(
  err: DunderFetchError,
): DeleteSavedQueryErrorAction {
  return buildFetchErrorAction(types.DELETE_SAVED_QUERY_FAILED, err);
}

export function setUserHasSeenSavedQueries(): SetUserHasSeenSavedQueriesAction {
  return {
    type: types.SET_USER_HAS_SEEN_SAVED_QUERIES,
  };
}

export function fetchUserHasSeenSavedQueries(): FetchUserHasSeenSavedQueriesAction {
  return {
    type: types.FETCH_USER_HAS_SEEN_SAVED_QUERIES,
  };
}
