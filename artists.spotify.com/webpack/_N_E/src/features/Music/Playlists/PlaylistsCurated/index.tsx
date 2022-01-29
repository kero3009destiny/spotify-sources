import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { Fragment, useState } from 'react';
import { ButtonSecondary, IconHelpAlt, ButtonIcon, OverlayTrigger, Popover, Type } from '@spotify-internal/encore-web-v3';
import { SortTable } from '@mrkt/features/stats-components';
import { SortOrder, useSortTableData } from '@mrkt/features/stats-components/utils';
import { useT } from '@mrkt/features/i18n';
import { applyMetricSuffix } from '../../../../shared/lib/numberHelpers';
import { StyledSection, StyledHeader, StyledPopoverTrigger, StyledEmptyMessage, StyledDescription, StyledButtonSecondary, StyledShowMoreSection } from '../styled';
import { generateHeaders, usePlaylistsNormalizer } from '../utils';
import { useViewport, Viewport } from '../../../../shared/lib/useViewport';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var SectionTitle;

(function (SectionTitle) {
  SectionTitle["LISTENER"] = "listener";
  SectionTitle["EDITORIAL"] = "editorial";
})(SectionTitle || (SectionTitle = {}));

export function PlaylistsCurated(_ref) {
  var _sectionTitle;

  var description = _ref.description,
      emptyMessage = _ref.emptyMessage,
      toggleOverlay = _ref.toggleOverlay,
      handleExpandToggle = _ref.handleExpandToggle,
      handleHide = _ref.handleHide,
      handleShow = _ref.handleShow,
      hasPlaylists = _ref.hasPlaylists,
      isExpanded = _ref.isExpanded,
      playlists = _ref.playlists,
      tooltipMobile = _ref.tooltipMobile,
      type = _ref.type;

  var _useState = useState({
    sortKey: 'streams',
    sortOrder: SortOrder.DESC,
    isSorting: false
  }),
      sortState = _useState[0],
      setSort = _useState[1];

  var viewport = useViewport();
  var normalizer = usePlaylistsNormalizer();
  var sortTableData = useSortTableData();
  var t = useT();
  var sectionTitle = (_sectionTitle = {}, _defineProperty(_sectionTitle, SectionTitle.LISTENER, t('MUSIC_PLAYLISTS_3e296f', 'Listener', "Header for a table that displays playlists made by Spotify's listeners.")), _defineProperty(_sectionTitle, SectionTitle.EDITORIAL, t('MUSIC_PLAYLISTS_c7e0b1', 'Editorial', "Header for a table that displays playlists made by Spotify's editorial team based on music trends and data.")), _sectionTitle);

  var renderMessages = function renderMessages() {
    var msgType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var msgDescription = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : t('MUSIC_PLAYLISTS_1f114a', 'No description available', '');
    var emptyMsg = arguments.length > 2 ? arguments[2] : undefined;
    return {
      title: sectionTitle[msgType],
      description: msgDescription,
      empty: emptyMsg,
      button: t('MUSIC_PLAYLISTS_c59b24', 'LEARN MORE', '')
    };
  };

  var messages = renderMessages(type, description, emptyMessage);

  var _generateHeaders = generateHeaders(viewport, t),
      headers = _generateHeaders.headers,
      colgroup = _generateHeaders.colgroup;

  var normalizedData = normalizer(playlists.playlists, t);
  var sortedData = sortTableData(normalizedData, sortState.sortKey, sortState.sortOrder).map(function (d, i) {
    return _objectSpread(_objectSpread({}, d), {}, {
      rank: i + 1
    });
  });
  var curatedPlaylists = isExpanded ? sortedData : sortedData.slice(0, 5);

  var onSort = function onSort(sortKey) {
    var oldSortKey = sortState.sortKey,
        oldSortOrder = sortState.sortOrder;
    var sortOrder = oldSortOrder === SortOrder.DESC && sortKey === oldSortKey ? SortOrder.ASC : SortOrder.DESC;
    setSort({
      sortKey: sortKey,
      sortOrder: sortOrder,
      isSorting: true
    });
  };

  var _onRowClick = function onRowClick(index) {
    var topSongsData = normalizedData[index].formattedForPlaylistTopSongs;

    if (topSongsData && topSongsData.formatted.trackStats && viewport === Viewport.XS) {
      toggleOverlay(topSongsData);
    }
  };

  var playlistLength = isExpanded ? playlists.playlists.length : playlists.playlists.slice(0, 5).length;
  var moreOrAll = Number(playlists.count) >= 100 ? t('MUSIC_PLAYLISTS_d0beef', 'Show More', '') : t('MUSIC_PLAYLISTS_347320', 'Show All', '');
  var selectionDesc = isExpanded ? t('MUSIC_PLAYLISTS_5c8ae6', 'Show Less', '') : moreOrAll;
  return /*#__PURE__*/_jsxs(StyledSection, {
    "data-testid": "playlists-curated",
    children: [/*#__PURE__*/_jsxs(Fragment, {
      children: [/*#__PURE__*/_jsx(StyledHeader, {
        variant: "heading2",
        "data-testid": "playlist-".concat(type),
        children: messages.title
      }), /*#__PURE__*/_jsx(StyledDescription, {
        variant: Type.body1,
        children: messages.description
      }), viewport === Viewport.XS && /*#__PURE__*/_jsx(StyledPopoverTrigger, {
        placement: OverlayTrigger.left,
        onShow: function onShow() {
          return handleShow("".concat(type, "Mobile"));
        },
        onHide: function onHide() {
          return handleHide("".concat(type, "Mobile"));
        },
        overlay: tooltipMobile && /*#__PURE__*/_jsx(Popover, {
          arrow: Popover.right,
          children: messages.description
        }),
        children: /*#__PURE__*/_jsx(ButtonIcon, {
          "data-testid": "question-button",
          children: /*#__PURE__*/_jsx(IconHelpAlt, {})
        })
      })]
    }), !hasPlaylists && /*#__PURE__*/_jsx(StyledEmptyMessage, {
      children: /*#__PURE__*/_jsx(Type, {
        color: "gray60",
        children: messages.empty
      })
    }), hasPlaylists && /*#__PURE__*/_jsx(SortTable, {
      stickyHeader: false,
      bordered: true,
      onSort: onSort,
      sortKey: sortState.sortKey,
      sortOrder: sortState.sortOrder,
      colgroup: colgroup,
      headers: headers,
      data: curatedPlaylists,
      onRowClick: function onRowClick(data) {
        return _onRowClick(data.index);
      }
    }), hasPlaylists && /*#__PURE__*/_jsxs(StyledShowMoreSection, {
      children: [playlists.playlists.length > 5 && /*#__PURE__*/_jsx(StyledButtonSecondary, {
        buttonSize: ButtonSecondary.sm,
        onClick: handleExpandToggle(type),
        children: selectionDesc
      }), playlists.playlists.length > 5 && /*#__PURE__*/_jsx(Type, {
        variant: Type.body2,
        color: "gray60",
        children: t('MUSIC_PLAYLISTS_553fa6', 'Showing {playlistLength} of {metrics}', '', {
          playlistLength: playlistLength,
          metrics: applyMetricSuffix(playlists.count)
        })
      })]
    })]
  });
}