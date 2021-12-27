import { all, call, put, takeEvery } from 'redux-saga/effects';

import * as actions from './actions';

import * as api from 'api/adCreation';

import { sortByKeyAsc } from 'utilities';

import { mapBgStockMusic } from './mappers';

import * as types from './types';

export function* fetchStockMusic() {
  try {
    const fetchStockMusicFunction = api.fetchStockMusic;
    const tracks = yield call(fetchStockMusicFunction);
    yield put(
      actions.fetchStockMusicSuccess(
        sortByKeyAsc('name', tracks.map(mapBgStockMusic)),
      ),
    );
  } catch (e) {
    yield put(actions.fetchStockMusicFailed(e));
  }
}

export function* watchStockMusicFetch() {
  yield takeEvery(types.FETCH_STOCK_MUSIC_REQUESTED, fetchStockMusic);
}

export default function* stockMusicSaga() {
  yield all([watchStockMusicFetch()]);
}
