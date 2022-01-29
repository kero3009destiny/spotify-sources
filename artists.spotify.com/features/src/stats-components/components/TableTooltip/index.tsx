// ignore-string-externalization
import React from 'react';
import styled from 'styled-components';
import { Tooltip } from '@spotify-internal/encore-web-v3';

type TooltipContainerProps = {
  top: number;
  left: number;
};

type TableTooltipProps = {
  tooltipText: string;
  top: number;
  left: number;
};

const MAX_TOOLTIP_WIDTH = 300;

const TooltipContainer = styled.div<TooltipContainerProps>`
  position: absolute;
  pointer-events: none;
  top: ${props => props.top}px;
  left: ${props =>
    Math.min(props.left, window.innerWidth - MAX_TOOLTIP_WIDTH / 2)}px;
  font-feature-settings: normal;
  transform: translate(-50%, -100%);
  white-space: nowrap;
  z-index: 1000;
`;

const StyledTooltip = styled(Tooltip)`
  max-width: ${MAX_TOOLTIP_WIDTH}px;
`;

export function TableTooltip({ tooltipText, top, left }: TableTooltipProps) {
  return (
    <TooltipContainer top={top} left={left}>
      <StyledTooltip>{tooltipText}</StyledTooltip>
    </TooltipContainer>
  );
}
