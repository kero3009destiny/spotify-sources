import * as React from 'react';
import styled from 'styled-components';
import { OverlayTrigger, Popover, Tooltip, Type, VisuallyHidden } from '@spotify-internal/encore-web-v3';
import { dataDarkBlue } from '@mrkt/features/creator-color-tokens';
import { useT } from '@mrkt/features/i18n';
import { useSourcesOfStreamsNormalizer } from '../../features/ArtistAudience/normalizers/sources';
import { useViewport, Viewport, breakpointValues } from '../../shared/lib/useViewport';
import { useGetString } from '../../shared/messages/strings';
import { ResizeContainer } from '../../shared/components/ResizeContainer';
import { ColumnChart, RowChart } from '../../shared/components/Chart';
import { useCurrentArtist } from '../../features/artists';
import { useSourceOfStreamsRawData } from './hooks/useSourceOfStreamsRawData';
import { Section } from '../Section';
import { useCurrentSong } from './hooks/useCurrentSong';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var QA_ID = 'sources-of-streams';
var StyledErrorWrapper = styled.div.withConfig({
  displayName: "SourcesOfStreams__StyledErrorWrapper",
  componentId: "hkttfa-0"
})(["", ";"], function (props) {
  return props.smallScreen ? 'text-align: center' : '';
});
export var SourcesOfStreams = function SourcesOfStreams() {
  var _data$payload;

  var artist = useCurrentArtist();
  var t = useT();
  var strings = useGetString();
  var messages = {
    headline: t('SONG_STREAM_SOURCES_4111e2', 'Source of streams', ''),
    subtitle: [t('SONG_STREAM_SOURCES_b98dff', 'Streams', ''), t('SONG_STREAM_SOURCES_b75971', 'Last 28 Days', '')].join(' • ')
  };

  var _useCurrentSong = useCurrentSong(),
      currentSongId = _useCurrentSong.id,
      songName = _useCurrentSong.name;

  var data = useSourceOfStreamsRawData(currentSongId);
  var raw = (_data$payload = data === null || data === void 0 ? void 0 : data.payload) !== null && _data$payload !== void 0 ? _data$payload : [];
  var normalized = useSourcesOfStreamsNormalizer(raw);

  var generateTooltipBody = function generateTooltipBody(d) {
    return /*#__PURE__*/_jsx(Type, {
      as: "p",
      variant: Type.body2,
      condensed: true,
      children: d
    });
  };

  var renderRowChart = function renderRowChart(width, normalizedData) {
    return /*#__PURE__*/_jsx(RowChart, {
      artist: artist,
      category: "streamSource",
      data: normalizedData,
      width: width,
      renderTooltip: function renderTooltip(d, onClose) {
        return /*#__PURE__*/_jsx(Popover, {
          "aria-hidden": "true",
          onClose: onClose,
          popoverTitle: d.message.defaultMessage,
          children: generateTooltipBody(d.tooltip.defaultMessage)
        });
      }
    });
  };

  var renderColChart = function renderColChart(width, normalizedData) {
    return /*#__PURE__*/_jsx(ColumnChart, {
      artist: artist,
      category: "streamSource",
      color: dataDarkBlue,
      data: normalizedData,
      width: width,
      qaId: "song-".concat(QA_ID),
      renderTooltip: function renderTooltip(d, pos) {
        return /*#__PURE__*/_jsx(OverlayTrigger, {
          placement: pos.x > width ? OverlayTrigger.left : OverlayTrigger.right,
          overlay: /*#__PURE__*/_jsx(Tooltip, {
            children: generateTooltipBody(d)
          })
        });
      }
    });
  };

  var viewport = useViewport();
  var isXSmallScreen = viewport === Viewport.XS;

  if (data.status > 200) {
    return /*#__PURE__*/_jsx(Section, {
      id: QA_ID,
      title: messages.headline,
      subtitle: messages.subtitle,
      children: data.status !== 204 ? /*#__PURE__*/_jsx(StyledErrorWrapper, {
        smallScreen: isXSmallScreen,
        children: strings.insightsError
      }) : /*#__PURE__*/_jsx(StyledErrorWrapper, {
        smallScreen: isXSmallScreen,
        children: /*#__PURE__*/_jsx(Type, {
          as: "p",
          children: t('SONG_STREAM_SOURCES_c6009a', 'Once a listener plays your song, this is where you’ll see how they streamed it. Learn how to promote your song.', '')
        })
      })
    });
  }

  return /*#__PURE__*/_jsxs(Section, {
    id: QA_ID,
    title: messages.headline,
    subtitle: messages.subtitle,
    children: [/*#__PURE__*/_jsx(VisuallyHidden, {
      children: t('SONG_STREAM_SOURCES_79b6ee', 'Chart for {songName} showing source of streams for the last 28 days. Press enter for a short description of the source when navigating the chart.', '', {
        songName: songName
      })
    }), /*#__PURE__*/_jsx(ResizeContainer, {
      viewport: breakpointValues[viewport],
      render:
      /* istanbul ignore next */
      function render(width) {
        return !isXSmallScreen ? renderColChart(width, normalized) : renderRowChart(width, normalized);
      }
    })]
  });
};