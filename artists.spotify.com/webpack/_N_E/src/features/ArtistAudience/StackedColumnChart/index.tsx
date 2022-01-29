import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
import * as React from 'react';
import styled, { css } from 'styled-components';
import { scaleBand, scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { stack, stackOrderAscending } from 'd3-shape';
import { Type, body2FontSize, body3FontSize, white, gray10 } from '@spotify-internal/encore-web-v3';
import { useRtl } from '@mrkt/features/i18n/hooks/useRtl'; // @todo should probably live in a feature

import { ThreeTickYAxis } from '../../../shared/components/Chart';
import { useStackedAriaLabelGenerator as ariaLabelGenerator } from '../resources/useStackedAriaLabelGenerator';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledChartWrapper = styled.div.withConfig({
  displayName: "StackedColumnChart__StyledChartWrapper",
  componentId: "sc-1hg939b-0"
})(["", ""], function (props) {
  return !props.isInGridLayout && css(["padding-left:", "px;padding-right:", "px;"], props.width * props.paddingScalar, props.width * props.paddingScalar);
});
var StyledValue = styled.text.withConfig({
  displayName: "StackedColumnChart__StyledValue",
  componentId: "sc-1hg939b-1"
})(["font-size:", ";font-weight:", ";"], body2FontSize, Type.bold);
var StyledLabel = styled.text.withConfig({
  displayName: "StackedColumnChart__StyledLabel",
  componentId: "sc-1hg939b-2"
})(["font-size:", ";text-transform:capitalize;"], body3FontSize);
var StyledA11yRect = styled.rect.withConfig({
  displayName: "StackedColumnChart__StyledA11yRect",
  componentId: "sc-1hg939b-3"
})(["fill:transparent;pointer-events:none;&:focus{outline:3px solid ", ";stroke:", ";stroke-width:3px;}"], gray10, white);
var StyledTooltipWrapper = styled.div.withConfig({
  displayName: "StackedColumnChart__StyledTooltipWrapper",
  componentId: "sc-1hg939b-4"
})(["", ";bottom:", "px;pointer-events:none;position:fixed;top:", "px;"], function (props) {
  return props.isRtl ? css(["right:calc(15% + ", "px);"], props.horizontalPos) : css(["left:", "px;right:", "px;"], props.horizontalPos, props.top);
}, function (props) {
  return props.top;
}, function (props) {
  return props.top;
});
var MARGIN = {
  top: 30,
  right: 0,
  bottom: 100,
  left: 0
};
var BAR_PADDING = 0.7; // Padding between bars inside group, as fraction of bar width

var X_AXIS_PADDING = 24; // Padding between bottom of plot and x-axis in px

var COLUMN_VALUE_PADDING = 16; // Padding between top of bar and corresponding % value label in px

var ASPECT_RATIO = 0.37;
var ORIGINAL_WIDTH = 502;
var MAX_WIDTH = 1250;
var MAX_HEIGHT = MAX_WIDTH * ASPECT_RATIO;
var MIN_WIDTH = ORIGINAL_WIDTH;
var MIN_HEIGHT = MIN_WIDTH * ASPECT_RATIO;

var getChartWidth = function getChartWidth(width, paddingScalar) {
  var chartWidth = Math.min(width * (1 - 2 * paddingScalar), MAX_WIDTH * (1 - 2 * paddingScalar));
  return Math.max(chartWidth, MIN_WIDTH * (1 - 2 * paddingScalar));
};

var getChartHeight = function getChartHeight(width, paddingScalar) {
  var unboundedHeight = getChartWidth(width, paddingScalar) * ASPECT_RATIO;
  var chartHeight = Math.min(unboundedHeight, MAX_HEIGHT);
  return Math.max(chartHeight, MIN_HEIGHT);
};

var generateXScale = function generateXScale(domain, width) {
  return scaleBand().padding(BAR_PADDING).domain(domain).range([40, width]);
};

var generateYScale = function generateYScale(domain, height) {
  return scaleLinear().domain(domain).range([height, 0]).nice();
};

var generateStackLayout = function generateStackLayout(keys) {
  return stack().order(stackOrderAscending).keys(keys.map(function (d) {
    return d.key;
  }));
};

export function StackedColumnChart(props) {
  var _props$data = props.data,
      data = _props$data === void 0 ? [] : _props$data,
      _props$keys = props.keys,
      keys = _props$keys === void 0 ? [] : _props$keys,
      isInGridLayout = props.isInGridLayout,
      _props$width = props.width,
      width = _props$width === void 0 ? ORIGINAL_WIDTH : _props$width,
      yScaleDomain = props.yScaleDomain,
      _props$threeTickAxisF = props.threeTickAxisFormatter,
      threeTickAxisFormatter = _props$threeTickAxisF === void 0 ? function (d) {
    return "".concat(d, "%");
  } : _props$threeTickAxisF,
      _props$paddingScalar = props.paddingScalar,
      paddingScalar = _props$paddingScalar === void 0 ? 0.15 : _props$paddingScalar,
      colorScale = props.colorScale,
      renderTooltip = props.renderTooltip;
  var rtl = useRtl();
  var xAxisRef = React.useRef(null);

  var _React$useState = React.useState(),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      tooltipData = _React$useState2[0],
      setTooltipData = _React$useState2[1];

  var chartWidth = getChartWidth(width, paddingScalar);
  var chartHeight = getChartHeight(width, paddingScalar); // does this need to be in a state?

  var _React$useState3 = React.useState(function () {
    return generateYScale(yScaleDomain, chartHeight);
  }),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      yScale = _React$useState4[0],
      setYScale = _React$useState4[1];

  var _React$useState5 = React.useState(function () {
    return generateXScale(data.map(function (d) {
      return d.message.id;
    }), chartWidth);
  }),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      xScale = _React$useState6[0],
      setXScale = _React$useState6[1];

  var _React$useState7 = React.useState(function () {
    return generateStackLayout(keys);
  }),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      stackLayout = _React$useState8[0],
      setStackLayout = _React$useState8[1];

  var _onMouseMove = function onMouseMove(e, key) {
    var selectedCol = data.find(function (d) {
      return d.message.id === key;
    });
    if (!selectedCol) return;
    setTooltipData({
      x: e.clientX,
      y: e.clientY,
      data: selectedCol
    });
  };

  var wrapText = function wrapText() {
    if (!!xAxisRef.current) {
      var labelSelection = select(xAxisRef.current).selectAll('text');
      labelSelection.each(function wrapTextEach() {
        // get all tspan text labels in an array
        // (this is so FormattedMessage can supply us with the translations when needed)
        var textArray = [];
        var text = select(this);
        text.selectAll('tspan').each(function getFullText() {
          textArray.push(select(this).text());
        });
        var fullString = textArray.join(' ');
        fullString = fullString === 'Unknown' ? 'N/A' : fullString; // get attributes from rendered text elements and appends tspan to each

        var lineHeight = 1.33; // ems

        var words = fullString.split(/\s+/).reverse();
        var word;
        var line = [];
        var lineNumber = 0;
        var x = text.attr('x');
        var y = text.attr('y');
        var dy = parseFloat(text.attr('dy'));
        var tspan = text.text(null).append('tspan').attr('x', x).attr('y', y).attr('dy', "".concat(dy, "em")); // wrap text on multiple lines and append tspans accordingly

        while (words.length > 0) {
          word = words.pop();
          line.push(word);
          tspan.text(line.join(' '));
          var tspanNode = tspan.node();

          if (!!tspanNode && tspanNode.getComputedTextLength && tspanNode.getComputedTextLength() > bandWidth && line.length > 1) {
            line.pop();
            tspan.text(line.join(' '));
            line = [word];
            lineNumber += 1;
            tspan = text.append('tspan').attr('x', x).attr('y', y).attr('dy', "".concat(lineNumber * lineHeight + dy, "em")).text(word);
          }
        }
      });
    }
  };

  React.useEffect(wrapText);
  React.useEffect(function () {
    setXScale(function () {
      return generateXScale(data.map(function (d) {
        return d.message.id;
      }), chartWidth);
    });
  }, [chartWidth, data]);
  React.useEffect(function () {
    setYScale(function () {
      return generateYScale(yScaleDomain, chartHeight);
    });
  }, [yScaleDomain, chartHeight]);
  React.useEffect(function () {
    setStackLayout(function () {
      return generateStackLayout(keys);
    });
  }, [keys]);
  var stackLayoutWithData = stackLayout(data);
  var bandWidth = xScale.bandwidth();
  var a11yPadding = 18;
  return /*#__PURE__*/_jsxs(StyledChartWrapper, {
    "data-testid": "stacked-column-chart",
    isInGridLayout: isInGridLayout,
    paddingScalar: paddingScalar,
    width: width,
    children: [/*#__PURE__*/_jsxs("svg", {
      width: chartWidth,
      height: chartHeight + MARGIN.top + MARGIN.bottom,
      children: [/*#__PURE__*/_jsx(ThreeTickYAxis, {
        scale: yScale,
        width: chartWidth,
        margin: MARGIN,
        formatter: threeTickAxisFormatter
      }), /*#__PURE__*/_jsxs("g", {
        "data-name": "plot",
        transform: "translate(".concat(MARGIN.left, ", ").concat(MARGIN.top, ")"),
        "aria-hidden": "true",
        children: [stackLayoutWithData.map(function (layer) {
          return /*#__PURE__*/_jsx("g", {
            "data-testid": "group-".concat(layer.key),
            fill: colorScale(layer.key),
            children: layer.map(function (column) {
              return /*#__PURE__*/_jsx("rect", {
                "data-testid": "rect-".concat(layer.key),
                x: xScale(column.data.message.id),
                y: yScale(column[1]),
                height: yScale(column[0]) - yScale(column[1]),
                width: bandWidth,
                onMouseMove: function onMouseMove(e) {
                  return _onMouseMove(e, column.data.message.id);
                },
                onMouseLeave: function onMouseLeave() {
                  return setTooltipData(undefined);
                }
              }, column.data.message.id);
            })
          }, layer.key);
        }), /*#__PURE__*/_jsx("g", {
          "data-testid": "group-percentages",
          children: data.map(function (d) {
            return /*#__PURE__*/_jsx(StyledValue, {
              textAnchor: "middle",
              x: xScale(d.message.id) + bandWidth / 2,
              y: yScale(d.percentage_raw) - COLUMN_VALUE_PADDING,
              dy: ".75em",
              children: d.percentage
            }, d.message.id);
          })
        })]
      }), /*#__PURE__*/_jsx("g", {
        ref: xAxisRef,
        "data-name": "x-axis",
        transform: "translate(".concat(MARGIN.left, ", ").concat(chartHeight + MARGIN.top + X_AXIS_PADDING, ")"),
        "aria-hidden": "true",
        children: data.map(function (d) {
          return /*#__PURE__*/_jsx("g", {
            transform: "translate(".concat(xScale(d.message.id), ", 0)"),
            children: /*#__PURE__*/_jsx(StyledLabel, {
              x: bandWidth / 2,
              y: "0",
              dy: ".75em",
              textAnchor: "middle",
              children: d.message && /*#__PURE__*/_jsx("tspan", {
                children: d.message.defaultMessage
              })
            })
          }, d.message.id);
        })
      }), /*#__PURE__*/_jsx("g", {
        "data-testid": "group-a11y-rects",
        transform: "translate(".concat(MARGIN.left, ", ").concat(MARGIN.top, ")"),
        children: data.map(function (d) {
          return /*#__PURE__*/_jsx(StyledA11yRect, {
            "aria-label": ariaLabelGenerator(d),
            x: xScale(d.message.id) - a11yPadding / 2,
            y: yScale(yScaleDomain[1]),
            height: chartHeight,
            width: bandWidth + a11yPadding,
            tabIndex: 0,
            role: "button"
          }, d.message.id);
        })
      })]
    }), tooltipData && !!renderTooltip && /*#__PURE__*/_jsx(StyledTooltipWrapper, {
      "aria-hidden": "true",
      horizontalPos: tooltipData.x,
      isRtl: rtl,
      top: tooltipData.y,
      children: renderTooltip(tooltipData.data, {
        x: tooltipData.x,
        y: tooltipData.y
      })
    })]
  });
}