import React from 'react';
import styled from 'styled-components';
import throttle from 'lodash/throttle';
import { Table, TableCell, TableContainer, TableHeaderCell, TableRow, screenLgMax, screenSmMin, screenXlMin } from '@spotify-internal/encore-web-v3';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { useT } from '@mrkt/features/i18n';
import { TableColgroup } from '../../Table';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var sendEventThrottled = throttle(sendEvent, 250);
var colsData = [{
  key: 'number',
  colWidth: 40
}, {
  key: 'city',
  colWidth: '*'
}, {
  key: 'count',
  colWidth: 85
}];
var StyledTableHeaderCell = styled(TableHeaderCell).withConfig({
  displayName: "TopCountriesTable__StyledTableHeaderCell",
  componentId: "bejqr0-0"
})(["padding-top:2px;"]);
var StyledTableContainer = styled(TableContainer).withConfig({
  displayName: "TopCountriesTable__StyledTableContainer",
  componentId: "bejqr0-1"
})(["@media (min-width:", "){display:inline-block;}@media (min-width:", ") and (max-width:", "){margin-right:30px;}@media (min-width:", "){margin-right:50px;}"], screenSmMin, screenSmMin, screenLgMax, screenXlMin);
export function TopCountriesTable(props) {
  var _props$data = props.data,
      data = _props$data === void 0 ? [] : _props$data,
      height = props.height,
      isViewportXS = props.isViewportXS,
      isViewportSM = props.isViewportSM,
      _props$setHighlightCo = props.setHighlightCountry,
      setHighlightCountry = _props$setHighlightCo === void 0 ? function () {} : _props$setHighlightCo,
      stat = props.stat,
      width = props.width;
  var t = useT();
  return /*#__PURE__*/_jsx(StyledTableContainer, {
    responsive: true,
    stickyHeader: true,
    style: {
      width: width,
      height: height
    },
    tabIndex: 0,
    children: /*#__PURE__*/_jsxs(Table, {
      onMouseLeave: function onMouseLeave() {
        return setHighlightCountry();
      },
      children: [/*#__PURE__*/_jsx(TableColgroup, {
        cols: colsData
      }), /*#__PURE__*/_jsx("thead", {
        children: /*#__PURE__*/_jsxs(TableRow, {
          children: [/*#__PURE__*/_jsx(StyledTableHeaderCell, {
            scope: "col",
            colSpan: 2,
            children: t('CHART_TOP_COUNTRIES_b75971', 'Last 28 Days', '')
          }), /*#__PURE__*/_jsx(StyledTableHeaderCell, {
            align: "right",
            scope: "col",
            children: stat
          })]
        })
      }), /*#__PURE__*/_jsx("tbody", {
        children: data.map(function (d, i) {
          return /*#__PURE__*/_jsxs(TableRow, {
            hover: isViewportXS || isViewportSM ? false : true,
            onMouseEnter: function onMouseEnter() {
              setHighlightCountry(d.name);
              sendEventThrottled({
                eventCategory: 'TopCountriesList',
                eventAction: 'mouseEnter',
                eventLabel: d.name
              });
            },
            children: [/*#__PURE__*/_jsx(TableCell, {
              numerical: true,
              children: i + 1
            }), /*#__PURE__*/_jsx(TableCell, {
              highlight: true,
              truncate: true,
              title: d.formatted.country,
              children: d.formatted.country
            }), /*#__PURE__*/_jsx(TableCell, {
              numerical: true,
              align: "right",
              children: d.formatted.fullStat
            })]
          }, "".concat(d.name, "-").concat(d.num));
        })
      })]
    })
  });
}