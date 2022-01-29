import React from 'react';
import { Type } from '@spotify-internal/encore-web-v3';
import { useT } from '@mrkt/features/i18n';
import { StyledErrorMessage } from '../../shared/messages/styles';
import { useGetString } from '../../shared/messages/strings';
import { ResizeContainer } from '../../shared/components/ResizeContainer';
import { CountryStats, MapChartWrapper } from '../../shared/components/Chart';
import { useTopCountriesNormalizer } from '../ArtistAudience/normalizers/topCountries';
import { useLocationsNormalizer } from '../ArtistAudience/normalizers/locations';
import { Section } from '../Section';
import { useWhereTheyListenData } from './hooks/useWhereTheyListenData';
import { useBreakpointValue, breakpointValues, Viewport } from '../../shared/lib/useViewport';
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
export function WhereTheyListen(_ref) {
  var _data$geography;

  var songId = _ref.songId;
  var data = useWhereTheyListenData(songId);
  var viewport = useBreakpointValue();
  var isViewportXS = viewport <= breakpointValues[Viewport.XS];
  var isViewportSmall = viewport <= breakpointValues[Viewport.SM];
  var t = useT();
  var strings = useGetString();
  var sectionTitle = t('SONG_WHERE_THEY_LISTEN_0fb80a', 'Top countries for this song', '');
  var raw = (_data$geography = data === null || data === void 0 ? void 0 : data.geography) !== null && _data$geography !== void 0 ? _data$geography : [];
  var normalizedLocations = useLocationsNormalizer(raw);
  var normalizedTopCountries = useTopCountriesNormalizer(raw);

  if (data.status > 200) {
    return /*#__PURE__*/_jsx(Section, {
      id: "where-they-listen",
      title: sectionTitle,
      children: /*#__PURE__*/_jsx(StyledErrorMessage, {
        isviewportxs: isViewportXS,
        children: data.status !== 204 ? /*#__PURE__*/_jsx(_Fragment, {
          children: strings.insightsError
        }) : /*#__PURE__*/_jsx(Type, {
          as: "p",
          children: t('SONG_WHERE_THEY_LISTEN_f537b1', 'Once a listener plays your song, this is where you’ll see which countries this song is most popular in.', '')
        })
      })
    });
  }

  return /*#__PURE__*/_jsx(Section, {
    id: "where-they-listen",
    title: sectionTitle,
    children: /*#__PURE__*/_jsx(ResizeContainer, {
      viewport: viewport,
      render:
      /* istanbul ignore next */
      function render(width) {
        return /*#__PURE__*/_jsx(MapChartWrapper, {
          statKey: CountryStats.STREAMS,
          stat: t('SONG_WHERE_THEY_LISTEN_a0429b', 'streams', ''),
          tableData: normalizedTopCountries,
          mapData: normalizedLocations,
          width: width,
          isViewportXS: isViewportXS,
          isViewportSM: isViewportSmall,
          qaId: "song-where-they-listen"
        });
      }
    })
  });
}