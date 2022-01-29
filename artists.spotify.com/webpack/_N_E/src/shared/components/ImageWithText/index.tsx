import _classCallCheck from "/var/jenkins_home/workspace/tingle.6f65633f-662c-4704-a4bb-814ea3b65e30/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.6f65633f-662c-4704-a4bb-814ea3b65e30/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _inherits from "/var/jenkins_home/workspace/tingle.6f65633f-662c-4704-a4bb-814ea3b65e30/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.6f65633f-662c-4704-a4bb-814ea3b65e30/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.6f65633f-662c-4704-a4bb-814ea3b65e30/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// ignore-string-externalization
import classNames from 'classnames';
import invariant from 'invariant';
import React, { Component } from 'react';
import { IconArrowTopRight, IconArtist, IconPlaylist, IconTrack, IconUser } from '@spotify-internal/encore-web';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var ImageWithText = /*#__PURE__*/function (_Component) {
  _inherits(ImageWithText, _Component);

  var _super = _createSuper(ImageWithText);

  function ImageWithText() {
    _classCallCheck(this, ImageWithText);

    return _super.apply(this, arguments);
  }

  _createClass(ImageWithText, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          image = _this$props.image,
          icon = _this$props.icon,
          className = _this$props.className,
          imageClass = _this$props.imageClass,
          name = _this$props.name,
          rounded = _this$props.rounded,
          small = _this$props.small,
          large = _this$props.large,
          stacked = _this$props.stacked,
          external = _this$props.external,
          meta = _this$props.meta,
          status = _this$props.status,
          statusClass = _this$props.statusClass,
          statusIcon = _this$props.statusIcon,
          statusInlineStyle = _this$props.statusInlineStyle;
      invariant(image || icon, 'One of "icon" and "image" has to be set');
      invariant(!image || !icon, 'Only one of "icon" and "image" can be set');
      invariant(!status || !meta, 'Only one of "icon" and "image" can be set');
      var IconName = {
        artist: IconArtist,
        playlist: IconPlaylist,
        track: IconTrack,
        user: IconUser
      }[icon
      /* this is a lie - might be undefined, but TS doesn't like indexing by undefined */
      ];
      var IconSize;

      if (rounded && !small) {
        IconSize = 24;
      } else if (small) {
        IconSize = 16;
      } else if (large) {
        IconSize = 64;
      } else {
        IconSize = 48;
      }

      return /*#__PURE__*/_jsxs("div", {
        className: classNames(styles.image_text, stacked && styles.image_text__stacked, className),
        children: [image && /*#__PURE__*/_jsx("span", {
          "data-testid": "image-with-text",
          className: classNames(styles.image_text_image, styles.image_text_media, small && styles.image_text_media__small, large && styles.image_text_media__large, rounded && styles.image_text_media__rounded, imageClass && imageClass),
          style: {
            backgroundImage: "url('".concat(image, "')")
          },
          role: "img",
          "aria-label": name
        }), icon && /*#__PURE__*/_jsx("span", {
          className: classNames(styles.image_text_media, small && styles.image_text_media__small, large && styles.image_text_media__large, rounded && styles.image_text_media__rounded, imageClass && imageClass),
          children: /*#__PURE__*/_jsx(IconName, {
            "data-testid": "image-icon",
            iconSize: IconSize
          })
        }), /*#__PURE__*/_jsxs("span", {
          className: styles.image_text_wrapper,
          children: [/*#__PURE__*/_jsxs("span", {
            className: classNames(styles.image_text_name, small && styles.image_text_name__small, (meta && meta.length > 0 || status) && styles.image_text_name__with_metadata),
            children: [name, external && /*#__PURE__*/_jsx(IconArrowTopRight, {
              className: styles.image_text_external_link,
              iconSize: 16
            })]
          }), meta && meta.length > 0 && /*#__PURE__*/_jsx("span", {
            className: styles.image_text_meta,
            children: meta.join(' - ')
          }), status && /*#__PURE__*/_jsxs("span", {
            className: styles.image_text_meta,
            children: [statusIcon, /*#__PURE__*/_jsx("span", {
              className: statusClass,
              style: statusInlineStyle,
              children: status
            })]
          })]
        })]
      });
    }
  }]);

  return ImageWithText;
}(Component);