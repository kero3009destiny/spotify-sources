import {
  FETCH_USER_AUTH_BEGIN,
  FETCH_USER_AUTH_SUCCESS,
  FETCH_USER_AUTH_FAILURE
} from '../actions/setUserAction';

import {
  UPDATE_SPOTIFY_ACCESS_BEGIN,
  UPDATE_SPOTIFY_ACCESS_SUCCESS,
  UPDATE_SPOTIFY_ACCESS_FAILURE
} from '../actions/updateSpotifyUserAction';

import {
  SET_USER_ACCOUNT_BEGIN,
  SET_USER_ACCOUNT_SUCCESS,
  SET_USER_ACCOUNT_FAILURE
} from '../actions/setUserAccountDetailsAction';

import {
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE
} from '../actions/updateUserAction';

const initialUserState = {
  spotifyLoading: false,
  userAuthLoading: false,
  error: null
};

export default function userReducer(state = initialUserState, action) {
  switch (action.type) {
    case UPDATE_SPOTIFY_ACCESS_BEGIN:
      return {
        ...state,
        spotifyLoading: true,
        error: null
      };
    case FETCH_USER_AUTH_BEGIN:
      return {
        ...state,
        userAuthLoading: true,
        error: null
      };
    case UPDATE_SPOTIFY_ACCESS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        spotifyLoading: false,
        error: null
      };
    case FETCH_USER_AUTH_SUCCESS:
      return {
        ...state,
        ...action.payload,
        userAuthLoading: false,
        error: null
      };
    case UPDATE_SPOTIFY_ACCESS_FAILURE:
      return {
        ...state,
        spotifyLoading: false,
        error: action.payload.error
      };
    case FETCH_USER_AUTH_FAILURE:
      return {
        ...state,
        userAuthLoading: false,
        error: action.payload.error
      };
    case SET_USER_ACCOUNT_BEGIN:
      return {
        ...state,
        userLoading: true,
        error: null
      };
    case SET_USER_ACCOUNT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        userLoading: false,
        error: null
      };
    case SET_USER_ACCOUNT_FAILURE:
      return {
        ...state,
        userLoading: false,
        error: action.payload.error
      }
    case UPDATE_USER_START:
    case UPDATE_USER_SUCCESS:
    case UPDATE_USER_FAILURE:
    default:
      return state;
  }
}
