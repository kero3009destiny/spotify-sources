import { Action } from 'redux';

import { FetchErrorAction } from 'utils/asyncDucksHelpers';

export interface UserPreferenceState {
  getUserPreferenceValid?: boolean;
  setUserPreferenceValid?: boolean;
  preferences?: {
    any?: any;
  };
}

export const SET_USER_PREFERENCE = 'SET_USER_PREFERENCE';
export const SET_USER_PREFERENCE_SUCCESS = 'SET_USER_PREFERENCE_SUCCESS';
export const SET_USER_PREFERENCE_FAILED = 'SET_USER_PREFERENCE_FAILED';

export const GET_USER_PREFERENCE = 'GET_USER_PREFERENCE';
export const GET_USER_PREFERENCE_SUCCESS = 'GET_USER_PREFERENCE_SUCCESS';
export const GET_USER_PREFERENCE_FAILED = 'GET_USER_PREFERENCE_FAILED';
export const GET_ALL_USER_PREFERENCES = 'GET_ALL_USER_PREFERENCES';
export const GET_ALL_USER_PREFERENCES_SUCCESS =
  'GET_ALL_USER_PREFERENCES_SUCCESS';

export const RECEIVE_ALL_USER_PREFERENCES = 'RECEIVE_ALL_USER_PREFERENCES';
export const RECEIVE_USER_PREFERENCE = 'RECEIVE_USER_PREFERENCE';

export type UserPreferenceKey = {
  adAccountId?: string;
  key: string;
};

export type UserPreference = {
  key: string | UserPreferenceKey;
  value: any;
};

export type UserPreferences = Array<UserPreference>;

export interface SetUserPreferenceAction extends Action {
  type: typeof SET_USER_PREFERENCE;
  payload: {
    preference: UserPreference;
  };
}

export interface SetUserPreferenceSuccessAction extends Action {
  type: typeof SET_USER_PREFERENCE_SUCCESS;
}

export interface SetUserPreferenceErrorAction extends FetchErrorAction {
  type: typeof SET_USER_PREFERENCE_FAILED;
}

export interface GetUserPreferenceAction extends Action {
  type: typeof GET_USER_PREFERENCE;
  payload: {
    key: string;
  };
}

export interface ReceiveUserPreferenceAction extends Action {
  type: typeof RECEIVE_USER_PREFERENCE;
  payload: {
    preference: UserPreference;
  };
}

export interface ReceiveAllUserPreferenceAction extends Action {
  type: typeof RECEIVE_ALL_USER_PREFERENCES;
  payload: {
    preferences: UserPreference[];
  };
}

export interface GetUserPreferenceSuccessAction extends Action {
  type: typeof GET_USER_PREFERENCE_SUCCESS;
}

export interface GetUserPreferenceErrorAction extends FetchErrorAction {
  type: typeof GET_USER_PREFERENCE_FAILED;
}

export interface GetAllUserPreferenceAction extends Action {
  type: typeof GET_ALL_USER_PREFERENCES;
}

export interface GetAllUserPreferencesSuccessAction extends Action {
  type: typeof GET_ALL_USER_PREFERENCES_SUCCESS;
}

export type SetUserPreferenceActions =
  | SetUserPreferenceAction
  | SetUserPreferenceSuccessAction
  | SetUserPreferenceErrorAction;

export type GetUserPreferenceActions =
  | GetUserPreferenceAction
  | GetAllUserPreferenceAction
  | GetUserPreferenceSuccessAction
  | GetUserPreferenceErrorAction
  | ReceiveUserPreferenceAction
  | ReceiveAllUserPreferenceAction;
