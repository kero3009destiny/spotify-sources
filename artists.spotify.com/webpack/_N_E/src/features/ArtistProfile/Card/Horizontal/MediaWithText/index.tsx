import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import classNames from 'classnames';
import React from 'react';
import { Type } from '@spotify-internal/encore-web';
import { CardHorizontal, ImageContent, InfoWrapper } from '../Layout';
import { MediaIcon } from '../MediaIcon';
import { MediaImage } from '../MediaImage';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function MediaWithText(props) {
  var _classNames;

  var title = props.title,
      subtitle = props.subtitle,
      image = props.image,
      icon = props.icon,
      href = props.href,
      metadata = props.metadata,
      onClick = props.onClick,
      hasLgControls = props.hasLgControls,
      hasSmControls = props.hasSmControls;
  var TagName = href ? 'a' : 'div';
  return /*#__PURE__*/_jsx(CardHorizontal, {
    className: classNames(styles.media_with_text, (_classNames = {}, _defineProperty(_classNames, styles['media_with_text--hasLgControls'], hasLgControls), _defineProperty(_classNames, styles['media_with_text--hasSmControls'], hasSmControls), _classNames)),
    children: /*#__PURE__*/_jsxs(TagName, _objectSpread(_objectSpread(_objectSpread({}, href && {
      href: href
    } || {}), onClick && {
      onClick: onClick
    } || {}), {}, {
      className: styles['media_with_text-link'],
      children: [/*#__PURE__*/_jsx(ImageContent, {
        children: image && /*#__PURE__*/_jsx(MediaImage, {
          image: image
        }) || /*#__PURE__*/_jsx(MediaIcon, {
          icon: icon
        })
      }), /*#__PURE__*/_jsxs(InfoWrapper, {
        children: [/*#__PURE__*/_jsx(Type, {
          className: styles['media_with_text-info-title'],
          as: "p",
          weight: Type.bold,
          semanticColor: "textBase",
          variant: Type.body2,
          condensed: true,
          children: title
        }), /*#__PURE__*/_jsx(Type, {
          className: styles['media_with_text-info-subtitle'],
          as: "p",
          semanticColor: "textSubdued",
          variant: Type.cta4,
          condensed: true,
          children: subtitle
        }), metadata && /*#__PURE__*/_jsx("div", {
          className: styles['media_with_text-info-subtitle-metadata'],
          children: metadata
        })]
      })]
    }))
  });
}
MediaWithText.defaultProps = {
  title: '',
  subtitle: '',
  image: '',
  hasLgControls: false,
  hasSmControls: false
};