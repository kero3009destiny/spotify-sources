import _defineProperty from "/var/jenkins_home/workspace/tingle.76eac57e-8374-4b5c-8f0c-04220153cf57/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import * as React from 'react';
import styled, { css } from 'styled-components';
import { kleinBlue, white, Tag, Type, spacer8, spacer16, spacer24, spacer32, screenLgMin, screenSmMin, screenXsMax, NavBarListItem } from '@spotify-internal/encore-web-v3';
import { jsx as _jsx } from "react/jsx-runtime";
export var Wrapper = styled.div.withConfig({
  displayName: "styles__Wrapper",
  componentId: "sc-141fimf-0"
})(["@media (max-width:", "){margin-top:", ";margin-bottom:", ";}@media (min-width:", "){margin-bottom:", ";}@media (min-width:", "){margin-top:", ";margin-bottom:", ";}"], screenXsMax, spacer16, spacer16, screenSmMin, spacer24, screenLgMin, spacer8, spacer32);
export var DropdownWrapper = styled.div.withConfig({
  displayName: "styles__DropdownWrapper",
  componentId: "sc-141fimf-1"
})(["", ""], function (props) {
  return props.stickyHeader && css(["margin:10px 0 22px 0;"]);
});
export var StickyTitle = styled(Type).attrs({
  as: Type.p,
  variant: Type.heading3
}).withConfig({
  displayName: "styles__StickyTitle",
  componentId: "sc-141fimf-2"
})(["margin-top:18px;padding-bottom:0;"]);
export var CustomNavBarListItem = styled(function (props) {
  return /*#__PURE__*/_jsx(NavBarListItem, _objectSpread({
    sentenceCase: true
  }, props));
}).withConfig({
  displayName: "styles__CustomNavBarListItem",
  componentId: "sc-141fimf-3"
})(["padding-top:0;"]);
export var CustomTag = styled(Tag).withConfig({
  displayName: "styles__CustomTag",
  componentId: "sc-141fimf-4"
})(["background-color:", ";color:", ";&:hover{background-color:", " !important;}"], kleinBlue, white, kleinBlue);
export var PopoverWrapper = styled.div.withConfig({
  displayName: "styles__PopoverWrapper",
  componentId: "sc-141fimf-5"
})(["left:20px;position:relative;top:-17px;"]);