import React from 'react';
import styled, { css } from 'styled-components';
import { Tooltip, Table, TableRow, TableHeaderCell, TableCell, Type, gray10, spacer8 } from '@spotify-internal/encore-web-v3';
import { useDateTimeFormatter, useNumberFormatter, useT } from '@mrkt/features/i18n';
import { useRtl } from '@mrkt/features/i18n/hooks/useRtl';
import { intlTimelineTooltipDateFormatOptions } from '@mrkt/features/stats-components/utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var TooltipContainer = styled.div.withConfig({
  displayName: "TooltipContent__TooltipContainer",
  componentId: "sc-1bt0qcq-0"
})(["pointer-events:none;position:fixed;top:", "px;", ";z-index:500;transform:translate(", ",0);width:300px;& > div{max-width:max-content;width:100%;}"], function (props) {
  return props.top;
}, function (props) {
  return props.isRtl ? css(["right:", "px;"], props.horizontalPos + 48) : css(["left:", "px;;"], props.horizontalPos + 48);
}, function (props) {
  return props.translate;
});
var StyledCountryLegendDot = styled.div.withConfig({
  displayName: "TooltipContent__StyledCountryLegendDot",
  componentId: "sc-1bt0qcq-1"
})(["border-radius:50%;background-color:", ";display:inline-block;margin-right:", ";vertical-align:middle;width:", ";height:", ";"], function (props) {
  return props.color;
}, spacer8, spacer8, spacer8);
var StyledTableHeaderCell = styled(TableHeaderCell).withConfig({
  displayName: "TooltipContent__StyledTableHeaderCell",
  componentId: "sc-1bt0qcq-2"
})(["", ""], function (props) {
  return props.condensed ? 'padding: 0' : '';
});
var StyledTableRow = styled(TableRow).withConfig({
  displayName: "TooltipContent__StyledTableRow",
  componentId: "sc-1bt0qcq-3"
})(["border-bottom:0;"]);
var CountryCode = styled(Type).withConfig({
  displayName: "TooltipContent__CountryCode",
  componentId: "sc-1bt0qcq-4"
})(["vertical-align:middle;"]);
export function TooltipContent(_ref) {
  var translateLeft = _ref.translateLeft,
      xPos = _ref.xPos,
      yPos = _ref.yPos,
      date = _ref.date,
      sortedData = _ref.sortedData,
      colorScale = _ref.colorScale;
  var t = useT();
  var rtl = useRtl();
  var dateFormatter = useDateTimeFormatter(intlTimelineTooltipDateFormatOptions);
  var numberFormatter = useNumberFormatter();
  return /*#__PURE__*/_jsx(TooltipContainer, {
    translate: translateLeft,
    horizontalPos: xPos,
    top: yPos,
    isRtl: rtl,
    children: /*#__PURE__*/_jsx(Tooltip, {
      children: /*#__PURE__*/_jsxs(Table, {
        children: [/*#__PURE__*/_jsxs("colgroup", {
          children: [/*#__PURE__*/_jsx("col", {
            width: "60%"
          }), /*#__PURE__*/_jsx("col", {
            width: "40%"
          })]
        }), /*#__PURE__*/_jsx("thead", {
          children: /*#__PURE__*/_jsxs(StyledTableRow, {
            children: [/*#__PURE__*/_jsx(StyledTableHeaderCell, {
              condensed: true,
              children: dateFormatter.format(date)
            }), /*#__PURE__*/_jsx(StyledTableHeaderCell, {
              align: "right",
              condensed: true,
              children: t('COUNTRY_TIMELINE_b98dff', 'Streams', '')
            })]
          })
        }), /*#__PURE__*/_jsx("tbody", {
          children: sortedData.map(function (d) {
            return /*#__PURE__*/_jsxs(StyledTableRow, {
              children: [/*#__PURE__*/_jsxs(TableCell, {
                condensed: true,
                children: [/*#__PURE__*/_jsx(StyledCountryLegendDot, {
                  color: colorScale(d.countryCode)
                }), /*#__PURE__*/_jsx(CountryCode, {
                  color: gray10,
                  weight: Type.bold,
                  children: d.countryName
                })]
              }), /*#__PURE__*/_jsx(TableCell, {
                align: "right",
                condensed: true,
                numerical: true,
                children: /*#__PURE__*/_jsx(Type, {
                  color: gray10,
                  children: numberFormatter.format(d.num)
                })
              })]
            }, d.countryCode);
          })
        })]
      })
    })
  });
}