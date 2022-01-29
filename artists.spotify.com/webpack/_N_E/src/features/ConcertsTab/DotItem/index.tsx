// ignore-string-externalization
import React from 'react';
import { Type, cssColorValue } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var Wrapper = styled.div.withConfig({
  displayName: "DotItem__Wrapper",
  componentId: "o0bp7h-0"
})(["align-items:center;display:flex;"]);
var Dot = styled.span.withConfig({
  displayName: "DotItem__Dot",
  componentId: "o0bp7h-1"
})(["background-color:", ";border-radius:50%;display:block;height:6px;margin-bottom:2px;margin-right:4px;width:6px;"], cssColorValue('textBrightAccent'));
var Title = styled(Type.p).attrs({
  condensed: true,
  weight: Type.bold,
  variant: Type.body3
}).withConfig({
  displayName: "DotItem__Title",
  componentId: "o0bp7h-2"
})(["letter-spacing:1.5px;line-height:1;list-style:none;margin:0;padding:0;text-align:center;text-transform:uppercase;&:hover{color:", ";}"], function (_ref) {
  var theme = _ref.theme;
  return theme.colors.primaryColor;
});
/* eslint-disable-next-line import/no-default-export */

export default function DotItem(_ref2) {
  var label = _ref2.label;
  return /*#__PURE__*/_jsxs(Wrapper, {
    children: [/*#__PURE__*/_jsx(Dot, {}), /*#__PURE__*/_jsx(Title, {
      semanticColor: "textBase",
      children: label
    })]
  });
}