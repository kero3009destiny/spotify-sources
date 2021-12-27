import { connect } from 'react-redux';
import { get } from 'lodash';

import { FormatMonetaryAmount } from '@spotify-internal/adstudio-shared';

import { CurrencyEntry, RegionEntry } from 'ducks/config/types';
import { getAccountCountry } from 'ducks/account/selectors';
import { getCurrencyObj, getExtendedCountry } from 'ducks/config/selectors';

import { DEFAULT_CURRENCY } from 'config/config';

type CurrencyObj = Omit<CurrencyEntry, 'category' | 'id'>;
const mapStateToProps = (
  state: TSFixMe = {},
  ownProps: TSFixMe,
): CurrencyObj => {
  const accountCountryCode = getAccountCountry(state)!;
  const accountCountry: RegionEntry = getExtendedCountry(
    state,
    accountCountryCode,
  );
  const accountCurrency = get(accountCountry, 'currencyCode', DEFAULT_CURRENCY);
  const currency = get(ownProps, 'code', accountCurrency);
  const currencyObj: CurrencyObj = getCurrencyObj(state, currency);
  // If this currency is not the account currency, but the ymbols match, then we need to tell the
  //  formatter to append the ISO code to remove ambiguity.
  if (accountCurrency !== currency) {
    const accountCurrencyObj: CurrencyObj = getCurrencyObj(
      state,
      accountCurrency,
    );
    if (
      accountCurrencyObj.symbol === currencyObj.symbol &&
      currencyObj.symbol !== currencyObj.code &&
      !currencyObj.useCodeAsSymbol
    ) {
      accountCurrencyObj.appendCurrencyCode = true;
      return accountCurrencyObj;
    }
  }

  return currencyObj;
};

const mergeProps = (mappedProps: any, _: any, ownProps: any) => {
  // make sure that the provided props override the connected one
  return {
    ...mappedProps,
    ...ownProps,
  };
};

export default connect(
  mapStateToProps,
  null,
  mergeProps,
)(FormatMonetaryAmount) as TSFixMe;
