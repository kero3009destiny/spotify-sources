import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { colorThemeGenerator, kleinBlue } from '@spotify-internal/encore-web';
import { Route } from 'react-router-dom';
import { jsx as _jsx } from "react/jsx-runtime";
var lightTheme = colorThemeGenerator({
  primaryColor: kleinBlue
});
var darkComponents = {
  app: 'dark',
  table: 'dark',
  tableRow: 'dark',
  buttonIcon: 'dark',
  loadingIndicator: 'dark',
  navBar: 'dark',
  navBarList: 'dark',
  navBarListItem: 'dark',
  dialogAlert: 'dark',
  dialogConfirmation: 'dark',
  formGroup: 'dark',
  formInput: 'dark',
  button: 'dark',
  emptyState: 'dark'
};
var Wrapper = styled.div.withConfig({
  displayName: "ThemeProvider__Wrapper",
  componentId: "sc-1b2d6zf-0"
})(["--primaryColor:", ";"], function (_ref) {
  var theme = _ref.theme;
  return theme.colors.primaryColor;
});
/**
  '#7F80FA' is a lighter / accessible version of Klein Blue meant for dark backgrounds.
  Follow along at https://ghe.spotify.net/encore/foundation/issues/29 for discussions on accessible dark themed color tokens.
  */

var darkTheme = _objectSpread(_objectSpread({}, darkComponents), colorThemeGenerator({
  primaryColor: '#7F80FA'
}));

export function PageThemeProvider(_ref2) {
  var darkThemePaths = _ref2.darkThemePaths,
      _children = _ref2.children;
  return /*#__PURE__*/_jsx(Route, {
    path: darkThemePaths,
    children: function children(_ref3) {
      var match = _ref3.match;
      return /*#__PURE__*/_jsx(ThemeProvider, {
        theme: match ? darkTheme : lightTheme,
        children: /*#__PURE__*/_jsx(Wrapper, {
          children: _children
        })
      });
    }
  });
}