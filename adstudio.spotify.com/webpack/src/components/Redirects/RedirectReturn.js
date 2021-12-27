import React, { Component } from 'react';
import { connect } from 'react-redux';

import { redirectFromStorage } from 'ducks/redirect/actions';

import RedirectingPage from 'components/common/RedirectingPage';

import PropTypes from 'prop-types';

export class RedirectReturn extends Component {
  componentWillMount() {
    this.props.dispatchRedirectFromStorage();
  }

  render() {
    return <RedirectingPage />;
  }
}

RedirectReturn.propTypes = {
  dispatchRedirectFromStorage: PropTypes.func.isRequired,
};

export default connect(null, {
  dispatchRedirectFromStorage: redirectFromStorage,
})(RedirectReturn);
