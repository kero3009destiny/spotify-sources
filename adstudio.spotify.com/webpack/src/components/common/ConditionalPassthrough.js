import React from 'react';
import { matchesProperty } from 'lodash';
import { branch, compose, renderComponent } from 'recompose';

import LoadingPage from 'components/common/LoadingPage';
import Passthrough from 'components/common/Passthrough';

import PropTypes from 'prop-types';

/**
 * render an alternative component if shouldPassthrough is false.
 * <ConditionalPassthrough component={AccountSetup} shouldPassthrough={userHasAdAccount}>
 *   <App />
 * </ConditionalPassthrough>
 */
const ConditionalPassthrough = compose(
  branch(matchesProperty('loading', true), renderComponent(LoadingPage)),
  branch(
    matchesProperty('shouldPassthrough', false),
    renderComponent(({ component: ShortCircuitComponent, ...props }) => (
      <ShortCircuitComponent {...props} />
    )),
  ),
)(Passthrough);

ConditionalPassthrough.propTypes = {
  component: PropTypes.any.isRequired,
  children: PropTypes.node,
  loading: PropTypes.bool.isRequired,
  shouldPassthrough: PropTypes.bool.isRequired,
};

export default ConditionalPassthrough;
