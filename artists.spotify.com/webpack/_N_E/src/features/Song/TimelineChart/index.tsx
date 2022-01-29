import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import styled, { css } from 'styled-components';
import { Tooltip, black } from '@spotify-internal/encore-web-v3';
import { dataDarkBlue } from '@mrkt/features/creator-color-tokens';
import { useDateTimeFormatter, useNumberFormatter, useT } from '@mrkt/features/i18n';
import { useRtl } from '@mrkt/features/i18n/hooks/useRtl';
import { formatDateToString, intlTimelineAxisDateFormatOptions, intlTimelineTooltipDateFormatOptions, intlNumberFormatSuffixOptions } from '@mrkt/features/stats-components/utils';
import { A11yInterface, AreaChart, ChartWrapper, LineChart, PathPointLine, PathPointMarker } from '@spotify-internal/spoticharts';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var ASPECT_RATIO = 0.25;
var StyledTooltip = styled(Tooltip).withConfig({
  displayName: "TimelineChart__StyledTooltip",
  componentId: "sc-1ufkxli-0"
})(["", ";max-width:200px;pointer-events:none;position:absolute;transform:translate( ", " -25% );top:", "px;"], function (props) {
  return props.isRtl ? css(["right:", "px;"], props.horizontalPos) : css(["left:", "px;;"], props.horizontalPos);
}, function (props) {
  return props.horizontalPos > props.windowWidth / 2 ? "".concat(props.isRtl ? '-90%, ' : '-80%, ', " ") : "".concat(props.isRtl ? '40%,' : '60%,');
}, function (props) {
  return props.top;
});
var StyledTooltipStreamCount = styled.div.withConfig({
  displayName: "TimelineChart__StyledTooltipStreamCount",
  componentId: "sc-1ufkxli-1"
})(["font-weight:bold;"]);
var StyledTooltipDate = styled.div.withConfig({
  displayName: "TimelineChart__StyledTooltipDate",
  componentId: "sc-1ufkxli-2"
})(["white-space:nowrap;"]);
var TimelineChartContainer = styled.div.withConfig({
  displayName: "TimelineChart__TimelineChartContainer",
  componentId: "sc-1ufkxli-3"
})(["position:relative;"]);
export function TimelineChart(props) {
  var data = props.data,
      width = props.width;

  var _React$useState = React.useState(),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      tooltipData = _React$useState2[0],
      setTooltipData = _React$useState2[1];

  var height = width * ASPECT_RATIO;
  var windowWidth = window.innerWidth;
  var dataLength = data.length;
  var t = useT();
  var numberFormatter = useNumberFormatter();
  var tooltipDateFormatter = useDateTimeFormatter(intlTimelineTooltipDateFormatOptions);
  var rtl = useRtl(); // axis formatters

  var yAxisNumberFormatter = useNumberFormatter(intlNumberFormatSuffixOptions);

  var yFormatter = function yFormatter(n) {
    return yAxisNumberFormatter.format(n);
  };

  var xAxisDateFormatter = useDateTimeFormatter(intlTimelineAxisDateFormatOptions);

  var xFormatter = function xFormatter(d) {
    return xAxisDateFormatter.format(d);
  };

  var dateMapFromData = data.map(function (d) {
    return d.x.valueOf();
  });

  var xAccessor = function xAccessor(d) {
    return d.x;
  };

  var yAccessor = function yAccessor(d) {
    return d.y;
  };

  var indexOfClosestValue = function indexOfClosestValue(value, list) {
    return list.reduce(function (closestI, current, i) {
      return Math.abs(current - value) < Math.abs(list[closestI] - value) ? i : closestI;
    }, 0);
  };

  var onMouseMove = function onMouseMove(_ref) {
    var xValue = _ref.xValue,
        xScale = _ref.xScale,
        yScale = _ref.yScale;

    // xValue and yValue are relative
    // to the mouse position, and will not
    // correspond with your data points
    if (xValue === null) {
      return;
    }

    var dataIndex = indexOfClosestValue(xValue.valueOf(), dateMapFromData);

    if (dataIndex < 0) {
      return;
    }

    var yValue = data[dataIndex].y;
    var xVal = data[dataIndex].x;
    setTooltipData({
      xValue: xVal,
      yValue: yValue,
      dataIndex: dataIndex,
      top: yScale(yValue),
      left: xScale(xVal)
    });
  };

  var onMouseLeave = function onMouseLeave() {
    return setTooltipData(undefined);
  };

  var ariaLabelGenerator = function ariaLabelGenerator(frameIndex) {
    var dateText = formatDateToString(xAccessor(data[frameIndex]), tooltipDateFormatter);
    var count = numberFormatter.format(yAccessor(data[frameIndex]));
    var statText = t('SONG_TIMELINE_CHART_590935', "{count, plural,\n        one {{count} stream}\n        other {{count} streams}\n      }", 'Example Usage: 34,080 streams', {
      count: count
    });

    if (frameIndex === 0) {
      return "".concat(dateText, ", ").concat(statText);
    }

    return "".concat(dateText, ", ").concat(count);
  };

  return /*#__PURE__*/_jsxs(TimelineChartContainer, {
    "data-testid": "song-timeline-a11y",
    "data-slo-id": "song-timeline",
    children: [/*#__PURE__*/_jsxs(ChartWrapper, {
      height: height,
      width: width,
      formatXAxis: xFormatter,
      formatYAxis: yFormatter,
      includeYZero: true // this inherits our styles from s4a, should we be explicit?
      ,
      labelStyle: {
        fontSize: '10px'
      },
      onMouseMove: onMouseMove,
      onMouseLeave: onMouseLeave // x-axis labels are duplicated when data set < 5 days
      ,
      xTickCount: dataLength < 5 ? dataLength - 1 : undefined,
      children: [/*#__PURE__*/_jsx(LineChart, {
        data: data,
        x: function x(d) {
          return d.x;
        },
        y: yAccessor,
        stroke: dataDarkBlue
      }), /*#__PURE__*/_jsx(AreaChart, {
        data: data,
        x: function x(d) {
          return d.x;
        },
        y: yAccessor,
        fill: dataDarkBlue
      }), tooltipData && [/*#__PURE__*/_jsx(PathPointLine, {
        data: data,
        dataIndex: tooltipData.dataIndex,
        x: function x(d) {
          return d.x;
        },
        y: function y(d) {
          return d.y;
        },
        strokeWidth: 1,
        stroke: black
      }, "marker-line"), /*#__PURE__*/_jsx(PathPointMarker, {
        data: data,
        dataIndex: tooltipData.dataIndex,
        x: function x(d) {
          return d.x;
        },
        y: function y(d) {
          return d.y;
        },
        fill: dataDarkBlue
      }, "marker-dot")], /*#__PURE__*/_jsx(A11yInterface, {
        ariaLabelGenerator: ariaLabelGenerator,
        numFrames: data.length
      })]
    }), tooltipData && /*#__PURE__*/_jsxs(StyledTooltip, {
      "data-testid": "tooltip",
      top: tooltipData.top,
      horizontalPos: tooltipData.left,
      isRtl: rtl,
      windowWidth: windowWidth,
      children: [/*#__PURE__*/_jsx(StyledTooltipDate, {
        children: "".concat(formatDateToString(tooltipData.xValue, tooltipDateFormatter))
      }), /*#__PURE__*/_jsx(StyledTooltipStreamCount, {
        children: numberFormatter.format(tooltipData.yValue)
      })]
    })]
  });
}