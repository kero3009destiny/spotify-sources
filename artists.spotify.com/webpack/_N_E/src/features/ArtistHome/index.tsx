import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import get from 'lodash/get';
import { screenXsMax, screenSmMin, screenSmMax, screenMdMin, screenMdMax, screenLgMin, screenLgMax, screenXlMin, spacer24, spacer40 } from '@spotify-internal/encore-web';
import { DocumentTitle } from '@mrkt/features/document-title';
import { MeaningfulPaint } from '../../shared/components/MeaningfulPaint';
import { useCurrentArtist } from '../../features/artists';
import { useIsHomeEnabledForCurrentUser } from './useIsHomeEnabledForCurrentUser';
import StatSection from './StatSection';
import HeaderSection from './HeaderSection';
import StatsTopHeader from './StatSection/StatsTopHeader';
import CardGridLayout from './CardSection/CardGridLayout';
import { useHomeTracker } from './HomeTracker';
import { useHomeData } from './useHomeData';
import { useViewport, Viewport, breakpointValues } from '../../shared/lib/useViewport';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var GridLayout = styled.div.withConfig({
  displayName: "ArtistHome__GridLayout",
  componentId: "d2yk8w-0"
})(["display:grid;min-width:0;@media (max-width:", "){grid-template-areas:'header' 'listeners' 'stats' 'cards';grid-template-columns:1fr;}@media (min-width:", ") and (max-width:", "){grid-column-gap:", ";grid-template-areas:'header statsheader' 'listeners stats' 'cards stats';grid-template-columns:1fr 1fr;}@media (min-width:", ") and (max-width:", "){grid-column-gap:", ";grid-template-areas:'header statsheader' 'listeners stats' 'cards stats';grid-template-columns:7fr 3fr;}@media (min-width:", ") and (max-width:", "){grid-column-gap:", ";grid-template-areas:'header statsheader' 'listeners stats' 'cards stats';grid-template-columns:3fr 1fr;}@media (min-width:", "){grid-column-gap:", ";grid-template-areas:'header statsheader' 'listeners stats' 'cards stats';grid-template-columns:4fr 1fr;}"], screenXsMax, screenSmMin, screenSmMax, spacer24, screenMdMin, screenMdMax, spacer40, screenLgMin, screenLgMax, spacer40, screenXlMin, spacer40);
export { useIsHomeEnabledForCurrentUser };
export function ArtistHome(props) {
  var t = useT();
  var history = props.history;
  var artist = useCurrentArtist();
  var viewport = useViewport();

  var _useState = useState(0),
      activeStatsTabIndex = _useState[0],
      setActiveTabIndex = _useState[1];

  var onChangeStatsTab = useCallback(function (e, index) {
    e.preventDefault();
    setActiveTabIndex(index);
  }, [setActiveTabIndex]);
  var isMobile = viewport === Viewport.XS;
  var response = useHomeData(artist.id);
  var homeTracker = useHomeTracker();
  var latestDate = get(response, 'data.homestats.s4xinsightsapi.latestDate');
  var listenersData = get(response, 'data.homestats.s4xinsightsapi.overview.listeners', {});
  var streamsData = get(response, 'data.homestats.s4xinsightsapi.overview.streams', {});
  var followersData = get(response, 'data.homestats.s4xinsightsapi.overview.followers', {});
  var topSongsList = get(response, 'data.homestats.s4xinsightsapi.recordingStatsTable.recordingStatsList', []);
  var topPlaylistsList = get(response, 'data.homestats.s4xinsightsapi.playlistCollection.dataList', []);
  var cardData = get(response, 'data.homestats.cards.cardsList', []);

  var statSectionWithProps = /*#__PURE__*/_jsx(StatSection, _objectSpread(_objectSpread({}, props), {}, {
    artist: artist,
    isMobile: isMobile,
    onChangeStatsTab: onChangeStatsTab,
    activeStatsTabIndex: activeStatsTabIndex,
    latestDate: latestDate,
    listeners: listenersData,
    streams: streamsData,
    followers: followersData,
    topSongs: topSongsList,
    topPlaylists: topPlaylistsList
  }));

  return /*#__PURE__*/_jsx(DocumentTitle, {
    title: t('1cf40d', 'Home – {artistName} – Spotify for Artists', '', {
      artistName: artist.name
    }),
    children: /*#__PURE__*/_jsx(MeaningfulPaint, {
      children: /*#__PURE__*/_jsxs(GridLayout, {
        children: [/*#__PURE__*/_jsx(HeaderSection, {}), isMobile ? statSectionWithProps : null, /*#__PURE__*/_jsx(CardGridLayout, {
          cardData: cardData,
          artist: artist,
          history: history,
          viewport: breakpointValues[viewport],
          tracker: homeTracker
        }), !isMobile ? /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx(StatsTopHeader, {
            latestDate: latestDate
          }), statSectionWithProps]
        }) : null]
      })
    })
  });
}