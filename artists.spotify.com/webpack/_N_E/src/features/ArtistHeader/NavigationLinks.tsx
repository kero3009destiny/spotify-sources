import React from 'react';
import { CATALOG_VIEW, VIEWER, useCurrentArtistPermissions, useCurrentArtist, useCurrentArtistIdOrNull } from '../../features/artists';
import { useCampaignPage } from '../Campaign/hooks';
import { ArtistStatPermission, useS4xInsightsArtistPermissions } from '../../features/artists/src/useS4xInsightsArtistPermissions';
import { useViewport, Viewport } from '../../shared/lib/useViewport';
import { useIsHomeEnabledForCurrentUser } from '../ArtistHome/useIsHomeEnabledForCurrentUser';
import { useIsArtistProfileEnabledForCurrentUser } from '../ArtistProfile/utils/useIsArtistProfileEnabledForCurrentUser';
import { LinkList } from './LinkList';
import { useT } from '@mrkt/features/i18n';
import { createUbiEventLogger } from '@mrkt/features/ubi';
import { createWebCommonEventFactory } from '@spotify-internal/ubi-sdk-s4a-web-common';
import { NavLinkTag } from './styled';
import { useShowChartsAlphaTab } from './hooks/useShowChartsAlphaTab';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var NavigationLinks = function NavigationLinks() {
  var viewport = useViewport();
  var viewportXs = viewport === Viewport.XS;
  var statsPermissions = useS4xInsightsArtistPermissions();
  var permissions = useCurrentArtistPermissions();
  var artist = useCurrentArtist();
  var t = useT(); // TODO convert `useIsHomeEnabledForCurrentUser()` to Typescript and remove the type check in the line below.

  var canViewHomePage = useIsHomeEnabledForCurrentUser();
  var showChartsAlphaTab = useShowChartsAlphaTab();

  var _useCampaignPage = useCampaignPage(artist.id),
      canViewCampaignPage = _useCampaignPage.showCampaignsPage;

  var canViewAudiencePage = statsPermissions.includes(ArtistStatPermission.STATS_AUDIENCE);
  var canViewArtistProfilePage = useIsArtistProfileEnabledForCurrentUser();
  var uri = window.location.href;
  var headerSpec = createWebCommonEventFactory({
    data: {
      identifier: 's4a-top-nav-bar',
      uri: uri
    }
  }).topNavBarFactory();
  headerSpec.homeLinkFactory();
  var artistId = useCurrentArtistIdOrNull();
  var UBIEventLogger = createUbiEventLogger(artistId);

  var createUbiHandler = function createUbiHandler(ubiHandler) {
    return function (_ref) {
      var match = _ref.match,
          to = _ref.to;

      // url is not currently matched, so it's active
      if (!match) {
        UBIEventLogger.logInteraction(ubiHandler.hitUiNavigate({
          destination: to
        }));
      }
    };
  };

  var navigationItems = [{
    key: 'home',
    title: t('NAVIGATION_LINK_HOME', 'Home', 'Navigation link for the homepage'),
    url: '/home',
    isDisabled: !canViewHomePage,
    onClick: createUbiHandler(headerSpec.homeLinkFactory())
  }, {
    key: 'music',
    title: t('NAVIGATION_LINK_MUSIC', 'Music', 'Navigation link for the music section of the website'),
    url: '/music',
    additionalMatches: ['/song'],
    onClick: createUbiHandler(headerSpec.musicLinkFactory())
  }, {
    key: 'audience',
    title: t('NAVIGATION_LINK_AUDIENCE', 'Audience', 'Navigation link for the audience section of the website'),
    url: '/audience',
    isDisabled: !canViewAudiencePage,
    onClick: createUbiHandler(headerSpec.audienceLinkFactory())
  }, {
    key: 'profile',
    title: t('NAVIGATION_LINK_PROFILE', 'Profile', 'Navigation link for the user profile section of the website'),
    url: '/profile',
    isDisabled: !canViewArtistProfilePage,
    onClick: createUbiHandler(headerSpec.profileLinkFactory())
  }, {
    key: 'campaigns',
    title: /*#__PURE__*/_jsxs("span", {
      children: [t('NAVIGATION_LINK_CAMPAIGNS', 'Campaigns', 'Navigation link for the website section concerned with musical release campaigns'), ' ', /*#__PURE__*/_jsx(NavLinkTag, {
        colorSet: "brightAccent",
        children: t('NAVIGATION_LINK_BETA_FLAG', 'BETA', 'Describes that a feature is in a beta preview mode')
      })]
    }),
    url: '/campaigns',
    onClick: createUbiHandler(headerSpec.campaignsLinkFactory())
  }, {
    key: 'charts',
    title: t('Charts', 'Charts', 'Chart Title'),
    isExternal: true,
    url: 'https://accounts.spotify.com/login?continue=https%3A%2F%2Fcharts.spotify.com/login'
  }];
  var canViewMusicPage = permissions.includes(CATALOG_VIEW) || permissions.includes(VIEWER);
  var visibleNavigationItems = navigationItems.filter(function (item) {
    if (item.key === 'music' && !canViewMusicPage) {
      return false;
    }

    if (item.key === 'campaigns' && !canViewCampaignPage) {
      return false;
    }

    if (item.key === 'charts' && !showChartsAlphaTab) {
      return false;
    }

    return true;
  });
  return /*#__PURE__*/_jsx(LinkList, {
    items: visibleNavigationItems,
    collapsedLayout: viewportXs
  });
};