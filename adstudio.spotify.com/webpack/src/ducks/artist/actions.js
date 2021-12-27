import * as types from './types';

export function fetchArtist(artistId, adId) {
  return {
    type: types.FETCH_ARTIST_REQUESTED,
    payload: {
      artistId,
    },

    meta: {
      adId,
    },
  };
}

export function fetchArtistSuccess(artist, adId) {
  return {
    type: types.FETCH_ARTIST_SUCCESS,
    payload: {
      artist,
    },

    meta: {
      adId,
    },
  };
}

export function fetchArtistFailed(error, artistId, adId) {
  return {
    type: types.FETCH_ARTIST_FAILED,
    error: true,
    payload: error,
    meta: {
      artistId,
      adId,
    },
  };
}
