import _slicedToArray from "/var/jenkins_home/workspace/tingle.3b6a912d-4d0a-4635-8445-e49fdb128ace/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
import React from 'react';
import { // @ts-expect-error __HistoryContext is missing from types
__HistoryContext as HistoryContext, __RouterContext as RouterContext } from 'react-router';
import { createNextRouterHistory } from './history';
/** Enables using react-router in next.js on the client-side */

import { jsx as _jsx } from "react/jsx-runtime";
export function BrowserRouter(_ref) {
  var children = _ref.children;

  var _React$useState = React.useState(createNextRouterHistory),
      _React$useState2 = _slicedToArray(_React$useState, 1),
      history = _React$useState2[0]; // https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/Router.js#L60-L72


  return /*#__PURE__*/_jsx(RouterContext.Provider, {
    value: {
      history: history,
      location: history.location,
      match: {
        path: '/',
        url: '/',
        params: {},
        isExact: history.location.pathname === '/'
      }
    },
    children: /*#__PURE__*/_jsx(HistoryContext.Provider, {
      value: history,
      children: children
    })
  });
}