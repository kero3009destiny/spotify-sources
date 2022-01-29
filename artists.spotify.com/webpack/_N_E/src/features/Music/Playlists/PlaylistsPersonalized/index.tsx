import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useState } from 'react';
import { IconHelpAlt, ButtonIcon, ButtonSecondary, OverlayTrigger, Popover, Type } from '@spotify-internal/encore-web-v3';
import { SortTable } from '@mrkt/features/stats-components';
import { SortOrder, useSortTableData } from '@mrkt/features/stats-components/utils';
import { useT } from '@mrkt/features/i18n';
import { generateHeaders, usePlaylistsNormalizer } from '../utils';
import { applyMetricSuffix } from '../../../../shared/lib/numberHelpers';
import { StyledSection, StyledHeader, StyledPopoverTrigger, StyledDescription, StyledButtonSecondary, StyledShowMoreSection } from '../styled';
import { useViewport, Viewport } from '../../../../shared/lib/useViewport';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function PlaylistsPersonalized(_ref) {
  var isExpanded = _ref.isExpanded,
      handleHide = _ref.handleHide,
      handleShow = _ref.handleShow,
      handleExpandToggle = _ref.handleExpandToggle,
      playlists = _ref.playlists,
      showPersonalizedHeaders = _ref.showPersonalizedHeaders,
      tooltipMobile = _ref.tooltipMobile,
      type = _ref.type,
      toggleOverlay = _ref.toggleOverlay;

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
  var isPlaceholder = playlists.every(function (playlist) {
    return playlist.isPlaceholder;
  });
  var t = useT();

  var _generateHeaders = generateHeaders(viewport, t, isPlaceholder, true),
      headers = _generateHeaders.headers,
      colgroup = _generateHeaders.colgroup;

  var normalizedData = normalizer(playlists, t);
  var sortedData = sortTableData(normalizedData, sortState.sortKey, sortState.sortOrder).map(function (d, i) {
    return _objectSpread(_objectSpread({}, d), {}, {
      rank: i + 1
    });
  });
  var algoPlaylists = isExpanded ? sortedData : sortedData.slice(0, 5);

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

    if (!topSongsData) {
      // empty state
      return;
    }

    if (topSongsData.formatted.trackStats && viewport === Viewport.XS) {
      toggleOverlay(topSongsData);
    }
  };

  var playlistLength = isExpanded ? playlists.length : playlists.slice(0, 5).length;
  var moreOrAll = Number(playlists.length) >= 100 ? t('MUSIC_PLAYLISTS_d0beef', 'Show More', '') : t('MUSIC_PLAYLISTS_347320', 'Show All', '');
  var selectionDesc = isExpanded ? t('MUSIC_PLAYLISTS_5c8ae6', 'Show Less', '') : moreOrAll;
  var description = t('MUSIC_PLAYLISTS_10de5d', 'Playlists created for a listener based on their taste using crowdsourcing and data.', '"crowdsourcing and data" means "info we get with the help of the users and data Spotify collects".');
  return /*#__PURE__*/_jsxs(StyledSection, {
    "data-testid": "playlists-personalized",
    children: [/*#__PURE__*/_jsxs("div", {
      children: [/*#__PURE__*/_jsx(StyledHeader, {
        variant: "heading2",
        "data-testid": "playlist-personalized",
        children: /*#__PURE__*/_jsx("span", {
          children: t('MUSIC_PLAYLISTS_2e15a5', 'Algorithmic', '')
        })
      }), viewport === Viewport.XS && /*#__PURE__*/_jsx(StyledPopoverTrigger, {
        placement: OverlayTrigger.left,
        onShow: function onShow() {
          return handleShow('personalizedMobile');
        },
        onHide: function onHide() {
          return handleHide('personalizedMobile');
        },
        overlay: tooltipMobile && /*#__PURE__*/_jsx(Popover, {
          arrow: Popover.right,
          children: /*#__PURE__*/_jsx("span", {
            children: description
          })
        }),
        children: /*#__PURE__*/_jsx(ButtonIcon, {
          "data-testid": "question-button",
          children: /*#__PURE__*/_jsx(IconHelpAlt, {})
        })
      })]
    }), /*#__PURE__*/_jsx(StyledDescription, {
      variant: Type.body1,
      children: /*#__PURE__*/_jsx("span", {
        children: description
      })
    }), /*#__PURE__*/_jsx(SortTable, {
      stickyHeader: false,
      bordered: true,
      onSort: onSort,
      sortKey: sortState.sortKey,
      sortOrder: sortState.sortOrder,
      colgroup: colgroup,
      headers: headers,
      data: algoPlaylists,
      onRowClick: function onRowClick(data) {
        return _onRowClick(data.index);
      }
    }), showPersonalizedHeaders && /*#__PURE__*/_jsxs(StyledShowMoreSection, {
      children: [playlists.length > 5 && /*#__PURE__*/_jsx(StyledButtonSecondary, {
        buttonSize: ButtonSecondary.sm,
        onClick: handleExpandToggle(type),
        children: selectionDesc
      }), playlists.length > 5 && /*#__PURE__*/_jsx(Type, {
        variant: Type.body2,
        color: "gray60",
        children: t('MUSIC_PLAYLISTS_553fa6', 'Showing {playlistLength} of {metrics}', '', {
          playlistLength: playlistLength,
          metrics: applyMetricSuffix(playlists.length)
        })
      })]
    })]
  });
}