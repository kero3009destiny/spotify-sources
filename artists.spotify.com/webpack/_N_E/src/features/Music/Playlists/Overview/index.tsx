import _classCallCheck from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import has from 'lodash/has';
import { ButtonTertiary, IconDownloadAlt, IconHelpAlt, ButtonIcon, OverlayTrigger, Type, Tooltip, TooltipTrigger } from '@spotify-internal/encore-web-v3';
import styled, { css } from 'styled-components';
import capitalize from 'lodash/capitalize';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { useT } from '@mrkt/features/i18n';
import { CoverArt } from '../../../../shared/components/CoverArt';
import { MediaObject } from '../../../../shared/components/MediaObject';
import { CSV_DOWNLOAD_API } from '../../../../shared/lib/api';
import { setPlaylistOverviewOrder } from '../../../../features/CatalogUtils/PlaylistsSorter';
import { validateQueryOptions } from '../../../../features/CatalogUtils/urls';
import { PlaylistsResource } from '../Loader';
import { StyleEmptyStateContainer } from '../../Styles';
import FullPageOverlay from '../FullPageOverlay';
import { PlaylistTitle } from '../PlaylistTitle';
import ConnectedSongsInPlaylistTable from '../SongsInPlaylistTable';
import { useGetString } from '../../../../shared/messages/strings';
import discoverWeeklyImg from '../img/discover-weekly.jpg';
import releaseRadarImg from '../img/release-radar.jpg';
import radioImg from '../img/radio.jpg';
import dailyMixImg from '../img/daily-mix.jpg';
import { useCurrentArtist } from '../../../../features/artists';
import { breakpointValues, useViewport, Screen } from '../../../../shared/lib/useViewport';
import { PLAYLISTS_ROUTE, TIME_FILTER, useGetCatalogFilterOptions } from '../../../../features/CatalogUtils/constants';
import { PlaylistsCurated } from '../PlaylistsCurated';
import { PlaylistsPersonalized } from '../PlaylistsPersonalized';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var LearnMoreButton = styled(ButtonTertiary).withConfig({
  displayName: "Overview__LearnMoreButton",
  componentId: "sc-1p0hqe4-0"
})(["padding-left:0;"]);
var trackingCategory = 'CatalogReleased';
export var PlaylistOverview = /*#__PURE__*/function (_Component) {
  _inherits(PlaylistOverview, _Component);

  var _super = _createSuper(PlaylistOverview);

  function PlaylistOverview() {
    var _this2 = this;

    var _this;

    _classCallCheck(this, PlaylistOverview);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isExpandedAlgorithmic: false,
      isExpandedEditorial: false,
      isExpandedListener: false,
      overlayContent: [],
      showOverlay: false,
      tooltips: {},
      prevSelectedFilter: _this.props.selectedFilter
    });

    _defineProperty(_assertThisInitialized(_this), "defaultAlgoOrder", [{
      title: _this.props.t('MUSIC_PLAYLISTS_87b059', 'Discover Weekly', ''),
      desc: _this.props.t('MUSIC_PLAYLISTS_1453cb', 'A weekly collection of songs a listener hasn’t heard yet that intros your music to fans based on their taste.', ''),
      img: discoverWeeklyImg
    }, {
      title: _this.props.t('MUSIC_PLAYLISTS_8663b6', 'Release Radar', ''),
      desc: _this.props.t('MUSIC_PLAYLISTS_4f8227', 'A weekly playlist of new releases where your followers always get your latest stuff.', ''),
      img: releaseRadarImg
    }, {
      title: _this.props.t('MUSIC_PLAYLISTS_a18146', 'Your Daily Mix', ''),
      desc: _this.props.t('MUSIC_PLAYLISTS_d43d0f', 'A set of constantly updating playlists that groups you with artists in your genre.', ''),
      img: dailyMixImg
    }, {
      title: _this.props.t('MUSIC_PLAYLISTS_5a54c7', 'Radio', 'This refers to a music that’s played from our "radio" feature in the application.'),
      desc: _this.props.t('MUSIC_PLAYLISTS_b5c82f', 'A station based on any artist, song, release, or playlist that features you with other artists your fans listen to.', ''),
      img: radioImg
    }]);

    _defineProperty(_assertThisInitialized(_this), "PopoverBody",
    /* istanbul ignore next */
    function (t) {
      return [/*#__PURE__*/_jsx("strong", {
        children: t('MUSIC_PLAYLISTS_38d279', 'When do playlists appear?', '')
      }, "question-h"), /*#__PURE__*/_jsx("br", {}, "br-h"), /*#__PURE__*/_jsx("span", {
        children: t('MUSIC_PLAYLISTS_b661c0', 'Editorial and listener playlists appear when you reach 2 listeners on a playlist—limit top 100 per type. Personalized playlist stats appear when you reach 1 listener.', '')
      }, "answer-h")];
    });

    _defineProperty(_assertThisInitialized(_this), "messages", {
      heading: _this.props.t('MUSIC_PLAYLISTS_ce1e2e', 'Learn all about playlists on Spotify', ''),
      button: _this.props.t('MUSIC_PLAYLISTS_638179', 'Go to playlist guide', ''),
      description: _this.props.t('MUSIC_PLAYLISTS_171884', 'Get more information from the guide on our website.', ''),
      empty: _this.props.t('MUSIC_PLAYLISTS_511a3f', 'No stats for this time period.', ''),
      unauthorized: _this.props.t('MUSIC_PLAYLISTS_feb518', "You do not have access to this artist's playlists.", '')
    });

    _defineProperty(_assertThisInitialized(_this), "timeFilters", {
      '1day': _this.props.t('MUSIC_PLAYLISTS_59acd7', 'Last 24 hours', ''),
      '7day': _this.props.t('MUSIC_PLAYLISTS_8a96ad', 'Last 7 days', ''),
      '28day': _this.props.t('MUSIC_PLAYLISTS_758c74', 'Last 28 days', ''),
      last5years: _this.props.t('MUSIC_PLAYLISTS_a1b213', 'Since 2015', '')
    });

    _defineProperty(_assertThisInitialized(_this), "handleExpandToggle", function (type) {
      return function () {
        var capitalizedType = capitalize(type); // @ts-ignore

        if (!_this.state["isExpanded".concat(capitalizedType)]) {
          // currently not expanded, will be expanded
          sendEvent({
            eventCategory: trackingCategory,
            eventAction: 'showMore',
            eventLabel: type.toLowerCase()
          });
        }

        _this.setState(function (state) {
          return _defineProperty({}, "isExpanded".concat(capitalizedType), !state["isExpanded".concat(capitalizedType)]);
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "handleHide", function (key) {
      return _this.setState(function (state) {
        return {
          tooltips: _objectSpread(_objectSpread({}, state.tooltips), {}, _defineProperty({}, key, false))
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleShow", function (key) {
      return _this.setState(function (state) {
        return {
          tooltips: _objectSpread(_objectSpread({}, state.tooltips), {}, _defineProperty({}, key, true))
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "downloadAction", function (_ref2) {
      var key = _ref2.key,
          isShown = _ref2.isShown;
      return /*#__PURE__*/_jsx("div", {
        className: styles.action,
        children: /*#__PURE__*/_jsx(TooltipTrigger, {
          placement: OverlayTrigger.bottom // @ts-ignore
          ,
          trackingId: "PlaylistEdOverview",
          onHide:
          /* istanbul ignore next */
          function onHide() {
            return _this.handleHide(key);
          },
          onShow:
          /* istanbul ignore next */
          function onShow() {
            return _this.handleShow(key);
          },
          overlay: isShown && /*#__PURE__*/_jsx(Tooltip, {
            children: _this.props.t('MUSIC_PLAYLISTS_0bf56d', 'Download data as a CSV file', '')
          }),
          children: /*#__PURE__*/_jsx(ButtonIcon, {
            component: "a",
            target: "_self",
            href: "".concat(CSV_DOWNLOAD_API, "/v2/artist/").concat(_this.props.artist.id, "/downloads/playlists.csv?time-filter=").concat(_this.props.selectedFilter),
            children: /*#__PURE__*/_jsx(IconDownloadAlt, {})
          })
        })
      }, key);
    });

    _defineProperty(_assertThisInitialized(_this), "helpAction", function (_ref3, t) {
      var key = _ref3.key,
          isShown = _ref3.isShown;
      return /*#__PURE__*/_jsx("div", {
        className: styles.action,
        children: /*#__PURE__*/_jsx(TooltipTrigger, {
          placement: OverlayTrigger.bottom,
          onHide:
          /* istanbul ignore next */
          function onHide() {
            return _this.handleHide(key);
          },
          onShow:
          /* istanbul ignore next */
          function onShow() {
            return _this.handleShow(key);
          },
          overlay: isShown && /*#__PURE__*/_jsx(Tooltip, {
            children: /*#__PURE__*/_jsx(_this2.PopoverBody, {
              t: t
            })
          }),
          children: /*#__PURE__*/_jsx(ButtonIcon, {
            children: /*#__PURE__*/_jsx(IconHelpAlt, {})
          })
        })
      }, key);
    });

    _defineProperty(_assertThisInitialized(_this), "toggleOverlay", function (data) {
      _this.setState(function (state) {
        return {
          showOverlay: !state.showOverlay,
          overlayContent: data
        };
      });
    });

    return _this;
  }

  _createClass(PlaylistOverview, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          artist = _this$props.artist,
          response = _this$props.response,
          viewport = _this$props.viewport,
          selectedFilter = _this$props.selectedFilter;
      var _this$state = this.state,
          isExpandedAlgorithmic = _this$state.isExpandedAlgorithmic,
          isExpandedEditorial = _this$state.isExpandedEditorial,
          isExpandedListener = _this$state.isExpandedListener,
          showOverlay = _this$state.showOverlay;
      var isXSmallScreen = viewport <= Screen.XS;
      var isMediumScreen = viewport <= Screen.MD;
      var isSmallScreen = viewport <= Screen.SM; // @ts-ignore

      var selectedFilterText = this.timeFilters[selectedFilter];

      if (response.status === 204) {
        return (
          /*#__PURE__*/
          // @ts-ignore
          _jsx(StyleEmptyStateContainer, {
            "data-testid": "playlists-empty",
            children: /*#__PURE__*/_jsx(Type, {
              as: "p",
              children: this.messages.empty
            })
          })
        );
      }

      if (has(response, 'status') && response.status >= 400) {
        if (response.status === 403) {
          return (
            /*#__PURE__*/
            // @ts-ignore
            _jsx(StyleEmptyStateContainer, {
              "data-testid": "playlists-unauthorized",
              children: /*#__PURE__*/_jsx(Type, {
                as: "p",
                children: this.messages.unauthorized
              })
            })
          );
        }

        return (
          /*#__PURE__*/
          // @ts-ignore
          _jsx(StyleEmptyStateContainer, {
            "data-testid": "playlists-error",
            children: /*#__PURE__*/_jsxs(Type, {
              as: "p",
              children: [" ", this.props.strings.insightsError]
            })
          })
        );
      }

      var sortedPlaylistResponse = setPlaylistOverviewOrder(this.defaultAlgoOrder, response); // Add z-index and relative position to parent for inner Popovers to display beneath the Header

      var cssFragment = css(["z-index:0;position:relative;"]);
      var StyledOverviewSection = styled.section.withConfig({
        displayName: "Overview__StyledOverviewSection",
        componentId: "sc-1p0hqe4-1"
      })(["", ""], function (props) {
        return !props.showOverlay && cssFragment;
      }); // show that we have some data!

      var hasListenerPlaylists = sortedPlaylistResponse.listener.playlists.length !== 0;
      var hasEditorialPlaylists = sortedPlaylistResponse.editorial.playlists.length !== 0;
      var showPersonalizedHeaders = sortedPlaylistResponse.algorithmic.playlists.filter(
      /* istanbul ignore next */
      function (p) {
        return !p.isPlaceholder;
      }).length > 0;
      return /*#__PURE__*/_jsxs(StyledOverviewSection, {
        className: styles.section,
        showOverlay: showOverlay,
        "data-testid": "playlist-overview",
        children: [showOverlay && /*#__PURE__*/_jsx(FullPageOverlay, {
          "data-testid": "full-page-overlay",
          header: /*#__PURE__*/_jsx(MediaObject, {
            stacked: true,
            thumbnail: /*#__PURE__*/_jsx(PlaylistTitle, {
              data: this.state.overlayContent,
              isMobileOverlay: true,
              children: /*#__PURE__*/_jsx(CoverArt, {
                stacked: true,
                className: styles.overlay_playlist_thumb,
                imgSrc: this.state.overlayContent.pictureUri,
                size: 144
              })
            }),
            title: /*#__PURE__*/_jsx(PlaylistTitle // @ts-ignore
            , {
              className: styles.overlay_playlist_link,
              data: this.state.overlayContent,
              isMobileOverlay: true,
              children: /*#__PURE__*/_jsx(Type, {
                as: "h2",
                className: styles.overlay_playlist_title,
                children: this.state.overlayContent.title
              })
            }),
            subtitle: /*#__PURE__*/_jsx(Type, {
              as: "h3",
              className: styles.overlay_playlist_subtitle,
              children: this.state.overlayContent.owner
            })
          }),
          body: /*#__PURE__*/_jsx(ConnectedSongsInPlaylistTable, {
            artistId: artist.id,
            data: this.state.overlayContent
          }),
          onClose: this.toggleOverlay
        }), /*#__PURE__*/_jsxs(React.Fragment, {
          children: [/*#__PURE__*/_jsx(PlaylistsPersonalized // @ts-ignore
          , {
            artistId: artist.id,
            handleExpandToggle: this.handleExpandToggle,
            handleHide: this.handleHide,
            handleShow: this.handleShow,
            isSmallScreen: isSmallScreen,
            isMediumScreen: isMediumScreen,
            isXSmallScreen: isXSmallScreen,
            playlists: sortedPlaylistResponse.algorithmic.playlists,
            isExpanded: isExpandedAlgorithmic,
            showPersonalizedHeaders: showPersonalizedHeaders,
            toggleOverlay: this.toggleOverlay // @ts-ignore
            ,
            tooltipMobile: this.state.tooltips.personalizedMobile,
            type: "algorithmic",
            selectedFilterText: selectedFilterText
          }), /*#__PURE__*/_jsx(PlaylistsCurated // @ts-ignore
          , {
            artistId: artist.id,
            description: this.props.t('MUSIC_PLAYLISTS_d91a17', 'Playlists made by our editorial team based on music trends and data.', ''),
            emptyMessage: this.props.t('MUSIC_PLAYLISTS_549c82', 'No stats for this time period. Stats appear the day after a listener plays your song from an editorial playlist.', ''),
            handleExpandToggle: this.handleExpandToggle,
            handleHide: this.handleHide,
            handleShow: this.handleShow,
            hasPlaylists: hasEditorialPlaylists,
            isExpanded: isExpandedEditorial,
            isSmallScreen: isSmallScreen,
            isMediumScreen: isMediumScreen,
            isXSmallScreen: isXSmallScreen,
            playlists: sortedPlaylistResponse.editorial,
            toggleOverlay: this.toggleOverlay // @ts-ignore
            ,
            tooltipMobile: this.state.tooltips.editorialMobile,
            type: "editorial",
            trackingCategory: trackingCategory,
            selectedFilterText: selectedFilterText
          }), /*#__PURE__*/_jsx(PlaylistsCurated // @ts-ignore
          , {
            artistId: artist.id,
            description: this.props.t('MUSIC_PLAYLISTS_adde28', 'Playlists made by Spotify listeners.', ''),
            emptyMessage: this.props.t('MUSIC_PLAYLISTS_1aa05a', 'No stats for this time period. Stats appear the day after a listener plays your song from a public listener playlist.', 'This refers to a public playlist created by a listener.'),
            handleExpandToggle: this.handleExpandToggle,
            handleHide: this.handleHide,
            handleShow: this.handleShow,
            hasPlaylists: hasListenerPlaylists,
            isExpanded: isExpandedListener,
            isSmallScreen: isSmallScreen,
            isMediumScreen: isMediumScreen,
            isXSmallScreen: isXSmallScreen,
            playlists: sortedPlaylistResponse.listener,
            toggleOverlay: this.toggleOverlay // @ts-ignore
            ,
            tooltipMobile: this.state.tooltips.listenerMobile,
            type: "listener",
            trackingCategory: trackingCategory,
            selectedFilterText: selectedFilterText
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: styles.marketing_section,
          children: [/*#__PURE__*/_jsx(Type, {
            as: "h3",
            variant: "heading2",
            children: this.messages.heading
          }), /*#__PURE__*/_jsx(Type, {
            as: "p",
            variant: "body1",
            className: styles.marketing_desc,
            children: this.messages.description
          }), /*#__PURE__*/_jsx(LearnMoreButton, {
            href: "https://artists.spotify.com/guide/playlists",
            color: "green",
            children: this.messages.button
          })]
        })]
      });
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.selectedFilter !== state.prevSelectedFilter) {
        return {
          prevSelectedFilter: props.selectedFilter,
          isExpandedAlgorithmic: false,
          isExpandedListener: false,
          isExpandedEditorial: false
        };
      }

      return null;
    }
  }]);

  return PlaylistOverview;
}(Component);
export function PlaylistOverviewHooks(props) {
  var artist = useCurrentArtist();
  var viewport = useViewport();
  var location = useLocation();
  var strings = useGetString();
  var getCatalogFilterOptions = useGetCatalogFilterOptions();
  var CATALOG_FILTER_OPTIONS = getCatalogFilterOptions(PLAYLISTS_ROUTE);
  var query = validateQueryOptions(TIME_FILTER, location.search, CATALOG_FILTER_OPTIONS, PLAYLISTS_ROUTE);
  var response = PlaylistsResource.read({
    artistId: artist.id,
    query: query
  });
  var t = useT();
  return /*#__PURE__*/_jsx(PlaylistOverview, _objectSpread(_objectSpread({
    artist: artist,
    viewport: breakpointValues[viewport],
    response: response
  }, props), {}, {
    strings: strings,
    t: t
  }));
}