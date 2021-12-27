import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { goBack as goBackHistoryAC } from 'react-router-redux';
import { window } from 'global';
import i18n from 'i18next';
import { compose, withProps } from 'recompose';
import { bindActionCreators } from 'redux';

import { setRedirecting as setRedirectingAC } from 'ducks/redirect/actions';
import { triggerHardRedirect as triggerHardRedirectAC } from 'ducks/window/actions';

import RedirectingPage from 'components/common/RedirectingPage';

import { wait } from 'utils/asyncHelpers';
import { mapPropsFromRoute } from 'utils/routeHelpers';

import PropTypes from 'prop-types';

// wait in ms between dispatching the back action and dispatching the hard redirect
const REDIRECT_SLEEP = 1;

export class ExternalRedirect extends Component {
  async componentDidMount() {
    const {
      goBackHistory,
      redirectUrl,
      replace,
      onRedirectAction,
      setRedirecting,
      triggerHardRedirect,
      localizedUrls,
    } = this.props;

    const selectedLocale = i18n.language;
    // follow-up action if you've used an action creator in your
    if (typeof onRedirectAction === 'function') {
      onRedirectAction();
    }

    // show redirect overlay on top of the whole app for the duration of the action
    setRedirecting(true);

    // go back to avoid a back wall, if this isn't the first route of the session
    if (replace && window.history.state) {
      goBackHistory();
    }

    // wait for the back action to propagate
    await wait(REDIRECT_SLEEP);

    const finalUrl =
      localizedUrls && localizedUrls[selectedLocale]
        ? localizedUrls[selectedLocale]
        : redirectUrl;

    // trigger the hard redirect in the next tick
    triggerHardRedirect(finalUrl);
  }

  render() {
    return <RedirectingPage />;
  }
}

ExternalRedirect.defaultProps = {
  replace: true,
  route: {},
};

ExternalRedirect.propTypes = {
  goBackHistory: PropTypes.func.isRequired,
  redirectUrl: PropTypes.string.isRequired,
  onRedirectAction: PropTypes.func,
  route: PropTypes.object,
  location: PropTypes.shape({
    state: PropTypes.string.isRequired,
  }).isRequired,
  replace: PropTypes.bool,
  setRedirecting: PropTypes.func.isRequired,
  triggerHardRedirect: PropTypes.func.isRequired,
  localizedUrls: PropTypes.object,
};

export default compose(
  // guarantees location will be present
  withRouter,
  // pull props off of the route to the main props.
  // this makes the component embeddable more easily.
  withProps(props =>
    mapPropsFromRoute(props, [
      'redirectUrl',
      'onRedirectAction',
      'localizedUrls',
    ]),
  ),

  connect(null, (dispatch, ownProps) =>
    bindActionCreators(
      {
        goBackHistory: goBackHistoryAC,
        onRedirectAction: ownProps.onRedirectAction,
        setRedirecting: setRedirectingAC,
        triggerHardRedirect: triggerHardRedirectAC,
      },

      dispatch,
    ),
  ),
)(ExternalRedirect);
