// ignore-string-externalization
import React from 'react';
export var LazyArtistFooter = /*#__PURE__*/React.lazy(function () {
  return import(
  /* webpackChunkName: "artist" */
  '../../features/page/Footer').then(function (_ref) {
    var PageFooter = _ref.PageFooter;
    return {
      default: PageFooter
    };
  });
});