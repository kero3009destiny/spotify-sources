import React, { Fragment, useEffect, useState } from 'react';
import has from 'lodash/has';
import { Banner, Type } from '@spotify-internal/encore-web-v3';
import { useT } from '@mrkt/features/i18n';
import { StyledErrorMessage } from '../../shared/messages/styles';
import { RelatedArtists } from '../../shared/components/Chart';
import { normalize } from './normalizers/otherArtistsListenedTo';
import { useOtherArtistsListenedToData } from './resources/useOtherArtistsListenedToData';
import { useHasAudienceCountryFilters } from './hooks/useHasAudienceCountryFilters';
import { useViewport, Viewport } from '../../shared/lib/useViewport';
import { useGetString } from '../../shared/messages/strings';
import { useCurrentArtist } from '../../features/artists';
import { Section } from '../Section';
import { StyledBannerWrapper } from './Styles';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function OtherArtistsListenedTo(_ref) {
  var country = _ref.country;
  var artist = useCurrentArtist();
  var data = useOtherArtistsListenedToData(artist.id);
  var viewport = useViewport();
  var t = useT();
  var strings = useGetString();
  var isViewportXS = viewport === Viewport.XS;
  var hasCountryFilters = useHasAudienceCountryFilters();
  var worldwideMatch = country.code !== strings.worldwide.code;

  var _useState = useState(worldwideMatch),
      showInfoBanner = _useState[0],
      setShowInfoBanner = _useState[1];

  var title = t('OTHER_ARTISTS_LISTENED_TO_aaaed2', 'Listeners also like', ''); // users who aren't on the country flag should not see 'Worlwide' text

  var subtitle = [t('OTHER_ARTISTS_LISTENED_TO_0103a2', 'Listeners', 'Listeners of a selected artist.'), t('OTHER_ARTISTS_LISTENED_TO_b75971', 'Last 28 Days', ''), hasCountryFilters && t('OTHER_ARTISTS_LISTENED_TO_3db628', 'Worldwide', '')].filter(Boolean).join(' • ');
  useEffect(function () {
    setShowInfoBanner(worldwideMatch);
  }, [worldwideMatch]);

  if (has(data, 'payload.artists') && !data.payload.artists.length || data.status === 204) {
    return /*#__PURE__*/_jsx(Section, {
      id: "other-artists",
      title: title,
      subtitle: subtitle,
      children: /*#__PURE__*/_jsx(StyledErrorMessage, {
        isviewportxs: isViewportXS,
        children: /*#__PURE__*/_jsx(Type, {
          as: "p",
          children: t('OTHER_ARTISTS_LISTENED_TO_222897', 'As more listeners play your music, we’ll show you artists that they also like.', '')
        })
      })
    });
  }

  if (data.status > 200) {
    return /*#__PURE__*/_jsx(Section, {
      id: "other-artists",
      title: title,
      subtitle: subtitle,
      children: /*#__PURE__*/_jsx(StyledErrorMessage, {
        isviewportxs: isViewportXS,
        children: t('OTHER_ARTISTS_LISTENED_TO_b13db4', 'Something went wrong. There’s a problem on our end and we can’t show these stats right now.', '')
      })
    });
  }

  return /*#__PURE__*/_jsx(Section, {
    id: "other-artists",
    title: title,
    subtitle: subtitle,
    children: /*#__PURE__*/_jsxs(Fragment, {
      children: [showInfoBanner && /*#__PURE__*/_jsx(StyledBannerWrapper, {
        "data-testid": "info-banner",
        topOffset: true,
        children: /*#__PURE__*/_jsx(Banner, {
          contextual: true,
          variant: "announcement",
          children: t('OTHER_ARTISTS_LISTENED_TO_eac5c8', 'You filtered by a country. But “Listeners also like” is always worldwide.', '')
        })
      }), /*#__PURE__*/_jsx(RelatedArtists, {
        data: normalize(data.payload.artists),
        qaId: "audience-other-artists"
      })]
    })
  });
}