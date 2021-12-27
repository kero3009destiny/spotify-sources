import { all, call, put, select, takeEvery } from 'redux-saga/effects';

import { setNewFeatureShown } from './actions';
import { getUserUsername } from 'ducks/user/selectors';

import {
  getLocalStorage,
  getStorage,
  jsonParse,
  setStorage,
} from 'utils/storageHelpers';

import {
  GET_HAS_NEW_FEATURE_BEEN_VIEWED,
  SET_NEW_FEATURE_SHOWN,
} from './types';

/* Helpers */
export function formatHasViewedNewFeatureKey(username, featureName) {
  return `hasViewedNewFeature-${featureName}::user-${username}`;
}

/* Sagas */
export function* handleNewFeatureShown(storage, action) {
  const { featureName } = action.payload;

  const username = yield select(getUserUsername);
  const key = formatHasViewedNewFeatureKey(username, featureName);
  let userHasSeenNewFeature = yield call(getStorage, storage, key);
  userHasSeenNewFeature = jsonParse(userHasSeenNewFeature);

  // Only set the key to true once
  if (!userHasSeenNewFeature) {
    yield call(setStorage, storage, key, true);
  }
}

export function* handleHasUserSeenNewFeature(storage, action) {
  const { featureName } = action.payload;

  const username = yield select(getUserUsername);
  const key = formatHasViewedNewFeatureKey(username, featureName);
  let userHasSeenNewFeature = yield call(getStorage, storage, key);
  userHasSeenNewFeature = jsonParse(userHasSeenNewFeature);

  if (userHasSeenNewFeature) {
    yield put(setNewFeatureShown(featureName));
  }
}

function* watchForNewFeatureShown() {
  yield takeEvery(
    SET_NEW_FEATURE_SHOWN,
    handleNewFeatureShown,
    getLocalStorage(),
  );
}

function* watchForHasUserSeenNewFeature() {
  yield takeEvery(
    GET_HAS_NEW_FEATURE_BEEN_VIEWED,
    handleHasUserSeenNewFeature,
    getLocalStorage(),
  );
}

export default function* newFeatureSaga() {
  yield all([watchForNewFeatureShown(), watchForHasUserSeenNewFeature()]);
}
