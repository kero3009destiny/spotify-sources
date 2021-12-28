import React from 'react';
import PropTypes from 'prop-types';

import * as Styled from './DropdownMenu.styled';

/**
 * DropdownMenu
 * Renders a DropdownMenu box with the content provided as a child.
 * @param {string|null} className The component class name.
 * @param {ReactElement} children The component's children.
 * @returns {ReactElement}
 */
const DropdownMenu = ({ className = null, children }) => (
  <Styled.DropdownMenu className={className}>{children}</Styled.DropdownMenu>
);

DropdownMenu.propTypes = {
  /**
   * Default className prop
   */
  className: PropTypes.string,
  /**
   * The component's children.
   */
  children: PropTypes.node.isRequired,
};

export default DropdownMenu;
