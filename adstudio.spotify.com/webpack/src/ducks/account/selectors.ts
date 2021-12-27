import { get, isEmpty } from 'lodash';
import { formValueSelector } from 'redux-form';

import { RolePermissions } from '@spotify-internal/adstudio-shared/lib/config/permissions';

import {
  CountryEntry,
  CountryKey,
  I18NEntry,
  RegionEntry,
} from 'ducks/config/types';
import { getAccounts } from 'ducks/accounts/selectors';
import { getIsAuthorized, isAuthorizedFetching } from 'ducks/auth/selectors';
import {
  getByBooleanRule,
  getCountryRestrictions,
  getExtendedCountry,
  hasCountryRestrictions,
} from 'ducks/config/selectors';

import { AccountAddress } from 'api/account';

import {
  isVideoCPCLEnabled,
  isVideoPassthroughEnabled,
} from 'utils/remoteconfig/remoteConfigHelpers';

import { ACCOUNT_PREFERENCE_KEYS, AD_ACCOUNT_STATUSES } from './constants';
import {
  ACCOUNT_REDUX_FORM_ID,
  ACCOUNT_ROLES,
  AccountRole,
} from 'config/account';
import { DEFAULT_COUNTRY } from 'config/config';

import { AccountPreferences } from '../accounts/types';
import { ColumnSelection } from '../columns/types';
import {
  Account,
  AccountState,
  StatePartialWithAccount,
  SuperUserRole,
} from './types';

export const getAccountState = (state: TSFixMe = {}): AccountState =>
  (state as StatePartialWithAccount).account;

export const isAccountFetching = (state: TSFixMe): boolean => {
  // we don't fetch account until we've confirmed the user is authorized.
  if (isAuthorizedFetching(state)) {
    return true;
  }

  // if we have fetch authorization and the user is marked as unauthorized,
  // we will never actually attempt to fetch the account.
  if (!getIsAuthorized(state)) {
    return false;
  }

  // use the actual value from the selector for authorized users.
  return !getAccountState(state).fetched;
};

export const isAccountSelected = (state: TSFixMe): boolean => {
  return getAccountState(state).accountSelected;
};

export const getAccount = (state: TSFixMe): Account =>
  (getAccountState(state) || ({} as Account)).account || ({} as Account);

export const getAccountId = (state: TSFixMe): string => getAccount(state).id;

export const getBusinessName = (state: TSFixMe): string =>
  getAccount(state).businessName;

export const getExternalId = (state: TSFixMe): string | undefined =>
  getAccount(state).externalId;

export const getAccountCountryAttributes = (state: TSFixMe): CountryEntry =>
  getAccount(state).countryAttributes;

export const getAccountCountry = (state: TSFixMe): CountryKey | undefined =>
  getAccount(state).countryAttributes &&
  getAccount(state).countryAttributes.countryCode;

export const getShouldReturnToReviewScreen = (
  state: TSFixMe,
): boolean | undefined => {
  return getAccount(state).shouldReturnToReviewScreen;
};

export const getAccountCurrency = (state: TSFixMe): string | undefined => {
  const countryAttributes = getAccountCountryAttributes(state);
  return (
    countryAttributes &&
    countryAttributes.countryCurrency &&
    countryAttributes.countryCurrency!.code
  );
};
// getAccountCountryCurrencyObj has been replaced by getCurrencyObject in ducks/config/selectors
// getCurrencyFormatterForAccount has been replaced by getCurrencyFormatter in
//  ducks/config/selectors

/**
 * Returns an array of country IDs of all the countries this account is not allowed to target.  For
 * a typical Ad Studio acoount, this would include 'AU' (only Australian and New Zealand
 * accounts can do so) and most Spanish-speaking Latin American countries, which can only be
 * targeted by select label advertisers for contractual reasons.
 * @param {object} state The state object
 * @returns {string[]} Array of country IDs that cannot be targeted by this account
 */
export const getExcludedCountries = (state: TSFixMe) => {
  return (
    Object.entries(getCountryRestrictions(state))
      // Remove any country that this account can target due to its own country
      .filter(([, value]) => {
        const restrictedCountryList = get(
          value,
          'byCountry',
          [] as CountryKey[],
        );
        if (isEmpty(restrictedCountryList)) return false;
        return !restrictedCountryList.includes(getAccountCountry(state)!);
      })
      .map(([key]) => key)
  );
};

/**
 * Returns truth of whether or not this account can target Active Audio markets.
 * @param {object} state The state object
 * @returns {boolean} Truth of whether or not active audio accounts can be targeted
 */
export const canTargetActiveAudio = (state: TSFixMe): boolean =>
  !!getByBooleanRule(state, 'hasActiveAudio')
    .map<CountryKey>(entry => entry.id as CountryKey)
    .filter(entry => !getExcludedCountries(state).includes(entry)).length;

export const videoIsEnabledForAccountCountry = (state: TSFixMe): boolean => {
  if (isVideoPassthroughEnabled()) return true; // Allow AMs to test video creation in AU, NZ, BR

  const country = getAccountCountry(state);
  if (!country) return false;

  if (isVideoCPCLEnabled()) {
    return country !== 'BR';
  }

  return !['AU', 'NZ', 'BR'].includes(country);
};

export const canAccessPodcastBooking = (state: TSFixMe): boolean => {
  const country = getAccountCountry(state)!;
  const maybeCountryConfig =
    hasCountryRestrictions(state, country) &&
    getCountryRestrictions(state)[country];
  if (!maybeCountryConfig) return false;
  return !!maybeCountryConfig.supportsPodcastBooking;
};

export const getAccountForm = formValueSelector(ACCOUNT_REDUX_FORM_ID);

