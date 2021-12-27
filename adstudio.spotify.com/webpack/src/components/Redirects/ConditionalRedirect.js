import { omit } from 'lodash';
import { compose, defaultProps, mapProps } from 'recompose';

import ConditionalPassthrough from 'components/common/ConditionalPassthrough';
import InternalRedirect from 'components/Redirects/InternalRedirect';

import PropTypes from 'prop-types';

/**
 * redirect users away from the wrapped component if shouldRedirect is true.
 * <ConditionalRedirect redirectUrl="/browse-ads" shouldRedirect={userHasAdAccount}>
 *   <AdStudioApp />
 * </ConditionalRedirect>
 */
const ConditionalRedirect = compose(
  defaultProps({
    component: InternalRedirect,
  }),

  mapProps(origProps => ({
    ...omit(origProps, 'shouldRedirect'),
    shouldPassthrough: !origProps.shouldRedirect,
  })),
)(ConditionalPassthrough);

ConditionalRedirect.propTypes = {
  ...omit(ConditionalPassthrough.propTypes, 'shouldPassthrough'),
  redirectUrl: PropTypes.string.isRequired,
  shouldRedirect: PropTypes.bool.isRequired,
};

export default ConditionalRedirect;
