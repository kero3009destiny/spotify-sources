// ignore-string-externalization
import React from 'react';
export var LazyBanner = /*#__PURE__*/React.lazy(function () {
  return import(
  /* webpackChunkName: "banner" */
  './Banners').then(function (_ref) {
    var Banners = _ref.Banners;
    return {
      default: Banners
    };
  });
});
export { BannerState } from './BannerState';
export { useBannerActions } from './useBannerActions';