export const getRole = (
  state: StatePartialWithAccount,
): AccountRole | undefined => {
  const account = getAccount(state);
  const adAccount = getAccounts(state).find(a => a.adAccountId === account.id);
  return adAccount && adAccount.role;
};

export const getSuperUserRoles = (state: TSFixMe): SuperUserRole[] => {
  const typedState = state as StatePartialWithAccount;
  return (
    (typedState.account &&
      typedState.account.superUserRoles &&
      typedState.account.superUserRoles.rolenames) ||
    []
  );
};

/* Super user roles */

export const isSuperAdmin = (state: TSFixMe): boolean =>
  getSuperUserRoles(state).includes(SuperUserRole.SUPER_ADMIN);

export const isSuperviewer = (state: TSFixMe): boolean =>
  getSuperUserRoles(state).includes(SuperUserRole.SUPERVIEWER);

/* Account-level roles */

export const isAdmin = (state: TSFixMe): boolean =>
  getRole(state) === ACCOUNT_ROLES.ADMIN;

export const isContributor = (state: TSFixMe): boolean =>
  getRole(state) === ACCOUNT_ROLES.CONTRIBUTOR;

export const isViewer = (state: TSFixMe): boolean =>
  getRole(state) === ACCOUNT_ROLES.VIEWER;

/* Inferred context from roles */

// Returns true if the logged-in user has any role on the account (not including super roles)
const hasRoleOnAccount = (state: TSFixMe): boolean =>
  isAdmin(state) || isContributor(state) || isViewer(state);

// Returns true if the logged-in user has super permissions, regardless of active account
export const isSuperUser = (state: TSFixMe): boolean =>
  isSuperAdmin(state) || isSuperviewer(state);

// Returns true if the active account has super perms (e.g. can view all advertiser's campaigns)
export const isSuperUserAccountActive = (state: TSFixMe): boolean =>
  isSuperUser(state) && isAdmin(state);

const isAccountLoaded = (state: TSFixMe): boolean =>
  !isEmpty(getAccount(state));

// Returns true if a super user is viewing an account on which they are not a user
export const isImpersonating = (state: TSFixMe): boolean =>
  isSuperUser(state) && isAccountLoaded(state) && !hasRoleOnAccount(state);

export const canCreate = (state: TSFixMe): boolean =>
  isAdmin(state) || isContributor(state);

export const getAccountPreferences = (
  state: TSFixMe,
): AccountPreferences | undefined => {
  const typedState = state as StatePartialWithAccount;
  return (
    typedState.account &&
    typedState.account.account! &&
    typedState.account.account?.adAccountPreferences
  );
};

export const getAccountPreference = (
  state: TSFixMe,
  preferenceName: keyof AccountPreferences,
): string | boolean | ColumnSelection | undefined => {
  const accountPreferences = getAccountPreferences(state);
  return accountPreferences && accountPreferences[preferenceName];
};
export const getHasSCMCampaign = (state: TSFixMe): boolean =>
  !!getAccountPreference(
    state,
    ACCOUNT_PREFERENCE_KEYS.HAS_SCM_CAMPAIGN as keyof AccountPreferences,
  ) || isSuperUser(state);

export const accountIsGreylisted = (state: TSFixMe): boolean =>
  get(state, 'account.account.adAccountStatus.type', 'ACTIVE') ===
  AD_ACCOUNT_STATUSES.Greylisted;

export const getPermissionsForAccount = (
  state: TSFixMe,
): Array<RolePermissions> => {
  const account = getAccount(state);
  return get(
    getAccounts(state).find(a => a.adAccountId === account.id),
    'permissions',
    [],
  );
};

export const getAccountCountryConfiguration = (
  state: TSFixMe,
): RegionEntry | undefined => {
  const country = getAccountCountry(state);
  if (!country) return undefined;
  return getExtendedCountry(state, country);
};

export const accountNeedsVAT = (state: TSFixMe): boolean => {
  return get(getAccountCountryConfiguration(state), 'vatNumberRequired', false);
};

export const videoCPCLIsEnabledForAccountCountry = (
  state: TSFixMe,
): boolean => {
  if (isVideoCPCLEnabled()) {
    return get(
      getAccountCountryConfiguration(state),
      'rules.videoCPCLEnabled',
      false,
    );
  }

  return false;
};

export const getAccountAddress = (state: TSFixMe): AccountAddress =>
  get(state, 'account.account.businessAddress', {});

export const getAccountComplianceStatus = (state: TSFixMe): boolean =>
  get(state, 'account.account.isCompliant', true);

export const getAccountVAT = (state: TSFixMe): string =>
  get(state, 'account.account.vat', {});

export const advertiserHasDraftImpersonation = (state: TSFixMe): boolean => {
  const account = getAccount(state);
  return account.advertiserHasDraftImpersonation;
};

export const getPermissionsForSuperUser = (
  state: TSFixMe,
): RolePermissions[] => {
  const typedState = state as StatePartialWithAccount;
  return (
    (typedState.account &&
      typedState.account.superUserRoles &&
      typedState.account.superUserRoles.permissions) ||
    []
  );
};

export const getVatDisplayName = (state: TSFixMe): I18NEntry => {
  const accountCountryAttributes = getAccountCountryAttributes(state);
  const accountCountry = getExtendedCountry(
    state,
    accountCountryAttributes?.countryCode || DEFAULT_COUNTRY,
  );
  return (
    accountCountry?.strings?.displayNameVAT || {
      key: 'I18N_ADS_ADDRESS_FORM_VAT_SECTION_LABEL',
      defaultValue: 'VAT Number',
    }
  );
};

export const getComplianceAttempts = (state: TSFixMe): number => {
  return get(state, 'account.account.complianceAttempt', 0);
};
