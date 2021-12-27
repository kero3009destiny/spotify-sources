import { Action } from 'redux';

import { CountryKey } from 'ducks/config/types';

import { AccountAddress } from 'api/account';
import { GetSuperUserResponse } from 'api/user';

import { FetchErrorAction } from 'utils/asyncDucksHelpers';

import { AccountPreferences } from '../accounts/types';
import * as types from './types';

export interface SetUserAccountAction extends Action {
  payload: types.Account | null;
  meta: Record<CountryKey, string>;
}
export interface UpdateAccountBusinessAddressAction extends Action {
  payload: {
    accountId: string;
    accountAddress: AccountAddress;
    industry: string;
    businessType: string;
    taxId: string;
  };
}
export interface ChangeAccountAction extends Action {
  type: typeof types.CHANGE_ACCOUNT;
  payload: string;
}
export interface SetExternalIdAction extends Action {
  type: typeof types.SET_EXTERNAL_ID;
  payload: string;
}
export interface SelectAccountIdAction extends Action {
  type: typeof types.SELECT_ACCOUNT_ID;
  payload: string;
}
export interface AccountSelectionAction extends Action {
  type: typeof types.ACCOUNT_SELECTED;
}
export interface FetchUserAccountFailedAction extends FetchErrorAction {
  type: typeof types.FETCH_USER_ACCOUNT_FAILED;
}
export interface UpdateActiveAccountBusinessAddressAction extends Action {
  type: typeof types.UPDATE_ACTIVE_ACCOUNT_BUSINESS;
  payload: AccountAddress;
}
export interface FetchAccountPreferencesAction extends Action {
  type: typeof types.FETCH_ACCOUNT_PREFERENCES;
  payload: {
    accountId: string;
  };
}
export interface FetchAccountPreferencesSuccessAction extends Action {
  type: typeof types.FETCH_ACCOUNT_PREFERENCES_SUCCESS;
  payload: AccountPreferences;
}
export interface SetAccountPreferenceAction extends Action {
  type: typeof types.SET_ACCOUNT_PREFERENCE;
  payload: {
    accountId: string;
    preferenceName: string;
    accountPreference: TSFixMe;
  };
}
export interface FetchSuperUserRolesFailedAction extends FetchErrorAction {
  type: typeof types.FETCH_SUPER_USER_ROLES_FAILED;
}

export interface SetAccountComplianceStatusAction extends Action {
  type: typeof types.ACCOUNT_COMPLIANCE_STATUS;
  payload: boolean;
}

export interface SetAccountComplianceAlertStatusAction extends Action {
  type: typeof types.ACCOUNT_COMPLIANCE_ALERT_STATUS;
  payload: number;
}

export interface SetComplianceAttempt extends Action {
  type: typeof types.SET_COMPLIANCE_NOTIFICATION_LEVEL;
  payload: number;
}

export interface AcceptAPITermsAction extends Action {
  type: typeof types.ACCEPT_API_TERMS;
  payload: {
    accountId: string;
    organizationId: string;
  };
}
export interface SetShouldReturnToReviewScreen extends Action {
  type: typeof types.SET_SHOULD_RETURN_TO_REVIEW_SCREEN;
  payload: boolean;
}

export function setComplianceAttempt(
  complianceAttempt: number,
): SetComplianceAttempt {
  return {
    type: types.SET_COMPLIANCE_NOTIFICATION_LEVEL,
    payload: complianceAttempt,
  };
}

export function setUserAccount(
  account: types.Account | null,
  countriesByCountryCode: Record<CountryKey, string>,
): SetUserAccountAction {
  return {
    type: types.SET_USER_ACCOUNT,
    payload: account,
    meta: countriesByCountryCode,
  };
}

export function updateAdAccount(
  accountId: string,
  accountAddress: AccountAddress,
  industry: string,
  businessType: string,
  taxId: string,
): UpdateAccountBusinessAddressAction {
  return {
    type: types.UPDATE_ACCOUNT_BUSINESS,
    payload: {
      accountId,
      accountAddress,
      industry,
      businessType,
      taxId,
    },
  };
}

export function updateActiveAccountBusinessAddress(
  accountAddress: AccountAddress,
): UpdateActiveAccountBusinessAddressAction {
  return {
    type: types.UPDATE_ACTIVE_ACCOUNT_BUSINESS,
    payload: accountAddress,
  };
}

export function changeAccount(accountId: string): ChangeAccountAction {
  return {
    type: types.CHANGE_ACCOUNT,
    payload: accountId,
  };
}

export function setExternalId(externalId: string): SetExternalIdAction {
  return {
    type: types.SET_EXTERNAL_ID,
    payload: externalId,
  };
}

export function selectAccountId(accountId: string): SelectAccountIdAction {
  return {
    type: types.SELECT_ACCOUNT_ID,
    payload: accountId,
  };
}

export function accountSelected(): AccountSelectionAction {
  return {
    type: types.ACCOUNT_SELECTED,
  };
}

export function fetchUserAccountFailed(
  error: Response,
): FetchUserAccountFailedAction {
  return {
    type: types.FETCH_USER_ACCOUNT_FAILED,
    error: true,
    payload: error,
    meta: {
      response: error,
    },
  };
}

export function fetchAccountPreferences(
  accountId: string,
): FetchAccountPreferencesAction {
  return {
    type: types.FETCH_ACCOUNT_PREFERENCES,
    payload: { accountId },
  };
}

export function fetchAccountPreferencesSuccess(
  accountPreferences: AccountPreferences,
): FetchAccountPreferencesSuccessAction {
  return {
    type: types.FETCH_ACCOUNT_PREFERENCES_SUCCESS,
    payload: accountPreferences,
  };
}

export function setAccountPreference(
  accountId: string,
  preferenceName: string,
  accountPreference: TSFixMe,
): SetAccountPreferenceAction {
  return {
    type: types.SET_ACCOUNT_PREFERENCE,
    payload: { accountId, preferenceName, accountPreference },
  };
}

export function fetchSuperUserRolesSuccess(
  result: Partial<GetSuperUserResponse>,
) {
  return {
    type: types.FETCH_IS_SUPER_USER_ROLES_SUCCESS,
    payload: result,
  };
}

export function fetchSuperUserRolesFailed(
  error: Response,
): FetchSuperUserRolesFailedAction {
  return {
    type: types.FETCH_SUPER_USER_ROLES_FAILED,
    error: true,
    payload: error,
    meta: {
      response: error,
    },
  };
}

export function setAccountComplianceStatus(
  status: boolean,
): SetAccountComplianceStatusAction {
  return {
    type: types.ACCOUNT_COMPLIANCE_STATUS,
    payload: status,
  };
}

export function setAccountComplianceAlertStatus(
  alert: number,
): SetAccountComplianceAlertStatusAction {
  return {
    type: types.ACCOUNT_COMPLIANCE_ALERT_STATUS,
    payload: alert,
  };
}

export function acceptAPITerms(
  accountId: string,
  organizationId: string,
): AcceptAPITermsAction {
  return {
    type: types.ACCEPT_API_TERMS,
    payload: { accountId, organizationId },
  };
}

export function setShouldReturnToReviewScreen(
  bool: boolean,
): SetShouldReturnToReviewScreen {
  return {
    type: types.SET_SHOULD_RETURN_TO_REVIEW_SCREEN,
    payload: bool,
  };
}
