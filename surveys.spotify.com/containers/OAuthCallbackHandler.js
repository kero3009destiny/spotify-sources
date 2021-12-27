import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getOauthCallbackTokens } from '../lib/auth';

export default class OAuthCallbackHandler extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      returnUrl: null,
    };
  }

  componentDidMount() {
    const { onAuthError, onAuthorized } = this.props;

    getOauthCallbackTokens().then(tokenInfo => {
      onAuthorized(tokenInfo);
      this.setState({
        returnUrl: tokenInfo.state.return_url,
      });
    }, onAuthError);
  }

  render() {
    const { returnUrl } = this.state;

    if (returnUrl) {
      return <Redirect to={returnUrl} />;
    }

    return <noscript />;
  }
}

OAuthCallbackHandler.propTypes = {
  match: PropTypes.object.isRequired,
  onAuthError: PropTypes.func.isRequired,
  onAuthorized: PropTypes.func.isRequired,
};



// WEBPACK FOOTER //
// ./src/containers/OAuthCallbackHandler.js