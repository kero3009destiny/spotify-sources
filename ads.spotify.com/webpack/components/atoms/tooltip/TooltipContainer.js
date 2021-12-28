import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { UI_ACTIONS } from 'constants/ui-actions';

import * as Styled from './Tooltip.styled';

/**
 * Tooltip Container
 * Handles tooltip visibility logic
 * @param {string|null} className The component class name.
 * @param {string} action Action to trigger the tooltip, e.g hover.
 * @param {function} onChange Parent handler. Runs after tooltip state change.
 * @param {ReactElement} children Component's children.
 * @returns {ReactElement}
 */
const TooltipContainer = ({
  className = null,
  action = UI_ACTIONS.HOVER,
  onChange = () => {},
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const closeTooltip = () => setVisible(false);
  const openTooltip = () => setVisible(true);
  const toggleTooltip = () => setVisible(prev => !prev);

  const handlers = {
    hover: {
      onMouseEnter: openTooltip,
      onMouseLeave: closeTooltip,
      onFocus: openTooltip,
      onBlur: closeTooltip,
    },
    click: {
      onClick: toggleTooltip,
    },
  };
  const toogleActions = handlers[action] || handlers[UI_ACTIONS.HOVER];

  useEffect(() => {
    onChange(visible);
  }, [visible]);

  return (
    <Styled.Container
      className={className}
      visible={visible}
      {...toogleActions}
    >
      {children}
    </Styled.Container>
  );
};

TooltipContainer.propTypes = {
  /**
   * Default className prop
   */
  className: PropTypes.string,
  /**
   * Action to trigger the tooltip, e.g hover
   */
  action: PropTypes.string,
  /**
   * Parent handler. Runs after tooltip state change.
   */
  onChange: PropTypes.func,
  /**
   * The component's children.
   */
  children: PropTypes.node.isRequired,
};

export default TooltipContainer;
