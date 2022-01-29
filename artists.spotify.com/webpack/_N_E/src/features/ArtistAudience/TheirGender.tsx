import React from 'react';
import { Type, VisuallyHidden } from '@spotify-internal/encore-web-v3';
import { useT } from '@mrkt/features/i18n';
import { StyledErrorMessage } from '../../shared/messages/styles';
import { useGetString } from '../../shared/messages/strings';
import { ResizeContainer } from '../../shared/components/ResizeContainer';
import { RadialChart } from '../../shared/components/Chart';
import { useCurrentArtist } from '../../features/artists';
import { useTheirGenderNormalizer } from './normalizers/theirGender';
import { useGenderRawData } from './resources/useGenderRawData';
import { useHasAudienceCountryFilters } from './hooks/useHasAudienceCountryFilters';
import { useViewport, Viewport, breakpointValues } from '../../shared/lib/useViewport';
import { Section } from '../Section';
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function TheirGender(_ref) {
  var country = _ref.country;
  var data = useGenderRawData(country);
  var artist = useCurrentArtist();
  var viewport = useViewport();
  var isViewportXS = viewport === Viewport.XS;
  var hasCountryFilters = useHasAudienceCountryFilters();
  var strings = useGetString();
  var t = useT();
  var selectedCountry = hasCountryFilters && country !== null && country !== void 0 && country.name ? "".concat(country.name) : '';
  var subtitle = [t('THEIR_GENDER_605606', 'Listeners', ''), t('THEIR_GENDER_b75971', 'Last 28 Days', ''), selectedCountry].filter(Boolean).join(' • ');
  var text = {
    sectionTitle: t('THEIR_GENDER_95493c', 'Listeners’ gender', ''),
    sectionSubtitle: subtitle
  };
  var raw = data && Object.keys(data).length ? data : {};
  var normalized = useTheirGenderNormalizer(raw);

  if (data.status > 200) {
    return /*#__PURE__*/_jsx(Section, {
      id: "who-they-are",
      title: text.sectionTitle,
      subtitle: text.sectionSubtitle,
      children: /*#__PURE__*/_jsx(StyledErrorMessage, {
        isviewportxs: isViewportXS,
        children: data.status !== 204 ? /*#__PURE__*/_jsx(_Fragment, {
          children: strings.insightsError
        }) : /*#__PURE__*/_jsx(Type, {
          as: "p",
          children: t('THEIR_GENDER_b80c68', 'You’ll see your audience’s gender demographics as your audience grows.', '')
        })
      })
    });
  }

  return /*#__PURE__*/_jsxs(Section, {
    id: "who-they-are",
    title: text.sectionTitle,
    subtitle: text.sectionSubtitle,
    children: [/*#__PURE__*/_jsx(VisuallyHidden, {
      children: t('THEIR_GENDER_308681', 'Chart for {artistName} showing gender demographics of the audience, {countryName}, for the last 28 days. ', 'Visually hidden text read by a screen reader. Example Usage: Chart for Khruangbin showing gender demographics of the audience, Worldwide, for the last 28 days.', {
        artistName: artist.name,
        countryName: country.name
      })
    }), /*#__PURE__*/_jsx(ResizeContainer, {
      viewport: breakpointValues[viewport],
      render: function render(width) {
        return /*#__PURE__*/_jsx(RadialChart // @ts-ignore
        , {
          data: normalized,
          width: width,
          qaId: "audience-who-they-are",
          currentArtist: artist.name,
          isViewportXS: isViewportXS
        });
      }
    })]
  });
}