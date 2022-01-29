import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { FundraisingForm } from './FundraisingForm';
import { useAuthorized } from './lib';
import { jsx as _jsx } from "react/jsx-runtime";
export var fundraisingPath = "/artist/:artistId/profile/fundraising";
export function FundraisingRoute(routeProps) {
  var authorized = useAuthorized();
  return authorized ? /*#__PURE__*/_jsx(Route, _objectSpread(_objectSpread({}, routeProps), {}, {
    component: FundraisingForm
  })) : /*#__PURE__*/_jsx(Redirect, {
    to: "/"
  });
}