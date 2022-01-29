import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Table,
  TableCell,
  TableContainer,
  TableHeaderCell,
  TableRow,
  TableThumbnail,
  green,
  screenSmMin,
} from '@spotify-internal/encore-web-v3';
import { useT } from '@mrkt/features/i18n';
import { useTimeAgo } from '@mrkt/features/date-helpers';
import { ExpandCollapseButton } from './ExpandCollapseButton';
import { ClipboardButton } from './ClipboardButton';
import { useRecentlyAddedTableNormalizer as normalizer } from '../../normalizers/useRecentlyAddedTableNormalizer';
import {
  formattedTitleTextAccessorFunction,
  screenXsInt,
  screenLgInt,
  screenMdInt,
} from '../../utils';

export const MAX_COLLAPSED_PLAYLISTS = 3;

const StyledTable = styled(Table)`
  max-height: 100%;

  .topRightArrow {
    visibility: hidden;
    color: ${props =>
      (props.theme && props.theme.colors && props.theme.colors.primaryColor) ||
      green};
    margin: 2px 0 0 10px;
    vertical-align: top;
  }
  tr {
    td {
      cursor: pointer;
    }
    @media (min-width: ${screenSmMin}) {
      &:hover .topRightArrow {
        visibility: visible;
      }
    }
  }
`;

const getTableCols = (viewportProp: $TSFixMe, t: $TSFixMe) => {
  const viewport = viewportProp || screenLgInt;
  const isGreaterThanMobileViewport = viewport > screenXsInt;
  const isGreaterThanTabletViewport = viewport > screenMdInt;
  const headers = [
    {
      title: t('RECENTLY_ADDED_TABLE_96da8d', 'Last 7 Days', ''),
      key: 'title',
    },
    isGreaterThanMobileViewport && {
      title: t(
        'RECENTLY_ADDED_TABLE_c8ee2b',
        'Added',
        'The date an artist’s song was added to an editorial playlist, and it’s restricted to a 7 day timeframe. Example: "4 days ago".',
      ),
      key: 'dateAdded',
    },
    {
      title: t('RECENTLY_ADDED_TABLE_9d16ab', 'Share Link', ''),
      key: 'shareableLink',
      align: 'right',
    },
  ].filter(d => d);

  const colgroup: $TSFixMe = [
    { key: 'playlists', colWidth: '50%' },
    isGreaterThanMobileViewport && { key: 'added', colWidth: '25%' },
    { key: 'share', colWidth: '25%' },
  ].filter(d => d);

  return {
    colgroup,
    headers,
    isGreaterThanMobileViewport,
    isGreaterThanTabletViewport,
  };
};

export function RecentlyAddedTable(props: $TSFixMe) {
  const { data = [], loggingCallback, viewport } = props;
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [clickedIndex, setClickedIndex] = React.useState(null);
  const t = useT();
  const timeAgo = useTimeAgo();
  const {
    colgroup,
    headers,
    isGreaterThanMobileViewport,
    isGreaterThanTabletViewport,
  } = getTableCols(viewport, t);
  const normalized = normalizer(data, t, timeAgo);
  const playlists = isExpanded
    ? normalized
    : normalized.slice(0, MAX_COLLAPSED_PLAYLISTS);

  function onRowClick(d: $TSFixMe) {
    window.open(d.shareableLink, '_blank');
  }

  function onCopyCellClick(e: $TSFixMe) {
    return e.stopPropagation();
  }

  function trackRowIndexCallback(index: $TSFixMe) {
    setClickedIndex(index);
  }

  function handleExpandToggle() {
    setIsExpanded(!isExpanded);
  }

  return (
    <React.Fragment>
      <TableContainer responsive>
        <StyledTable>
          <colgroup>
            {colgroup.map(({ key, colWidth }: $TSFixMe) => (
              <col key={key} width={colWidth} />
            ))}
          </colgroup>
          <thead>
            <TableRow>
              {headers.map(({ title, key, align }: $TSFixMe) => (
                <TableHeaderCell key={key} align={align || 'left'}>
                  {title}
                </TableHeaderCell>
              ))}
            </TableRow>
          </thead>
          <tbody>
            {playlists.map(
              ({ key: rowKey, ...rowValues }: $TSFixMe, index: $TSFixMe) => (
                <TableRow
                  key={rowKey}
                  hover
                  onClick={() => onRowClick(rowValues)}
                >
                  <TableCell
                    align="left"
                    // @ts-ignore
                    title={formattedTitleTextAccessorFunction(rowValues).title}
                  >
                    <TableThumbnail
                      small={!isGreaterThanMobileViewport}
                      img={rowValues.thumbnailUrl}
                      imgAlt=""
                      thumbnailTitle={rowValues.title}
                      subtitle={
                        rowValues.thumbnailSubtitleKey &&
                        rowValues.thumbnailSubtitleKey
                      }
                    />
                  </TableCell>
                  {isGreaterThanMobileViewport && (
                    <TableCell
                      align="left"
                      title={
                        // @ts-ignore
                        formattedTitleTextAccessorFunction(rowValues).dateAdded
                      }
                    >
                      {rowValues.dateAdded}
                    </TableCell>
                  )}
                  <TableCell
                    align="right"
                    title={
                      (
                        formattedTitleTextAccessorFunction(
                          rowValues,
                        ) as $TSFixMe
                      ).shareableLink
                    }
                    onClick={onCopyCellClick}
                  >
                    <ClipboardButton
                      btnText={rowValues.btnText}
                      isAlgotorial={rowValues.isAlgotorial}
                      isMobileView={!isGreaterThanTabletViewport}
                      isTooltipClicked={index === clickedIndex}
                      loggingCallback={loggingCallback}
                      rowIndex={index}
                      size="sm"
                      textToCopy={rowValues.shareableLink}
                      trackRowIndexCallback={trackRowIndexCallback}
                    />
                  </TableCell>
                </TableRow>
              ),
            )}
          </tbody>
        </StyledTable>
      </TableContainer>
      {data.length > MAX_COLLAPSED_PLAYLISTS && (
        <ExpandCollapseButton
          // @ts-ignore
          isExpanded={isExpanded}
          handleExpandToggle={handleExpandToggle}
          numPlaylists={data.length}
        />
      )}
    </React.Fragment>
  );
}

RecentlyAddedTable.propTypes = {
  /**
   * Data is an array of objects with props defined by header keys.
   * See the /src/components/RecentlyAddedTable/index.js render method
   */
  data: PropTypes.arrayOf(PropTypes.shape({})),
  loggingCallback: PropTypes.func,
  viewport: PropTypes.number,
};
