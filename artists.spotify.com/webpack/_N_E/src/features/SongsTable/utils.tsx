import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { Fragment } from 'react';
import invariant from 'invariant';
import { useDateTimeFormatter, useNumberFormatter, useT } from '@mrkt/features/i18n';
import { EM_DASH, SortOrder, formatDateToString, formatNumberWithFallback, intlDateFormatOptions, intlDateFormatTitleOptions, useSortTableData } from '@mrkt/features/stats-components/utils';
import { FILTER_VALUE_7DAY, FILTER_VALUE_1DAY } from '../../features/CatalogUtils/constants';
import { TrendArrow } from './TrendArrow';
import { Viewport, breakpointValues } from '../../shared/lib/useViewport';
import { SplitRightsBadge } from '../Music/SplitRightsBadge';
import { StatNotAvailable } from '../Music/StatNotAvailable';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var SPLIT_RIGHTS = 'showSplitRightsBadge';

var formatListenerCell = function formatListenerCell(datum, timeFilter, viewport, formatter) {
  if (datum !== null && datum !== void 0 && datum[SPLIT_RIGHTS]) {
    return /*#__PURE__*/_jsx(StatNotAvailable, {});
  }

  if (!(datum !== null && datum !== void 0 && datum.numListeners)) {
    return EM_DASH;
  }

  var percentChange = parseInt(datum.trend, 10);
  var lteTabletViewport = viewport === Viewport.SM || viewport === Viewport.XS;
  var showTrend = !lteTabletViewport && (timeFilter === FILTER_VALUE_7DAY || timeFilter === FILTER_VALUE_1DAY);
  return /*#__PURE__*/_jsxs(Fragment, {
    children: [formatNumberWithFallback(datum.numListeners, formatter), "\xA0", showTrend && /*#__PURE__*/_jsx(TrendArrow, {
      percentChange: percentChange,
      timeframe: timeFilter // @ts-ignore
      ,
      viewport: breakpointValues[viewport],
      ariaLabel: "Change in listeners"
    })]
  });
};

var formatCell = function formatCell(datum, attr, formatter) {
  if (datum !== null && datum !== void 0 && datum[SPLIT_RIGHTS]) {
    return /*#__PURE__*/_jsx(StatNotAvailable, {});
  }

  return datum !== null && datum !== void 0 && datum[attr] ? formatNumberWithFallback(datum[attr], formatter) : EM_DASH;
};

export var stringToNumHelper = function stringToNumHelper(str) {
  return parseInt(str, 10);
};
/**
 * Normalizes the data for use in the column chart
 * @param  {Object} data – The original payload
 * @param  {String} timeFilter – the timefilter for the data
 * @param  {Number} viewport – the viewport
 * @param  {Array} permssions – User permissions
 * @return {Array} – Normalized data
 */

export var useSongsTableNormalizer = function useSongsTableNormalizer() {
  var numberFormatter = useNumberFormatter();
  var sortTableData = useSortTableData();
  var dateFormatter = useDateTimeFormatter(intlDateFormatOptions);
  var dateFormatterTitle = useDateTimeFormatter(intlDateFormatTitleOptions);
  var t = useT();
  return function normalizer(data, timeFilter, viewport, permissions) {
    invariant(data instanceof Object, 'The argument "data" must an Object');
    invariant(permissions instanceof Array, 'The argument "permissions" must an Array');

    var input = _objectSpread({}, data);

    if (!(input !== null && input !== void 0 && input.recordingStats)) {
      input.recordingStats = [];
    }

    var normalized = input.recordingStats.map(function (item, index) {
      var _item$trackUri, _item$pictureUri;

      var date = new Date(item.releaseDate); // @ts-ignore

      var releaseDate = isFinite(date) ? date : null;
      return {
        key: (_item$trackUri = item === null || item === void 0 ? void 0 : item.trackUri) !== null && _item$trackUri !== void 0 ? _item$trackUri : "key-".concat(index),
        uri: item.trackUri,
        title: item.trackName === '' ? EM_DASH : item.trackName,
        splitRights: item !== null && item !== void 0 && item[SPLIT_RIGHTS] ? /*#__PURE__*/_jsx(SplitRightsBadge, {}) : null,
        streams: item !== null && item !== void 0 && item.numStreams ? formatNumberWithFallback(item.numStreams, numberFormatter) : EM_DASH,
        listeners: formatListenerCell(item, timeFilter, viewport, numberFormatter),
        canvasViews: formatCell(item, 'numCanvasViews', numberFormatter),
        saves: formatCell(item, 'numSavers', numberFormatter),
        releaseDate: formatDateToString(releaseDate, dateFormatter),
        thumbnailUrl: (_item$pictureUri = item === null || item === void 0 ? void 0 : item.pictureUri) !== null && _item$pictureUri !== void 0 ? _item$pictureUri : null,
        originalValues: {
          title: item.trackName === '' ? EM_DASH : item.trackName,
          listeners: item !== null && item !== void 0 && item.numListeners ? stringToNumHelper(item.numListeners) : 0,
          streams: item !== null && item !== void 0 && item.numStreams ? stringToNumHelper(item.numStreams) : 0,
          canvasViews: item !== null && item !== void 0 && item.numCanvasViews ? stringToNumHelper(item.numCanvasViews) : 0,
          saves: item !== null && item !== void 0 && item.numSavers ? stringToNumHelper(item.numSavers) : 0,
          releaseDate: releaseDate
        },
        titleText: {
          title: item.trackName === '' ? EM_DASH : item.trackName,
          releaseDate: formatDateToString(releaseDate, dateFormatterTitle)
        },
        disabled: item.isDisabled,
        tooltipText: item.isDisabled && t('SONGS_TABLE_a65d6a', 'This song is not part of your catalog', 'Tooltip text that appears when a user hovers over a greyed out and disabled table row.')
      };
    });
    return sortTableData(normalized, 'streams', SortOrder.DESC).map(function (d, i) {
      return _objectSpread(_objectSpread({}, d), {}, {
        rank: i + 1
      });
    });
  };
};
/**
 * Normalizes the data for use in the column chart
 * @param  {Number} viewport – The viewport
 * @param  {Array} dataKeys - A list of keys from the first item in the normalized response
 * @return {Object} – An object containing a header & colgroup
 */

