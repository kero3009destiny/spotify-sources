import _defineProperty from "/var/jenkins_home/workspace/tingle.cd962a55-a742-407f-a437-251a69d63f52/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useState, useEffect } from 'react';
import { timeDay } from 'd3-time';
import { A11yInterface, ChartWrapper, LineChart } from '@spotify-internal/spoticharts';
import { useCountryNames } from '@mrkt/features/country-names';
import { formatMonthDayOfMonthYear } from '@mrkt/features/date-helpers';
import { useDateTimeFormatter, useNumberFormatter, useT } from '@mrkt/features/i18n';
import { intlTimelineAxisDateFormatOptions, intlNumberFormatSuffixOptions } from '@mrkt/features/stats-components/utils';
import { TooltipMarker, TooltipContent } from './Tooltip';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

var generateSortedDatapoints = function generateSortedDatapoints(data, xIndex, isoCountries) {
  return data.map(function (d) {
    return {
      countryCode: d.countryCode,
      countryName: isoCountries[d.countryCode],
      num: d.timeline[xIndex] ? d.timeline[xIndex].num : NaN
    };
  }).sort(function (a, b) {
    return b.num - a.num;
  });
};

export function CountryTimelineGraph(_ref) {
  var _data$0$timeline;

  var _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      colorScale = _ref.colorScale,
      width = _ref.width,
      height = _ref.height;

  var _useState = useState(null),
      tooltipData = _useState[0],
      setTooltipData = _useState[1];

  var isoCountries = useCountryNames();
  var t = useT();
  var isEmpty = !data || data.length === 0;

  var xAccessor = function xAccessor(val) {
    return val.date;
  };

  var yAccessor = function yAccessor(val) {
    return val.num;
  }; // axis formatters


  var numberSuffixFormatter = useNumberFormatter(intlNumberFormatSuffixOptions);

  var yFormatter = function yFormatter(n) {
    return numberSuffixFormatter.format(n);
  };

  var xAxisDateFormatter = useDateTimeFormatter(intlTimelineAxisDateFormatOptions);

  var xFormatter = function xFormatter(d) {
    return xAxisDateFormatter.format(d);
  };

  var onMouseMove = function onMouseMove(_ref2) {
    var xValue = _ref2.xValue,
        xScale = _ref2.xScale,
        event = _ref2.event,
        marginLeft = _ref2.marginLeft;

    if (isEmpty) {
      return;
    }

    var clampedXValue = timeDay.round(xValue);
    var tline = data[0].timeline;
    var index = tline.findIndex(function (d) {
      return d.date.valueOf() === clampedXValue.valueOf();
    });

    if (index < 0) {
      return;
    }

    var xPos = xScale(clampedXValue) + marginLeft;
    var windowWidth = window.innerWidth;
    setTooltipData({
      // @ts-ignore
      index: index,
      date: tline[index].date,
      sortedData: generateSortedDatapoints(data, index, isoCountries),
      xPos: xPos,
      yPos: event.clientY,
      // need to account for larger screens
      // when windowWidth is greater than app container of 1680
      translateLeft: "calc(\n        ".concat(xPos > windowWidth / 2 ? '-115' : '15', "% +\n        ").concat(windowWidth > 1680 ? (windowWidth - 1680) / 2 : 0, "px)\n      ")
    });
  };

  var onMouseLeave = function onMouseLeave() {
    setTooltipData(null);
  };

  useEffect(function () {
    document.addEventListener('scroll', onMouseLeave);
    return function cleanup() {
      document.removeEventListener('scroll', onMouseLeave);
    };
  }, []);

  var ariaLabelGenerator = function ariaLabelGenerator(frameIndex) {
    if (isEmpty) {
      return '';
    }

    var frameData = data.map(function (val) {
      // @ts-ignore
      var countryText = frameIndex === 0 ? isoCountries[val.countryCode] : '';
      var statText = t('COUNTRY_TIMELINE_ff9528', "{count, plural,\n          one {{count} stream}\n          other {{count} streams}\n        }", 'Example Usage: 30 streams', {
        count: numberSuffixFormatter.format(yAccessor(val.timeline[frameIndex]))
      });
      return "".concat(countryText, " ").concat(statText);
    });
    return "".concat(formatMonthDayOfMonthYear(xAccessor(data[0].timeline[frameIndex])), ", ").concat(frameData.join(', '));
  };

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(ChartWrapper, {
      width: width,
      height: height,
      formatXAxis: xFormatter,
      formatYAxis: yFormatter,
      labelStyle: {
        fontSize: '10px'
      },
      spacingRight: 10,
      onMouseMove: onMouseMove,
      onMouseLeave: onMouseLeave,
      isEmpty: isEmpty,
      children: [data.map(function (d) {
        return /*#__PURE__*/_jsx(LineChart, {
          data: d.timeline,
          stroke: colorScale(d.countryCode),
          x: function x(val) {
            return val.date;
          },
          y: function y(val) {
            return val.num;
          }
        }, d.countryCode);
      }), tooltipData && /*#__PURE__*/_jsx(TooltipMarker, {
        allData: data,
        colorScale: colorScale // @ts-ignore
        ,
        dataIndex: tooltipData.index,
        xAcc: xAccessor,
        yAcc: yAccessor
      }), /*#__PURE__*/_jsx(A11yInterface, {
        ariaLabelGenerator: ariaLabelGenerator,
        numFrames: data[0] ? (_data$0$timeline = data[0].timeline) === null || _data$0$timeline === void 0 ? void 0 : _data$0$timeline.length : 0
      })]
    }), tooltipData && /*#__PURE__*/_jsx(TooltipContent, _objectSpread({
      colorScale: colorScale
    }, tooltipData))]
  });
}