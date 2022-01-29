import _slicedToArray from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
import React from 'react';
import styled from 'styled-components';
import { gray75 } from '@spotify-internal/encore-web-v3';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledLabel = styled.text.withConfig({
  displayName: "ThreeTickYAxis__StyledLabel",
  componentId: "a08iwa-0"
})(["fill:", ";font-size:10px;text-anchor:end;"], gray75);
var StyledLine = styled.line.withConfig({
  displayName: "ThreeTickYAxis__StyledLine",
  componentId: "a08iwa-1"
})(["stroke:", ";"], gray75);
var TICK_PADDING = 36;
export function ThreeTickYAxis(props) {
  var scale = props.scale,
      margin = props.margin,
      _props$formatter = props.formatter,
      formatter = _props$formatter === void 0 ? function (d) {
    return d;
  } : _props$formatter,
      width = props.width;

  var _scale$domain = scale.domain(),
      _scale$domain2 = _slicedToArray(_scale$domain, 2),
      min = _scale$domain2[0],
      max = _scale$domain2[1]; // if max < 1 we have an empty state (min and max can't both be 0 since the scale would not work properly)
  // @todo: Handle the stacked column chart. The domain is b/t 0 & 1.


  var isEmptyState = max < 1;
  var values = isEmptyState ? [min, max] : [min, min + (max - min) / 2, max];
  return /*#__PURE__*/_jsx("g", {
    "aria-hidden": "true",
    "data-name": "y-axis",
    transform: "translate(".concat(margin.left, ", ").concat(margin.top, ")"),
    children: values.map(function (d) {
      return /*#__PURE__*/_jsxs("g", {
        "data-name": "tick",
        transform: "translate(0, ".concat(scale(d), ")"),
        children: [/*#__PURE__*/_jsx(StyledLine, {
          x1: TICK_PADDING,
          x2: width,
          y1: "0",
          y2: "0"
        }), !isEmptyState && /*#__PURE__*/_jsx(StyledLabel, {
          dy: ".25em",
          x: TICK_PADDING - 5,
          children: formatter(d)
        })]
      }, scale(d));
    })
  });
}