import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _inherits from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Suspense } from 'react';
import { DocumentTitle } from '@mrkt/features/document-title';
import { useT } from '@mrkt/features/i18n';
import { useCurrentArtist } from '../../../features/artists';
import { PlaylistOverviewHooks } from './Overview';
import { LoadingIndicator } from '../../../shared/components/LoadingIndicator';
import { jsx as _jsx } from "react/jsx-runtime";
export var Playlists = /*#__PURE__*/function (_React$Component) {
  _inherits(Playlists, _React$Component);

  var _super = _createSuper(Playlists);

  function Playlists() {
    _classCallCheck(this, Playlists);

    return _super.apply(this, arguments);
  }

  _createClass(Playlists, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          artist = _this$props.artist,
          location = _this$props.location,
          t = _this$props.t;
      return /*#__PURE__*/_jsx(DocumentTitle, {
        title: t('MUSIC_PLAYLISTS_4ad7a7', 'Music – Playlists – {name} – Spotify for Artists', '', {
          name: artist.name
        }),
        children: /*#__PURE__*/_jsx(Suspense, {
          fallback: /*#__PURE__*/_jsx(LoadingIndicator, {}),
          children: /*#__PURE__*/_jsx(PlaylistOverviewHooks, {
            location: location,
            selectedFilter: this.props.selectedFilter
          })
        })
      });
    }
  }]);

  return Playlists;
}(React.Component);
export function PlaylistsHooks(props) {
  var t = useT();
  var artist = useCurrentArtist();
  return /*#__PURE__*/_jsx(Playlists, _objectSpread(_objectSpread({
    artist: artist
  }, props), {}, {
    t: t
  }));
}