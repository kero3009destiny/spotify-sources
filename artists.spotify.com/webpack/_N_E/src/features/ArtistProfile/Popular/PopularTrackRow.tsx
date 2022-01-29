import _classCallCheck from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// ignore-string-externalization
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import classNames from 'classnames';
import styled from 'styled-components';
import { Image, IconAlbum, TableRow, TableCell } from '@spotify-internal/encore-web';
import { basicNumberFormatter } from '../../../shared/lib/numberHelpers';
import { matchUri } from '../../../shared/lib/urlHelpers';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var TableCellFlexRow = styled(TableCell).withConfig({
  displayName: "PopularTrackRow__TableCellFlexRow",
  componentId: "cr7p5e-0"
})(["display:flex;align-items:center;"]);

var PopularTrackRow = /*#__PURE__*/function (_Component) {
  _inherits(PopularTrackRow, _Component);

  var _super = _createSuper(PopularTrackRow);

  function PopularTrackRow() {
    var _this;

    _classCallCheck(this, PopularTrackRow);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "goToSongDetails", function () {
      var history = _this.props.history;
      history.push({
        pathname: _this.getSongDetailsUrl()
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getSongDetailsUrl", function () {
      var _this$props = _this.props,
          artist = _this$props.artist,
          trackUri = _this$props.trackUri;
      return "/artist/".concat(artist.id, "/song/").concat(matchUri(trackUri).id);
    });

    return _this;
  }

  _createClass(PopularTrackRow, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          artwork = _this$props2.artwork,
          name = _this$props2.name,
          playCount = _this$props2.playCount,
          trackIndex = _this$props2.trackIndex,
          trackUri = _this$props2.trackUri,
          visible = _this$props2.visible;
      var validArtwork = artwork && artwork.uri;
      var playCountText = playCount === 0 ? '< 1,000' : basicNumberFormatter(playCount);
      var trackClassName = classNames(styles['popular-tracks-row'], visible ? 'visible' : 'hidden');
      return /*#__PURE__*/_jsxs(TableRow, {
        hover: true,
        className: trackClassName,
        onClick: this.goToSongDetails,
        children: [/*#__PURE__*/_jsxs(TableCellFlexRow, {
          className: "encore-muted-accent-set",
          children: [validArtwork ? /*#__PURE__*/_jsx(Image, {
            src: artwork.uri,
            alt: "",
            imageHeight: "40px",
            imageWidth: "40px",
            crop: true
          }) : /*#__PURE__*/_jsx("div", {
            className: styles['popular-tracks-album-artwork'],
            children: /*#__PURE__*/_jsx(IconAlbum, {
              "aria-hidden": true,
              focusable: false,
              iconSize: 24
            })
          }), /*#__PURE__*/_jsx("div", {
            className: styles['popular-tracks-index-cell'],
            children: trackIndex
          })]
        }), /*#__PURE__*/_jsx(TableCell, {
          children: /*#__PURE__*/_jsx(Link, {
            to: this.getSongDetailsUrl(),
            className: styles['popular-tracks-link'],
            children: name
          })
        }), /*#__PURE__*/_jsx(TableCell, {
          children: playCountText
        })]
      }, trackUri);
    }
  }]);

  return PopularTrackRow;
}(Component);
/* eslint-disable-next-line import/no-default-export */


_defineProperty(PopularTrackRow, "defaultProps", {
  visible: true
});

export default compose(withRouter)(PopularTrackRow);