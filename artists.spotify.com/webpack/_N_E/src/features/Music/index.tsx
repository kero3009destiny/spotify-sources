import _classCallCheck from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import { Link, Switch, Redirect, Route, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import capitalize from 'lodash/capitalize';
import { NavBar, NavBarList, NavBarListItem, Type, spacer8, spacer12, spacer40, screenXxsMax } from '@spotify-internal/encore-web-v3';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { DocumentTitle } from '@mrkt/features/document-title';
import { useT } from '@mrkt/features/i18n';
import { useIsEmployee } from '../../features/currentUser';
import { useGetString } from '../../shared/messages/strings';
import { PageAlert } from '../../shared/components/PageAlert';
import { PLAYLISTS_ROUTE, RELEASES_ROUTE, SONGS_ROUTE, TIME_FILTER, UPCOMING_ROUTE } from '../../features/CatalogUtils/constants';
import { deriveRoute, getQueryStringFromObj } from '../../features/CatalogUtils/urls';
import { useCurrentArtistPermissions, useCurrentArtist } from '../../features/artists';
import { useGetSelectedFilter } from '../../features/CatalogUtils/utils';
import { ArtistStatPermission, useS4xInsightsArtistPermissions } from '../../features/artists/src/useS4xInsightsArtistPermissions';
import { useViewport, breakpointValues, Screen } from '../../shared/lib/useViewport';
import { useHasDataDelayAlert } from '../../shared/lib/hooks/useHasDataDelayAlert';
import { PageMainTitle, PageHeader } from './Styles';
import { PlaylistsHooks } from './Playlists';
import { Songs } from './Songs';
import { Releases } from './Releases';
import ReleasedSubNavigation from './SubNavigation_2.0';
import DisabledNavigationTab from './DisabledNavigationTab';
import { useHasReleasesFirst } from './hooks/useHasReleasesFirst';
import { useShowQualtricsBanner } from '../QualtricsBanner/hooks/useShowQualtricsBanner';
import { QualtricsBanner } from '../QualtricsBanner';
import { PageId } from '../PlatformEvents';
import { ReleasePageCallout } from '../ReleaseStats/ReleasePageCallout';
import { useMusicTabsLoggers } from './hooks/useMusicUbi';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var UpcomingCatalog = /*#__PURE__*/React.lazy(function () {
  return import(
  /* webpackPreload: true, webpackChunkName: "catalog-upcoming-new" */
  '../UpcomingCatalog').then(function (m) {
    return {
      default: m.UpcomingCatalog
    };
  });
});
var StyleNavBarListWrapper = styled(NavBarList).withConfig({
  displayName: "Music__StyleNavBarListWrapper",
  componentId: "uy9q0j-0"
})(["margin-bottom:", ";margin-top:", ";"], function (props) {
  return props.isXSmallScreen ? spacer12 : spacer40;
}, function (props) {
  return props.isXSmallScreen ? spacer12 : null;
});
var StyledNavBarListItem = styled(function (props) {
  return /*#__PURE__*/_jsx(NavBarListItem, _objectSpread({
    sentenceCase: true
  }, props));
}).withConfig({
  displayName: "Music__StyledNavBarListItem",
  componentId: "uy9q0j-1"
})(["@media (max-width:", "){padding-left:", ";padding-right:", ";}"], screenXxsMax, spacer8, spacer8);
export var Music = /*#__PURE__*/function (_React$Component) {
  _inherits(Music, _React$Component);

  var _super = _createSuper(Music);

  function Music() {
    var _this;

    _classCallCheck(this, Music);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      hasUnrecoverableError: false,
      releasedSubroute: undefined,
      searchQuery: ''
    });

    _defineProperty(_assertThisInitialized(_this), "onTimeFilterChange", function (selectedValue) {
      var _this$props = _this.props,
          history = _this$props.history,
          location = _this$props.location;
      var route = deriveRoute(location.pathname);
      history.push(_objectSpread(_objectSpread({}, location), {}, {
        search: getQueryStringFromObj(_defineProperty({}, TIME_FILTER, selectedValue), location.search)
      }));
      sendEvent({
        eventAction: 'selectDropdown',
        eventCategory: "Music".concat(capitalize(route)),
        eventLabel: selectedValue
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSearch", function (searchQuery) {
      var location = _this.props.location;

      _this.setState({
        searchQuery: searchQuery
      });

      var route = deriveRoute(location.pathname);
      sendEvent({
        eventAction: 'searchInput',
        eventCategory: "Music".concat(capitalize(route)),
        eventLabel: searchQuery
      });
    });

    _defineProperty(_assertThisInitialized(_this), "displayErrorMessage", function () {
      return /*#__PURE__*/_jsxs(Type, {
        as: Type.h2,
        "data-testid": "songs-error",
        children: [/*#__PURE__*/_jsx("br", {}), _this.props.strings.insightsError]
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setReleasedSubroute", function (releasedSubroute) {
      return _this.setState({
        releasedSubroute: releasedSubroute
      });
    });

    return _this;
  }

  _createClass(Music, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.location.pathname !== this.props.location.pathname && this.state.searchQuery) {
        this.resetSearchQueryOnTabChange();
      }
    }
  }, {
    key: "componentDidCatch",
    value: function componentDidCatch() {
      this.setState({
        hasUnrecoverableError: true
      });
    }
  }, {
    key: "resetSearchQueryOnTabChange",
    value: function resetSearchQueryOnTabChange() {
      this.setState({
        searchQuery: ''
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.state.hasUnrecoverableError) {
        return this.displayErrorMessage();
      }

      var _this$props2 = this.props,
          artistId = _this$props2.artist.id,
          artistPermissions = _this$props2.artistPermissions,
          match = _this$props2.match,
          location = _this$props2.location,
          viewport = _this$props2.viewport,
          statsPermissions = _this$props2.statsPermissions,
          hasReleasesFirst = _this$props2.hasReleasesFirst,
          t = _this$props2.t,
          getSelectedFilter = _this$props2.getSelectedFilter,
          ubiTabLoggers = _this$props2.ubiTabLoggers;
      var searchQuery = this.state.searchQuery;
      var isXSmallScreen = viewport <= Screen.XS;
      var defaultRoute = hasReleasesFirst ? RELEASES_ROUTE : SONGS_ROUTE;
      var selectedFilter = getSelectedFilter(location);
      var derivedRoute = deriveRoute(location.pathname, defaultRoute);
      var hasStatsPlaylists = statsPermissions.includes(ArtistStatPermission.STATS_PLAYLISTS);
      var routes = hasReleasesFirst ? [{
        id: "".concat(RELEASES_ROUTE),
        label: t('MUSIC_INDEX_4c8e6c', 'Releases', ''),
        disabled: false,
        ubiLogger: ubiTabLoggers.releases
      }, {
        id: "".concat(SONGS_ROUTE),
        label: t('MUSIC_INDEX_6f27f3', 'Songs', ''),
        ubiLogger: ubiTabLoggers.songs
      }, {
        id: "".concat(PLAYLISTS_ROUTE),
        label: t('MUSIC_INDEX_6ed5a4', 'Playlists', ''),
        disabled: !hasStatsPlaylists,
        ubiLogger: ubiTabLoggers.playlists
      }, {
        id: UPCOMING_ROUTE,
        label: t('MUSIC_INDEX_ddca22', 'Upcoming', ''),
        disabled: false,
        ubiLogger: ubiTabLoggers.upcoming
      }] : [{
        id: "".concat(SONGS_ROUTE),
        label: t('MUSIC_INDEX_6f27f3', 'Songs', ''),
        ubiLogger: ubiTabLoggers.songs
      }, {
        id: "".concat(RELEASES_ROUTE),
        label: t('MUSIC_INDEX_4c8e6c', 'Releases', ''),
        disabled: false,
        ubiLogger: ubiTabLoggers.releases
      }, {
        id: "".concat(PLAYLISTS_ROUTE),
        label: t('MUSIC_INDEX_6ed5a4', 'Playlists', ''),
        disabled: !hasStatsPlaylists,
        ubiLogger: ubiTabLoggers.playlists
      }, {
        id: UPCOMING_ROUTE,
        label: t('MUSIC_INDEX_ddca22', 'Upcoming', ''),
        disabled: false,
        ubiLogger: ubiTabLoggers.upcoming
      }];
      return /*#__PURE__*/_jsx(DocumentTitle, {
        title: t('MUSIC_INDEX_d20ce0', 'Music – {data} – Spotify for Artists', '', {
          data: this.props.artist.name
        }),
        children: /*#__PURE__*/_jsxs(React.Fragment, {
          children: [this.props.hasDataDelayAlert && /*#__PURE__*/_jsx(PageAlert, {
            type: "warning",
            title: this.props.strings.dataDelayTitle,
            subtitle: this.props.strings.dataDelaySubtitle
          }), this.props.showQualtricsBanner && /*#__PURE__*/_jsx(QualtricsBanner, {
            pageId: PageId.ArtistMusic
          }), /*#__PURE__*/_jsx(PageHeader, {
            children: /*#__PURE__*/_jsx(PageMainTitle, {
              "data-testid": "catalog-title",
              children: t('MUSIC_INDEX_20cf0a', 'Music', '')
            })
          }), /*#__PURE__*/_jsxs(React.Fragment, {
            children: [/*#__PURE__*/_jsx(NavBar, {
              list: /*#__PURE__*/_jsx(StyleNavBarListWrapper, {
                isXSmallScreen: isXSmallScreen,
                "data-testid": "tabs-layout",
                style: {
                  position: 'relative'
                },
                children: routes.map(function (tab) {
                  var _location$search;

                  return !tab.disabled ? /*#__PURE__*/_jsxs(React.Fragment, {
                    children: [/*#__PURE__*/_jsx(StyledNavBarListItem, {
                      "data-testid": "tab-".concat(tab.label).toLowerCase(),
                      active: location.pathname.includes("/artist/".concat(artistId, "/music/").concat(tab.id)),
                      label: tab.label,
                      to: "".concat(match.url, "/music/").concat(tab.id).concat((_location$search = location.search) !== null && _location$search !== void 0 ? _location$search : ''),
                      component: Link,
                      onClick: function onClick() {
                        tab.ubiLogger();
                      }
                    }, tab.id), tab.label.toLowerCase() === 'releases' && /*#__PURE__*/_jsx(ReleasePageCallout, {
                      artistId: artistId
                    })]
                  }, tab.id) : /*#__PURE__*/_jsx(DisabledNavigationTab, {
                    tab: tab
                  }, tab.id);
                })
              })
            }), /*#__PURE__*/_jsxs(React.Suspense, {
              fallback: null,
              children: [/*#__PURE__*/_jsx(ReleasedSubNavigation, {
                artistId: artistId,
                onFilterChange: this.onTimeFilterChange,
                route: derivedRoute,
                selectedFilter: selectedFilter,
                displaySearch: derivedRoute === SONGS_ROUTE,
                onSearch: this.onSearch,
                artistPermissions: artistPermissions
              }), /*#__PURE__*/_jsxs(Switch, {
                children: [/*#__PURE__*/_jsx(Route, {
                  exact: true,
                  "data-testid": "music-songs",
                  path: "".concat(match.url, "/music/").concat(SONGS_ROUTE),
                  render: function render(props) {
                    return /*#__PURE__*/_jsx(Songs, _objectSpread(_objectSpread({}, props), {}, {
                      selectedFilter: selectedFilter,
                      onTimeFilterChange: _this2.onTimeFilterChange,
                      searchQuery: searchQuery
                    }));
                  }
                }), hasStatsPlaylists && /*#__PURE__*/_jsx(Route, {
                  exact: true,
                  "data-testid": "music-playlists",
                  path: "".concat(match.url, "/music/").concat(PLAYLISTS_ROUTE),
                  render: function render(props) {
                    return /*#__PURE__*/_jsx(PlaylistsHooks, _objectSpread(_objectSpread({}, props), {}, {
                      selectedFilter: selectedFilter
                    }));
                  }
                }), /*#__PURE__*/_jsx(Route, {
                  exact: true,
                  "data-testid": "music-releases",
                  path: "".concat(match.url, "/music/").concat(RELEASES_ROUTE),
                  render: function render(props) {
                    return /*#__PURE__*/_jsx(Releases, _objectSpread(_objectSpread({}, props), {}, {
                      selectedFilter: selectedFilter
                    }));
                  }
                }), /*#__PURE__*/_jsx(Route, {
                  exact: true,
                  "data-testid": "music-upcoming",
                  path: "".concat(match.url, "/music/").concat(UPCOMING_ROUTE) // @ts-ignore
                  ,
                  render: function render(props) {
                    return /*#__PURE__*/_jsx(UpcomingCatalog, _objectSpread({}, props));
                  }
                }), /*#__PURE__*/_jsx(Route, {
                  render: function render() {
                    return /*#__PURE__*/_jsx(Redirect, {
                      to: "".concat(match.url, "/music/").concat(defaultRoute)
                    });
                  }
                })]
              })]
            })]
          })]
        })
      });
    }
  }]);

  return Music;
}(React.Component);

