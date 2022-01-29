// ignore-string-externalization
import * as React from 'react';
import styled, { css } from 'styled-components';
import { Type, spacer8, spacer32 } from '@spotify-internal/encore-web-v3';
import { Alignment } from './types';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledList = styled.ul.withConfig({
  displayName: "Legend__StyledList",
  componentId: "uu4ayg-0"
})(["display:flex;flex-wrap:wrap;justify-content:", ";list-style-type:none;padding:0;"], function (props) {
  return props.alignment;
});
var StyledListItem = styled.li.withConfig({
  displayName: "Legend__StyledListItem",
  componentId: "uu4ayg-1"
})(["", ";", ";"], function (props) {
  return props.alignment === Alignment.end && css(["margin-left:", ";"], spacer32);
}, function (props) {
  return props.alignment === Alignment.start && css(["margin-right:", ";"], spacer32);
});
var StyledDot = styled.div.withConfig({
  displayName: "Legend__StyledDot",
  componentId: "uu4ayg-2"
})(["background-color:", ";border-radius:50%;display:inline-block;height:", ";margin-right:", ";vertical-align:middle;width:", ";"], function (props) {
  return props.color;
}, spacer8, spacer8, spacer8);
export function Legend(_ref) {
  var _ref$alignment = _ref.alignment,
      alignment = _ref$alignment === void 0 ? Alignment.even : _ref$alignment,
      colorScale = _ref.colorScale,
      keys = _ref.keys;
  return /*#__PURE__*/_jsx(StyledList, {
    alignment: alignment,
    "aria-hidden": "true",
    "data-testid": "legend-list",
    children: keys.map(function (item) {
      return /*#__PURE__*/_jsxs(StyledListItem, {
        alignment: alignment,
        "data-testid": "legend-list-item",
        children: [/*#__PURE__*/_jsx(StyledDot, {
          color: colorScale(item.key)
        }), /*#__PURE__*/_jsx(Type, {
          variant: Type.body3,
          children: item.label
        })]
      }, item.key.toString());
    })
  });
}