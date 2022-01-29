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
import classNames from 'classnames';
import { IconX } from '@spotify-internal/encore-web';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { withT } from '@mrkt/features/i18n';
import { isTouchDevice } from '../../../shared/lib/isTouchDevice';
import { MediaWithText } from '../Card/Horizontal/MediaWithText';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var PlaylistComponent = /*#__PURE__*/function (_Component) {
  _inherits(PlaylistComponent, _Component);

  var _super = _createSuper(PlaylistComponent);

  function PlaylistComponent() {
    var _this;

    _classCallCheck(this, PlaylistComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "handleRemoveClick", function (uri) {
      sendEvent({
        eventCategory: 'Playlist',
        eventAction: 'click',
        eventLabel: 'Remove Playlist'
      });

      _this.props.onRemove(uri);
    });

    _defineProperty(_assertThisInitialized(_this), "renderDeleteButton", function () {
      var _this$props = _this.props,
          hasRemoveFeature = _this$props.hasRemoveFeature,
          uri = _this$props.uri,
          mobile = _this$props.mobile,
          t = _this$props.t;
      return hasRemoveFeature ? /*#__PURE__*/_jsx("button", {
        type: "button",
        className: classNames(styles['playlist-remove_button'], _defineProperty({}, styles['playlist-remove_button--visible'], isTouchDevice())),
        onClick: function onClick() {
          return _this.handleRemoveClick(uri);
        },
        "data-testid": "playlist-remove",
        "data-slo-id": "playlist-remove-".concat(_this.props.index),
        "aria-label": t('artistprofile_playlist_1', 'remove artist playlist', ''),
        children: /*#__PURE__*/_jsx(IconX, {
          iconSize: mobile ? 16 : 32
        })
      }) : null;
    });

    return _this;
  }

  _createClass(PlaylistComponent, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          uri = _this$props2.uri,
          image = _this$props2.image,
          title = _this$props2.title,
          subtitle = _this$props2.subtitle;
      return /*#__PURE__*/_jsxs("div", {
        className: styles.playlist,
        "data-testid": "playlist",
        children: [/*#__PURE__*/_jsx(MediaWithText, {
          title: title,
          subtitle: subtitle,
          image: image,
          href: uri,
          onClick: function onClick() {
            return sendEvent({
              eventCategory: 'Playlist',
              eventAction: 'click',
              eventLabel: 'View Playlist'
            });
          },
          hasSmControls: true
        }), this.renderDeleteButton()]
      });
    }
  }]);

  return PlaylistComponent;
}(Component);

export var Playlist = withT(PlaylistComponent);