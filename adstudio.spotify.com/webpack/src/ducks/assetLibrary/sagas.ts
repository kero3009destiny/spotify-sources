import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  getAssetLibraryFailed as getAssetLibraryFailedAction,
  getAssetLibrarySuccess as getAssetLibrarySuccessAction,
} from './actions';

import * as Api from 'api/assetLibrary';

import { FETCH_ASSET_LIBRARY, FetchAssetLibraryStartAction } from './types';
import { GetAssetLibraryResponse } from 'types/common/state/api/assetLibrary';

export function* getAssetLibrary(action: FetchAssetLibraryStartAction) {
  try {
    const assets: GetAssetLibraryResponse = yield call(
      Api.fetchAssetLibrary,
      action.payload,
    );
    yield put(getAssetLibrarySuccessAction(assets));
  } catch (e) {
    yield put(getAssetLibraryFailedAction(e));
  }
}

function* watchForAssetLibrary() {
  yield takeLatest(FETCH_ASSET_LIBRARY, getAssetLibrary);
}

export default function* assetLibrarySaga() {
  yield all([watchForAssetLibrary()]);
}
