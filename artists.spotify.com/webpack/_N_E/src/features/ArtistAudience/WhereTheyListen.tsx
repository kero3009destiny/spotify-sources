import React from 'react';
import { Type } from '@spotify-internal/encore-web-v3';
import { useT } from '@mrkt/features/i18n';
import { StyledErrorMessage } from '../../shared/messages/styles';
import { useGetString } from '../../shared/messages/strings';
import { ResizeContainer } from '../../shared/components/ResizeContainer';
import { CountryStats, MapChartWrapper } from '../../shared/components/Chart';
import { useLocationsRawData } from './resources/useLocationsRawData';
import { useTopCountriesNormalizer } from './normalizers/topCountries';
import { useLocationsNormalizer } from './normalizers/locations';
import { useHasAudienceCountryFilters } from './hooks/useHasAudienceCountryFilters';
import { useBreakpointValue, breakpointValues, Viewport } from '../../shared/lib/useViewport';
import { Section } from '../Section';
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
export var WhereTheyListen = function WhereTheyListen(_ref) {
  var _data$geography;

  var country = _ref.country;
  var data = useLocationsRawData(country);
  var viewport = useBreakpointValue();
  var strings = useGetString();
  var t = useT();
  var isViewportXS = viewport <= breakpointValues[Viewport.XS];
  var isViewportSM = viewport <= breakpointValues[Viewport.SM];
  var hasCountryFilters = useHasAudienceCountryFilters();
  var title = t('WHERE_THEY_LISTEN_7f3ce9', 'Top countries', '');
  var selectedCountry = hasCountryFilters && country !== null && country !== void 0 && country.name ? "".concat(country.name) : '';
  var subHeadLine = [t('WHERE_THEY_LISTEN_605606', 'Listeners', ''), t('WHERE_THEY_LISTEN_b75971', 'Last 28 Days', ''), selectedCountry].filter(Boolean).join(' • ');
  var raw = (_data$geography = data === null || data === void 0 ? void 0 : data.geography) !== null && _data$geography !== void 0 ? _data$geography : [];
  var normalizedLocations = useLocationsNormalizer(raw);
  var normalizedTopCountries = useTopCountriesNormalizer(raw);

  if (data.status > 200) {
    return /*#__PURE__*/_jsx(Section, {
      id: "where-they-listen",
      title: title,
      subtitle: subHeadLine,
      children: /*#__PURE__*/_jsx(StyledErrorMessage, {
        isviewportxs: isViewportXS,
        children: data.status !== 204 ? /*#__PURE__*/_jsx(_Fragment, {
          children: strings.insightsError
        }) : /*#__PURE__*/_jsx(Type, {
          as: "p",
          children: t('WHERE_THEY_LISTEN_f537b1', 'Once a listener plays your song, this is where you’ll see which countries this song is most popular in.', '')
        })
      })
    });
  }

  return /*#__PURE__*/_jsx(Section, {
    id: "where-they-listen",
    title: title,
    subtitle: subHeadLine,
    children: /*#__PURE__*/_jsx(ResizeContainer, {
      viewport: viewport,
      render:
      /* istanbul ignore next */
      function render(width) {
        return /*#__PURE__*/_jsx(MapChartWrapper, {
          tableData: normalizedTopCountries,
          mapData: normalizedLocations,
          width: width,
          isViewportXS: isViewportXS,
          isViewportSM: isViewportSM,
          qaId: "audience-where-they-listen",
          stat: t('WHERE_THEY_LISTEN_3011f9', 'listeners', ''),
          statKey: CountryStats.LISTENERS
        });
      }
    })
  });
};