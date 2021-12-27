import { get } from 'lodash';
import { combineReducers, Reducer } from 'redux';

import {
  Account,
  ACCOUNT_COMPLIANCE_ALERT_STATUS,
  ACCOUNT_COMPLIANCE_STATUS,
  ACCOUNT_SELECTED,
  AccountState,
  CHANGE_ACCOUNT,
  FETCH_ACCOUNT_PREFERENCES_SUCCESS,
  FETCH_IS_SUPER_USER_ROLES_SUCCESS,
  FETCH_SUPER_USER_ROLES_FAILED,
  FETCH_USER_ACCOUNT_FAILED,
  SELECT_ACCOUNT_ID,
  SET_EXTERNAL_ID,
  SET_SHOULD_RETURN_TO_REVIEW_SCREEN,
  SET_USER_ACCOUNT,
  SuperUserData,
  UPDATE_ACTIVE_ACCOUNT_BUSINESS,
} from 'ducks/account/types';

import { mapSuperUserPerms } from 'utils/permissionsAdapter';
import { parseUserAccount } from 'utils/userHelpers';

export const account: Reducer<Account | null> = (state = null, action) => {
  switch (action.type) {
    case SET_USER_ACCOUNT:
      return {
        ...state,
        ...parseUserAccount(action.payload || {}, action.meta || {}),
      } as Account;
    case SET_EXTERNAL_ID:
      return { ...state, externalId: action.payload } as Account;
    case SELECT_ACCOUNT_ID:
    case CHANGE_ACCOUNT:
      // Clear the state if the account has changed, otherwise prefs may leak
      if (
        action.payload &&
        action.payload !== get(state, 'id', action.payload)
      ) {
        return {} as Account;
      }
      return state;
    case UPDATE_ACTIVE_ACCOUNT_BUSINESS:
      return {
        ...state,
        businessAddress: action.payload,
        vat: action.payload.taxId,
      } as Account;
    case FETCH_USER_ACCOUNT_FAILED:
      return null;
    case ACCOUNT_COMPLIANCE_STATUS:
      return { ...state, isCompliant: action.payload } as Account;
    case ACCOUNT_COMPLIANCE_ALERT_STATUS:
      return { ...state, complianceAttempt: action.payload } as Account;
    case SET_SHOULD_RETURN_TO_REVIEW_SCREEN:
      return {
        ...state,
        shouldReturnToReviewScreen: action.payload,
      } as Account;
    case FETCH_ACCOUNT_PREFERENCES_SUCCESS:
      // Merge in account prefs from storage or remote
      return {
        ...state,
        adAccountPreferences: {
          ...(state || {}).adAccountPreferences,
          ...action.payload,
        },
      } as Account;

    default:
      return state;
  }
};

export const accountSelected: Reducer<boolean> = (state = false, action) => {
  switch (action.type) {
    case ACCOUNT_SELECTED:
      return true;
    default:
      return state;
  }
};

export const error: Reducer<string | Error | null> = (state = null, action) => {
  switch (action.type) {
    case SET_USER_ACCOUNT:
      return null;
    case FETCH_USER_ACCOUNT_FAILED:
      return action.payload;
    default:
      return state;
  }
};

export const fetched: Reducer<boolean> = (state = false, action) => {
  switch (action.type) {
    case SET_USER_ACCOUNT:
    case FETCH_USER_ACCOUNT_FAILED:
      return true;
    default:
      return state;
  }
};

const defaultSuperUserRoles = {
  rolenames: [],
  permissions: [],
};

export const superUserRoles: Reducer<SuperUserData> = (
  state = defaultSuperUserRoles,
  action,
) => {
  switch (action.type) {
    case FETCH_IS_SUPER_USER_ROLES_SUCCESS:
      return mapSuperUserPerms(action.payload);
    case FETCH_SUPER_USER_ROLES_FAILED:
      return defaultSuperUserRoles;
    default:
      return state;
  }
};

export default combineReducers<AccountState>({
  account,
  accountSelected,
  error,
  fetched,
  superUserRoles,
});
