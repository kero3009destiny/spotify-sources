import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

var _TYPE_TO_COLOR;

import * as React from 'react';
import styled, { css } from 'styled-components';
import { Tooltip, black } from '@spotify-internal/encore-web-v3';
import { dataDarkBlue, dataLightBlue, dataDarkPurple } from '@mrkt/features/creator-color-tokens';
import { A11yInterface, AreaChart, ChartWrapper, LineChart, PathPointLine, PathPointMarker, XAxisEventBar } from '@spotify-internal/spoticharts';
import { useDateTimeFormatter, useNumberFormatter, useT } from '@mrkt/features/i18n';
import { useRtl } from '@mrkt/features/i18n/hooks/useRtl';
import { intlTimelineAxisDateFormatOptions, intlTimelineTooltipDateFormatOptions, intlNumberFormatSuffixOptions } from '@mrkt/features/stats-components/utils';
import { EntityType } from './types';
import { AnnotationTooltip } from './AnnotationTooltip';
import { Alignment, Legend } from '../../../shared/components/Chart/Legend';
import { useHistory } from 'react-router-dom';
import { getAriaLabelStrings, getOffsetPos, sortArtistData, xAccessor, yAccessor } from './utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var ASPECT_RATIO = 0.25;
var TYPE_TO_COLOR = (_TYPE_TO_COLOR = {}, _defineProperty(_TYPE_TO_COLOR, EntityType.PRIMARY, dataDarkBlue), _defineProperty(_TYPE_TO_COLOR, EntityType.COMPARE_1, dataLightBlue), _defineProperty(_TYPE_TO_COLOR, EntityType.COMPARE_2, dataDarkPurple), _TYPE_TO_COLOR);
var StyledTooltip = styled(Tooltip).withConfig({
  displayName: "TimelineChart__StyledTooltip",
  componentId: "qorsdr-0"
})(["", ";max-width:200px;pointer-events:none;position:absolute;transform:translate( ", " -25% );top:", "px;"], function (props) {
  return props.isRtl ? css(["right:", "px;"], props.horizontalPos) : css(["left:", "px;;"], props.horizontalPos);
}, function (props) {
  return props.horizontalPos > props.windowWidth / 2 ? "".concat(props.isRtl ? '-90%, ' : '-80%, ', " ") : "".concat(props.isRtl ? '40%,' : '60%,');
}, function (props) {
  return props.top;
});
var StyledTooltipStreamCount = styled.div.withConfig({
  displayName: "TimelineChart__StyledTooltipStreamCount",
  componentId: "qorsdr-1"
})(["font-weight:bold;"]);
var StyledTooltipDate = styled.div.withConfig({
  displayName: "TimelineChart__StyledTooltipDate",
  componentId: "qorsdr-2"
})(["white-space:nowrap;"]);
var TimelineChartContainer = styled.div.withConfig({
  displayName: "TimelineChart__TimelineChartContainer",
  componentId: "qorsdr-3"
})(["position:relative;"]);

var colorScale = function colorScale(d) {
  return TYPE_TO_COLOR[d];
};

