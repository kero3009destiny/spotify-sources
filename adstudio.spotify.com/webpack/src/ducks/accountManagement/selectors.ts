import { get, pick } from 'lodash';

import { createAccountDefaultState } from './reducer';

import { ACCESSES_ROLLING_WINDOW } from './constants';

import { UserInfo } from './types';

export const getUsers = (state: TSFixMe) =>
  get(state, 'accountManagement.users', []);

export const getAccessedAccounts = (state: TSFixMe) =>
  get(state, 'accountManagement.accessedAccounts', {});

export const getOwner = (state: TSFixMe) => {
  const users = getUsers(state);
  return users.find((user: UserInfo) => user.isOwner);
};

export const getReducedAccessedAccounts = (state: TSFixMe) =>
  // The state contains the number of accesses per ad-account keyed by day over a rolling
  // window.  The code below sums all the accesses into a single count per adAccountId

  // Firstly convert the object to an array for mapping and reducing
  Object.entries(getAccessedAccounts(state))
    .map(
      // @ts-ignore
      ([adAccountId, accessesMap = {}]: {
        adAccountId: string;
        accessMap: object;
      }) => ({
        [adAccountId]: Object.entries(accessesMap)
          // If the ducks reducer worked correctly, then we should never get anything outside our
          // window, but we do a filter here just in case.
          .filter(([day]) => parseInt(day, 10) < ACCESSES_ROLLING_WINDOW)
          // reduce to a single sum across all the days
          // @ts-ignore
          .reduce((acc, [, accesses]) => acc + accesses, 0),
      }),
    )
    // reduce back to an object
    .reduce(
      (acc, next) => ({
        ...acc,
        ...next,
      }),
      {},
    );

export const getCreateNewAdAccountState = (state: TSFixMe) =>
  pick(
    get(state, 'accountManagement', {}),
    Object.keys(createAccountDefaultState),
  );
