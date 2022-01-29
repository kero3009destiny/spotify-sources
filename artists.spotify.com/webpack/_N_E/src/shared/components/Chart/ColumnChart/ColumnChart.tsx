// ignore-string-externalization
import { scaleBand, scaleLinear } from 'd3-scale';
import styled, { css } from 'styled-components';
import React, { useState } from 'react';
import { gray10, spacer, white } from '@spotify-internal/encore-web-v3';
import { dataDarkBlue } from '@mrkt/features/creator-color-tokens';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { useRtl } from '@mrkt/features/i18n/hooks/useRtl';
import { ThreeTickYAxis } from '../ThreeTickYAxis';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var trackPopoverEvent = function trackPopoverEvent(artist, category) {
  if (!artist || !category) return;
  sendEvent({
    eventCategory: category,
    eventAction: 'tooltip',
    eventLabel: artist.name
  });
};

var MARGIN = {
  top: 30,
  right: 0,
  bottom: 4,
  left: 0
};
var BAR_PADDING = 0.3; // Padding between bars inside group, as fraction of bar width

var COLUMN_VALUE_PADDING = 24; // Padding between top of bar and corresponding % value label in px

var ASPECT_RATIO = 0.37;
var ORIGINAL_WIDTH = 502;
var MAX_WIDTH = 1250;
var MAX_HEIGHT = MAX_WIDTH * ASPECT_RATIO;
var MIN_WIDTH = ORIGINAL_WIDTH;
var MIN_HEIGHT = MIN_WIDTH * ASPECT_RATIO;
var MAX_PERCENT_YAXIS = 100;
var PADDING_SCALAR = 0.15;
var ColChart = styled.div.withConfig({
  displayName: "ColumnChart__ColChart",
  componentId: "s3pn3p-0"
})(["position:relative;text-align:center;"]);
var ColChartLabelWrapper = styled.div.withConfig({
  displayName: "ColumnChart__ColChartLabelWrapper",
  componentId: "s3pn3p-1"
})(["width:", "px;margin:auto;display:grid;grid-template-columns:repeat(6,0);margin-top:", ";"], function (props) {
  return props.width;
}, spacer.spacer8);
var ColChartLabel = styled.div.withConfig({
  displayName: "ColumnChart__ColChartLabel",
  componentId: "s3pn3p-2"
})(["width:", "px;line-height:1;margin-left:", "px;"], function (props) {
  return props.width;
}, function (props) {
  return props.marginleft;
});
var ColChartLabelText = styled.span.withConfig({
  displayName: "ColumnChart__ColChartLabelText",
  componentId: "s3pn3p-3"
})(["font-size:12px;"]);
var ValueText = styled.text.withConfig({
  displayName: "ColumnChart__ValueText",
  componentId: "s3pn3p-4"
})(["font-size:16px;font-weight:700;"]);
var StyledRect = styled.rect.withConfig({
  displayName: "ColumnChart__StyledRect",
  componentId: "s3pn3p-5"
})(["&:focus{outline:3px solid ", ";stroke:", ";stroke-linecap:solid;stroke-width:3px;}"], gray10, white);
var StyledTooltip = styled.div.withConfig({
  displayName: "ColumnChart__StyledTooltip",
  componentId: "s3pn3p-6"
})(["", ";pointer-events:'none';position:", ";top:", ";"], function (props) {
  return props.isRtl ? css(["right:", "px;"], props.horizontalPos) : css(["left:", "px;;"], props.horizontalPos);
}, function (props) {
  return props.position === 'key' ? 'absolute' : 'fixed';
}, function (props) {
  return "".concat(props.top, "px");
});
var StyledTSpan = styled.tspan.withConfig({
  displayName: "ColumnChart__StyledTSpan",
  componentId: "s3pn3p-7"
})(["clip:rect(0 0 0 0);clip-path:inset(50%);fill-opacity:0;height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px;"]);

var getChartWidth = function getChartWidth(width, paddingScalar) {
  var chartWidth = Math.min(width * (1 - 2 * paddingScalar), MAX_WIDTH * (1 - 2 * paddingScalar));
  return Math.max(chartWidth, MIN_WIDTH * (1 - 2 * paddingScalar));
};

var getChartHeight = function getChartHeight(width, paddingScalar) {
  var unboundedHeight = getChartWidth(width, paddingScalar) * ASPECT_RATIO;
  var chartHeight = Math.min(unboundedHeight, MAX_HEIGHT);
  return Math.max(chartHeight, MIN_HEIGHT);
};

