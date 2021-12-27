import { getFormValues } from 'redux-form';

import { getAccountCountry } from 'ducks/account/selectors';
import { getExtendedCountry } from 'ducks/config/selectors';

import { FORM_NAMES } from 'config/adCreation';
import { MIN_PODCAST_BUDGET } from 'config/payments';

export const getPayments = state => state.payments;
export const getBudgetThresholds = state => {
  // FIXME(ASM-1124): For launch, we are determining the minimum podcast budget from the FE rather than config service. Post-launch, we should instead update config service and read that value.
  const defaultBudgetThresholds = getPayments(state).budgetThresholds;
  const accountCountryBudgetThresholds = getExtendedCountry(
    state,
    getAccountCountry(state),
  )?.currencyThresholds;
  const nonSpanPodcastMinBudget =
    accountCountryBudgetThresholds?.minPodcastBudget ||
    defaultBudgetThresholds.minPodcastBudget;
  return {
    ...defaultBudgetThresholds,
    ...accountCountryBudgetThresholds,
    minPodcastBudget: MIN_PODCAST_BUDGET,
  };
};
export const getFormatType = state =>
  getFormValues(FORM_NAMES.CREATIVE_FORMAT)(state);
export const getPaymentsErrorMessage = state => getPayments(state).error;
export const getPaymentDetails = state => getPayments(state).paymentDetails;
export const userHasPaymentsConnected = state =>
  getPayments(state).paymentsConnected;
