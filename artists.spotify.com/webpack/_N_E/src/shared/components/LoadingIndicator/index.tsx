// ignore-string-externalization
import React from 'react';
import styled from 'styled-components';
import { LoadingIndicator as TapeLoadingIndicator } from '@spotify-internal/encore-web';
import { jsx as _jsx } from "react/jsx-runtime";
var Container = styled.div.withConfig({
  displayName: "LoadingIndicator__Container",
  componentId: "kx56pg-0"
})(["align-items:center;display:flex;flex-grow:1;height:100%;justify-content:center;"]);
export function LoadingIndicator() {
  return /*#__PURE__*/_jsx(Container, {
    children: /*#__PURE__*/_jsx(TapeLoadingIndicator, {
      "data-testid": "loading-indicator"
    })
  });
}