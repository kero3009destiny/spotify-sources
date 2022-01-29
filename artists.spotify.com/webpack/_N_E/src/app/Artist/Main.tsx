// ignore-string-externalization
import React from 'react';
import { Switch } from 'react-router-dom';
import { ArtistFallback } from '../../shared/components/ArtistFallback';
import { ArtistContainer } from './ArtistContainer';
/* eslint-disable-next-line import/no-default-export */

import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function ArtistMain() {
  return /*#__PURE__*/_jsx(ArtistContainer, {
    children: /*#__PURE__*/_jsxs(Switch, {
      children: [/*#__PURE__*/_jsx(RemoteConfigTestRoute, {
        path: "/artist/:artistId/ep-test"
      }), /*#__PURE__*/_jsx(ArtistHomeRoute, {
        path: "/artist/:artistId/home"
      }), /*#__PURE__*/_jsx(ArtistFallback, {})]
    })
  });
}
var ArtistHomeRoute = /*#__PURE__*/React.lazy(function () {
  return import(
  /* webpackChunkName: "artist-home" */
  '../../features/ArtistHome/Route');
});
var RemoteConfigTestRoute = /*#__PURE__*/React.lazy(function () {
  return import(
  /* webpackChunkName: "remote-config-test" */
  '../../features/RemoteConfigTest/Route');
});