export var useGenerateHeaders = function useGenerateHeaders() {
  var t = useT();
  var columns = ['rank', 'title', 'splitRights', 'streams', 'listeners', 'canvasViews', 'saves', 'releaseDate'];
  return function generateHeaders(viewportArg, showCanvasColumn) {
    // use either viewport prop or largest screen
    var viewport = viewportArg || Viewport.LG; // generate max screen thresholds

    var gtMobileViewport = viewport !== Viewport.XS; // tablet viewports and larger

    var gtTabletViewport = ![Viewport.XS, Viewport.SM].includes(viewport); // desktop viewports and larger

    var gtDesktopViewport = [Viewport.LG, Viewport.XL].includes(viewport); // widescreen viewports

    var colgroup = [gtMobileViewport && {
      key: columns[0],
      colWidth: 52
    }, {
      key: columns[1],
      colWidth: '*'
    }, {
      key: columns[2],
      colWidth: 30
    }, {
      key: columns[3],
      colWidth: 120
    }, gtMobileViewport && {
      key: columns[4],
      colWidth: 120
    }, showCanvasColumn && gtTabletViewport && {
      key: columns[5],
      colWidth: 120
    }, gtTabletViewport && {
      key: columns[6],
      colWidth: 120
    }, gtDesktopViewport && {
      key: columns[7],
      colWidth: 140
    }].filter(function (d) {
      return d;
    });
    var headers = [gtMobileViewport && {
      title: '#',
      key: columns[0],
      align: 'right',
      numerical: true
    }, {
      title: t('SONGS_TABLE_HDR_TITLE', 'Title', ''),
      key: columns[1],
      hasSmallThumbnail: true,
      thumbnailKey: 'thumbnailUrl',
      isSortable: true,
      truncate: true
    }, {
      title: '',
      key: columns[2],
      align: 'right',
      isSortable: false,
      formattedTitleText: true
    }, {
      title: t('SONGS_TABLE_HDR_STREAMS', 'Streams', ''),
      key: columns[3],
      isSortable: true,
      align: 'right',
      numerical: true,
      formattedTitleText: true
    }, gtMobileViewport && {
      title: t('SONGS_TABLE_HDR_LISTENERS', 'Listeners', ''),
      key: columns[4],
      isSortable: true,
      align: 'right',
      numerical: true,
      formattedTitleText: true
    }, showCanvasColumn && gtTabletViewport && {
      title: t('SONGS_TABLE_HDR_VIEWS', 'Views', ''),
      key: columns[5],
      isSortable: true,
      align: 'right',
      numerical: true,
      formattedTitleText: true
    }, gtTabletViewport && {
      title: t('SONGS_TABLE_HDR_SAVES', 'Saves', ''),
      key: columns[6],
      isSortable: true,
      align: 'right',
      numerical: true,
      formattedTitleText: true,
      tooltipText: t('songs-saves-tooltip', 'The number of times people saved your music to their library, showing an intention to listen again in the future.', 'songs saves tooltip text'),
      tooltipId: 'songs-table-saves-tooltip'
    }, gtDesktopViewport && {
      title: t('SONGS_TABLE_HDR_FIRST_ADDED', 'First Added', 'Date when the track was uploaded on Spotify for the first time.'),
      key: columns[7],
      isSortable: true,
      align: 'right',
      formattedTitleText: true
    }].filter(function (d) {
      return d;
    });
    return {
      headers: headers,
      colgroup: colgroup
    };
  };
};
/* eslint-disable-next-line import/no-default-export */

export default {
  useSongsTableNormalizer: useSongsTableNormalizer
};