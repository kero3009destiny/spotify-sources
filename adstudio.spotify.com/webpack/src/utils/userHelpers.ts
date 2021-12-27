import { findKey, get } from 'lodash';

import { getBooleanFromString } from '@spotify-internal/adstudio-tape/lib/utils/helpers/stringHelpers';

import { Account } from 'ducks/account/types';
import { NICKNAMES_KEY } from 'ducks/accountManagement/types';
import {
  AdAccountMetadata,
  AdAccountNickname,
  UserPreference,
} from 'ducks/accounts/types';
import { CountryKey } from 'ducks/config/types';

import { NULL_ID } from 'config/userPreferences';

import { BffUserPreference } from 'types/common/state/api/accounts';

export function parseUserAccount(
  origAccount: Account,
  countriesByCountryCode: Partial<Record<CountryKey, string>> = {},
) {
  let account = origAccount;

  // don't attempt transformation if account is null or undefined
  if (!account) {
    return account;
  }

  // convert the country into its country code - may need to happen if the user
  // has already set up ther account. TODO delete this once data migration occurs
  // on backend
  const country = findKey(
    countriesByCountryCode,
    val => val === account.country,
  ) as CountryKey;
  if (!Object.keys(countriesByCountryCode).includes(account.country)) {
    account = {
      ...account,
      country: country || 'Other',
    };
  }

  return account;
}

// Inititalizes ad account preferences as undefined
export const initializeAccountPreferences = (
  accounts: Array<AdAccountMetadata>,
) => {
  return accounts.map(account => {
    return {
      ...account,
      adAccountPreferences: account.adAccountPreferences || undefined,
    };
  });
};

/**
 * Merges account preferences into accounts
 * @param {object[]} state  The array of current ad account objects
 * @param {object[]} preferences The array of current ad account preferences for all accounts
 * @param {String} accountId accountId that had preferences fetched
 * @returns {object[]} The array of current ad account objects containing account preferences as
 *  the adAccountPreferences property of each ad account object where such preferences were found.
 */

export const mergePreferencesToAccounts = (
  state: Array<AdAccountMetadata> = [],
  preferences: Array<BffUserPreference> = [] as Array<BffUserPreference>,
  accountId: string,
) => {
  let newState = state;
  if (state && state.length) {
    newState = state.map(account => {
      if (account.adAccountId === accountId) {
        const adAccountPreferences = preferences
          .filter(
            preference =>
              get(account, 'adAccountId') ===
              get(preference, 'key.adAccountId', ''),
          )
          .map(preference => {
            const key = get(preference, 'key.key');
            if (key) {
              return {
                [key]: getBooleanFromString(preference.value),
              };
            }
            return preference as UserPreference;
          })
          .reduce((prefs, preference) => {
            return {
              ...prefs,
              ...preference,
            };
          }, {});
        return {
          ...account,
          adAccountPreferences,
        };
      }
      return account;
    });
  }

  const nicknames: AdAccountNickname = getAccountsNicknames(preferences);
  // TODO: Refactor FN to use one loop instead.
  if (nicknames) {
    newState.forEach((account: AdAccountMetadata) => {
      const match = nicknames[account.adAccountId];
      if (match) {
        account.nickname = account.adAccountName;
        account.adAccountName = match;
      }
    });
  }
  return newState;
};

function getAccountsNicknames(
  preferences: Array<BffUserPreference>,
): AdAccountNickname {
  const NICK_NAMES_KEY = NICKNAMES_KEY;
  const [nicknames] = preferences.filter(preference => {
    const { key } = preference;
    return key.adAccountId === NULL_ID && key.key === NICK_NAMES_KEY;
  });

  return (nicknames && JSON.parse(nicknames.value!)) || {};
}
