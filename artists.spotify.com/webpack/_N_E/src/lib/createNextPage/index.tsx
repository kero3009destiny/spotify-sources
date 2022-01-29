import _toConsumableArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import React from 'react';
import dynamic from 'next/dynamic';
import { Switch } from 'react-router-dom';
import { notFoundRouteConfig } from '@apps/artists-spotify-com-c/src/app/routes/notFoundRouteConfig';
import { jsx as _jsx } from "react/jsx-runtime";
var PageRoute = dynamic(function () {
  return import(
  /* webpackChunkName: "page-route" */
  './PageRoute');
}, {
  ssr: false,
  loadableGenerated: {
    webpack: function webpack() {
      return [require.resolveWeak('./PageRoute')];
    },
    modules: ["../lib/createNextPage/index.tsx -> " + './PageRoute']
  }
});
export function createPageFromRoutes(routes) {
  var PageRouteToUse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PageRoute;
  // eslint-disable-next-line react/jsx-key
  var pageRoutes = routes.map(function (route) {
    return /*#__PURE__*/_jsx(PageRouteToUse, _objectSpread({}, route));
  });

  function Page() {
    return /*#__PURE__*/React.createElement.apply(React, [Switch, null].concat(_toConsumableArray(pageRoutes), [/*#__PURE__*/_jsx(PageRouteToUse, _objectSpread({}, notFoundRouteConfig))]));
  }

  Page.renderApp = function (_ref) {
    var Component = _ref.Component,
        pageProps = _ref.pageProps;
    // eslint-disable-next-line new-cap
    return Component(pageProps);
  };

  return Page;
}
export function createNextPage(route) {
  var PageRouteToUse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PageRoute;
  return createPageFromRoutes([route], PageRouteToUse);
}