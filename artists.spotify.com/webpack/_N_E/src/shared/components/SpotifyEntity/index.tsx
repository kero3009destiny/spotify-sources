import _defineProperty from "/var/jenkins_home/workspace/tingle.6f65633f-662c-4704-a4bb-814ea3b65e30/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "/var/jenkins_home/workspace/tingle.6f65633f-662c-4704-a4bb-814ea3b65e30/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "/var/jenkins_home/workspace/tingle.6f65633f-662c-4704-a4bb-814ea3b65e30/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.6f65633f-662c-4704-a4bb-814ea3b65e30/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _inherits from "/var/jenkins_home/workspace/tingle.6f65633f-662c-4704-a4bb-814ea3b65e30/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.6f65633f-662c-4704-a4bb-814ea3b65e30/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.6f65633f-662c-4704-a4bb-814ea3b65e30/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
var _excluded = ["type", "image", "name", "href", "onClick", "small", "large", "className", "stacked", "external", "meta", "status", "statusClass", "statusIcon", "statusInlineStyle"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// ignore-string-externalization
import classNames from 'classnames';
import React, { Component } from 'react';
import { normalizeImage } from '@mrkt/features/mediahelpers';
import { ImageWithText } from '../ImageWithText';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
var blockName = 'spotify_entity';
export var SpotifyEntity = /*#__PURE__*/function (_Component) {
  _inherits(SpotifyEntity, _Component);

  var _super = _createSuper(SpotifyEntity);

  function SpotifyEntity() {
    _classCallCheck(this, SpotifyEntity);

    return _super.apply(this, arguments);
  }

  _createClass(SpotifyEntity, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          type = _this$props.type,
          image = _this$props.image,
          name = _this$props.name,
          href = _this$props.href,
          onClick = _this$props.onClick,
          small = _this$props.small,
          large = _this$props.large,
          className = _this$props.className,
          stacked = _this$props.stacked,
          external = _this$props.external,
          meta = _this$props.meta,
          status = _this$props.status,
          statusClass = _this$props.statusClass,
          statusIcon = _this$props.statusIcon,
          statusInlineStyle = _this$props.statusInlineStyle,
          attributes = _objectWithoutProperties(_this$props, _excluded);

      var imageUrl = normalizeImage(image);
      var sizeClass = '';

      if (large) {
        sizeClass = '-lrg';
      }

      if (small) {
        sizeClass = '-sm';
      }

      var imageClass = "".concat(blockName, "-image--placeholder").concat(sizeClass);
      var rounded = type === 'artist' || type === 'user';
      var icon = rounded ? 'artist' : 'track';
      var props = {
        image: imageUrl,
        icon: !imageUrl ? icon : undefined,
        imageClass: type && !imageUrl ? styles[imageClass] : undefined,
        name: name,
        rounded: rounded,
        small: small,
        large: large,
        stacked: stacked,
        external: external,
        meta: meta,
        status: status,
        statusClass: statusClass,
        statusIcon: statusIcon,
        statusInlineStyle: statusInlineStyle
      };
      var TagName = href ? 'a' : 'div';
      return /*#__PURE__*/_jsx(TagName, _objectSpread(_objectSpread(_objectSpread({}, attributes), href && {
        href: href,
        onClick: onClick
      } || {}), {}, {
        title: name,
        "data-testid": "spotify-entity",
        className: classNames(styles.spotify_entity, className),
        children: /*#__PURE__*/_jsx(ImageWithText, _objectSpread({}, props))
      }));
    }
  }]);

  return SpotifyEntity;
}(Component);