import _defineProperty from "/var/jenkins_home/workspace/tingle.1d9bbf01-b030-4b00-bcd2-ebd3bbb0c725/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { spacer, breakpoint, color } from '@spotify-internal/encore-web';
import { navMobileHeight, navDesktopHeight } from './variables';
import { jsx as _jsx } from "react/jsx-runtime";

var _Wrapper = styled.div.withConfig({
  displayName: "Wrapper___Wrapper",
  componentId: "sc-17top7r-0"
})(["background:", ";display:flex;align-items:center;position:relative;@media (max-width:", "){height:", ";padding-right:", ";padding-left:", ";justify-content:space-between;}@media (min-width:", "){height:", ";padding-right:", ";padding-left:", ";margin-left:auto;margin-right:auto;margin-bottom:", ";}"], color.gray7, breakpoint.screenXsMax, navMobileHeight, spacer.spacer4, spacer.spacer4, breakpoint.screenSmMin, navDesktopHeight, spacer.spacer20, spacer.spacer20, spacer.spacer24);

export var Wrapper = /*#__PURE__*/forwardRef(function (props, ref) {
  return /*#__PURE__*/_jsx(_Wrapper, _objectSpread(_objectSpread({}, props), {}, {
    ref: ref
  }));
});