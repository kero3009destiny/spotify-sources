import React, { ReactElement, ReactNode } from 'react';

// FIXME: encore's tooltip does NOT work here, given how we need to have the
//        table scroll overflow horizontally. Tape's tooltip uses react-portal-tooltip.
//        we should consider an override in the encore local system that we build in the
//        future or otherwise reverse engineer its approach.
import { AlignedTooltips, Alignments } from './AlignedTooltip';
import { PaddedTableHeaderCell } from './TableHeaderCell';

export interface TableHeaderWithTooltipProps {
  children?: ReactNode;
  tooltipText?: string | ReactElement;
  align?: Alignments;
}

export function TableHeaderWithTooltip(props: TableHeaderWithTooltipProps) {
  const { children, tooltipText, align, ...rest } = props;

  return (
    <PaddedTableHeaderCell {...rest}>
      {tooltipText && (
        <AlignedTooltips
          icon={false}
          tooltipText={tooltipText}
          placement="top"
          align={align}
        >
          {children}
        </AlignedTooltips>
      )}
      {!tooltipText && <>{children}</>}
    </PaddedTableHeaderCell>
  );
}
