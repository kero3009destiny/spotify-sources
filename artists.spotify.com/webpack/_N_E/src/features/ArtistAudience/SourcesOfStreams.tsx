import React from 'react';
import { OverlayTrigger, Popover, Tooltip, Type, VisuallyHidden } from '@spotify-internal/encore-web-v3';
import { useT } from '@mrkt/features/i18n';
import { dataDarkBlue } from '@mrkt/features/creator-color-tokens';
import { useImpressionUBILogger } from '@mrkt/features/ubi';
import { StyledErrorMessage } from '../../shared/messages/styles';
import { useGetString } from '../../shared/messages/strings';
import { ResizeContainer } from '../../shared/components/ResizeContainer';
import { ColumnChart, RowChart } from '../../shared/components/Chart';
import { useCurrentArtist } from '../../features/artists';
import { useSourcesOfStreamsNormalizer } from './normalizers/sources';
import { useHasAudienceCountryFilters } from './hooks/useHasAudienceCountryFilters';
import { useSourceOfStreamsData } from './resources/useSourceOfStreamsData';
import { useViewport, Viewport, breakpointValues } from '../../shared/lib/useViewport';
import { Section } from '../Section';
import { ubiAudienceSpec } from './ubiAudienceSpec';
import { useCurrentOrgOrNull } from '../artists/src/useCurrentOrgOrNull';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function SourcesOfStreams(_ref) {
  var _data$payload;

  var country = _ref.country;
  var artist = useCurrentArtist();
  var hasCountryFilters = useHasAudienceCountryFilters();
  var org = useCurrentOrgOrNull();
  var orgUri = org && org.uri;
  var strings = useGetString();
  var selectedCountry = hasCountryFilters && country !== null && country !== void 0 && country.name ? "".concat(country.name) : '';
  var t = useT();
  var subtitle = [t('SOURCES_OF_STREAMS_b98dff', 'Streams', ''), t('SOURCES_OF_STREAMS_b75971', 'Last 28 Days', ''), selectedCountry].filter(Boolean).join(' • ');
  var text = {
    sectionTitle: t('SOURCES_OF_STREAMS_4111e2', 'Source of streams', ''),
    sectionSubtitle: subtitle
  };
  var data = useSourceOfStreamsData(country);
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

  var audienceSourceOfStreamsFactory = ubiAudienceSpec().sourceOfStreamsFactory();
  var chartImpressionFactory = audienceSourceOfStreamsFactory.chartFactory();

  var _useImpressionUBILogg = useImpressionUBILogger(chartImpressionFactory, artist.id, orgUri),
      chartRef = _useImpressionUBILogg.ref;

  var renderRowChart = function renderRowChart(width, normalizedData) {
    return /*#__PURE__*/_jsx(RowChart, {
      artist: artist,
      category: "streamSource",
      data: normalizedData,
      width: width,
      ref: chartRef,
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
      ref: chartRef,
      qaId: "audience-sources-of-streams",
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
  var isViewportXS = viewport === Viewport.XS;
  var emptyStateImpressionFactory = audienceSourceOfStreamsFactory.emptyStateFactory();

  var _useImpressionUBILogg2 = useImpressionUBILogger(emptyStateImpressionFactory, artist.id, orgUri),
      emptyStateRef = _useImpressionUBILogg2.ref;

  var errorStateImpressionFactory = audienceSourceOfStreamsFactory.errorStateFactory();

  var _useImpressionUBILogg3 = useImpressionUBILogger(errorStateImpressionFactory, artist.id, orgUri),
      errorStateRef = _useImpressionUBILogg3.ref;

  if (data.status > 200) {
    return /*#__PURE__*/_jsx(Section, {
      id: "sources-of-streams",
      title: text.sectionTitle,
      subtitle: text.sectionSubtitle,
      children: /*#__PURE__*/_jsx(StyledErrorMessage, {
        isviewportxs: isViewportXS,
        children: data.status !== 204 ? /*#__PURE__*/_jsx(Type, {
          as: "p",
          ref: errorStateRef,
          children: strings.insightsError
        }) : /*#__PURE__*/_jsx(Type, {
          as: "p",
          ref: emptyStateRef,
          children: t('SOURCES_OF_STREAMS_b49829', 'As your audience grows, you’ll see which features your listeners use to play your music.', 'In this context "features" refers to the source a listener uses to play an artists’ music. Possible values include: Your profile and catalog, Listener’s own playlist and library, Other listener’s playlist, Spotify editorial playlists, Spotify algorithmic playlists, and Other.')
        })
      })
    });
  }

  return /*#__PURE__*/_jsxs(Section, {
    id: "sources-of-streams",
    title: text.sectionTitle,
    subtitle: text.sectionSubtitle,
    children: [/*#__PURE__*/_jsx(VisuallyHidden, {
      children: t('SOURCES_OF_STREAMS_d86e27', 'Chart for {artistName} showing source of streams, {countryName}, for the last 28 days. Press enter for a short description of the source when navigating the chart.', 'Screen reader text', {
        artistName: artist.name,
        countryName: country.name
      })
    }), /*#__PURE__*/_jsx(ResizeContainer, {
      viewport: breakpointValues[viewport],
      render: function render(width) {
        return !isViewportXS ? renderColChart(width, normalized) : renderRowChart(width, normalized);
      }
    })]
  });
}