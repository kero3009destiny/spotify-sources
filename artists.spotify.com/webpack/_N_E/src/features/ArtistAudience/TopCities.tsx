import React from 'react';
import { Type } from '@spotify-internal/encore-web-v3';
import { useT } from '@mrkt/features/i18n';
import { StyledErrorMessage } from '../../shared/messages/styles';
import { useTopCitiesNormalizer } from '../SongNormalizers/topCities';
import { useGetString } from '../../shared/messages/strings';
import { TopCitiesTable } from '../../shared/components/Chart';
import { useTopCitiesData } from './resources/useTopCitiesData';
import { useBreakpointValue, breakpointValues, Viewport } from '../../shared/lib/useViewport';
import { Section } from '../Section';
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
export function TopCities(_ref) {
  var _data$payload$geograp, _data$payload;

  var country = _ref.country;
  var data = useTopCitiesData(country);
  var viewport = useBreakpointValue();
  var t = useT();
  var strings = useGetString();
  var isViewportXS = viewport <= breakpointValues[Viewport.XS];
  var isViewportSmall = viewport <= breakpointValues[Viewport.SM];
  var raw = (_data$payload$geograp = data === null || data === void 0 ? void 0 : (_data$payload = data.payload) === null || _data$payload === void 0 ? void 0 : _data$payload.geography) !== null && _data$payload$geograp !== void 0 ? _data$payload$geograp : [];
  var normalized = useTopCitiesNormalizer(raw);
  var headline = t('TOP_CITIES_5071d3', 'Top cities', '');

  if (data.status > 200) {
    return /*#__PURE__*/_jsx(Section, {
      id: "top-cities",
      title: headline,
      children: /*#__PURE__*/_jsx(StyledErrorMessage, {
        isviewportxs: isViewportXS,
        children: data.status !== 204 ? /*#__PURE__*/_jsx(_Fragment, {
          children: strings.insightsError
        }) : /*#__PURE__*/_jsx(Type, {
          as: "p",
          children: t('TOP_CITIES_487ddf', 'Once a listener plays your song, this is where you’ll see which cities the song is most popular in.', '')
        })
      })
    });
  }

  var subtitle = [t('TOP_CITIES_605606', 'Listeners', ''), t('TOP_CITIES_b75971', 'Last 28 Days', ''), t('TOP_CITIES_85ba27', '{countryName}', '', {
    countryName: country.name
  })].join(' • ');
  return /*#__PURE__*/_jsx(Section, {
    id: "top-cities",
    title: headline,
    subtitle: subtitle,
    children: /*#__PURE__*/_jsx(TopCitiesTable, {
      data: normalized,
      isMobile: isViewportXS,
      isSmallScreen: isViewportSmall,
      metric: t('TOP_CITIES_9c9a2c', 'listeners', ''),
      qaId: "audience-top-cities"
    })
  });
}