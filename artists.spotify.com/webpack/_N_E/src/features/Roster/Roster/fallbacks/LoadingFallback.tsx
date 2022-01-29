// ignore-string-externalization
import React from 'react';
import { LoadingIndicator } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";
var FullScreenContainer = styled.div.withConfig({
  displayName: "LoadingFallback__FullScreenContainer",
  componentId: "sc-7cpy8p-0"
})(["position:absolute;top:0;left:0;bottom:0;right:0;display:flex;justify-content:center;align-items:center;"]);
export var LoadingFallback = /*#__PURE__*/_jsx(FullScreenContainer, {
  children: /*#__PURE__*/_jsx(LoadingIndicator, {})
});