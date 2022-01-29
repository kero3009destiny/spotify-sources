// ignore-string-externalization
/* eslint no-nested-ternary: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableHeaderCell,
  TableRow,
  TableCell,
  TableThumbnail,
  TableContainer,
} from '@spotify-internal/encore-web-v3';
import styled from 'styled-components';
import { SortableTableHeaderCell } from '../SortableTableHeaderCell';
import { SortOrder, formattedTitleTextAccessorFunction } from '../../utils';
import { TableTooltip } from '../TableTooltip';

const StyledTableRow = styled(TableRow)<{ clickable: boolean }>`
  cursor: ${props => (props.clickable ? 'pointer' : 'default')};
  &:focus {
    outline: none;
  }
`;

const StyledTableCell = styled(TableCell)`
  opacity: ${props => props.disabled && '0.3'};
  cursor: ${props => props.disabled && 'default'};
`;

const StyledTableContainer = styled(TableContainer)`
  /* this keeps table header tooltips from being cropped on tables with only 1 row of data. */
  overflow: initial;
`;

export class SortTable extends Component<$TSFixMe> {
  static propTypes = {
    sortKey: PropTypes.string,
    sortOrder: PropTypes.oneOf([SortOrder.ASC, SortOrder.DESC]),
    colgroup: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        colWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      }),
    ),
    onSort: PropTypes.func,
    headers: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        key: PropTypes.string.isRequired,
        align: PropTypes.string,
        numerical: PropTypes.bool,
        isSortable: PropTypes.bool,
        thumbnailKey: PropTypes.string,
        formattedTitleText: PropTypes.bool,
      }),
    ),
    data: PropTypes.arrayOf(
      PropTypes.shape({
        /* Tooltip on hover for this row */
        rowTitle: PropTypes.string,
        /* Disables the row */
        disabled: PropTypes.bool,
        /* Key unique to this row */
        key: PropTypes.string,
        /* Tooltip text over a row */
        tooltipText: PropTypes.string,
        // All the other props are matching headers definition
      }),
    ),
    hover: PropTypes.bool,
    onRowClick: PropTypes.func,
    className: PropTypes.string,
    primaryKey: PropTypes.string,
  };

  static defaultProps = {
    colgroup: [],
    headers: [],
    sortOrder: SortOrder.DESC,
    onSort() {},
    onRowClick() {},
  };

  state = {
    selectedRow: null,
    tooltipData: null,
  };

  onMouseMove = (e: $TSFixMe, text: $TSFixMe) => {
    this.setTooltipData({ top: e.pageY, left: e.pageX, tooltipText: text });
  };

  onMouseLeave = () => {
    this.setTooltipData();
  };

  onRowKeyDown = (eventKey: $TSFixMe, rowValues: $TSFixMe, idx: $TSFixMe) => {
    if (eventKey === ' ' || eventKey === 'Enter' || eventKey === 'Spacebar') {
      this.props.onRowClick(rowValues, idx);
    }
  };

  setTooltipData: $TSFixMeFunction = val => this.setState({ tooltipData: val });

  render() {
    const {
      colgroup,
      onSort,
      sortKey,
      sortOrder,
      headers,
      data,
      hover,
      onRowClick,
      primaryKey,
      ...otherProps
    } = this.props;

    const { selectedRow, tooltipData } = this.state;

    return (
      <StyledTableContainer responsive stickyHeader {...otherProps}>
        {tooltipData && <TableTooltip {...tooltipData} />}
        <Table data-testid="sort-table">
          <colgroup>
            {colgroup.map(({ key, colWidth }: $TSFixMe) => (
              <col key={key} width={colWidth} />
            ))}
          </colgroup>
          <thead>
            <TableRow data-testid="sort-table-head-row">
              {headers.map(
                ({
                  title,
                  key,
                  align,
                  isSortable,
                  tooltipText,
                  tooltipId,
                }: $TSFixMe) =>
                  isSortable ? (
                    <SortableTableHeaderCell
                      key={key}
                      // @ts-ignore
                      onClick={() => onSort(key)}
                      active={sortKey === key}
                      sortOrder={sortOrder}
                      hideSortArrow={sortKey !== key}
                      align={align || 'left'}
                      tooltipText={tooltipText}
                      tooltipId={tooltipId}
                    >
                      {title}
                    </SortableTableHeaderCell>
                  ) : (
                    <TableHeaderCell key={key} align={align || 'left'}>
                      {title}
                    </TableHeaderCell>
                  ),
              )}
            </TableRow>
          </thead>
          <tbody>
            {data.map(
              ({ key: rowKey, ...rowValues }: $TSFixMe, idx: $TSFixMe) => {
                const shouldRowHover = rowValues.hasOwnProperty('hover')
                  ? rowValues.hover
                  : hover;
                return (
                  // @ts-ignore
                  <StyledTableRow
                    data-testid="sort-table-body-row"
                    data-onclick={rowValues.disabled ? 'disabled' : 'enabled'}
                    key={rowKey}
                    hover={!rowValues.disabled && shouldRowHover}
                    clickable={!rowValues.disabled && shouldRowHover}
                    onClick={
                      !rowValues.disabled
                        ? () => onRowClick(rowValues, idx)
                        : null
                    }
                    onFocus={() => this.setState({ selectedRow: rowKey })}
                    onMouseMove={e => {
                      if (rowValues.tooltipText) {
                        this.onMouseMove(e, rowValues.tooltipText);
                      }
                    }}
                    onMouseLeave={() => {
                      if (rowValues.tooltipText) {
                        this.onMouseLeave();
                      }
                    }}
                    onKeyDown={
                      !rowValues.disabled
                        ? e => this.onRowKeyDown(e.key, rowValues, idx)
                        : null
                    }
                    select={selectedRow === rowKey}
                    tabIndex="0"
                    role="button"
                    aria-label={primaryKey ? rowValues[primaryKey] : rowKey}
                  >
                    {headers.map(
                      ({
                        key,
                        numerical,
                        align,
                        thumbnailKey,
                        formattedTitleText,
                        maxWidth,
                        hasSmallThumbnail,
                        thumbnailSubtitleKey,
                        truncate,
                      }: $TSFixMe) => (
                        <StyledTableCell
                          key={key}
                          numerical={numerical}
                          align={align || 'left'}
                          disabled={rowValues.disabled}
                          title={
                            !rowValues.tooltipText
                              ? rowValues.rowTitle
                                ? rowValues.rowTitle
                                : formattedTitleText
                                ? // @ts-ignore
                                  formattedTitleTextAccessorFunction(rowValues)[
                                    key
                                  ]
                                : rowValues[key]
                              : undefined
                          }
                          truncate={truncate}
                        >
                          {thumbnailKey && (
                            <TableThumbnail
                              // @ts-ignore
                              onKeyDown={
                                !rowValues.disabled
                                  ? e =>
                                      this.onRowKeyDown(e.key, rowValues, idx)
                                  : null
                              }
                              // @ts-ignore
                              tabIndex="0"
                              role="button"
                              aria-label={rowValues[key]}
                              small={hasSmallThumbnail}
                              img={rowValues[thumbnailKey]}
                              thumbnailTitle={rowValues[key]}
                              subtitle={
                                thumbnailSubtitleKey &&
                                rowValues[thumbnailSubtitleKey]
                              }
                              imgAlt=""
                              style={{ maxWidth }}
                              disabled={rowValues.disabled}
                              truncate={truncate}
                            />
                          )}
                          {!thumbnailKey && rowValues[key]}
                        </StyledTableCell>
                      ),
                    )}
                  </StyledTableRow>
                );
              },
            )}
          </tbody>
        </Table>
      </StyledTableContainer>
    );
  }
}
