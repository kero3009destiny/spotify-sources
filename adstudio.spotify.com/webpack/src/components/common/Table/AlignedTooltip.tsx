import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

// FIXME: encore's tooltip does NOT work here, given how we need to have the
//        table scroll overflow horizontally. Tape's tooltip uses react-portal-tooltip.
//        we should consider an override in the encore local system that we build in the
//        future or otherwise reverse engineer its approach.
import { TooltipInfo } from '@spotify-internal/adstudio-tape';

export type Alignments = 'left' | 'center' | 'right' | undefined;
export interface AlignedTooltipsProps {
  children?: ReactNode;
  tooltipText?: string | ReactElement;
  icon: boolean;
  placement: string;
  align?: Alignments;
}

const StyledTooltipInfo = styled(TooltipInfo)<{
  alignment?: Alignments;
}>`
  justify-content: ${props => props.alignment || 'left'};
`;

export function AlignedTooltips(props: AlignedTooltipsProps) {
  const { children, tooltipText, icon, placement, align, ...rest } = props;
  const alignment = align || 'left';

  return (
    <StyledTooltipInfo
      icon={icon}
      tooltipText={tooltipText}
      placement={placement}
      alignment={alignment}
      {...rest}
    >
      {children}
    </StyledTooltipInfo>
  );
}
