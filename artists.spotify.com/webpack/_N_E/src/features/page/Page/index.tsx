import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import React from 'react';
import { DocumentTitle } from '@mrkt/features/document-title';
import { LoadingIndicator } from '../../../shared/components/LoadingIndicator';
import { PageLayout } from './Layout';
import { PageLocation } from './Location';
import { PageAnalytics } from './Analytics';
import { PageThemeProvider } from './ThemeProvider';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var darkThemePaths = ['/artist/:artistId/profile'];
export function Page(props) {
  return /*#__PURE__*/_jsx(DocumentTitle, {
    title: process.env.REACT_APP_TITLE || '',
    children: /*#__PURE__*/_jsxs(React.Suspense, {
      fallback: /*#__PURE__*/_jsx(LoadingIndicator, {}),
      children: [/*#__PURE__*/_jsx(PageAnalytics, {}), /*#__PURE__*/_jsx(PageLocation, {
        children: /*#__PURE__*/_jsx(PageThemeProvider, {
          darkThemePaths: darkThemePaths,
          children: /*#__PURE__*/_jsx(PageLayout, _objectSpread({}, props))
        })
      })]
    })
  });
}