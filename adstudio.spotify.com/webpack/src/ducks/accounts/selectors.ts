import { AccountsState } from './reducer';

import { AdAccountMetadata } from './types';

export const getAccountsState = (state: TSFixMe): AccountsState =>
  state.accounts;
export const getAccounts = (state: TSFixMe): Array<AdAccountMetadata> =>
  getAccountsState(state).accounts;
export const getAccountById = (
  state: TSFixMe = [],
  adAccountId: string,
): AdAccountMetadata => {
  return (getAccounts(state) || [])
    .filter(account => account.adAccountId === adAccountId)
    .reduce(({}, account) => account, {}) as AdAccountMetadata;
};
