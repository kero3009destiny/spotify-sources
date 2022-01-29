import * as React from 'react';
import { Type } from '@spotify-internal/encore-web-v3';
import { useT } from '@mrkt/features/i18n';
import { StyledErrorMessage } from '../../shared/messages/styles';
import { useGetString } from '../../shared/messages/strings';
import { TopCitiesTable } from '../../shared/components/Chart';
import { useTopCitiesNormalizer } from '../SongNormalizers/topCities';
import { useTopCitiesData } from './hooks/useTopCitiesData';
import { useBreakpointValue, Viewport, breakpointValues } from '../../shared/lib/useViewport';
import { Section } from '../Section';
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
export function TopCities(_ref) {
  var _data$payload$geograp, _data$payload;

  var songId = _ref.songId;
  var data = useTopCitiesData(songId);
  var viewport = useBreakpointValue();
  var isViewportXS = viewport <= breakpointValues[Viewport.XS];
  var isViewportSmall = viewport <= breakpointValues[Viewport.SM];
  var t = useT();
  var strings = useGetString();
  var messages = {
    headline: t('SONG_TOP_CITIES_9c975c', 'Top cities for this song', '')
  };
  var raw = (_data$payload$geograp = data === null || data === void 0 ? void 0 : (_data$payload = data.payload) === null || _data$payload === void 0 ? void 0 : _data$payload.geography) !== null && _data$payload$geograp !== void 0 ? _data$payload$geograp : [];
  var normalized = useTopCitiesNormalizer(raw);

  if (data.status > 200) {
    return /*#__PURE__*/_jsx(Section, {
      id: "top-cities",
      title: messages.headline,
      children: /*#__PURE__*/_jsx(StyledErrorMessage, {
        isviewportxs: isViewportXS,
        children: data.status !== 204 ? /*#__PURE__*/_jsx(_Fragment, {
          children: strings.insightsError
        }) : /*#__PURE__*/_jsx(Type, {
          as: "p",
          children: t('SONG_TOP_CITIES_487ddf', 'Once a listener plays your song, this is where you’ll see which cities the song is most popular in.', '')
        })
      })
    });
  }

  return /*#__PURE__*/_jsx(Section, {
    id: "top-cities",
    title: messages.headline,
    children: /*#__PURE__*/_jsx(TopCitiesTable, {
      data: normalized,
      isMobile: isViewportXS,
      isSmallScreen: isViewportSmall,
      metric: t('SONG_TOP_CITIES_1a0701', 'streams', ''),
      qaId: "song-top-cities"
    })
  });
}