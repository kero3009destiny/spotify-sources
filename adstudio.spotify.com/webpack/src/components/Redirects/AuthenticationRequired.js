import React from 'react';
import { connect } from 'react-redux';
import { window } from 'global';

import {
  getHasLoginError,
  getIsAuthenticated,
  isAuthenticatedFetching,
} from 'ducks/auth/selectors';

import ConditionalRedirect from 'components/Redirects/ConditionalRedirect';
import ExternalRedirect from 'components/Redirects/ExternalRedirect';
import InternalRedirect from 'components/Redirects/InternalRedirect';

import { routes } from 'config/routes';

import PropTypes from 'prop-types';

export const AuthenticationRequired = ({ error, ...props }) => {
  if (error) {
    return <InternalRedirect redirectUrl={routes.HOME} />;
  }

  return (
    <ConditionalRedirect
      redirectUrl={`https://accounts.spotify.com/?continue=${window.location.href}`}
      {...props}
    />
  );
};

AuthenticationRequired.defaultProps = {
  component: ExternalRedirect,
};

AuthenticationRequired.propTypes = {
  ...ConditionalRedirect.propTypes,
  component: PropTypes.any,
  redirectUrl: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    error: getHasLoginError(state),
    loading: isAuthenticatedFetching(state),
    shouldRedirect: !getIsAuthenticated(state),
  };
}

export default connect(mapStateToProps)(AuthenticationRequired);
