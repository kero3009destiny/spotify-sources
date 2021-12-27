import React, { ReactElement, ReactNode } from 'react';
import i18n from 'i18next';
import styled from 'styled-components';

import { TableHeaderCell, TableSortIcon } from '@spotify-internal/encore-web';

import { AlignedTooltips, Alignments } from './AlignedTooltip';

import { BffSortDirection, SortDirection } from 'types/common/state/api';

const StyledTableHeaderCell = styled(TableHeaderCell)`
  cursor: pointer;
  padding: 12px 32px;
`;

export interface SortableTableHeaderProps<SortType> {
  children?: ReactNode;
  sortingDisabled?: boolean;
  sortKey: SortType;
  sortCriteria?: SortType;
  sortDirection?: BffSortDirection;
  onClick: (sortKey: SortType) => void;
  tooltipText?: string | ReactElement;
  align?: Alignments;
}

export function SortableTableHeader<T>(props: SortableTableHeaderProps<T>) {
  const {
    sortCriteria,
    sortKey,
    sortDirection,
    sortingDisabled,
    onClick,
    children,
    tooltipText,
    align,
    ...rest
  } = props;

  if (sortingDisabled) {
    // We assume sorting has been disabled because of date range selection
    // If we end up disabling sorting for other reasons, plz revisit.
    return (
      <TableHeaderCell
        align={align}
        data-test={`sort-disabled-${sortKey}`}
        {...rest}
      >
        <AlignedTooltips
          icon={false}
          tooltipText={`${i18n.t(
            'I18N_STATS_DISABLED_FOR_DATERANGE',
            'Sorting is not supported. Please reset to lifetime.',
          )}`}
          placement="top"
          align={align}
        >
          {children}
        </AlignedTooltips>
      </TableHeaderCell>
    );
  }

  const isActive = sortCriteria === sortKey;
  const direction = sortDirection === SortDirection.DESC ? 'down' : 'up';

  return (
    <StyledTableHeaderCell
      onClick={() => onClick(sortKey)}
      active={isActive}
      align={align}
      {...rest}
    >
      {tooltipText && (
        <AlignedTooltips
          icon={false}
          tooltipText={tooltipText}
          placement="top"
          align={align}
        >
          {isActive && <TableSortIcon direction={direction} />}
          {children}
        </AlignedTooltips>
      )}
      {!tooltipText && (
        <>
          {isActive && <TableSortIcon direction={direction} />}
          {children}
        </>
      )}
    </StyledTableHeaderCell>
  );
}
