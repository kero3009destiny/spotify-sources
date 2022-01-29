// ignore-string-externalization
import React from 'react';
import { useBannerState } from './BannerState';
import { RouteChangeDismisser } from './RouteChangeDismisser';
import { Banner } from './Banner';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var Banners = function Banners() {
  var state = useBannerState();
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(RouteChangeDismisser, {
      state: state
    }), state.banners.map(function (singleBannerState, index) {
      return /*#__PURE__*/_jsx(Banner, {
        singleBannerState: singleBannerState,
        index: index
      }, singleBannerState.id);
    })]
  });
};