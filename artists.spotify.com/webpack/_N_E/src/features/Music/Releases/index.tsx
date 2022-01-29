import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useState, Suspense, Fragment } from 'react';
import styled from 'styled-components';
import { Table, TableHeaderCell, TableRow, Type, spacer24, Tooltip, IconHelpAlt } from '@spotify-internal/encore-web';
import has from 'lodash/has'; // @ts-ignore

import { TableTooltip } from '@mrkt/features/stats-components';
import { useT } from '@mrkt/features/i18n';
import { useRtl } from '@mrkt/features/i18n/hooks/useRtl';
import { LoadingIndicator } from '../../../shared/components/LoadingIndicator';
import { useReleasesNormalizer } from '../../../features/CatalogUtils/ReleasesNormalizer';
import { useGetString } from '../../../shared/messages/strings';
import { validateQueryOptions } from '../../../features/CatalogUtils/urls';
import { StyleEmptyStateContainer, StyledTooltipTrigger, StyledButtonIcon, WrappedTooltipContent } from '../Styles';
import { RELEASES_ROUTE, TIME_FILTER, useGetCatalogFilterOptions } from '../../../features/CatalogUtils/constants';
import { useCurrentArtist, useCurrentArtistCanvasAccess } from '../../../features/artists';
import { useViewport, Viewport } from '../../../shared/lib/useViewport';
import { ReleasesResource } from './Loader';
import { TableBody } from './TableBody';
import Colgroup from './Colgroup';
import { useHasReleaseStatsPage } from '../../ReleaseStats/hooks/useReleaseStatsPage';
import { useReleaseErrorStateLogger } from '../hooks/useMusicUbi';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyleReleasesTable = styled(Table).withConfig({
  displayName: "Releases__StyleReleasesTable",
  componentId: "zcggs9-0"
})(["margin-top:", ";"], spacer24);
var StyleTableHeaderRow = styled(TableRow).withConfig({
  displayName: "Releases__StyleTableHeaderRow",
  componentId: "zcggs9-1"
})(["th{font-weight:400;letter-spacing:1px;}.th-no-wrap{white-space:nowrap;}"]);
export var ReleasesComponent = function ReleasesComponent(_ref) {
  var location = _ref.location,
      history = _ref.history;
  var viewport = useViewport();
  var artist = useCurrentArtist();
  var normalize = useReleasesNormalizer();
  var artistHasCanvasAccess = useCurrentArtistCanvasAccess();

  var _useState = useState(),
      tooltipData = _useState[0],
      setTooltipData = _useState[1];

  var hasReleaseStatsPageFeature = useHasReleaseStatsPage();
  var getCatalogFilterOptions = useGetCatalogFilterOptions();
  var CATALOG_FILTER_OPTIONS = getCatalogFilterOptions(RELEASES_ROUTE);

  var _useReleaseErrorState = useReleaseErrorStateLogger(),
      errorStateRef = _useReleaseErrorState.ref;

  var query = validateQueryOptions(TIME_FILTER, location.search, CATALOG_FILTER_OPTIONS, RELEASES_ROUTE);
  var t = useT();
  var strings = useGetString();
  var rtl = useRtl(); // DocumentTitle

  React.useEffect(function () {
    document.title = t('MUSIC_RELEASES_b74f4e', 'Music – Releases – {data} – Spotify for Artists', '', {
      data: artist.name
    });
  }, [artist.name, t]);
  var response = ReleasesResource.read({
    artistId: artist.id,
    query: query
  });
  React.useEffect(function () {
    // do nothing for now on mount, but invalidate when things change or on unmount
    return function cleanup() {
      ReleasesResource.invalidate({
        artistId: artist.id,
        query: query
      });
    };
  }, [artist.id, query]);

  if (has(response, 'statusCode') && response.statusCode === 204) {
    return (
      /*#__PURE__*/
      // @ts-ignore
      _jsx(StyleEmptyStateContainer, {
        "data-testid": "releases-empty",
        children: /*#__PURE__*/_jsx(Type.p, {
          children: t('MUSIC_RELEASES_c69662', 'When you have released music you’ll find it here.', '')
        })
      })
    );
  }
  /**
   * Our API helper returns an error object with
   * { name: 'ResponseError', statusCode: ... }.
   *
   * source: src/lib/api/helpers.js
   */


  if (has(response, 'name') && response.name === 'ResponseError') {
    return /*#__PURE__*/_jsxs(Type, {
      ref: errorStateRef,
      variant: "heading2",
      "data-testid": "releases-error",
      children: [/*#__PURE__*/_jsx("br", {}), strings.insightsError]
    });
  }

  var normalized = normalize(response.releases); // previous viewport logic took into account other viewport sizes
  // eg viewport <= VIEWPORT_SM (included VIEWPORT_XS sizes in this)

  var isXSmallScreen = viewport === Viewport.XS;
  var isSmallScreen = viewport === Viewport.SM || isXSmallScreen;
  var isMediumScreen = viewport === Viewport.MD || isSmallScreen;
  var showMarquee = !isSmallScreen;
  return /*#__PURE__*/_jsxs(Fragment, {
    children: [tooltipData && /*#__PURE__*/_jsx(TableTooltip, _objectSpread({}, tooltipData)), /*#__PURE__*/_jsxs(StyleReleasesTable, {
      "data-testid": "releases-table",
      children: [/*#__PURE__*/_jsx(Colgroup, {
        isSmallScreen: isSmallScreen,
        isMediumScreen: isMediumScreen,
        showCanvasColumn: artistHasCanvasAccess
      }), /*#__PURE__*/_jsx("thead", {
        children: /*#__PURE__*/_jsxs(StyleTableHeaderRow, {
          children: [/*#__PURE__*/_jsx(TableHeaderCell, {
            colSpan: 2,
            children: strings.releases
          }), /*#__PURE__*/_jsx(TableHeaderCell, {}), /*#__PURE__*/_jsx(TableHeaderCell, {
            align: "right",
            className: "th-no-wrap",
            children: strings.streams
          }), !isMediumScreen && /*#__PURE__*/_jsx(TableHeaderCell, {
            align: "right",
            className: "th-no-wrap",
            children: strings.listeners
          }), !isSmallScreen && artistHasCanvasAccess && /*#__PURE__*/_jsx(TableHeaderCell, {
            align: "right",
            className: "th-no-wrap",
            children: strings.views
          }), !isMediumScreen && /*#__PURE__*/_jsxs(TableHeaderCell, {
            align: "right",
            className: "th-no-wrap",
            children: [strings.saves, /*#__PURE__*/_jsx(StyledTooltipTrigger, {
              tooltip: /*#__PURE__*/_jsx(Tooltip, {
                id: "releases-saves-tooltip",
                children: /*#__PURE__*/_jsx(WrappedTooltipContent, {
                  children: t('releases-saves-tooltip-late', 'The number of times people saved your music to their library, showing an intention to listen again in the future.', 'releases saves tooltip text')
                })
              }),
              tooltipId: "releases-saves-tooltip",
              isRtl: rtl,
              placement: rtl ? 'bottomLeft' : 'bottom',
              children: /*#__PURE__*/_jsx(StyledButtonIcon, {
                "aria-labelledby": "SavesColumnInfoIcon",
                children: /*#__PURE__*/_jsx(IconHelpAlt, {
                  iconSize: 16
                })
              })
            })]
          }), !isSmallScreen && /*#__PURE__*/_jsx(TableHeaderCell, {
            align: "right",
            "data-testid": "releases-date",
            className: "th-no-wrap",
            title: strings.firstReleasedTitle,
            children: strings.firstReleased
          })]
        })
      }), normalized.map(function (d, index) {
        return /*#__PURE__*/_jsx(TableBody, _objectSpread({
          artist: artist,
          isSmallScreen: isSmallScreen,
          isXSmallScreen: isXSmallScreen,
          isMediumScreen: isMediumScreen,
          showMarquee: showMarquee,
          showCanvasColumn: artistHasCanvasAccess,
          setTooltipData: setTooltipData,
          location: location,
          history: history,
          hasReleaseStatsPageFeature: hasReleaseStatsPageFeature,
          albumRowIndex: index
        }, d), d.albumUri);
      })]
    })]
  });
};
export var Releases = function Releases(props) {
  return /*#__PURE__*/_jsx(Suspense, {
    fallback: /*#__PURE__*/_jsx(LoadingIndicator, {}),
    children: /*#__PURE__*/_jsx(ReleasesComponent, _objectSpread({}, props))
  });
};