import { Action } from 'redux';

import { FetchErrorAction } from 'utils/asyncDucksHelpers';

import * as types from './types';
import { BffUserPreference } from 'types/common/state/api/accounts';

export interface FetchUserAccountsStartAction extends Action {
  type: typeof types.FETCH_USER_ACCOUNTS;
}
export interface FetchUserAccountsSuccessAction extends Action {
  type: typeof types.FETCH_USER_ACCOUNTS_SUCCESS;
  payload: Array<types.AdAccountMetadata>;
}
export interface FetchUserAccountsFailedAction extends FetchErrorAction {
  type: typeof types.FETCH_USER_ACCOUNTS_FAILED;
}
export interface FetchUserAccountsPreferencesSuccessAction extends Action {
  type: typeof types.FETCH_USER_ACCOUNTS_PREFERENCES_SUCCESS;
  payload: {
    preferences: Array<BffUserPreference>;
    accountId: string;
  };
}

export type FetchUserAccountsAction =
  | FetchUserAccountsSuccessAction
  | FetchUserAccountsFailedAction
  | FetchUserAccountsPreferencesSuccessAction;

export function fetchUserAccounts(): FetchUserAccountsStartAction {
  return {
    type: types.FETCH_USER_ACCOUNTS,
  };
}

export function fetchUserAccountsSuccess(
  accounts: Array<types.AdAccountMetadata>,
): FetchUserAccountsSuccessAction {
  return {
    type: types.FETCH_USER_ACCOUNTS_SUCCESS,
    payload: accounts,
  };
}

export function fetchUserAccountsFailed(
  response: Response,
): FetchUserAccountsFailedAction {
  return {
    type: types.FETCH_USER_ACCOUNTS_FAILED,
    error: true,
    payload: response,
    meta: {
      response,
    },
  };
}

export function fetchUserAccountsPreferencesSuccess(
  accountsPreferences: Array<BffUserPreference>,
  accountId: string,
): FetchUserAccountsPreferencesSuccessAction {
  return {
    type: types.FETCH_USER_ACCOUNTS_PREFERENCES_SUCCESS,
    payload: { preferences: accountsPreferences, accountId: accountId },
  };
}
