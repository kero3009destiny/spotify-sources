import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
import * as React from 'react';
import styled from 'styled-components';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { stack, stackOrderAscending } from 'd3-shape';
import { OverlayTrigger, PopoverTrigger, black, gray10, gray90, white } from '@spotify-internal/encore-web-v3';
import { useStackedAriaLabelGenerator as ariaLabelGenerator } from '../resources/useStackedAriaLabelGenerator';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledLabel = styled.text.withConfig({
  displayName: "StackedRowChart__StyledLabel",
  componentId: "sc-8fa7uv-0"
})(["fill:", ";font-size:14px;"], black);
var StyledChartWrapper = styled.div.withConfig({
  displayName: "StackedRowChart__StyledChartWrapper",
  componentId: "sc-8fa7uv-1"
})(["position:relative;"]);
var StyledPopoverWrapper = styled.div.withConfig({
  displayName: "StackedRowChart__StyledPopoverWrapper",
  componentId: "sc-8fa7uv-2"
})(["position:absolute;"]);
var StyledA11yRect = styled.rect.withConfig({
  displayName: "StackedRowChart__StyledA11yRect",
  componentId: "sc-8fa7uv-3"
})(["fill:transparent;pointer-events:none;&:focus{outline:3px solid ", ";stroke:", ";stroke-width:3px;}"], gray10, white);
var MARGIN = {
  top: 15,
  right: 24,
  bottom: 18,
  left: 15
};
var ORIGINAL_WIDTH = 472 - MARGIN.left - MARGIN.right;
var MAX_PERCENT_YAXIS = 100;
var BAR_PADDING = 0.88;
var CHART_HEIGHT = 500;
var ROW_OFFSET = 10;
var A11Y_OFFSET = ROW_OFFSET;
var A11Y_PADDING = 40;
var POPOVER_OFFSET = 2;

var getChartWidth = function getChartWidth(width) {
  return Math.max(width - 2 * MARGIN.left - MARGIN.right, 0);
}; // 15px margin on both sides


var generateStackLayout = function generateStackLayout(keys) {
  return stack().order(stackOrderAscending).keys(keys.map(function (d) {
    return d.key;
  }));
};

