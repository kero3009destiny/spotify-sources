import i18n from 'i18next';

export const ACCOUNT_REDUX_FORM_ID = 'AccountForm';
export const DEVICE_HAS_AUTHENTICATED_WITH_AD_ACCOUNT =
  'hasAuthenticatedWithAdAccount';
// TODO: temporarily removed I18N while we properly fix passing values to be in English only
export const WORKING_FOR_OPTIONS = [
  'Ad agency',
  'Brand advertiser',
  'Music label',
  'Concert promoter',
  'Artist or manager',
];

export type AccountRole = 'admin' | 'contributor' | 'viewer';

export enum AccountRoleKey {
  ADMIN = 'ADMIN',
  CONTRIBUTOR = 'CONTRIBUTOR',
  VIEWER = 'VIEWER',
}

export const ACCOUNT_ROLES: Record<AccountRoleKey, AccountRole> = {
  ADMIN: 'admin',
  CONTRIBUTOR: 'contributor',
  VIEWER: 'viewer',
};

export const ROLE_LABELS: Record<AccountRole, string> = {
  viewer: i18n.t('I18N_ROLE_VIEWER', 'Viewer'),
  contributor: i18n.t('I18N_ROLE_CONTRIBUTOR', 'Contributor'),
  admin: i18n.t('I18N_ROLE_ADMIN', 'Admin'),
};
