// ignore-string-externalization
import React, { Suspense } from 'react';
import { ErrorBoundary } from '@mrkt/features/Platform';
import { jsx as _jsx } from "react/jsx-runtime";
var SidePanel = /*#__PURE__*/React.lazy(function () {
  return import(
  /* webpackChunkName: "sidepanel" */
  './SidePanel');
});
export function SidePanelContainer() {
  var fallback = null;
  return /*#__PURE__*/_jsx(Suspense, {
    fallback: fallback,
    children: /*#__PURE__*/_jsx(ErrorBoundary, {
      name: "s4a-sidepanel",
      fallback: fallback,
      children: /*#__PURE__*/_jsx(SidePanel, {})
    })
  });
}