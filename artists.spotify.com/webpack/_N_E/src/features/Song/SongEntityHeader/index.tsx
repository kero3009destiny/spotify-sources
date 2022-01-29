import _slicedToArray from "/var/jenkins_home/workspace/tingle.acf7316e-c5eb-4849-947a-e5dd91fd7b9e/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import React from 'react';
import has from 'lodash/has';
import styled from 'styled-components';
import { Type, salmon } from '@spotify-internal/encore-web-v3';
import { canvasExperience, storylinesExperience } from '@mrkt/features/experience-definitions';
import { createErrorBoundary } from '@mrkt/features/Platform';
import { EntityHeader } from '../EntityHeader';
import { RealtimeStreams } from '../../RealtimeStreams';
import { Canvas } from '../Canvas';
import { Storyline } from '../Storyline';
import { useSongEntityHeaderData } from './SongEntityHeaderResource';
import { useNumberFormatter, useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var LiveText = styled.span.withConfig({
  displayName: "SongEntityHeader__LiveText",
  componentId: "sc-7c7g9o-0"
})(["color:", ";"], salmon);
var StreamsText = styled(Type).attrs({
  forwardedAs: 'h2',
  weight: Type.bold,
  condensed: true
}).withConfig({
  displayName: "SongEntityHeader__StreamsText",
  componentId: "sc-7c7g9o-1"
})(["text-transform:lowercase;"]);
var StreamCount = styled.span.withConfig({
  displayName: "SongEntityHeader__StreamCount",
  componentId: "sc-7c7g9o-2"
})(["font-feature-settings:'tnum';"]);
var VisualControls = styled.div.withConfig({
  displayName: "SongEntityHeader__VisualControls",
  componentId: "sc-7c7g9o-3"
})(["display:flex;flex-direction:row;align-items:center;margin-bottom:24px;"]);

var _createErrorBoundary = createErrorBoundary({
  view: 'song-entity',
  experience: storylinesExperience
}),
    _createErrorBoundary2 = _slicedToArray(_createErrorBoundary, 1),
    StorylinesErrorBoundary = _createErrorBoundary2[0];

var _createErrorBoundary3 = createErrorBoundary({
  view: 'song-entity',
  experience: canvasExperience
}),
    _createErrorBoundary4 = _slicedToArray(_createErrorBoundary3, 1),
    CanvasErrorBoundary = _createErrorBoundary4[0];

var renderActions = function renderActions() {
  return /*#__PURE__*/_jsxs(VisualControls, {
    children: [/*#__PURE__*/_jsx(StorylinesErrorBoundary, {
      fallback: null,
      children: /*#__PURE__*/_jsx(Storyline, {})
    }), /*#__PURE__*/_jsx(CanvasErrorBoundary, {
      fallback: null,
      children: /*#__PURE__*/_jsx(Canvas, {})
    })]
  });
};

export function SongEntityHeader(_ref) {
  var artistId = _ref.artistId,
      location = _ref.location,
      match = _ref.match,
      _ref$song = _ref.song,
      songName = _ref$song.name,
      songId = _ref$song.id,
      songImages = _ref$song.images;
  var data = useSongEntityHeaderData(artistId, songId);
  var showStreamsBadge = !has(data, 'statusCode') && has(data, 'totalStreams');
  var showRealtime = has(data, 'websocketUrl');
  var t = useT();
  var formatter = useNumberFormatter();
  return /*#__PURE__*/_jsx(EntityHeader, {
    artistId: artistId,
    attributes: showStreamsBadge ? [{
      label: /*#__PURE__*/_jsxs("span", {
        children: [t('SONG_ENTITY_HDR_15ba94', 'All-time', ''), showRealtime && /*#__PURE__*/_jsxs("span", {
          children: [' ', "\u2022", ' ', /*#__PURE__*/_jsx(LiveText, {
            children: t('SONG_ENTITY_HDR_d36ad2', 'live', 'This is a label that appears next to a constantly updating number which shows the amount of live streams a song has.')
          })]
        })]
      }),
      value: showRealtime ? /*#__PURE__*/_jsx(RealtimeStreams, {
        "data-testid": "realtime-streams",
        songId: songId // @ts-ignore
        ,
        initialTotalStreams: formatter.format(data.totalStreams)
      }) : /*#__PURE__*/_jsx(StreamsText, {
        children: t('SONG_ENTITY_HDR_590935', "{count, plural,\n                        one {{count} stream}\n                        other {{count} streams}\n                      }", 'Example Usage: 34,080 streams', {
          // @ts-ignore
          count: formatter.format(data.totalStreams)
        })
      }),
      hasPriority: true
    }] : [],
    "data-testid": "entity-header",
    images: songImages,
    location: location,
    match: match,
    songId: songId,
    title: songName,
    actions: renderActions()
  });
}