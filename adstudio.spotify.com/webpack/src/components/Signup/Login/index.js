import React, { Component } from 'react';
import { connect } from 'react-redux';
import { window } from 'global';
import { parse } from 'query-string';

import {
  getIsAuthenticated,
  isAuthenticatedFetching,
} from 'ducks/auth/selectors';
import { getIsMobileDevice } from 'ducks/device/selectors';

import LoadingPage from 'components/common/LoadingPage';
import ExternalRedirect from 'components/Redirects/ExternalRedirect';

import SignupCard from '../Card';

import { getEnvironmentConfig } from 'config/environment';
import { routes } from 'config/routes';

import PropTypes from 'prop-types';

export class Login extends Component {
  state = {
    loginSuccess: false,
    forceRedirect: false,
  };

  async componentDidMount() {
    window.addEventListener('message', this.onWindowMessage);

    // determine if a force redirect should occur.
    const forceRedirect = await getEnvironmentConfig('disableIframeLogin');
    await this.setStateAsync(() => ({ forceRedirect }));
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.onWindowMessage);
  }

  onWindowMessage = e => {
    /*
     * Successful iframe login should trigger a redirect
     */
    if (e.data.type === 'LOGIN_CALLBACK_SUCCESS') {
      this.setState(() => ({ loginSuccess: true }));
    }
  };

  /**
   * helper to easily add async setState callbacks into async/await
   * TODO this should probably be in a separate class or in an
   * HOC or something
   */
  setStateAsync(state) {
    return new Promise(resolve => this.setState(state, resolve));
  }

  getContinueUrl = () => {
    return `${window.location.origin}${this.props.internalRedirectUrl}${window.location.search}`;
  };

  getAccountsUrl = () => {
    const continueToUrl = encodeURIComponent(this.getContinueUrl());

    return parse(window.location.search).signup
      ? `https://www.spotify.com/us/signup/?forward_url=${continueToUrl}`
      : `https://accounts.spotify.com/login?continue=${continueToUrl}`;
  };

  iframeRef = iframe => (this.iframe = iframe);

  render() {
    const { isMobile, isAuthenticated, isAuthFetching } = this.props;
    const { loginSuccess, forceRedirect } = this.state;
    const isUserAuthenticated = isAuthenticated && !isAuthFetching;
    const accountsUrl = this.getAccountsUrl();

    if (isAuthFetching) return <LoadingPage />;
    if (loginSuccess || isUserAuthenticated)
      return <ExternalRedirect replace redirectUrl={this.getContinueUrl()} />;
    if (isMobile || forceRedirect)
      return <ExternalRedirect replace redirectUrl={accountsUrl} />;

    return (
      <div className="signup-login-container">
        <SignupCard>
          <iframe
            data-test="signup-flow-login-iframe"
            ref={this.iframeRef}
            src={accountsUrl}
            className="signup-login-iframe"
            title="spotify-login"
          />
        </SignupCard>
      </div>
    );
  }
}

Login.propTypes = {
  internalRedirectUrl: PropTypes.string,
  isMobile: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  isAuthFetching: PropTypes.bool,
};

Login.defaultProps = {
  internalRedirectUrl: `${routes.ADSTUDIO_SIGNUP}${routes.NEW_SIGNUP_FORM}`,
};

function mapStateToProps(state) {
  return {
    isMobile: getIsMobileDevice(),
    isAuthenticated: getIsAuthenticated(state),
    isAuthFetching: isAuthenticatedFetching(state),
  };
}

export default connect(mapStateToProps)(Login);
