import _defineProperty from "/var/jenkins_home/workspace/tingle.acf7316e-c5eb-4849-947a-e5dd91fd7b9e/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "/var/jenkins_home/workspace/tingle.acf7316e-c5eb-4849-947a-e5dd91fd7b9e/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.acf7316e-c5eb-4849-947a-e5dd91fd7b9e/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _inherits from "/var/jenkins_home/workspace/tingle.acf7316e-c5eb-4849-947a-e5dd91fd7b9e/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.acf7316e-c5eb-4849-947a-e5dd91fd7b9e/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.acf7316e-c5eb-4849-947a-e5dd91fd7b9e/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import { ErrorBoundary } from '@mrkt/features/Platform';
import { DocumentTitle } from '@mrkt/features/document-title';
import { withT } from '@mrkt/features/i18n';
import { useGetString } from '../../shared/messages/strings';
import { PageAlert } from '../../shared/components/PageAlert';
import { useCurrentArtist } from '../../features/artists';
import { SongEntityHeader } from './SongEntityHeader';
import { SongErrorBoundaryFallback } from './SongErrorBoundaryFallback';
import { useHasAnyAccessToRecording } from './hooks/useHasAnyAccessToRecording';
import { useCurrentSong } from './hooks/useCurrentSong';
import { useBreakpointValue } from '../../shared/lib/useViewport';
import { useHasDataDelayAlert } from '../../shared/lib/hooks/useHasDataDelayAlert';
import { useShowQualtricsBanner } from '../QualtricsBanner/hooks/useShowQualtricsBanner';
import { QualtricsBanner } from '../QualtricsBanner';
import { PageId } from '../PlatformEvents';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var Playlists = /*#__PURE__*/React.lazy(function () {
  return import(
  /* webpackChunkName: "song-playlists" */
  './Playlists');
});
var Stats = /*#__PURE__*/React.lazy(function () {
  return import(
  /* webpackPreload: true, webpackChunkName: "song-stats" */
  './Stats').then(function (m) {
    return {
      default: m.Stats
    };
  });
});
export var SongClassComponent = /*#__PURE__*/function (_Component) {
  _inherits(SongClassComponent, _Component);

  var _super = _createSuper(SongClassComponent);

  function SongClassComponent() {
    _classCallCheck(this, SongClassComponent);

    return _super.apply(this, arguments);
  }

  _createClass(SongClassComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          canonicalError = _this$props.canonicalError,
          t = _this$props.t;

      if (canonicalError) {
        this.props.setAlert({
          title: t('SONG_8ee58b', 'Something went wrong.', ''),
          subtitle: t('SONG_4b5644', 'There’s a problem on our end and we can’t show these stats right now.', ''),
          error: true
        });
        return;
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.clearAlert();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          artistId = _this$props2.artist.id,
          location = _this$props2.location,
          match = _this$props2.match,
          history = _this$props2.history,
          song = _this$props2.song,
          viewport = _this$props2.viewport,
          hasNoRecordingAccess = _this$props2.hasNoRecordingAccess,
          _this$props2$toRender = _this$props2.toRender,
          toRender = _this$props2$toRender === void 0 ? {} : _this$props2$toRender,
          router = _this$props2.router,
          strings = _this$props2.strings,
          t = _this$props2.t;
      var preload = toRender.preload,
          Render = toRender.Render;

      if (!hasNoRecordingAccess && preload) {
        preload();
      }

      if (!hasNoRecordingAccess && !Render) {
        // we need a path - let's find one and redirect
        var query = qs.parse(location.search);
        var sectionParam = 'section';

        if (sectionParam in query && query[sectionParam] === 'song-playlists') {
          router.replace("".concat(location.pathname, "/playlists"));
          return null;
        }

        router.replace("".concat(location.pathname, "/stats"));
        return null;
      }

      return /*#__PURE__*/_jsx(Suspense, {
        fallback: null,
        children: /*#__PURE__*/_jsx(DocumentTitle, {
          title: "".concat(song.name, " \u2013 ").concat(t('SONG_dfdb43', 'Song', ''), " \u2013 ").concat(t('SONG_bfbc75', 'Spotify for Artists', '')),
          children: /*#__PURE__*/_jsxs(React.Fragment, {
            children: [this.props.hasDataDelayAlert && /*#__PURE__*/_jsx(PageAlert, {
              type: "warning",
              title: strings.dataDelayTitle,
              subtitle: strings.dataDelaySubtitle
            }), this.props.showQualtricsBanner && /*#__PURE__*/_jsx(QualtricsBanner, {
              pageId: PageId.ArtistSongStats
            }), hasNoRecordingAccess && /*#__PURE__*/_jsx(PageAlert, {
              type: "announcement",
              title: t('SONG_6a4d9d', 'You can’t see stats for this because this song is not part of your catalog.', '')
            }), /*#__PURE__*/_jsx(SongEntityHeader, {
              artistId: artistId,
              location: location,
              match: match,
              song: song
            }), !hasNoRecordingAccess && Render ? /*#__PURE__*/_jsx(Render, {
              match: match,
              location: location,
              history: history,
              viewport: viewport,
              artistId: artistId,
              songId: song.id
            }) : null]
          })
        })
      });
    }
  }]);

  return SongClassComponent;
}(Component);
SongClassComponent.propTypes = {
  artist: PropTypes.shape({
    id: PropTypes.string.isRequired
  }),
  toRender: PropTypes.shape({
    preload: PropTypes.func,
    Render: PropTypes.node
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  match: PropTypes.shape({
    url: PropTypes.string.isRequired
  }),
  hasDataDelayAlert: PropTypes.bool,
  setAlert: PropTypes.func,
  clearAlert: PropTypes.func,
  song: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.shape({
      height: PropTypes.number,
      url: PropTypes.string
    })),
    isLoading: PropTypes.bool,
    hasError: PropTypes.bool
  }),
  canonicalError: PropTypes.bool,
  viewport: PropTypes.number,
  hasNoRecordingAccess: PropTypes.bool,
  router: PropTypes.shape({
    replace: PropTypes.func,
    asPath: PropTypes.string
  }),
  strings: PropTypes.oneOfType([PropTypes.objectOf(PropTypes.string), PropTypes.shape({
    worldwide: PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  })]),
  t: PropTypes.func,
  showQualtricsBanner: PropTypes.bool.isRequired
};
SongClassComponent.defaultProps = {
  setAlert: function setAlert() {},
  clearAlert: function clearAlert() {}
};
export var Song = withT(SongClassComponent);
/* eslint-disable-next-line import/no-default-export */

export function SongHooks(props) {
  var hasNoRecordingAccess = !useHasAnyAccessToRecording();
  var location = useLocation();
  var viewport = useBreakpointValue();
  var artist = useCurrentArtist();
  var song = useCurrentSong();
  var hasDataDelayAlert = useHasDataDelayAlert();
  var router = useRouter();
  var showQualtricsBanner = useShowQualtricsBanner();
  var strings = useGetString();
  return /*#__PURE__*/_jsx(Song, _objectSpread(_objectSpread({}, props), {}, {
    hasNoRecordingAccess: hasNoRecordingAccess,
    location: location,
    viewport: viewport,
    hasDataDelayAlert: hasDataDelayAlert,
    artist: artist,
    song: song,
    router: router,
    showQualtricsBanner: showQualtricsBanner,
    strings: strings
  }));
}
/* eslint-disable-next-line import/no-default-export */

export default function SongWithHooksAndErrorBoundary(props) {
  return /*#__PURE__*/_jsx(ErrorBoundary, {
    fallback: /*#__PURE__*/_jsx(SongErrorBoundaryFallback, {}),
    children: /*#__PURE__*/_jsx(SongHooks, _objectSpread({}, props))
  });
}