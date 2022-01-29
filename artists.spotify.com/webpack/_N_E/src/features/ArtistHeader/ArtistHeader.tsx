// ignore-string-externalization
import React, { Suspense } from 'react';
import { Badge } from '@mrkt/features/badge';
import { createUbiEventLogger, useImpressionUBILogger } from '@mrkt/features/ubi';
import { createWebCommonEventFactory } from '@spotify-internal/ubi-sdk-s4a-web-common';
import { Header, FlyOutToggle } from '../../shared/components/Header';
import { useCurrentArtist, useCurrentArtistIdOrNull } from '../../features/artists';
import { NavigationLinks } from './NavigationLinks';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var ArtistHeader = function ArtistHeader() {
  var currentArtist = useCurrentArtist();
  var UBIEventLogger = createUbiEventLogger(currentArtist.id);

  var logToUBIOnShow = function logToUBIOnShow() {
    var uri = window.location.href;
    var artistSwitcherSpec = createWebCommonEventFactory({
      data: {
        identifier: 's4a-artist-switcher',
        uri: uri
      }
    });
    UBIEventLogger.logInteraction(artistSwitcherSpec.artistSwitcherFactory().hitUiReveal());
  };

  var uri = window.location.href;
  var headerSpec = createWebCommonEventFactory({
    data: {
      identifier: 's4a-top-nav-bar',
      uri: uri
    }
  });
  var headerImpression = headerSpec.topNavBarFactory();
  var artistId = useCurrentArtistIdOrNull();

  var _useImpressionUBILogg = useImpressionUBILogger(headerImpression, artistId, null),
      headerRef = _useImpressionUBILogg.ref;

  return /*#__PURE__*/_jsxs(Header, {
    ref: headerRef,
    children: [/*#__PURE__*/_jsx(FlyOutToggle, {
      onShow: logToUBIOnShow,
      avatar: /*#__PURE__*/_jsx(Badge, {
        variant: "artist",
        initial: currentArtist.name,
        imgSrc: currentArtist.imageUrl
      }),
      name: currentArtist.name
    }), /*#__PURE__*/_jsx(Suspense, {
      fallback: null,
      children: /*#__PURE__*/_jsx(NavigationLinks, {})
    })]
  });
};