// ignore-string-externalization
import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
export function TableColgroup(_ref) {
  var cols = _ref.cols;
  var columns = cols.map(function (header) {
    return /*#__PURE__*/_jsx("col", {
      "data-testid": "col",
      width: header.colWidth
    }, header.key);
  });
  return /*#__PURE__*/_jsx("colgroup", {
    "data-testid": "colgroup",
    children: columns
  });
}