export function StackedRowChart(props) {
  var _props$colorScale = props.colorScale,
      colorScale = _props$colorScale === void 0 ? scaleOrdinal(schemeCategory10) : _props$colorScale,
      _props$data = props.data,
      data = _props$data === void 0 ? [] : _props$data,
      _props$keys = props.keys,
      keys = _props$keys === void 0 ? [] : _props$keys,
      renderTooltip = props.renderTooltip,
      _props$width = props.width,
      width = _props$width === void 0 ? ORIGINAL_WIDTH : _props$width,
      _props$xScaleDomain = props.xScaleDomain,
      xScaleDomain = _props$xScaleDomain === void 0 ? [0, MAX_PERCENT_YAXIS] : _props$xScaleDomain;

  var _React$useState = React.useState(undefined),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      highlightedRow = _React$useState2[0],
      setHighlightedRow = _React$useState2[1];

  var _React$useState3 = React.useState(function () {
    return generateStackLayout(keys);
  }),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      stackLayout = _React$useState4[0],
      setStackLayout = _React$useState4[1];

  var chartWidth = getChartWidth(width);
  var xScale = scaleLinear().domain(xScaleDomain);
  var yScale = scaleBand().domain(data.map(function (d) {
    return d.message.id;
  })).padding(BAR_PADDING);
  xScale.range([0, chartWidth]);
  yScale.range([0, CHART_HEIGHT]);
  React.useEffect(function () {
    setStackLayout(function () {
      return generateStackLayout(keys);
    });
  }, [keys]);
  var bandWidth = yScale.bandwidth();
  var stackLayoutWithData = stackLayout(data);

  var _onShow = function onShow(d) {
    return setHighlightedRow(d);
  };

  var onHide = function onHide() {
    return setHighlightedRow(undefined);
  };

  return /*#__PURE__*/_jsxs(StyledChartWrapper, {
    "data-testid": "stacked-row-chart",
    children: [/*#__PURE__*/_jsxs("svg", {
      width: chartWidth + 2 * MARGIN.left,
      height: CHART_HEIGHT + MARGIN.top + MARGIN.bottom,
      children: [!!renderTooltip && highlightedRow && /*#__PURE__*/_jsx("rect", {
        "aria-hidden": "true",
        x: 0 // @ts-ignore
        ,
        y: yScale(highlightedRow) - ROW_OFFSET - 2,
        height: yScale.step() - 2 * bandWidth,
        width: chartWidth + 2 * MARGIN.left,
        fill: gray90
      }, highlightedRow), /*#__PURE__*/_jsxs("g", {
        "aria-hidden": "true",
        "data-name": "plot",
        transform: "translate(".concat(MARGIN.left, ", ").concat(MARGIN.top, ")"),
        children: [stackLayoutWithData.map(function (layer) {
          return /*#__PURE__*/_jsx("g", {
            "data-testid": "group-".concat(layer.key),
            fill: colorScale(layer.key),
            children: layer.map(function (row) {
              return /*#__PURE__*/_jsx("rect", {
                "data-testid": "rect-".concat(layer.key) // @ts-ignore
                ,
                x: xScale(row[0]) // @ts-ignore
                ,
                y: yScale(row.data.message.id),
                width: xScale(row[1]) - xScale(row[0]),
                height: bandWidth
              }, row.data.message.id);
            })
          }, layer.key);
        }), /*#__PURE__*/_jsx("g", {
          children: data.map(function (d) {
            return /*#__PURE__*/_jsxs("g", {
              // @ts-ignore
              transform: "translate(0, ".concat(yScale(d.message.id) - ROW_OFFSET, ")"),
              children: [/*#__PURE__*/_jsx(StyledLabel, {
                "data-name": "point",
                x: 0,
                children: d.message.defaultMessage
              }), /*#__PURE__*/_jsx(StyledLabel, {
                "data-name": "label",
                x: chartWidth,
                textAnchor: "end",
                children: d.percentage
              })]
            }, d.message.id);
          })
        })]
      }), /*#__PURE__*/_jsx("g", {
        "data-testid": "group-a11y-rects",
        transform: "translate(10, ".concat(MARGIN.top, ")"),
        children: data.map(function (d) {
          return /*#__PURE__*/_jsx(StyledA11yRect, {
            "aria-label": ariaLabelGenerator(d),
            x: 0 // @ts-ignore
            ,
            y: yScale(d.message.id) - A11Y_PADDING + A11Y_OFFSET,
            height: bandWidth + A11Y_PADDING,
            width: chartWidth + A11Y_OFFSET,
            tabIndex: 0,
            role: "button"
          }, d.message.id);
        })
      })]
    }), !!renderTooltip && /*#__PURE__*/_jsx(React.Fragment, {
      children: data.map(function (d) {
        return /*#__PURE__*/_jsx(StyledPopoverWrapper, {
          "aria-hidden": "true",
          style: {
            left: 0,
            // @ts-ignore
            top: yScale(d.message.id) - ROW_OFFSET - POPOVER_OFFSET
          },
          children: /*#__PURE__*/_jsx(PopoverTrigger, {
            "aria-hidden": "true",
            placement: OverlayTrigger.top,
            onShow: function onShow() {
              return _onShow(d.message.id);
            },
            onHide: onHide,
            overlay: highlightedRow === d.message.id && renderTooltip(d, onHide),
            children: /*#__PURE__*/_jsx("div", {
              style: {
                width: chartWidth + POPOVER_OFFSET * MARGIN.left,
                height: yScale.step()
              }
            })
          }, d.message.id)
        }, d.message.id);
      })
    })]
  });
}