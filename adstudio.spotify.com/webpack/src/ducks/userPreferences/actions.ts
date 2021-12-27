import { buildFetchErrorAction } from 'utils/asyncDucksHelpers';

import {
  GET_ALL_USER_PREFERENCES,
  GET_ALL_USER_PREFERENCES_SUCCESS,
  GET_USER_PREFERENCE,
  GET_USER_PREFERENCE_FAILED,
  GET_USER_PREFERENCE_SUCCESS,
  GetAllUserPreferenceAction,
  GetAllUserPreferencesSuccessAction,
  GetUserPreferenceAction,
  GetUserPreferenceErrorAction,
  GetUserPreferenceSuccessAction,
  RECEIVE_ALL_USER_PREFERENCES,
  RECEIVE_USER_PREFERENCE,
  SET_USER_PREFERENCE,
  SET_USER_PREFERENCE_FAILED,
  SET_USER_PREFERENCE_SUCCESS,
  SetUserPreferenceAction,
  SetUserPreferenceErrorAction,
  SetUserPreferenceSuccessAction,
  UserPreference,
  UserPreferences,
} from './types';

export const setPreference = (
  preference: UserPreference,
): SetUserPreferenceAction => ({
  type: SET_USER_PREFERENCE,
  payload: {
    preference,
  },
});

export const setPreferenceSuccess = (): SetUserPreferenceSuccessAction => ({
  type: SET_USER_PREFERENCE_SUCCESS,
});

export const setPreferenceFailed = (
  error: Error,
): SetUserPreferenceErrorAction =>
  buildFetchErrorAction(SET_USER_PREFERENCE_FAILED, error);

export const receiveUserPreferences = (preferences: UserPreferences) => ({
  type: RECEIVE_ALL_USER_PREFERENCES,
  payload: {
    preferences,
  },
});

export const receiveUserPreference = (preference: UserPreference) => ({
  type: RECEIVE_USER_PREFERENCE,
  payload: {
    preference,
  },
});

export const getPreference = (key: string): GetUserPreferenceAction => ({
  type: GET_USER_PREFERENCE,
  payload: {
    key,
  },
});

export const getPreferenceSuccess = (): GetUserPreferenceSuccessAction => ({
  type: GET_USER_PREFERENCE_SUCCESS,
});

export const getPreferenceFailed = (
  error: Error,
): GetUserPreferenceErrorAction =>
  buildFetchErrorAction(GET_USER_PREFERENCE_FAILED, error);

export const getPreferences = (): GetAllUserPreferenceAction => ({
  type: GET_ALL_USER_PREFERENCES,
});

export const getPreferencesSuccess = (): GetAllUserPreferencesSuccessAction => ({
  type: GET_ALL_USER_PREFERENCES_SUCCESS,
});
