import _slicedToArray from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
import * as React from 'react';
import { max } from 'd3-array';
import { scaleBand, scaleLinear } from 'd3-scale';
import styled from 'styled-components';
import { OverlayTrigger, PopoverTrigger, black, gray10, gray90, white } from '@spotify-internal/encore-web-v3';
import { dataDarkBlue } from '@mrkt/features/creator-color-tokens';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledRowChart = styled.div.withConfig({
  displayName: "RowChart__StyledRowChart",
  componentId: "jbogvc-0"
})(["position:relative;text-align:center;"]);
var StyledRowChartLabel = styled.text.withConfig({
  displayName: "RowChart__StyledRowChartLabel",
  componentId: "jbogvc-1"
})(["fill:", ";font-size:14px;"], black);
var StyledBackground = styled.div.withConfig({
  displayName: "RowChart__StyledBackground",
  componentId: "jbogvc-2"
})(["position:absolute;width:100%;"]);
var StyledRect = styled.rect.withConfig({
  displayName: "RowChart__StyledRect",
  componentId: "jbogvc-3"
})(["fill:transparent;pointer-events:none;&:focus{outline:3px solid ", ";stroke:", ";stroke-linecap:solid;stroke-width:3px;}"], gray10, white);

var trackPopoverEvent = function trackPopoverEvent(artist, category) {
  sendEvent({
    eventCategory: category,
    eventAction: 'tooltip',
    eventLabel: artist.name
  });
};

var MARGIN = {
  top: 0,
  right: 24,
  bottom: 0,
  left: 15
};
var ORIGINAL_WIDTH = 472 - MARGIN.left - MARGIN.right;
var BAR_PADDING = 0.88;
var MIN_CHART_HEIGHT = 450;
var ROW_OFFSET = 25;
var ROW_HEIGHT = 42;
var A11Y_PADDING = 10;

var getChartWidth = function getChartWidth(width) {
  return Math.max(width - 2 * MARGIN.left - MARGIN.right, 0);
}; // 15px margin on both sides


var calculateXDomain = function calculateXDomain(data) {
  return data.length > 0 ? [0, max(data, function (d) {
    return d.value;
  })] : [0, 1];
};

export var RowChart = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var artist = props.artist,
      category = props.category,
      _props$data = props.data,
      data = _props$data === void 0 ? [] : _props$data,
      _props$fill = props.fill,
      fill = _props$fill === void 0 ? dataDarkBlue : _props$fill,
      renderTooltip = props.renderTooltip,
      _props$width = props.width,
      width = _props$width === void 0 ? ORIGINAL_WIDTH : _props$width,
      _props$xAxisFormatter = props.xAxisFormatter,
      xAxisFormatter = _props$xAxisFormatter === void 0 ? function (d) {
    return "".concat(d, "%");
  } : _props$xAxisFormatter;

  var _React$useState = React.useState(''),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      highlightedRow = _React$useState2[0],
      setHighlightedRow = _React$useState2[1];

  var chartHeight = Math.max(MIN_CHART_HEIGHT, ROW_HEIGHT * data.length);
  var chartWidth = getChartWidth(width);
  var xScale = scaleLinear().domain(calculateXDomain(data));
  var yScale = scaleBand().domain(data.map(function (d) {
    return d.message.id;
  })).padding(BAR_PADDING);
  xScale.range([0, chartWidth]);
  yScale.rangeRound([0, chartHeight]);

  var ariaLabelGenerator = function ariaLabelGenerator(d) {
    return "".concat(d.message.defaultMessage, " (").concat(d.tooltip.defaultMessage[0].toLowerCase() + d.tooltip.defaultMessage.slice(1), "), ").concat(!!xAxisFormatter && xAxisFormatter(d.value));
  };

  var _onShow = function onShow(d) {
    setHighlightedRow(d);
    if (!artist || !category) return;
    trackPopoverEvent(artist, category);
  };

  var onHide = function onHide() {
    return setHighlightedRow('');
  };

  var computedYScale = yScale(highlightedRow);
  return /*#__PURE__*/_jsxs(StyledRowChart, {
    "data-testid": "row-chart",
    ref: ref,
    children: [/*#__PURE__*/_jsxs("svg", {
      width: chartWidth + 2 * MARGIN.left,
      height: chartHeight + MARGIN.top + MARGIN.bottom,
      children: [!!renderTooltip && highlightedRow && /*#__PURE__*/_jsx("rect", {
        "aria-hidden": "true",
        x: 0,
        y: computedYScale - ROW_OFFSET - 10,
        height: yScale.step() - yScale.bandwidth() * 2,
        width: chartWidth + 2 * MARGIN.left,
        fill: gray90
      }, highlightedRow), /*#__PURE__*/_jsx("g", {
        "aria-hidden": "true",
        "data-name": "plot",
        transform: "translate(".concat(MARGIN.left, ", ").concat(MARGIN.top, ")"),
        children: data.map(function (d) {
          return /*#__PURE__*/_jsxs("g", {
            children: [/*#__PURE__*/_jsx("g", {
              children: /*#__PURE__*/_jsx("rect", {
                "data-testid": "row-chart-rect",
                fill: fill,
                height: yScale.bandwidth(),
                width: xScale(d.value),
                x: "0",
                y: yScale(d.message.id)
              })
            }), /*#__PURE__*/_jsxs("g", {
              "data-name": "label-group",
              transform: "translate(0, ".concat(yScale(d.message.id) - ROW_OFFSET + 16, ")"),
              children: [/*#__PURE__*/_jsx(StyledRowChartLabel, {
                "data-name": "point",
                x: 0,
                children: d.message.defaultMessage
              }), /*#__PURE__*/_jsx(StyledRowChartLabel, {
                "data-name": "label",
                x: chartWidth,
                textAnchor: "end",
                children: xAxisFormatter(d.value)
              })]
            })]
          }, d.message.id);
        })
      }), /*#__PURE__*/_jsx("g", {
        "data-testid": "group-a11y-rects",
        transform: "translate(10, ".concat(MARGIN.top, ")"),
        children: data.map(function (d) {
          return /*#__PURE__*/_jsx(StyledRect, {
            "aria-label": ariaLabelGenerator(d),
            "data-testid": "a11y-rect",
            height: yScale.bandwidth() + ROW_HEIGHT,
            role: "button",
            tabIndex: 0,
            width: chartWidth + A11Y_PADDING,
            x: "0",
            y: yScale(d.message.id) - ROW_HEIGHT + A11Y_PADDING
          }, d.message.id);
        })
      })]
    }), !!renderTooltip && /*#__PURE__*/_jsx(React.Fragment, {
      children: data.map(function (d) {
        return /*#__PURE__*/_jsx(StyledBackground, {
          "aria-hidden": "true",
          style: {
            left: 0,
            top: yScale(d.message.id) - ROW_OFFSET - 2
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
                width: chartWidth + 2 * MARGIN.left,
                height: yScale.step() + 10
              }
            })
          }, d.message.id)
        }, d.message.id);
      })
    })]
  });
});