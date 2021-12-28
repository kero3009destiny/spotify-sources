import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { KEYCODES } from 'constants/keycodes';
import * as Styled from './DropdownMenu.styled';

/**
 * DropdownMenu Container
 * Handles DropdownMenu visibility logic
 * @param {string|null} className The component class name.
 * @param {ReactElement} children Component's children.
 * @param {Boolean} subNavFocused Flag to determine if SubNav is focused.
 * @param {Function} setSubNavFocused Function to change subNavFocused
 * @returns {ReactElement}
 */

const DropdownMenuContainer = ({
  className = null,
  children,
  subNavFocused,
  setSubNavFocused,
}) => {
  const containerRef = useRef(null);
  const openMenu = () =>
    subNavFocused ? setSubNavFocused(false) : setSubNavFocused(true);

  const closeMenu = e => {
    const isInsideContainer = containerRef.current.contains(e.relatedTarget);

    if (!isInsideContainer) setSubNavFocused(false);
  };

  const onKeyDown = e => {
    if (e.keyCode === KEYCODES.ESCAPE || e.keyCode === KEYCODES.ENTER) {
      setSubNavFocused(false);
    }
  };

  return (
    <Styled.Container
      ref={containerRef}
      subNavFocused={subNavFocused}
      onBlur={closeMenu}
      onKeyDown={onKeyDown}
      onClick={openMenu}
      className={className}
    >
      {children}
    </Styled.Container>
  );
};

DropdownMenuContainer.propTypes = {
  /**
   * Default className prop
   */
  className: PropTypes.string,
  /**
   * The component's children.
   */
  children: PropTypes.node.isRequired,
  /**
   * Flag to determine if SubNav is focused.
   */
  subNavFocused: PropTypes.bool.isRequired,
  /**
   * Function to change subNavFocused
   */
  setSubNavFocused: PropTypes.func.isRequired,
};

export default DropdownMenuContainer;
