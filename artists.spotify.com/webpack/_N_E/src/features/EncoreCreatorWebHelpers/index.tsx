import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import React from 'react';
import { ButtonSecondary, ButtonPrimary, NavBarListItem, ButtonTertiary, TextLink, PopoverNavigationLink } from '@spotify-internal/encore-web';
import { Link } from 'react-router-dom'; // https://ghe.spotify.net/encore/web/issues/242
// extend encore web component type definition based on value passed into component prop

import { jsx as _jsx } from "react/jsx-runtime";
export function ButtonPrimaryAsLink(props) {
  return /*#__PURE__*/_jsx(ButtonPrimary, _objectSpread(_objectSpread({}, props), {}, {
    component: Link
  }));
}
export function ButtonSecondaryAsLink(props) {
  return /*#__PURE__*/_jsx(ButtonSecondary, _objectSpread(_objectSpread({}, props), {}, {
    component: Link
  }));
}
export function ButtonTertiaryAsLink(props) {
  return /*#__PURE__*/_jsx(ButtonTertiary, _objectSpread(_objectSpread({}, props), {}, {
    component: Link
  }));
}
export function NavBarListItemAsLink(props) {
  return /*#__PURE__*/_jsx(NavBarListItem, _objectSpread(_objectSpread({}, props), {}, {
    component: Link
  }));
}
export function TextLinkAsLink(props) {
  return /*#__PURE__*/_jsx(TextLink, _objectSpread(_objectSpread({}, props), {}, {
    component: Link
  }));
}
export function PopoverNavigationLinkAsLink(props) {
  return /*#__PURE__*/_jsx(PopoverNavigationLink, _objectSpread(_objectSpread({}, props), {}, {
    component: Link
  }));
}