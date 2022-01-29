import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { Suspense } from 'react';
import { Type } from '@spotify-internal/encore-web-v3';
import { useT } from '@mrkt/features/i18n';
import has from 'lodash/has';
import { LoadingIndicator } from '../../../shared/components/LoadingIndicator';
import { useGetString } from '../../../shared/messages/strings';
import { validateQueryOptions } from '../../../features/CatalogUtils/urls';
import { StyleEmptyStateContainer } from '../Styles';
import { useCurrentArtist, useCurrentArtistCanvasAccess } from '../../../features/artists';
import SongsTable from '../../SongsTable';
import { SONGS_ROUTE, TIME_FILTER, useGetCatalogFilterOptions } from '../../../features/CatalogUtils/constants';
import { useViewport } from '../../../shared/lib/useViewport';
import SongsResource from './Loader';
import { InfoMessage } from '../../InfoMessage';
import { jsx as _jsx } from "react/jsx-runtime";

function SongsComponent(_ref) {
  var location = _ref.location,
      history = _ref.history,
      searchQuery = _ref.searchQuery;
  var artist = useCurrentArtist();
  var artistHasCanvasAccess = useCurrentArtistCanvasAccess();
  var strings = useGetString();
  var viewport = useViewport();
  var getCatalogFilterOptions = useGetCatalogFilterOptions();
  var CATALOG_FILTER_OPTIONS = getCatalogFilterOptions(SONGS_ROUTE);
  var query = validateQueryOptions(TIME_FILTER, location.search, CATALOG_FILTER_OPTIONS, SONGS_ROUTE);
  var t = useT();
  var emptyMessage = {
    title: t('MUSIC_SONGS_d606f7', 'No stats yet', ''),
    description: t('MUSIC_SONGS_c69662', 'When you have released music you’ll find it here.', '')
  };
  var unauthorizedMessage = t('MUSIC_SONGS_4a07da', "You do not have access to this artist's catalog.", ''); // DocumentTitle

  React.useEffect(function () {
    document.title = t('MUSIC_SONGS_2bbaff', 'Music – Songs – {data} – Spotify for Artists', '', {
      data: artist.name
    });
  }, [artist.name]);
  var response = SongsResource.read({
    artistId: artist.id,
    query: query
  });
  var showCanvasColumn = artistHasCanvasAccess;
  React.useEffect(function () {
    // do nothing for now on mount, but invalidate when things change or on unmount
    return function cleanup() {
      SongsResource.invalidate({
        artistId: artist.id,
        query: query
      });
    };
  }, [artist.id, query]);

  if (has(response, 'statusCode') && response.statusCode === 204) {
    return /*#__PURE__*/_jsx(InfoMessage, {
      title: emptyMessage.title,
      text: emptyMessage.description,
      icon: "blueIconTrending"
    });
  }
  /**
   * Our API helper returns an error object with
   * { name: 'ResponseError', statusCode: ... }.
   *
   * source: src/lib/api/helpers.js
   */


  if (has(response, 'statusCode') && response.statusCode >= 400) {
    if (response.statusCode === 403) {
      return (
        /*#__PURE__*/
        // @ts-ignore
        _jsx(StyleEmptyStateContainer, {
          "data-testid": "songs-unauthorized",
          children: /*#__PURE__*/_jsx(Type.p, {
            children: unauthorizedMessage
          })
        })
      );
    }

    return /*#__PURE__*/_jsx(Type.h2, {
      "data-testid": "songs-error",
      children: strings.insightsError
    });
  }

  var filteredResponse = _objectSpread(_objectSpread({}, response), {}, {
    recordingStats: response.recordingStats && response.recordingStats.filter(function (item) {
      return item.trackName.toLowerCase().includes(searchQuery.toLowerCase());
    })
  });

  return /*#__PURE__*/_jsx("section", {
    "data-testid": "songs-table",
    children: /*#__PURE__*/_jsx(SongsTable, {
      artistId: artist.id,
      timeFilter: query,
      viewport: viewport,
      data: filteredResponse,
      location: location,
      history: history,
      showCanvasColumn: showCanvasColumn
    })
  });
}

export function Songs(props) {
  return /*#__PURE__*/_jsx(Suspense, {
    fallback: /*#__PURE__*/_jsx(LoadingIndicator, {}),
    children: /*#__PURE__*/_jsx(SongsComponent, _objectSpread({}, props))
  });
}