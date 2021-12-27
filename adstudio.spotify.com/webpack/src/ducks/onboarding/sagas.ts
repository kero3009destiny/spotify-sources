import { push } from 'react-router-redux';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';

import {
  closeOnboardingModal,
  RequestAccountHierarchyOnboarding,
  resetUserOnboarded,
  setAccountHierarchyOnboardingState,
  SetAccountHierarchyOnboardingStateAction,
  setUserHasSeenAdSetDupeOnboarding,
  setUserHasSeenBulksheetsOnboarding,
  setUserHasSeenHierarchyDraftsOnboarding,
  setUserOnboarded,
  setUserSeenCopyExistingOnboarding,
} from './actions';
import { getCurrentRouteLocation } from 'ducks/routes/selectors';
import { getUserUsername } from 'ducks/user/selectors';

import {
  getLocalStorage,
  getStorage,
  jsonParse,
  setStorage,
} from 'utils/storageHelpers';

import { routes } from 'config/routes';

import * as types from './types';

export type LocalStorage = typeof window.localStorage | undefined;

const onboardingStoragePrefix: string = 'hasViewedAllOnboarding::user-';
const accountHierarchyOnboardingStoragePrefix: string =
  'hasViewedAccountHierarchyOnboarding::user-';
const copyExistingOnboardingPrefix: string =
  'hasViewedCopyExistingOnboarding::user-';
const adSetDupeOnboardingPrefix: string = 'hasViewedAdSetDupeOnboarding::user-';
const hierarchyDraftsOnboardingPrefix: string =
  'hasViewedHierarchyDraftsOnboarding::user-';
const bulksheetOnboardingPrefix: string = 'hasViewedBulksheetOnboarding::user-';

/* Helpers */
export function formatHasViewedAllOnboardingKey(username: string) {
  return `${onboardingStoragePrefix}${username}`;
}

export function formatHasViewedAccountHierarchyOnboardingKey(username: string) {
  return `${accountHierarchyOnboardingStoragePrefix}${username}`;
}

export function formatHasViewedCopyExistingOnboarding(username: string) {
  return `${copyExistingOnboardingPrefix}${username}`;
}

export function formatHasViewedAdSetDupeOnboarding(username: string) {
  return `${adSetDupeOnboardingPrefix}${username}`;
}

export function formatHasViewedHierarchyDraftsOnboarding(username: string) {
  return `${hierarchyDraftsOnboardingPrefix}${username}`;
}

export function formatHasViewedBulksheetOnboarding(username: string) {
  return `${bulksheetOnboardingPrefix}${username}`;
}

/* Sagas */
export function* handleAllOnboardingStepsViewed(storage: LocalStorage) {
  const username = yield select(getUserUsername);
  const key = formatHasViewedAllOnboardingKey(username);
  yield call(setStorage, storage, key, true);
  yield put(setUserOnboarded());
}

function* handleUserRequestsOnboardingAgain(storage: LocalStorage) {
  const username = yield select(getUserUsername);
  const key = formatHasViewedAllOnboardingKey(username);
  yield call(setStorage, storage, key, false);
  const route = yield select(getCurrentRouteLocation);
  // The onboarding modal is only on the browse page, so go there.
  if (route !== routes.DASHBOARD) {
    yield put(push(routes.DASHBOARD));
  }
  yield put(resetUserOnboarded());
}

export function* handleUserHasAlreadyBeenOnboarded(storage: LocalStorage) {
  const username = yield select(getUserUsername);
  const key = formatHasViewedAllOnboardingKey(username);
  let userHasViewedOnboarding = yield call(getStorage, storage, key);
  userHasViewedOnboarding = jsonParse(userHasViewedOnboarding);

  if (userHasViewedOnboarding) {
    yield put(setUserOnboarded());
    yield put(closeOnboardingModal());
  }
}

export function* handleRequestAccountHierarchyOnboarding(
  storage: LocalStorage,
  action: RequestAccountHierarchyOnboarding,
) {
  const username = yield select(getUserUsername);
  const key = formatHasViewedAccountHierarchyOnboardingKey(username);
  // If the user forces onboarding again, let's set local storage back to false
  if (action.payload.forceOnboardingAgain) {
    yield call(setStorage, storage, key, false);
  }
  const userHasViewedOnboarding = yield call(getStorage, storage, key);
  const accountHierarchyOnboardingIsActive = userHasViewedOnboarding !== 'true';
  yield put(
    setAccountHierarchyOnboardingState(accountHierarchyOnboardingIsActive),
  );
}

