import React from 'react';
import { connect } from 'react-redux';

import { accountIsGreylisted as accountIsGreylistedSelector } from 'ducks/account/selectors';

import ConditionalRedirect from './ConditionalRedirect';

import { routes } from 'config/routes';

import PropTypes from 'prop-types';

export const GreylistRedirect = props => <ConditionalRedirect {...props} />;

GreylistRedirect.defaultProps = {
  redirectUrl: routes.GREYLISTED,
};

GreylistRedirect.propTypes = {
  shouldRedirect: PropTypes.bool.isRequired,
  redirectUrl: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    shouldRedirect: accountIsGreylistedSelector(state),
  };
}

export default connect(mapStateToProps)(GreylistRedirect);
