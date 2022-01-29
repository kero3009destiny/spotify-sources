// ignore-string-externalization
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip, Type } from '@spotify-internal/encore-web-v3';
import styled from 'styled-components';

const TooltipWrapper = styled.div`
  pointer-events: none;
  position: fixed;
`;

export class ChartTooltip extends Component<$TSFixMe> {
  static propTypes = {
    screenWidth: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    tooltipWidth: PropTypes.number,
    children: PropTypes.node,
  };

  render() {
    const { screenWidth, x, y, tooltipWidth, children } = this.props;
    return (
      <TooltipWrapper style={{ top: y, left: x }}>
        <OverlayTrigger
          placement={
            x + tooltipWidth > screenWidth
              ? OverlayTrigger.left
              : OverlayTrigger.right
          }
          overlay={
            <Tooltip>
              <Type as="p" variant={Type.body2} condensed>
                {children}
              </Type>
            </Tooltip>
          }
        />
      </TooltipWrapper>
    );
  }
}
