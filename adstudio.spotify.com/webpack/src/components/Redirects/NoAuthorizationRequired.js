import React from 'react';
import { connect } from 'react-redux';

import { getIsAuthorized, isAuthorizedFetching } from 'ducks/auth/selectors';

import ConditionalRedirect from 'components/Redirects/ConditionalRedirect';

import { routes } from 'config/routes';

import PropTypes from 'prop-types';

export const NoAuthorizationRequired = props => (
  <ConditionalRedirect {...props} />
);

NoAuthorizationRequired.defaultProps = {
  redirectUrl: routes.DASHBOARD,
};

NoAuthorizationRequired.propTypes = {
  ...ConditionalRedirect.propTypes,
  component: PropTypes.any,
  redirectUrl: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    loading: isAuthorizedFetching(state),
    shouldRedirect: getIsAuthorized(state),
  };
}

export default connect(mapStateToProps)(NoAuthorizationRequired);
