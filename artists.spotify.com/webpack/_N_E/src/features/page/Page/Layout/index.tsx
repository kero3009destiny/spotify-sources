// ignore-string-externalization
import React from 'react';
import { Container } from './Container';
import { Header } from './Header';
import { Main } from './Main';
import { MainColumn } from './MainColumn';
import { Help } from './Help';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function PageLayout(_ref) {
  var header = _ref.header,
      children = _ref.children,
      footer = _ref.footer,
      help = _ref.help;
  return /*#__PURE__*/_jsxs(Container, {
    children: [header ? /*#__PURE__*/_jsx(Header, {
      children: header
    }) : null, /*#__PURE__*/_jsx(Main, {
      "data-testid": "page-main",
      children: /*#__PURE__*/_jsx(MainColumn, {
        children: children
      })
    }), footer || null, help ? /*#__PURE__*/_jsx(Help, {
      children: help
    }) : null]
  });
}