export function* handleAccountHierarchyOnboardingViewed(
  storage: LocalStorage,
  action: SetAccountHierarchyOnboardingStateAction,
) {
  const username = yield select(getUserUsername);
  const key = formatHasViewedAccountHierarchyOnboardingKey(username);
  yield call(setStorage, storage, key, !action.payload.active);
}

export function* handleFetchUserHasViewedCopyExistingOnboarding(
  storage: LocalStorage,
) {
  const username = yield select(getUserUsername);
  const key = formatHasViewedCopyExistingOnboarding(username);
  let userHasViewedOnboarding = yield call(getStorage, storage, key);
  userHasViewedOnboarding = jsonParse(userHasViewedOnboarding);

  if (userHasViewedOnboarding) {
    yield put(setUserSeenCopyExistingOnboarding());
  }
}

export function* handleSetUserHasViewedCopyExistingOnboarding(
  storage: LocalStorage,
) {
  const username = yield select(getUserUsername);
  const key = formatHasViewedCopyExistingOnboarding(username);
  yield call(setStorage, storage, key, true);
}

export function* handleFetchUserHasViewedAdSetDupeOnboarding(
  storage: LocalStorage,
) {
  const username = yield select(getUserUsername);
  const key = formatHasViewedAdSetDupeOnboarding(username);
  let userHasViewedOnboarding = yield call(getStorage, storage, key);
  userHasViewedOnboarding = jsonParse(userHasViewedOnboarding);

  if (userHasViewedOnboarding) {
    yield put(setUserHasSeenAdSetDupeOnboarding());
  }
}

export function* handleSetUserHasViewedAdSetDupeOnboarding(
  storage: LocalStorage,
) {
  const username = yield select(getUserUsername);
  const key = formatHasViewedAdSetDupeOnboarding(username);
  yield call(setStorage, storage, key, true);
}

export function* handleFetchUserHasViewedHierarchyDraftsOnboarding(
  storage: LocalStorage,
) {
  const username = yield select(getUserUsername);
  const key = formatHasViewedHierarchyDraftsOnboarding(username);
  let userHasViewedOnboarding = yield call(getStorage, storage, key);
  userHasViewedOnboarding = jsonParse(userHasViewedOnboarding);

  if (userHasViewedOnboarding) {
    yield put(setUserHasSeenHierarchyDraftsOnboarding());
  }
}

export function* handleSetUserHasViewedHierarchyDraftsOnboarding(
  storage: LocalStorage,
) {
  const username = yield select(getUserUsername);
  const key = formatHasViewedHierarchyDraftsOnboarding(username);
  yield call(setStorage, storage, key, true);
}

export function* handleFetchUserHasViewedBulksheetsOnboarding(
  storage: LocalStorage,
) {
  const username = yield select(getUserUsername);
  const key = formatHasViewedBulksheetOnboarding(username);
  let userHasViewedOnboarding = yield call(getStorage, storage, key);
  userHasViewedOnboarding = jsonParse(userHasViewedOnboarding);

  if (userHasViewedOnboarding) {
    yield put(setUserHasSeenBulksheetsOnboarding());
  }
}

export function* handleSetUserHasViewedBulksheetsOnboarding(
  storage: LocalStorage,
) {
  const username = yield select(getUserUsername);
  const key = formatHasViewedBulksheetOnboarding(username);
  yield call(setStorage, storage, key, true);
}

function* watchForAllOnboardingStepsViewed() {
  yield takeEvery(
    types.ALL_ONBOARDING_STEPS_VIEWED,
    handleAllOnboardingStepsViewed,
    getLocalStorage(),
  );
}

function* watchForUserHasBeenOnboarded() {
  yield takeEvery(
    types.USER_HAS_ALREADY_BEEN_ONBOARDED,
    handleUserHasAlreadyBeenOnboarded,
    getLocalStorage(),
  );
}

function* watchForUserRequestsOnboardingAgain() {
  yield takeEvery(
    types.USER_REQUESTS_ONBOARDING_AGAIN,
    handleUserRequestsOnboardingAgain,
    getLocalStorage(),
  );
}

