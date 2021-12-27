import React from 'react';
import { connect } from 'react-redux';

import { getIsRedirecting } from 'ducks/redirect/selectors';

import Passthrough from 'components/common/Passthrough';
import RedirectingPage from 'components/common/RedirectingPage';

import PropTypes from 'prop-types';

export function RedirectingWrapper({ children, isRedirecting }) {
  if (isRedirecting) return <RedirectingPage />;
  return <Passthrough>{children}</Passthrough>;
}

RedirectingWrapper.propTypes = {
  isRedirecting: PropTypes.bool,
  children: PropTypes.node,
};

function mapStateToProps(state) {
  return {
    isRedirecting: getIsRedirecting(state),
  };
}

export default connect(mapStateToProps)(RedirectingWrapper);
