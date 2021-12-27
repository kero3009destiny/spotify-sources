import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { get } from 'lodash';
import { compose } from 'recompose';

import {
  logFBAction as logFBActionAC,
  logTaggableAction as logTaggableActionAC,
} from 'ducks/analytics/actions';

import ConfirmationPage from 'components/common/ConfirmationPage';
import ExternalRedirect from 'components/Redirects/ExternalRedirect';

import { SIGNUP_COMPLETE_VERIFICATION } from 'config/googleTagManager';
import {
  DEFAULT_CONFIRMATION_STATUS,
  SIGNUP_CONFIRMATION,
  SIGNUP_STATUSES,
} from 'config/signup';

import PropTypes from 'prop-types';

export class SignupConfirmation extends Component {
  static propTypes = {
    logFBAction: PropTypes.func.isRequired,
    logTaggableAction: PropTypes.func.isRequired,
    router: PropTypes.object,
  };

  componentDidMount() {
    const {
      gtmTag = SIGNUP_COMPLETE_VERIFICATION,
    } = this.getConfirmationConfig();
    this.props.logFBAction('Lead');
    this.props.logTaggableAction(gtmTag, {});
  }

  getConfirmationConfig() {
    const signupStatus = get(this.props, 'router.location.query.signupStatus');
    const country = get(this.props, 'router.location.query.country');

    // BREXIT FLAG
    if (
      country === 'GB' &&
      signupStatus === SIGNUP_STATUSES.VERIFICATION_REQUIRED
    ) {
      return SIGNUP_CONFIRMATION.VERIFICATION_REQUIRED_BREXIT;
    }

    return get(
      SIGNUP_CONFIRMATION,
      signupStatus,
      SIGNUP_CONFIRMATION[DEFAULT_CONFIRMATION_STATUS],
    );
  }

  render() {
    const signupStatus = get(this.props, 'router.location.query.signupStatus');
    const {
      redirect,
      header,
      showCta,
      subcopy = () => {},
    } = this.getConfirmationConfig();

    // hard redirect to reload roles
    if (redirect) return <ExternalRedirect replace redirectUrl={redirect} />;

    return (
      <ConfirmationPage
        header={header}
        subcopy={subcopy}
        showCta={showCta}
        className={signupStatus}
      />
    );
  }
}

export default compose(
  connect(null, {
    logFBAction: logFBActionAC,
    logTaggableAction: logTaggableActionAC,
  }),

  withRouter,
)(SignupConfirmation);
