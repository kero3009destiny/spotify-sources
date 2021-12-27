import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';

import {
  createSavedQueryFailed,
  createSavedQuerySucceeded,
  deleteSavedQueryFailed,
  deleteSavedQuerySucceeded,
  getSavedQueriesFailed,
  getSavedQueriesSucceeded,
  restoreSavedQueryFailed,
  restoreSavedQuerySucceeded,
  setUserHasSeenSavedQueries,
} from './actions';
import { getUserUsername } from 'ducks/user/selectors';

import {
  createSavedQueryRequest,
  deleteSavedQueryRequest,
  getSavedQueries,
  restoreSavedQueryRequest,
} from 'api/savedQueries';

import {
  getLocalStorage,
  getStorage,
  jsonParse,
  setStorage,
} from 'utils/storageHelpers';

import {
  CREATE_SAVED_QUERY,
  CreateSavedQueryStartAction,
  DELETE_SAVED_QUERY,
  DeleteSavedQueryAction,
  FETCH_USER_HAS_SEEN_SAVED_QUERIES,
  GET_SAVED_QUERIES,
  GetSavedQueriesStartAction,
  RESTORE_SAVED_QUERY,
  RestoreSavedQueryStartAction,
} from './types';
import {
  CreateSavedQueryResponse,
  SavedQueriesResponse,
} from 'types/common/state/api/savedQueries';

export type LocalStorage = typeof window.localStorage | undefined;

const savedQueriesPrefix: string = 'hasViewedSavedQueries::user-';
export function formatHasViewedSavedQueries(username: string) {
  return `${savedQueriesPrefix}${username}`;
}

export function* fetchSavedQueries(action: GetSavedQueriesStartAction) {
  try {
    const response: SavedQueriesResponse = yield call(
      getSavedQueries,
      action.payload.iamDomain,
    );
    yield put(getSavedQueriesSucceeded(response));
  } catch (e) {
    yield put(getSavedQueriesFailed(e));
  }
}

export function* createSavedQuery(action: CreateSavedQueryStartAction) {
  try {
    const response: CreateSavedQueryResponse = yield call(
      createSavedQueryRequest,
      action.payload.savedQuery,
    );
    yield put(createSavedQuerySucceeded(response));
  } catch (e) {
    yield put(createSavedQueryFailed(e));
  }
}

export function* restoreSavedQuery(action: RestoreSavedQueryStartAction) {
  try {
    yield call(
      restoreSavedQueryRequest,
      action.payload.savedQueryUuid,
      action.payload.iamDomain,
    );
    yield put(restoreSavedQuerySucceeded(action.payload.savedQueryUuid));
  } catch (e) {
    yield put(restoreSavedQueryFailed(e));
  }
}

export function* deleteSavedQuery(action: DeleteSavedQueryAction) {
  try {
    yield call(
      deleteSavedQueryRequest,
      action.payload.savedQueryUuid,
      action.payload.iamDomain,
    );
    yield put(deleteSavedQuerySucceeded(action.payload.savedQueryUuid));
  } catch (e) {
    yield put(deleteSavedQueryFailed(e));
  }
}

export function* handleFetchUserHasViewedSavedQueries(storage: LocalStorage) {
  const username = yield select(getUserUsername);
  const key = formatHasViewedSavedQueries(username);
  let userHasViewedSavedQueries = yield call(getStorage, storage, key);
  userHasViewedSavedQueries = jsonParse(userHasViewedSavedQueries);

  // If they have seen it, update the state, otherwise update the local storage for next time
  if (userHasViewedSavedQueries) {
    yield put(setUserHasSeenSavedQueries());
  } else {
    yield call(setStorage, storage, key, true);
  }
}

function* watchFetchSavedQueries() {
  yield takeLatest(GET_SAVED_QUERIES, fetchSavedQueries);
}

function* watchCreatedSavedQuery() {
  yield takeLatest(CREATE_SAVED_QUERY, createSavedQuery);
}

function* watchRestoreSavedQuery() {
  yield takeLatest(RESTORE_SAVED_QUERY, restoreSavedQuery);
}

function* watchDeleteSavedQuery() {
  yield takeLatest(DELETE_SAVED_QUERY, deleteSavedQuery);
}

function* watchHandleFetchUserHasViewedSavedQueries() {
  yield takeEvery(
    FETCH_USER_HAS_SEEN_SAVED_QUERIES,
    handleFetchUserHasViewedSavedQueries,
    getLocalStorage(),
  );
}

export default function* getSavedQueriesSaga() {
  yield all([
    watchFetchSavedQueries(),
    watchCreatedSavedQuery(),
    watchRestoreSavedQuery(),
    watchDeleteSavedQuery(),
    watchHandleFetchUserHasViewedSavedQueries(),
  ]);
}
