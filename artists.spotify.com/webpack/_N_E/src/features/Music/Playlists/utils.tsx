import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* eslint-disable radix */
import React from 'react';
import invariant from 'invariant';
import { Type } from '@spotify-internal/encore-web';
import { useDateTimeFormatter, useNumberFormatter } from '@mrkt/features/i18n';
import { EM_DASH, SortOrder, formatDateToString, formatNumberWithFallback, intlDateFormatOptions, intlDateFormatTitleOptions, useSortTableData } from '@mrkt/features/stats-components/utils';
import { Viewport } from '../../../shared/lib/useViewport';
import { PlaylistTopSongs } from './PlaylistTopSongs';
import { PlaylistTitle } from './PlaylistTitle';
import { jsx as _jsx } from "react/jsx-runtime";

var isValidDate = function isValidDate(date) {
  return isFinite(date.valueOf()) ? date : null;
};

export var stringToNumHelper = function stringToNumHelper(str) {
  return str ? parseInt(str, 10) : 0;
};
export var usePlaylistsNormalizer = function usePlaylistsNormalizer() {
  var numberFormatter = useNumberFormatter();
  var dateFormatter = useDateTimeFormatter(intlDateFormatOptions);
  var dateFormatterTitle = useDateTimeFormatter(intlDateFormatTitleOptions);
  var sortTableData = useSortTableData();
  return function normalizer(data, t) {
    invariant(data instanceof Object, 'The argument "data" must an Object');

    var formatDataForPlaylistTopSongs = function formatDataForPlaylistTopSongs(item) {
      var formattedTrackStats = item.trackStats && item.trackStats.map(function (trackStat) {
        return {
          streams: formatNumberWithFallback(trackStat.numStreams, numberFormatter),
          streamsFull: trackStat.numStreams,
          trackURI: trackStat.trackUri,
          trackName: trackStat.trackName,
          isDisabled: trackStat.isDisabled,
          showSplitRightsBadge: trackStat.showSplitRightsBadge
        };
      });
      var sortedByStreams = formattedTrackStats && formattedTrackStats.sort(function (a, b) {
        return parseInt(b.streamsFull) > parseInt(a.streamsFull) ? 1 : -1;
      });
      var formattedData = {
        isAlgotorial: item.isAlgotorial,
        uri: item.uri,
        title: item.title,
        pictureUri: item.thumbnailUrl,
        owner: item.author,
        isPersonalized: item.isPersonalized,
        formatted: {
          trackStats: sortedByStreams,
          numTracks: stringToNumHelper(item.numTracks)
        }
      };
      return formattedData;
    };

    var renderPlaylistTopSongs = function renderPlaylistTopSongs(item) {
      return /*#__PURE__*/_jsx(PlaylistTopSongs, {
        data: formatDataForPlaylistTopSongs(item)
      });
    };

    var normalized = data.every(function (item) {
      return item.isPlaceholder;
    }) ? data.map(function (item, index) {
      var _item$uri, _item$img;

      return {
        key: (_item$uri = item === null || item === void 0 ? void 0 : item.uri) !== null && _item$uri !== void 0 ? _item$uri : "key-".concat(index),
        title: item.title,
        thumbnailUrl: (_item$img = item === null || item === void 0 ? void 0 : item.img) !== null && _item$img !== void 0 ? _item$img : null,
        subtitle: t('MUSIC_PLAYLISTS_511a3f', 'No stats for this time period.', ''),
        description: /*#__PURE__*/_jsx(Type, {
          variant: Type.body1,
          children: item.desc
        }),
        originalValues: {
          title: item.title,
          description: item.desc
        },
        titleText: {
          title: item.title
        }
      };
    }) : data.map(function (item, index) {
      var _item$uri2, _item$thumbnailUrl;

      var date = item.dateAdded ? new Date(item.dateAdded) : null;
      var dateAdded = date ? isValidDate(date) : null;
      var titleData = {
        title: item.title,
        uri: item.uri,
        isPersonalized: item.isPersonalized
      };
      return {
        key: (_item$uri2 = item === null || item === void 0 ? void 0 : item.uri) !== null && _item$uri2 !== void 0 ? _item$uri2 : "key-".concat(index),
        uri: item.uri,
        title: /*#__PURE__*/_jsx(PlaylistTitle, {
          data: titleData,
          children: /*#__PURE__*/_jsx(Type, {
            weight: Type.bold,
            children: item.title
          })
        }),
        author: item.author,
        streams: item.streams ? formatNumberWithFallback(item.streams, numberFormatter) : EM_DASH,
        listeners: item.listeners ? formatNumberWithFallback(item.listeners, numberFormatter) : EM_DASH,
        thumbnailUrl: (_item$thumbnailUrl = item === null || item === void 0 ? void 0 : item.thumbnailUrl) !== null && _item$thumbnailUrl !== void 0 ? _item$thumbnailUrl : null,
        subtitle: renderPlaylistTopSongs(item),
        dateAdded: formatDateToString(dateAdded, dateFormatter),
        formattedForPlaylistTopSongs: formatDataForPlaylistTopSongs(item),
        originalValues: {
          title: item.title,
          author: item.author,
          listeners: item !== null && item !== void 0 && item.listeners ? stringToNumHelper(item.listeners) : 0,
          streams: item !== null && item !== void 0 && item.streams ? stringToNumHelper(item.streams) : 0,
          dateAdded: date
        },
        titleText: {
          title: item.title,
          dateAdded: formatDateToString(dateAdded, dateFormatterTitle)
        }
      };
    });
    return sortTableData(normalized, 'streams', SortOrder.DESC).map(function (value, index) {
      return _objectSpread(_objectSpread({}, value), {}, {
        rank: index + 1,
        index: index
      });
    });
  };
};
export var generateHeaders = function generateHeaders(viewportArg, t) {
  var isPlaceholder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var isPersonalized = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (isPlaceholder) {
    return generatePlaceholderHeaders(viewportArg, t);
  }

  var columns = ['rank', 'title', 'author', 'listeners', 'streams', !isPersonalized && 'dateAdded']; // use either viewport prop or largest screen

  var viewport = viewportArg || Viewport.LG;
  var isMobileViewport = viewport === Viewport.XS;
  var isTabletViewport = viewport === Viewport.SM;
  var isTabletOrMobile = isMobileViewport || isTabletViewport;
  var isDesktopViewport = [Viewport.LG, Viewport.XL].includes(viewport); // desktop viewports and larger
  // const gtDesktopViewport = [Viewport.LG, Viewport.XL].includes(viewport); // widescreen viewports

  var colgroup = [!isMobileViewport && {
    key: columns[0],
    colWidth: 52
  }, {
    key: columns[1],
    colWidth: '*'
  }, !isTabletOrMobile && {
    key: columns[2],
    colWidth: 120
  }, !isTabletOrMobile && {
    key: columns[3],
    colWidth: 120
  }, {
    key: columns[4],
    colWidth: 120
  }, !isPersonalized && isDesktopViewport && {
    key: columns[5],
    colWidth: 120
  }].filter(function (d) {
    return d;
  });
  var headers = [!isMobileViewport && {
    title: '#',
    key: columns[0],
    align: 'right',
    numerical: true
  }, {
    title: t('MUSIC_PLAYLISTS_e4692c', 'title', ''),
    key: 'title',
    hasSmallThumbnail: isMobileViewport,
    thumbnailKey: 'thumbnailUrl',
    thumbnailSubtitleKey: 'subtitle',
    formattedTitleText: true,
    isSortable: true,
    truncate: isMobileViewport
  }, !isTabletOrMobile && {
    title: t('MUSIC_PLAYLISTS_746336', 'Made by', ''),
    key: columns[2],
    isSortable: true,
    align: 'left',
    formattedTitleText: true
  }, !isTabletOrMobile && {
    title: t('MUSIC_PLAYLISTS_605606', 'Listeners', ''),
    key: columns[3],
    isSortable: true,
    align: 'right',
    numerical: true,
    formattedTitleText: true
  }, {
    title: t('MUSIC_PLAYLISTS_590935', 'streams', ''),
    key: columns[4],
    isSortable: true,
    align: 'right',
    numerical: true,
    formattedTitleText: true,
    truncate: false
  }, !isPersonalized && isDesktopViewport && {
    title: t('MUSIC_PLAYLISTS_033181', 'date added', ''),
    key: columns[5],
    isSortable: true,
    align: 'right',
    numerical: true,
    formattedTitleText: true
  }].filter(function (d) {
    return d;
  });
  return {
    headers: headers,
    colgroup: colgroup
  };
};
export var generatePlaceholderHeaders = function generatePlaceholderHeaders(viewportArg, t) {
  var columns = ['rank', 'title', 'description']; // use either viewport prop or largest screen

  var viewport = viewportArg || Viewport.LG;
  var isMobileViewport = viewport === Viewport.XS;
  var isTabletViewport = viewport === Viewport.SM;
  var showDescription = !(isTabletViewport || isMobileViewport);
  var colgroup = [!isMobileViewport && {
    key: columns[0],
    colWidth: 52
  }, {
    key: columns[1],
    colWidth: '*'
  }, showDescription && {
    key: columns[2],
    colWidth: 500
  }].filter(function (d) {
    return d;
  });
  var headers = [!isMobileViewport && {
    title: '#',
    key: columns[0],
    align: 'right',
    numerical: true
  }, {
    title: t('MUSIC_PLAYLISTS_0444d1', 'title', 'Column header for a table.'),
    key: 'title',
    hasSmallThumbnail: isMobileViewport,
    thumbnailKey: 'thumbnailUrl',
    thumbnailSubtitleKey: 'subtitle',
    formattedTitleText: true,
    isSortable: true,
    truncate: isMobileViewport
  }, showDescription && {
    title: t('MUSIC_PLAYLISTS_210c92', 'description', ''),
    key: columns[2],
    isSortable: false,
    formattedTitleText: true
  }].filter(function (d) {
    return d;
  });
  return {
    headers: headers,
    colgroup: colgroup
  };
};