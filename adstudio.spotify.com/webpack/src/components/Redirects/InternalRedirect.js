import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { replace as replaceAC } from 'react-router-redux';
import { compose, withProps } from 'recompose';

import RedirectingPage from 'components/common/RedirectingPage';

import { mapPropsFromRoute } from 'utils/routeHelpers';

import PropTypes from 'prop-types';

export class InternalRedirect extends Component {
  componentWillMount() {
    const { location, redirectUrl, replace } = this.props;

    // dispatch a replace
    replace({ ...location, pathname: redirectUrl });
  }

  render() {
    return <RedirectingPage />;
  }
}

InternalRedirect.propTypes = {
  location: PropTypes.object.isRequired,
  redirectUrl: PropTypes.string.isRequired,
  replace: PropTypes.func.isRequired,
};

export default compose(
  connect(null, { replace: replaceAC }),
  // guarantees location will be present
  withRouter,
  // pull props off of the route to the main props.
  // this makes the component embeddable more easily.
  withProps(props => mapPropsFromRoute(props, ['redirectUrl'])),
)(InternalRedirect);
