import { RolePermissions } from '@spotify-internal/adstudio-shared/lib/config/permissions';

import { ColumnSelection } from 'ducks/columns/types';

import { AccountRole } from '../../config/account';

export const FETCH_USER_ACCOUNTS = 'FETCH_USER_ACCOUNTS';
export const FETCH_USER_ACCOUNTS_SUCCESS = 'FETCH_USER_ACCOUNTS_SUCCESS';
export const FETCH_USER_ACCOUNTS_FAILED = 'FETCH_USER_ACCOUNTS_FAILED';
export const FETCH_USER_ACCOUNTS_PREFERENCES_SUCCESS =
  'FETCH_USER_ACCOUNTS_PREFERENCES_SUCCESS';

export interface AccountPreferences {
  selectedLocale?: string;
  HAS_SCM_CAMPAIGN?: boolean;
  selectedColumns?: ColumnSelection;
  SELECTED_CAMPAIGN_COLUMNS?: ColumnSelection;
  SELECTED_FLIGHT_COLUMNS?: ColumnSelection;
  SELECTED_CREATIVE_COLUMNS?: ColumnSelection;
}

export interface UserPreference {
  key: {
    adAccountId: string;
    key: string;
  };
  value: string;
}

export interface AdAccountMetadata {
  adAccountId: string;
  adAccountName: string;
  role: AccountRole;
  userCount: number;
  permissions: Array<RolePermissions>;
  adAccountPreferences?: UserPreference | { [x: number]: any };
  nickname?: string;
  createdAt: string;
}

export interface AdAccountNickname {
  [key: string]: string;
}