_defineProperty(Music, "defaultProps", {
  artist: {
    id: '',
    name: ''
  }
});

var MusicWithRouter = withRouter(Music);
export function MusicHooks(props) {
  var artistPermissions = useCurrentArtistPermissions();
  var statsPermissions = useS4xInsightsArtistPermissions();
  var artist = useCurrentArtist();
  var viewport = useViewport();
  var isEmployee = useIsEmployee();
  var hasDataDelayAlert = useHasDataDelayAlert();
  var hasReleasesFirst = useHasReleasesFirst();
  var showQualtricsBanner = useShowQualtricsBanner();
  var getSelectedFilter = useGetSelectedFilter();
  var t = useT();
  var strings = useGetString();
  var loggers = useMusicTabsLoggers();
  return /*#__PURE__*/_jsx(MusicWithRouter, _objectSpread(_objectSpread({}, props), {}, {
    artistPermissions: artistPermissions,
    statsPermissions: statsPermissions,
    artist: artist,
    viewport: breakpointValues[viewport],
    hasReleasesFirst: hasReleasesFirst,
    isEmployee: isEmployee,
    hasDataDelayAlert: hasDataDelayAlert,
    showQualtricsBanner: showQualtricsBanner,
    t: t,
    strings: strings,
    getSelectedFilter: getSelectedFilter,
    ubiTabLoggers: loggers
  }));
}