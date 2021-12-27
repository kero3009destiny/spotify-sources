import { combineReducers, Reducer } from 'redux';

import {
  AdAccountMetadata,
  FETCH_USER_ACCOUNTS,
  FETCH_USER_ACCOUNTS_FAILED,
  FETCH_USER_ACCOUNTS_PREFERENCES_SUCCESS,
  FETCH_USER_ACCOUNTS_SUCCESS,
} from 'ducks/accounts/types';
import {
  FetchUserAccountsAction,
  FetchUserAccountsPreferencesSuccessAction,
} from './actions';

import { mapPermissionsPerAccount } from 'utils/permissionsAdapter';
import {
  initializeAccountPreferences,
  mergePreferencesToAccounts,
} from 'utils/userHelpers';

export interface AccountsState {
  accounts: Array<AdAccountMetadata>;
  error: string | Error | undefined | null;
  fetched: boolean;
}

export const accounts: Reducer<
  Array<AdAccountMetadata>,
  FetchUserAccountsAction
> = (state = [], action) => {
  switch (action.type) {
    case FETCH_USER_ACCOUNTS_SUCCESS:
      return initializeAccountPreferences(
        mapPermissionsPerAccount(action.payload),
      );
    case FETCH_USER_ACCOUNTS_PREFERENCES_SUCCESS:
      return mergePreferencesToAccounts(
        state,
        (action as FetchUserAccountsPreferencesSuccessAction).payload
          .preferences,
        (action as FetchUserAccountsPreferencesSuccessAction).payload.accountId,
      );
    case FETCH_USER_ACCOUNTS_FAILED:
      return [];
    default:
      return state;
  }
};

export const error: Reducer<string | Error | undefined | null> = (
  state = null,
  action,
) => {
  switch (action.type) {
    case FETCH_USER_ACCOUNTS:
      return null;
    case FETCH_USER_ACCOUNTS_FAILED:
      return action.payload;
    default:
      return state;
  }
};

export const fetched: Reducer<boolean> = (state = false, action) => {
  switch (action.type) {
    case FETCH_USER_ACCOUNTS:
    case FETCH_USER_ACCOUNTS_FAILED:
      return true;
    default:
      return state;
  }
};

export default combineReducers<AccountsState>({
  accounts,
  error,
  fetched,
});
