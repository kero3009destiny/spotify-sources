import _defineProperty from "/var/jenkins_home/workspace/tingle.3b6a912d-4d0a-4635-8445-e49fdb128ace/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import React from 'react';
import { BrowserRouter } from './BrowserRouter';
import { StaticRouter } from './StaticRouter';
/** Add support for react-router to a next.js App */

import { jsx as _jsx } from "react/jsx-runtime";
export function withReactRouter(App) {
  function ReactRouterApp(props) {
    if (true) {
      return /*#__PURE__*/_jsx(BrowserRouter, {
        children: /*#__PURE__*/_jsx(App, _objectSpread({}, props))
      });
    }

    return /*#__PURE__*/_jsx(StaticRouter, {
      children: /*#__PURE__*/_jsx(App, _objectSpread({}, props))
    });
  }

  Object.assign(ReactRouterApp, App);
  return ReactRouterApp;
}