export function TimelineChart(props) {
  var annotations = props.annotations,
      artist = props.artist,
      data = props.data,
      width = props.width,
      timeFilter = props.timeFilter,
      type = props.type;
  var history = useHistory();

  var _React$useState = React.useState(),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      tooltipData = _React$useState2[0],
      setTooltipData = _React$useState2[1];

  var _React$useState3 = React.useState(),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      annotationTooltip = _React$useState4[0],
      setAnnotationTooltip = _React$useState4[1];

  var _React$useState5 = React.useState(-1),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      annotationIndex = _React$useState6[0],
      setAnnotationIndex = _React$useState6[1];

  var legendKeys = Object.keys(data).map(function (val) {
    return {
      key: data[val].type,
      label: data[val].name
    };
  });
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

  var height = width * ASPECT_RATIO;
  var windowWidth = window.innerWidth;
  var primaryTimelineData = data[artist.id].timelineData;
  var dataLength = primaryTimelineData.length;
  var isAreaChart = type !== 'followers';
  var dateMapFromData = primaryTimelineData.map(function (d) {
    return d.x.valueOf();
  });
  var sortedArtistData = sortArtistData(data);

  function indexOfClosestValue(value, list) {
    return list.reduce(function (closestI, current, i) {
      return Math.abs(current - value) < Math.abs(list[closestI] - value) ? i : closestI;
    }, 0);
  }

  function onMouseMove(_ref) {
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

    var yValue = primaryTimelineData[dataIndex].y;
    var xVal = primaryTimelineData[dataIndex].x;
    var annotationIdx = annotations.findIndex(function (val) {
      return val.date.getTime() === xVal.getTime();
    });

    if (annotationIdx > -1) {
      setAnnotationIndex(annotationIdx);
      setAnnotationTooltip(true);
    } else {
      // this should prevent annotations from appearing
      // improperly when no annotation is present
      setAnnotationIndex(-1);
      setAnnotationTooltip(false);
    }

    setTooltipData({
      xValue: xVal,
      yValue: yValue,
      dataIndex: dataIndex,
      top: yScale(yValue),
      left: xScale(xVal)
    });
  }

  function onMouseLeave(_ref2) {
    var yScale = _ref2.yScale,
        event = _ref2.event;

    var _getOffsetPos = getOffsetPos(event, event.target),
        offsetY = _getOffsetPos[1];

    if (!annotationTooltip || offsetY <= yScale.range()[0]) {
      // only trigger mouseLeave if not trying to hover over annotation
      // determines whether user is attempting to hover below chart
      setTooltipData(undefined);
      setAnnotationTooltip(false);
      setAnnotationIndex(-1);
    }
  }

  function onKeyDown(e, frameIndex) {
    var ENTER_KEY = 'Enter';
    var date = xAccessor(primaryTimelineData[frameIndex]);

    if (e.key === ENTER_KEY) {
      var annIndex = annotations.findIndex(function (val) {
        return val.date.valueOf() === date.valueOf();
      });

      if (annIndex > -1) {
        history.push("/artist/".concat(artist.id, "/music/playlists"));
      }
    }
  }

  function ariaLabelGenerator(frameIndex) {
    var date = xAccessor(primaryTimelineData[frameIndex]);

    var _getAriaLabelStrings = getAriaLabelStrings(frameIndex, date, sortedArtistData, annotations, t),
        dataString = _getAriaLabelStrings.dataString,
        annotationString = _getAriaLabelStrings.annotationString,
        navigationString = _getAriaLabelStrings.navigationString;

    return [dataString, annotationString, navigationString].filter(function (d) {
      return !!d;
    }).join(' ');
  }

  return /*#__PURE__*/_jsxs(TimelineChartContainer, {
    "data-testid": "audience-timeline",
    children: [/*#__PURE__*/_jsx(Legend, {
      alignment: Alignment.end,
      colorScale: colorScale,
      keys: legendKeys
    }), /*#__PURE__*/_jsxs(ChartWrapper, {
      height: height,
      width: width,
      formatXAxis: xFormatter,
      formatYAxis: yFormatter,
      includeYZero: isAreaChart // this inherits our styles from s4a, should we be explicit?
      ,
      labelStyle: {
        fontSize: '10px'
      },
      xLabelDistance: 50,
      onMouseMove: onMouseMove,
      onMouseLeave: onMouseLeave // x-axis labels are duplicated when data set < 5 days
      ,
      xTickCount: dataLength < 5 ? dataLength - 1 : undefined,
      children: [sortedArtistData.map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            _ = _ref4[0],
            val = _ref4[1];

        return [/*#__PURE__*/_jsx(LineChart, {
          data: val.timelineData,
          x: function x(d) {
            return d.x;
          },
          y: yAccessor,
          stroke: TYPE_TO_COLOR[val.type]
        }, "line"), isAreaChart && /*#__PURE__*/_jsx(AreaChart, {
          data: val.timelineData,
          x: function x(d) {
            return d.x;
          },
          y: yAccessor,
          fill: TYPE_TO_COLOR[val.type]
        }, "area")];
      }), /*#__PURE__*/_jsx(XAxisEventBar, {
        events: annotations,
        x: function x(ev) {
          return ev.date;
        },
        mouseX: tooltipData ? tooltipData.left : null,
        xEquals: function xEquals(a, b) {
          if (b !== null) {
            return a.valueOf() === b.valueOf();
          }

          return false;
        }
      }), tooltipData && [/*#__PURE__*/_jsx(PathPointLine, {
        data: primaryTimelineData,
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
        data: primaryTimelineData,
        dataIndex: tooltipData.dataIndex,
        x: function x(d) {
          return d.x;
        },
        y: function y(d) {
          return d.y;
        },
        fill: dataDarkBlue
      }, "marker-dot")], /*#__PURE__*/_jsx(A11yInterface, {
        onKeyDown: onKeyDown,
        ariaLabelGenerator: ariaLabelGenerator,
        numFrames: primaryTimelineData.length
      })]
    }), annotationTooltip && tooltipData && timeFilter !== 'last5years' && annotations.length && /*#__PURE__*/_jsx(AnnotationTooltip, {
      artist: artist,
      data: annotations[annotationIndex],
      onMouseLeave: function onMouseLeave() {
        return setAnnotationTooltip(false);
      },
      left: tooltipData.left
    }), tooltipData && /*#__PURE__*/_jsxs(StyledTooltip, {
      "data-testid": "tooltip",
      top: tooltipData.top,
      horizontalPos: tooltipData.left,
      windowWidth: windowWidth,
      isRtl: rtl,
      children: [/*#__PURE__*/_jsx(StyledTooltipDate, {
        children: "".concat(tooltipDateFormatter.format(tooltipData.xValue))
      }), /*#__PURE__*/_jsx(StyledTooltipStreamCount, {
        children: numberFormatter.format(tooltipData.yValue)
      })]
    })]
  });
}