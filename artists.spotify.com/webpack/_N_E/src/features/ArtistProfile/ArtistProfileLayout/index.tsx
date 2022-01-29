import _slicedToArray from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import createDebug from 'debug';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useRouteMatch } from 'react-router';
import styled, { ThemeProvider } from 'styled-components';
import { useRead, usePut } from '@spotify-internal/creator-data-loading';
import { colorThemeGenerator, NavBar, NavBarList, color, green, Tag } from '@spotify-internal/encore-web';
import { DocumentTitle } from '@mrkt/features/document-title';
import { useT } from '@mrkt/features/i18n';
import { useCurrentArtist } from '../../../features/artists';
import { useCurrentUser } from '../../../features/currentUser';
import { useViewport, breakpointValues, Viewport } from '../../../shared/lib/useViewport';
import { setAlert as _setAlert } from '../../../shared/store';
import { NavBarListItemAsLink } from '../../EncoreCreatorWebHelpers';
import { HeaderImage } from '../HeaderImage';
import { About } from './About';
import Overview from './Overview';
import RelatedArtists from './RelatedArtists';
import { artistProfileLoader } from '../artistProfileLoader';
import { useCurrentUserIsAuthorizedToEditProfile } from '../utils/useCurrentUserIsAuthorizedToEditProfile';
import { useInfluencesTab } from '../InfluencesTab/useInfluencesTab';
import { MerchTab } from '../Merch/components/MerchTab/MerchTab';
import { useAuthorizedForMerchAccess } from '../Merch/lib/auth';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var debug = createDebug('components:ArtistProfileLayout');
var Concerts = /*#__PURE__*/React.lazy(function () {
  return import(
  /* webpackPreload: true, webpackChunkName: "profile-concerts" */
  '../../ConcertsTab');
});
var StyledNavBarList = styled(NavBarList).withConfig({
  displayName: "ArtistProfileLayout__StyledNavBarList",
  componentId: "sc-1ix3g2a-0"
})(["{overflow:scroll;::-webkit-scrollbar{display:none;}-ms-overflow-style:none;scrollbar-width:none;}"]);
var InfluencesTab = /*#__PURE__*/React.lazy(function () {
  return import(
  /* webpackPreload: true, webpackChunkName: "profile-influences" */
  '../InfluencesTab/index');
});
var StyledLayout = styled.div.withConfig({
  displayName: "ArtistProfileLayout__StyledLayout",
  componentId: "sc-1ix3g2a-1"
})(["color:", ";"], color.gray60);
var DOCUMENT_TITLE = 'Artist Profile – Spotify for Artists';
var TAB_RELATED_ARTISTS = 'fans_also_like';
var TAB_INFLUENCES = 'influences';
var TAB_OVERVIEW = 'overview';
var TAB_ABOUT = 'about';
var TAB_CONCERTS = 'concerts';
var TAB_MERCH = 'merch';
export var ArtistProfileLayout = function ArtistProfileLayout() {
  var _routeMatch$params$ta, _routeMatch$params, _artistProfile$relate, _artistProfile$relate2, _artistProfile$relate3, _navTabsMap, _ref, _headerImage$header, _artistProfile$isVeri;

  debug('rendering artist profile layout');
  var routeMatch = useRouteMatch("/artist/:artistId/profile/:tab");
  var tab = (_routeMatch$params$ta = routeMatch === null || routeMatch === void 0 ? void 0 : (_routeMatch$params = routeMatch.params) === null || _routeMatch$params === void 0 ? void 0 : _routeMatch$params.tab) !== null && _routeMatch$params$ta !== void 0 ? _routeMatch$params$ta : '';
  var user = useCurrentUser();
  var viewport = useViewport();
  var viewportValue = breakpointValues[viewport];
  var dispatch = useDispatch();
  var artist = useCurrentArtist();
  var artistProfile = useRead(artistProfileLoader, artist.id);
  var setArtistProfile = usePut(artistProfileLoader, artist.id);
  var authorized = useCurrentUserIsAuthorizedToEditProfile();
  var t = useT();
  var hasInfluencesTab = useInfluencesTab();

  var _useAuthorizedForMerc = useAuthorizedForMerchAccess(),
      hasMerchValue = _useAuthorizedForMerc.value,
      merchAuthorizationLoading = _useAuthorizedForMerc.loading;

  var hasMerch = !merchAuthorizationLoading && hasMerchValue; // Have to wait for merch authorizaton to load before rendering all of the
  // available routes.

  if (!artistProfile || merchAuthorizationLoading) return null;
  var hasRelatedArtists = ((_artistProfile$relate = (_artistProfile$relate2 = artistProfile.relatedArtists) === null || _artistProfile$relate2 === void 0 ? void 0 : (_artistProfile$relate3 = _artistProfile$relate2.artists) === null || _artistProfile$relate3 === void 0 ? void 0 : _artistProfile$relate3.length) !== null && _artistProfile$relate !== void 0 ? _artistProfile$relate : 0) > 0;

  function updateArtistPick(updated) {
    if (artistProfile) {
      var nextArtistProfile;

      if (updated != null) {
        var _artistProfile$artist;

        nextArtistProfile = _objectSpread(_objectSpread({}, artistProfile), {}, {
          artistPick: _objectSpread(_objectSpread({}, updated), {}, {
            // Used to create a new instance of EditArtistPick after an update,
            // since its state is initialized by props. A new instance is created
            // by incrementing the key. See this blog post for more details on
            // the technique: https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
            updateID: (((_artistProfile$artist = artistProfile.artistPick) === null || _artistProfile$artist === void 0 ? void 0 : _artistProfile$artist.updateID) || 0) + 1
          })
        });
      } else {
        nextArtistProfile = _objectSpread(_objectSpread({}, artistProfile), {}, {
          artistPick: null
        });
      }

      setArtistProfile(nextArtistProfile);
    }
  }

  function updatePlaylists(updated) {
    if (artistProfile) {
      setArtistProfile(_objectSpread(_objectSpread({}, artistProfile), {}, {
        playlists: {
          data: updated
        }
      }));
    }
  }

  function updateBio(updated) {
    if (artistProfile) {
      setArtistProfile(_objectSpread(_objectSpread({}, artistProfile), {}, {
        autobiography: _objectSpread(_objectSpread({}, artistProfile.autobiography), {}, {
          body: updated
        })
      }));
    }
  }

  function updateSocialLinks(updated) {
    if (artistProfile) {
      setArtistProfile(_objectSpread(_objectSpread({}, artistProfile), {}, {
        autobiography: _objectSpread(_objectSpread({}, artistProfile.autobiography), {}, {
          links: updated
        })
      }));
    }
  }

  function updateGalleryImages(updated) {
    if (artistProfile) {
      setArtistProfile(_objectSpread(_objectSpread({}, artistProfile), {}, {
        gallery: updated
      }));
    }
  }

  var navTabsMap = (_navTabsMap = {}, _defineProperty(_navTabsMap, TAB_OVERVIEW, {
    id: TAB_OVERVIEW,
    index: 0,
    label: t('artistprofile_artistprofilelayout_1', 'Overview', ''),
    qaId: 'overview-tab',
    content: /*#__PURE__*/_jsx(Overview, {
      data: artistProfile,
      artist: artist,
      user: user,
      viewport: viewportValue,
      authorized: authorized
      /**
       * Actions
       * {Function}
       */
      ,
      updateArtistPick: updateArtistPick,
      updatePlaylists: updatePlaylists // @ts-ignore
      ,
      setAlert: function setAlert() {
        return dispatch(_setAlert.apply(void 0, arguments));
      }
    })
  }), _defineProperty(_navTabsMap, TAB_ABOUT, {
    id: TAB_ABOUT,
    index: 1,
    label: t('artistprofile_artistprofilelayout_2', 'About', ''),
    qaId: 'about-tab',
    content: /*#__PURE__*/_jsx(About, {
      data: artistProfile,
      artist: artist,
      viewport: viewportValue,
      authorized: authorized
      /**
       * Actions
       * {Function}
       */
      ,
      saveBio: updateBio // @ts-ignore
      ,
      setAlert: function setAlert() {
        return dispatch(_setAlert.apply(void 0, arguments));
      },
      updateSocialLinks: updateSocialLinks,
      updateGalleryImages: updateGalleryImages
    })
  }), _defineProperty(_navTabsMap, TAB_CONCERTS, {
    id: TAB_CONCERTS,
    index: 2,
    label: t('artistprofile_artistprofilelayout_3', 'Concerts', ''),
    qaId: 'concerts-tab',
    content: /*#__PURE__*/_jsx(Concerts, {})
  }), _navTabsMap);

  if (hasMerch) {
    navTabsMap[TAB_MERCH] = {
      id: TAB_MERCH,
      index: 3,

      /**
       * The label prop is rendered as a JSX.Element, the type should probably
       * be loosened from string to JSX.Element or React.ReactNode
       * See: https://ghe.spotify.net/encore/web/blob/v3.7.1/src/components/NavBarListItem/index.tsx#L33
       * PR suggesting type definition improvement here: https://ghe.spotify.net/encore/web/issues/1390
       */
      label: /*#__PURE__*/_jsx(WithBetaTag, {
        label: t('artistprofile_artistprofilelayout_4', 'Merch', 'Short for merchandise. Translator glossary should have market approved term.')
      }),
      qaId: 'merch-tab',
      content: /*#__PURE__*/_jsx(MerchTab, {})
    };
  }

  if (hasRelatedArtists) {
    var _artistProfile$relate4;

    navTabsMap[TAB_RELATED_ARTISTS] = {
      id: TAB_RELATED_ARTISTS,
      index: 3,
      label: t('artistprofile_artistprofilelayout_5', 'Fans Also Like', ''),
      qaId: 'related-artist-tab',
      content: /*#__PURE__*/_jsx(RelatedArtists, {
        artists: artistProfile === null || artistProfile === void 0 ? void 0 : (_artistProfile$relate4 = artistProfile.relatedArtists) === null || _artistProfile$relate4 === void 0 ? void 0 : _artistProfile$relate4.artists
      })
    };
  }

  if (hasInfluencesTab) {
    navTabsMap[TAB_INFLUENCES] = {
      id: TAB_INFLUENCES,
      index: 4,
      label: t('artistprofile_artistprofilelayout_6', 'Influences', 'Tab to show artist influences'),
      qaId: 'influences-tab',
      content: /*#__PURE__*/_jsx(InfluencesTab, {})
    };
  }

  var fallbackHeader = artistProfile.fallbackHeader,
      headerImage = artistProfile.headerImage,
      monthlyListeners = artistProfile.monthlyListeners;
  var headerImgSrc = (_ref = (_headerImage$header = headerImage.header) !== null && _headerImage$header !== void 0 ? _headerImage$header : fallbackHeader === null || fallbackHeader === void 0 ? void 0 : fallbackHeader.uri) !== null && _ref !== void 0 ? _ref : '';
  return /*#__PURE__*/_jsx(DocumentTitle, {
    title: DOCUMENT_TITLE,
    children: /*#__PURE__*/_jsx("div", {
      children: artistProfile ? /*#__PURE__*/_jsxs(StyledLayout, {
        "data-testid": "profile-layout",
        className: "encore-muted-accent-set",
        children: [/*#__PURE__*/_jsx(HeaderImage, {
          image: headerImgSrc,
          name: artist.name,
          monthlyListeners: monthlyListeners !== null && monthlyListeners !== void 0 ? monthlyListeners : 0,
          isVerified: (_artistProfile$isVeri = artistProfile.isVerified) !== null && _artistProfile$isVeri !== void 0 ? _artistProfile$isVeri : false,
          artistId: artist.id,
          viewport: viewportValue,
          authorizedUser: authorized
        }), /*#__PURE__*/_jsx(NavBar, {
          list: /*#__PURE__*/_jsx(ThemeProvider, {
            theme: _objectSpread({}, colorThemeGenerator({
              primaryColor: green
            })),
            children: /*#__PURE__*/_jsx(StyledNavBarList, {
              children: Object.entries(navTabsMap).map(function (_ref2) {
                var _ref3 = _slicedToArray(_ref2, 2),
                    tabId = _ref3[0],
                    tabObect = _ref3[1];

                return /*#__PURE__*/_jsx(NavBarListItemAsLink, {
                  active: tabId === tab,
                  label: tabObect.label,
                  to: "/artist/".concat(artist.id, "/profile/").concat(tabId),
                  "data-testid": tabObect.qaId
                }, tabObect.id);
              })
            })
          }),
          children: navTabsMap[tab] ? navTabsMap[tab].content : /*#__PURE__*/_jsx(Redirect, {
            to: "/artist/".concat(artist.id, "/profile/").concat(TAB_OVERVIEW)
          })
        })]
      }) : null
    })
  });
};

function WithBetaTag(props) {
  var t = useT();
  var viewport = useViewport();
  var isMobile = viewport === Viewport.XS;
  if (isMobile) return /*#__PURE__*/_jsx(_Fragment, {
    children: props.label
  });
  return /*#__PURE__*/_jsxs("span", {
    style: {
      position: 'relative',
      top: '-3px'
    },
    children: [props.label, "\xA0", /*#__PURE__*/_jsx("span", {
      style: {
        pointerEvents: 'none'
      },
      children: /*#__PURE__*/_jsx(Tag, {
        colorSet: "brightAccent",
        children: t('artistprofile_artistprofilelayout_7', 'Beta', 'Describes that a feature is in beta')
      })
    })]
  });
}