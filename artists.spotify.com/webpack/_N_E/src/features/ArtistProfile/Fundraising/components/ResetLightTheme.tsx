import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { colorThemeGenerator, black, kleinBlue61 } from '@spotify-internal/encore-web';
import { jsx as _jsx } from "react/jsx-runtime";
var resetComponents = {
  app: '',
  table: '',
  tableRow: '',
  buttonIcon: '',
  loadingIndicator: '',
  navBar: '',
  navBarList: '',
  navBarListItem: '',
  dialogAlert: '',
  dialogConfirmation: '',
  formGroup: '',
  formInput: '',
  button: '',
  type: ''
};
var Wrapper = styled.div.withConfig({
  displayName: "ResetLightTheme__Wrapper",
  componentId: "sc-1u4n2dq-0"
})(["--primaryColor:", ";color:", ";"], function (_ref) {
  var theme = _ref.theme;
  return theme.colors.primaryColor;
}, black);

var lightTheme = _objectSpread(_objectSpread({}, resetComponents), colorThemeGenerator({
  primaryColor: kleinBlue61
}));

export function ResetLightTheme(_ref2) {
  var children = _ref2.children;
  return /*#__PURE__*/_jsx(ThemeProvider, {
    theme: lightTheme,
    children: /*#__PURE__*/_jsx(Wrapper, {
      children: children
    })
  });
}