function* watchForRequestAccountHierarchyOnboarding() {
  yield takeEvery(
    types.REQUEST_ACCOUNT_HIERARCHY_ONBOARDING,
    handleRequestAccountHierarchyOnboarding,
    getLocalStorage(),
  );
}

function* watchForAccountHierarchyOnboardingViewed() {
  yield takeEvery(
    types.SET_ACCOUNT_HIERARCHY_ONBOARDING_STATE,
    handleAccountHierarchyOnboardingViewed,
    getLocalStorage(),
  );
}

/* a helper to allow ?show_onboarding to force the onboarding to show up by clearing the storage key */
function* watchForUserIsTestingOnboarding() {
  if (window.location.search.includes('show_onboarding')) {
    const storage = getLocalStorage();
    const keys = Object.keys({ ...storage }).filter((storageKey): boolean =>
      storageKey.startsWith(onboardingStoragePrefix),
    );

    for (const key of keys) {
      yield call(setStorage, storage, key, false);
    }
  }
}

function* watchForFetchUserHasSeenCopyExistingOnboarding() {
  yield takeEvery(
    types.FETCH_USER_HAS_SEEN_COPY_EXISTING_ONBOARDING,
    handleFetchUserHasViewedCopyExistingOnboarding,
    getLocalStorage(),
  );
}

function* watchForSetUserHasSeenCopyExistingOnboarding() {
  yield takeEvery(
    types.SET_USER_SEEN_COPY_EXISTING_ONBOARDING,
    handleSetUserHasViewedCopyExistingOnboarding,
    getLocalStorage(),
  );
}

function* watchForFetchUserHasSeenAdSetDupeOnboarding() {
  yield takeEvery(
    types.FETCH_USER_HAS_SEEN_AD_SET_DUPE_ONBOARDING,
    handleFetchUserHasViewedAdSetDupeOnboarding,
    getLocalStorage(),
  );
}

function* watchForSetUserHasSeenAdSetDupeOnboarding() {
  yield takeEvery(
    types.SET_USER_HAS_SEEN_AD_SET_DUPE_ONBOARDING,
    handleSetUserHasViewedAdSetDupeOnboarding,
    getLocalStorage(),
  );
}

function* watchForFetchUserHasSeenHierarchyDraftsOnboarding() {
  yield takeEvery(
    types.FETCH_USER_HAS_SEEN_HIERARCHY_DRAFTS_ONBOARDING,
    handleFetchUserHasViewedHierarchyDraftsOnboarding,
    getLocalStorage(),
  );
}

function* watchForSetUserHasSeenHierarchyDraftsOnboarding() {
  yield takeEvery(
    types.SET_USER_HAS_SEEN_HIERARCHY_DRAFTS_ONBOARDING,
    handleSetUserHasViewedHierarchyDraftsOnboarding,
    getLocalStorage(),
  );
}

function* watchHandleFetchUserHasViewedBulksheetsOnboarding() {
  yield takeEvery(
    types.FETCH_USER_HAS_SEEN_BULKSHEETS_ONBOARDING,
    handleFetchUserHasViewedBulksheetsOnboarding,
    getLocalStorage(),
  );
}

function* watchHandleSetUserHasViewedBulksheetsOnboarding() {
  yield takeEvery(
    types.SET_USER_HAS_SEEN_BULKSHEETS_ONBOARDING,
    handleSetUserHasViewedBulksheetsOnboarding,
    getLocalStorage(),
  );
}

export default function* onboardingSaga() {
  yield all([
    watchForUserRequestsOnboardingAgain(),
    watchForUserIsTestingOnboarding(),
    watchForAllOnboardingStepsViewed(),
    watchForUserHasBeenOnboarded(),
    watchForRequestAccountHierarchyOnboarding(),
    watchForAccountHierarchyOnboardingViewed(),
    watchForFetchUserHasSeenCopyExistingOnboarding(),
    watchForSetUserHasSeenCopyExistingOnboarding(),
    watchForFetchUserHasSeenAdSetDupeOnboarding(),
    watchForSetUserHasSeenAdSetDupeOnboarding(),
    watchForFetchUserHasSeenHierarchyDraftsOnboarding(),
    watchForSetUserHasSeenHierarchyDraftsOnboarding(),
    watchHandleFetchUserHasViewedBulksheetsOnboarding(),
    watchHandleSetUserHasViewedBulksheetsOnboarding(),
  ]);
}
