import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["variant", "text", "bgColor", "secondaryText", "imgSrc", "circle"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { Container } from '@mrkt/features/badge/BadgeWithText/Container';
import { TextContainer } from '@mrkt/features/badge/BadgeWithText/TextContainer';
import { Text } from '@mrkt/features/badge/BadgeWithText/Text';
import { SecondaryText } from '@mrkt/features/badge/BadgeWithText/SecondaryText';
import React from 'react';
import { IconBadge } from './IconBadge';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var IconBadgeWithText = function IconBadgeWithText(_ref) {
  var variant = _ref.variant,
      text = _ref.text,
      bgColor = _ref.bgColor,
      secondaryText = _ref.secondaryText,
      imgSrc = _ref.imgSrc,
      circle = _ref.circle,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/_jsxs(Container, _objectSpread(_objectSpread({}, props), {}, {
    children: [/*#__PURE__*/_jsx(IconBadge, {
      variant: variant,
      imgSrc: imgSrc,
      circle: circle
    }), /*#__PURE__*/_jsxs(TextContainer, {
      children: [text && /*#__PURE__*/_jsx(Text, {
        children: text
      }), secondaryText && /*#__PURE__*/_jsx(SecondaryText, {
        children: secondaryText
      })]
    })]
  }));
};