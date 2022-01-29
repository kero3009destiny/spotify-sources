// ignore-string-externalization
import React from 'react';
export var CountryTimeline = /*#__PURE__*/React.lazy(function () {
  return import(
  /* webpackChunkName: "country-timeline" */
  './CountryTimeline').then(function (m) {
    return {
      default: m.CountryTimeline
    };
  });
});