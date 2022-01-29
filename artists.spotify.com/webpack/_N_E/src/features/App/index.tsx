// ignore-string-externalization
import React from 'react';
import Banner from './Banner';
import Content from './Content';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

/* eslint-disable-next-line import/no-default-export */
export default function App(_ref) {
  var banner = _ref.banner,
      content = _ref.content;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Banner, {
      children: banner
    }), /*#__PURE__*/_jsx(Content, {
      children: content
    })]
  });
}