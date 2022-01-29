// ignore-string-externalization
import React from 'react';
import styled from 'styled-components';
import { Backdrop, LoadingIndicator } from '@spotify-internal/encore-web';
import { DarkModeLoadingIndicator } from './DarkModeLoadingIndicator';
import { jsx as _jsx } from "react/jsx-runtime";
var FullScreenCentered = styled.div.withConfig({
  displayName: "DarkModeFullScreenLoadingIndicator__FullScreenCentered",
  componentId: "sc-12kp9xx-0"
})(["display:flex;align-items:center;justify-content:center;height:100vh;"]);
export function DarkModeFullScreenLoadingIndicator() {
  return /*#__PURE__*/_jsx(Backdrop, {
    children: /*#__PURE__*/_jsx(FullScreenCentered, {
      children: /*#__PURE__*/_jsx(DarkModeLoadingIndicator, {})
    })
  });
}
export function LightModeFullScreenLoadingIndicator() {
  return /*#__PURE__*/_jsx(Backdrop, {
    children: /*#__PURE__*/_jsx(FullScreenCentered, {
      children: /*#__PURE__*/_jsx(LoadingIndicator, {})
    })
  });
}