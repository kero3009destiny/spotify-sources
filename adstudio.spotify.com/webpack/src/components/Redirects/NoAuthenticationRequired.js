import React from 'react';
import { connect } from 'react-redux';

import {
  getIsAuthenticated,
  isAuthenticatedFetching,
} from 'ducks/auth/selectors';

import ConditionalRedirect from 'components/Redirects/ConditionalRedirect';

import { routes } from 'config/routes';

import PropTypes from 'prop-types';

export const NoAuthenticationRequired = props => (
  <ConditionalRedirect {...props} />
);

NoAuthenticationRequired.defaultProps = {
  redirectUrl: routes.DASHBOARD,
};

NoAuthenticationRequired.propTypes = {
  ...ConditionalRedirect.propTypes,
  component: PropTypes.any,
  redirectUrl: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    loading: isAuthenticatedFetching(state),
    shouldRedirect: getIsAuthenticated(state),
  };
}

export default connect(mapStateToProps)(NoAuthenticationRequired);
