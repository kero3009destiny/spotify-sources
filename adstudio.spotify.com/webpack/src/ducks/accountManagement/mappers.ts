import get from 'lodash/get';

import { getRollingDayNumber } from 'utils/dateHelpers';

import { ACCESSED_ACCOUNTS_KEY, ACCESSES_ROLLING_WINDOW } from './constants';

const dayNumber = getRollingDayNumber(ACCESSES_ROLLING_WINDOW);
const nextDayNumber =
  dayNumber + 1 === ACCESSES_ROLLING_WINDOW ? 0 : dayNumber + 1;

export const mapAccountChange = (state: TSFixMe, adAccountId: string) => ({
  ...state.accessedAccounts,
  // @ts-ignore
  [adAccountId]: {
    // @ts-ignore
    ...state.accessedAccounts[adAccountId],
    // @ts-ignore
    [dayNumber]:
    // @ts-ignore
      get(state, `accessedAccounts.${adAccountId}.${dayNumber}`, 0) + 1,
  },
});

export const mapAccountAccesses = (
  state: TSFixMe,
  { preferences = [] }: { preferences: TSFixMe },
) => ({
  ...preferences
    .filter(
      (preference: TSFixMe) =>
        get(preference, 'key.key', '') === ACCESSED_ACCOUNTS_KEY,
    )
    .reduce(
      (outerAcc: TSFixMe, outerNext: TSFixMe) => ({
        ...outerAcc,
        // The following palaver is to ensure that we zero out a given day within the 90 days
        // rolling window if it's up next
        [outerNext.key.adAccountId]: Object.entries(JSON.parse(outerNext.value))
          .filter(
            ([day, accessCount]) =>
              parseInt(day, 10) >= 0 &&
              parseInt(day, 10) < ACCESSES_ROLLING_WINDOW &&
              typeof accessCount === 'number',
          )
          .map(([day, accessCount]) => [
            day,
            parseInt(day, 10) === nextDayNumber ? 0 : accessCount,
          ])
          .reduce(
            (innerAcc, [key, value]) => ({
              ...innerAcc,
              // @ts-ignore
              [key]: value,
            }),
            {},
          ),
      }),
      {},
    ),
  ...state.accessedAccounts,
});
