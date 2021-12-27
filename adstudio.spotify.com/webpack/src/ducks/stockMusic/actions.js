import * as types from './types';

export function fetchStockMusic() {
  return {
    type: types.FETCH_STOCK_MUSIC_REQUESTED,
  };
}

export function fetchStockMusicSuccess(tracks) {
  return {
    type: types.FETCH_STOCK_MUSIC_SUCCESS,
    payload: tracks,
  };
}

export function fetchStockMusicFailed(err) {
  return {
    type: types.FETCH_STOCK_MUSIC_FAILED,
    error: true,
    payload: err,
  };
}
