import React from 'react';
import PropTypes from 'prop-types';

import * as Styled from './Tooltip.styled';

/**
 * Tooltip
 * Renders a tooltip box with the content provided as a child.
 * @param {string|null} className The component class name.
 * @param {ReactElement} children The component's children.
 * @returns {ReactElement}
 */
const Tooltip = ({ className = null, children }) => (
  <Styled.Tooltip className={className}>{children}</Styled.Tooltip>
);

Tooltip.propTypes = {
  /**
   * Default className prop
   */
  className: PropTypes.string,
  /**
   * The component's children.
   */
  children: PropTypes.node.isRequired,
};

export default Tooltip;
