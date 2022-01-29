// ignore-string-externalization
import React from 'react';
import {
  TableHeaderCell,
  TableSortIcon,
  ButtonIcon,
  IconHelpAlt,
  Tooltip,
} from '@spotify-internal/encore-web-v3';
import styled from 'styled-components';
import { useRtl } from '@mrkt/features/i18n/hooks/useRtl';
import { TooltipTrigger } from '@mrkt/features/TooltipTrigger';
import { SortOrder } from '../../utils';

export const StyledTableSortIcon = styled(TableSortIcon)<{
  invisible: boolean;
}>`
  visibility: ${({ invisible }) => (invisible ? 'hidden' : 'visible')};
`;

const StyledTableHeaderCell = styled(TableHeaderCell)`
  white-space: nowrap;
`;

const StyledSortButton = styled.button`
  background: none;
  border: none;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const StyledTooltipTrigger = styled(TooltipTrigger)<{
  isRtl: boolean;
}>`
  inset: ${props => (props.isRtl ? '4px 5px 0 0' : '4px 0 0 5px')};
`;

const StyledButtonIcon = styled(ButtonIcon)`
  margin-block-start: 25px;
`;

const WrappedTooltipContent = styled.span`
  min-inline-size: 300px;
  white-space: pre-wrap;
`;

enum SortOrderFullText {
  ascending = 'ascending',
  descending = 'descending',
}

type HeaderCellProps = {
  active?: boolean;
  align: 'left' | 'right' | 'center';
  children: React.ReactNode | string;
  className?: string;
  tooltipText?: string;
  tooltipId?: string;
  hideSortArrow: boolean;
  sortOrder: 'asc' | 'desc';
};

export function SortableTableHeaderCell(props: HeaderCellProps) {
  const {
    active,
    align = 'left',
    className,
    children,
    hideSortArrow,
    sortOrder = SortOrder.DESC,
    tooltipText,
    tooltipId,
    ...otherProps
  } = props;

  const sortOrderFullText =
    sortOrder === SortOrder.DESC
      ? SortOrderFullText.descending
      : SortOrderFullText.ascending;

  const sortIcon = (
    <StyledTableSortIcon
      data-testid="sort-icon"
      direction={sortOrder === SortOrder.DESC ? 'down' : 'up'}
      invisible={hideSortArrow}
    />
  );

  const rtl = useRtl();

  return (
    <StyledTableHeaderCell
      {...otherProps}
      active={active}
      align={align}
      aria-sort={sortOrderFullText}
      className={className}
      role="columnheader"
      selectable
    >
      <StyledSortButton>
        {align === 'right' && sortIcon}
        {children}
        {align !== 'right' && sortIcon}
        {tooltipText && (
          <StyledTooltipTrigger
            tooltip={
              <Tooltip id={tooltipId}>
                <WrappedTooltipContent>{tooltipText}</WrappedTooltipContent>
              </Tooltip>
            }
            tooltipId={`${children}-col-${tooltipId}`}
            isRtl={rtl}
            placement={rtl ? 'bottomLeft' : 'bottom'}
          >
            <StyledButtonIcon aria-labelledby="SavesColumnInfoIcon">
              <IconHelpAlt iconSize={16} />
            </StyledButtonIcon>
          </StyledTooltipTrigger>
        )}
      </StyledSortButton>
    </StyledTableHeaderCell>
  );
}