export var ColumnChart = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var artist = props.artist,
      category = props.category,
      _props$color = props.color,
      color = _props$color === void 0 ? dataDarkBlue : _props$color,
      _props$data = props.data,
      data = _props$data === void 0 ? [] : _props$data,
      inlineStyles = props.inlineStyles,
      _props$paddingScalar = props.paddingScalar,
      paddingScalar = _props$paddingScalar === void 0 ? PADDING_SCALAR : _props$paddingScalar,
      _props$qaId = props.qaId,
      qaId = _props$qaId === void 0 ? 'column-chart' : _props$qaId,
      renderTooltip = props.renderTooltip,
      threeTickAxisFormatter = props.threeTickAxisFormatter,
      _props$width = props.width,
      width = _props$width === void 0 ? ORIGINAL_WIDTH : _props$width,
      _props$yAxisFormatter = props.yAxisFormatter,
      yAxisFormatter = _props$yAxisFormatter === void 0 ? function (d) {
    return "".concat(d, "%");
  } : _props$yAxisFormatter,
      _props$yScaleDomain = props.yScaleDomain,
      yScaleDomain = _props$yScaleDomain === void 0 ? [0, MAX_PERCENT_YAXIS] : _props$yScaleDomain;
  var chartWidth = getChartWidth(width, paddingScalar);
  var chartHeight = getChartHeight(width, paddingScalar);

  var _useState = useState(),
      tooltipData = _useState[0],
      setTooltipData = _useState[1];

  var yScale = scaleLinear().domain(yScaleDomain).range([getChartHeight(width, paddingScalar), 0]);
  var xScale = scaleBand().domain(data.map(function (d) {
    return d.message.id;
  })).padding(BAR_PADDING);
  var rtl = useRtl();
  xScale.domain(data.map(function (d) {
    return d.message.id;
  })).range([40, chartWidth]);
  yScale.range([chartHeight, 0]);
  var bandWidth = xScale.bandwidth();

  var _onKeyDown = function onKeyDown(e, d) {
    if (e.key === 'Enter') {
      var _d$tooltip;

      var xPos = xScale(d.message.id) + MAX_PERCENT_YAXIS;
      var yPos = chartHeight;
      var message = ((_d$tooltip = d.tooltip) === null || _d$tooltip === void 0 ? void 0 : _d$tooltip.defaultMessage) || '';
      setTooltipData(!!tooltipData ? undefined : {
        x: xPos,
        y: yPos,
        data: message,
        trigger: 'key'
      });
    }
  };

  var _onMouseMove = function onMouseMove(e, msg) {
    setTooltipData({
      x: e.clientX,
      y: e.clientY,
      data: msg,
      trigger: 'mouse'
    });
  };

  return /*#__PURE__*/_jsxs(ColChart, {
    style: inlineStyles,
    "data-testid": qaId,
    ref: ref,
    children: [/*#__PURE__*/_jsxs("svg", {
      width: chartWidth,
      height: chartHeight + MARGIN.top + MARGIN.bottom,
      children: [/*#__PURE__*/_jsx(ThreeTickYAxis, {
        scale: yScale,
        width: chartWidth,
        margin: MARGIN,
        formatter: threeTickAxisFormatter
      }), /*#__PURE__*/_jsx("g", {
        "data-name": "plot",
        transform: "translate(".concat(MARGIN.left, ", ").concat(MARGIN.top, ")"),
        children: data.map(function (d) {
          return /*#__PURE__*/_jsx("g", {
            "data-name": "group",
            transform: "translate(".concat(xScale(d.message.id), ", 0)"),
            children: /*#__PURE__*/_jsxs("g", {
              children: [/*#__PURE__*/_jsx(StyledRect, {
                "aria-label": "".concat(d.message.defaultMessage, ", ").concat(!!yAxisFormatter && yAxisFormatter(d.value)),
                height: chartHeight - yScale(d.value),
                width: bandWidth,
                y: yScale(d.value),
                "data-testid": "col-chart-rect",
                fill: color,
                onMouseOver: function onMouseOver() {
                  return trackPopoverEvent(artist, category);
                },
                onFocus: function onFocus() {
                  return trackPopoverEvent(artist, category);
                },
                onKeyDown: function onKeyDown(e) {
                  return _onKeyDown(e, d);
                },
                onMouseMove: function onMouseMove(e) {
                  return !!d.tooltip ? _onMouseMove(e, d.tooltip.defaultMessage) : undefined;
                },
                onMouseLeave: function onMouseLeave() {
                  return setTooltipData(undefined);
                },
                onBlur: function onBlur() {
                  return setTooltipData(undefined);
                },
                tabIndex: 0,
                role: "button"
              }), /*#__PURE__*/_jsx(ValueText, {
                "aria-hidden": "true",
                textAnchor: "middle",
                x: bandWidth / 2,
                y: yScale(d.value) - COLUMN_VALUE_PADDING,
                dy: ".75em",
                children: !!yAxisFormatter && yAxisFormatter(d.value)
              }), /*#__PURE__*/_jsx("text", {
                x: bandWidth / 2,
                y: yScale(d.value) - COLUMN_VALUE_PADDING,
                children: /*#__PURE__*/_jsx(StyledTSpan, {
                  "aria-live": "assertive",
                  children: tooltipData === null || tooltipData === void 0 ? void 0 : tooltipData.data
                })
              })]
            })
          }, d.message.id);
        })
      })]
    }), /*#__PURE__*/_jsx(ColChartLabelWrapper, {
      "aria-hidden": "true",
      "data-name": "x-axis",
      width: chartWidth,
      children: data.map(function (d) {
        return /*#__PURE__*/_jsx(ColChartLabel, {
          marginleft: xScale(d.message.id),
          width: bandWidth,
          children: /*#__PURE__*/_jsx(ColChartLabelText, {
            children: d.message.defaultMessage
          })
        }, d.message.id);
      })
    }), tooltipData && !!renderTooltip && /*#__PURE__*/_jsx(StyledTooltip, {
      "aria-hidden": "true",
      horizontalPos: tooltipData.x,
      isRtl: rtl,
      position: tooltipData.trigger,
      top: tooltipData.y,
      children: renderTooltip(tooltipData.data, {
        x: tooltipData.x
      })
    })]
  });
});