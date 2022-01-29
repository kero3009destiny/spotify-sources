import _classCallCheck from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _inherits from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import { withT } from '@mrkt/features/i18n';
import { SearchEntityPicker } from '@mrkt/features/combobox/EntityPicker';
import { white, black } from '@spotify-internal/encore-web';
import { EditControls } from '../../EditControls';
import styles from './index.module.scss';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledSearchEntityPicker = styled(SearchEntityPicker).withConfig({
  displayName: "Search__StyledSearchEntityPicker",
  componentId: "sc-10g8mor-0"
})(["& input{background-color:", ";color:", ";}"], white, black);

var adjustDefaultResults = function adjustDefaultResults(playlists) {
  return {
    playlists: {
      items: playlists.map(function (p) {
        return _objectSpread(_objectSpread({}, p), {}, {
          images: [{
            url: p.images
          }]
        });
      })
    }
  };
};

var SearchComponent = /*#__PURE__*/function (_React$Component) {
  _inherits(SearchComponent, _React$Component);

  var _super = _createSuper(SearchComponent);

  function SearchComponent() {
    _classCallCheck(this, SearchComponent);

    return _super.apply(this, arguments);
  }

  _createClass(SearchComponent, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          defaultSearchData = _this$props.defaultSearchData,
          headerItem = _this$props.headerItem,
          onCancel = _this$props.onCancel,
          _onSelect = _this$props.onSelect,
          query = _this$props.query,
          t = _this$props.t;
      var defaultSearchResults = adjustDefaultResults(defaultSearchData);
      return /*#__PURE__*/_jsxs("div", {
        className: styles.search,
        "data-testid": "artist-pick-search",
        children: [/*#__PURE__*/_jsx(StyledSearchEntityPicker, {
          entityTypes: ['album', 'playlist', 'track', 'show', 'episode'],
          defaultResults: defaultSearchResults,
          onSelect: function onSelect(packet) {
            return _onSelect(packet.entity);
          },
          isOpen: true,
          resultsPosition: "bottom",
          placeholder: t('artistprofile_artistpick_search_1', 'Search or paste a Spotify link', ''),
          children: headerItem
        }), /*#__PURE__*/_jsx(EditControls, {
          onCancel: onCancel,
          saveable: false,
          testIdPrefix: "artist-pick-"
        })]
      });
    }
  }]);

  return SearchComponent;
}(React.Component);

export var Search = withT(SearchComponent);