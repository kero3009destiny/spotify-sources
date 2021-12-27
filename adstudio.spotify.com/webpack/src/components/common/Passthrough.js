import React from 'react';

import PropTypes from 'prop-types';

export const Passthrough = ({ children, wrapperElement = 'div' }) => {
  if (Array.isArray(children)) {
    return React.createElement(wrapperElement, null, children);
  }

  return children;
};

Passthrough.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
  ]),

  wrapperElement: PropTypes.string,
};

export default Passthrough;
