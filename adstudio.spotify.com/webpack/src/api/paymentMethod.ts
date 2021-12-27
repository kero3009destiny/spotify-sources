import { once } from 'lodash';
import { stringify } from 'query-string';

import { Account as AdAccount } from 'ducks/account/types';

import { webgateFetch } from 'api/webgate';

import { getURLParam, getURLParams } from 'utils/windowHelpers';

import { getEnvironmentConfig } from '../config/environment';

import { DEFAULT_LOCALE } from 'config/i18n';
import {
  CHECKOUT_ID_URL_PARAM,
  CHECKOUT_RETURN_STATUS_PARAM,
  CHECKOUT_RETURN_STATUS_SUCCESS,
  DEFAULT_FETCH_DETAILS_ERROR,
  DETAILS_CARD,
} from 'config/payments';

export async function getPaymentDetails(
  adAccount: AdAccount,
  selectedLocale: string = DEFAULT_LOCALE,
  market: string,
): Promise<TSFixMe> {
  const checkoutStatus = getURLParam(CHECKOUT_RETURN_STATUS_PARAM);
  const checkoutId = getURLParam(CHECKOUT_ID_URL_PARAM);

  // when the user returns with a valid checkout, we return a
  // static response to this method indicating that they just came
  // back from checkout, due to the async behavior of delivering card details
  if (checkoutStatus === CHECKOUT_RETURN_STATUS_SUCCESS && checkoutId) {
    return {
      type: DETAILS_CARD,
      detail: {
        checkoutId,
      },
    };
  }

  try {
    const env = await getEnvironmentConfig('env');
    const gtmHostPath = env === 'production' ? 'adsgtm' : 'adsgtm-sandbox';
    const resp = await webgateFetch(`${gtmHostPath}/v2/adyen/card`, {
      method: 'POST',
      body: JSON.stringify({
        adAccountId: adAccount.id,
        locale: selectedLocale,
        market: market || (adAccount.country || '').toLowerCase(),
      }),
    });
    switch (resp.status) {
      case 200:
        return await resp.json();

      // for pending, invalid, and no details, prompt the
      // user to add a card.
      case 404:
      case 406:
      case 204:
        return;

      // for unmapped status codes, throw
      default:
        throw new Error(await resp.text());
    }
  } catch (error) {
    throw new Error(error.message || DEFAULT_FETCH_DETAILS_ERROR);
  }
}

// add a singleton cache for the session's payment details, to share
// across all instances of the app
let _cachedGetPaymentDetails: TSFixMe;
export async function getCachedPaymentDetails(
  clearCache = false,
  adAccount: AdAccount,
  selectedLocale: string = DEFAULT_LOCALE,
  market: string,
): Promise<TSFixMe> {
  if (clearCache) {
    _cachedGetPaymentDetails = null;
  }

  if (!_cachedGetPaymentDetails) {
    _cachedGetPaymentDetails = once(() =>
      getPaymentDetails(adAccount, selectedLocale, market),
    );
  }

  return await _cachedGetPaymentDetails();
}

export interface CreateCheckoutParams {
  adAccount: AdAccount;
  adStudioUrl: string;
  selectedLocale: string;
  market: string;
  hierarchyDraftId?: string;
  cancelUrl?: string;
}

export async function createCheckout({
  adAccount,
  adStudioUrl,
  selectedLocale = DEFAULT_LOCALE,
  market,
  hierarchyDraftId,
  cancelUrl = adStudioUrl,
}: CreateCheckoutParams): Promise<TSFixMe> {
  const returnUrlQuery = stringify({
    ...getURLParams(),
    [CHECKOUT_RETURN_STATUS_PARAM]: CHECKOUT_RETURN_STATUS_SUCCESS,
    hierarchyDraftId: hierarchyDraftId ? hierarchyDraftId : undefined,
  });

  const returnUrl = `${adStudioUrl.split('?')[0]}?${returnUrlQuery}`;
  const env = await getEnvironmentConfig('env');
  const gtmHostPath = env === 'production' ? 'adsgtm' : 'adsgtm-sandbox';
  const createCheckoutUrl = `${gtmHostPath}/v2/checkout`;
  const payload = JSON.stringify({
    locale: selectedLocale,
    market: market || (adAccount.country || '').toLowerCase(),
    cancelUrl,
    returnUrl,
    adAccountId: adAccount.id,
  });
  const resp = await webgateFetch(createCheckoutUrl, {
    method: 'POST',
    body: payload,
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text);
  }

  return await resp.json();
}
