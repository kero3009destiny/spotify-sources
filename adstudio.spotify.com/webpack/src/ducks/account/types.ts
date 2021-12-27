import { RolePermissions } from '@spotify-internal/adstudio-shared/lib/config/permissions';

import { CountryEntry, CountryKey } from 'ducks/config/types';

import { AccountAddress } from 'api/account';

import { AccountPreferences } from '../accounts/types';

export const ACCEPT_API_TERMS = 'ACCEPT_API_TERMS';
export const SET_USER_ACCOUNT = 'SET_USER_ACCOUNT';
export const SET_EXTERNAL_ID = `SET_EXTERNAL_ID`;
export const CHANGE_ACCOUNT = 'CHANGE_ACCOUNT';
export const SELECT_ACCOUNT_ID = 'SELECT_ACCOUNT_ID';
export const ACCOUNT_SELECTED = 'ACCOUNT_SELECTED';
export const ACCOUNT_COMPLIANCE_STATUS = 'ACCOUNT_COMPLIANCE_STATUS';
export const ACCOUNT_COMPLIANCE_ALERT_STATUS =
  'ACCOUNT_COMPLIANCE_ALERT_STATUS';
export const UPDATE_ACCOUNT_BUSINESS = 'UPDATE_ACCOUNT_BUSINESS';
export const UPDATE_ACTIVE_ACCOUNT_BUSINESS = 'UPDATE_ACTIVE_ACCOUNT_BUSINESS';
export const SET_COMPLIANCE_NOTIFICATION_LEVEL =
  'SET_COMPLIANCE_NOTIFICATION_LEVEL';

export const FETCH_USER_ACCOUNT_FAILED = 'FETCH_USER_ACCOUNT_FAILED';
export const FETCH_ACCOUNT_PREFERENCES = 'FETCH_ACCOUNT_PREFERENCES';
export const FETCH_ACCOUNT_PREFERENCES_SUCCESS =
  'FETCH_ACCOUNT_PREFERENCES_SUCCESS';
export const SET_ACCOUNT_PREFERENCE = 'SET_ACCOUNT_PREFERENCE';
export const FETCH_IS_SUPER_USER_ROLES_SUCCESS =
  'FETCH_IS_SUPER_USER_ROLES_SUCCESS';
export const FETCH_SUPER_USER_ROLES_FAILED = 'FETCH_SUPER_USER_ROLES_FAILED';
export const SET_SHOULD_RETURN_TO_REVIEW_SCREEN =
  'SET_SHOULD_RETURN_TO_REVIEW_SCREEN';

export enum SuperUserRole {
  SUPER_ADMIN = 'admin',
  SUPERVIEWER = 'superviewer',
}

export interface AccountState {
  account: Account | null;
  accountSelected: boolean;
  error: string | Error | null;
  fetched: boolean;
  superUserRoles: {
    permissions: RolePermissions[];
    rolenames: SuperUserRole[];
  };
}

// TODO: Can be swapper out if we ever consolidate one big state object
export interface StatePartialWithAccount {
  account: AccountState;
}

export interface Account {
  adAccountPreferences?: AccountPreferences;
  id: string;
  businessName: string;
  businessWebsite?: string;
  businessEmail: string;
  businessAddress?: AccountAddress;
  industry: string;
  businessType?: string;
  country: CountryKey;
  emailSubscribe: boolean;
  vat?: string;
  iamDomain: string;
  countryAttributes: CountryEntry;
  adAccountStatus: TSFixMe;
  externalId?: string;
  advertiserHasDraftImpersonation: boolean;
  timezoneOffsetMillis: number;
  isCompliant?: boolean;
  complianceAttempt?: number;
  shouldReturnToReviewScreen?: boolean;
}

export interface SuperUserData {
  rolenames: Array<SuperUserRole>;
  permissions: Array<RolePermissions>;
}
