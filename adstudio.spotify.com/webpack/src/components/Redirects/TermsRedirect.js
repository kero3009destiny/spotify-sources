import { connect } from 'react-redux';
import { get } from 'lodash';
import { branch, compose, renderComponent } from 'recompose';

import { getAccountCountry, isAccountFetching } from 'ducks/account/selectors';
import { getExtendedCountry } from 'ducks/config/selectors';

import LoadingPage from 'components/common/LoadingPage';

import ExternalRedirect from './ExternalRedirect';

import { DEFAULT_COUNTRY, DEFAULT_TERMS } from 'config/config';
import { routeFragmentRegEx } from 'config/routes';

import PropTypes from 'prop-types';

function mapStateToProps(state, ownProps) {
  const {
    defaultCountryCode = DEFAULT_COUNTRY,
    params: { countryCode },
    route: { redirectURL: baseRedirectURL },
  } = ownProps;
  let accountCountry = getAccountCountry(state) || '';
  if (!accountCountry || accountCountry === 'Other') {
    accountCountry = defaultCountryCode;
  }
  const targetCode = (countryCode && countryCode.length === 2
    ? countryCode
    : accountCountry
  ).toUpperCase();
  const termsCountry = get(
    getExtendedCountry(state, targetCode),
    'rules.terms',
    targetCode,
  );

  const mappedRedirectURL = baseRedirectURL.replace(
    routeFragmentRegEx.COUNTRY_CODE,
    (termsCountry || DEFAULT_TERMS).toLowerCase(),
  );

  return {
    fetching: isAccountFetching(state),
    redirectUrl: mappedRedirectURL,
  };
}

const TermsRedirect = compose(
  connect(mapStateToProps),
  branch(({ fetching }) => fetching, renderComponent(LoadingPage)),
)(ExternalRedirect);

TermsRedirect.propTypes = {
  defaultCountryCode: PropTypes.string,
};

export default TermsRedirect;
