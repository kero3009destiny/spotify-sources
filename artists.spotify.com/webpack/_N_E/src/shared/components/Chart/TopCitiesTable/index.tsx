import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Table, TableCell, TableHeaderCell, TableRow, Type, gray45, spacer20, spacer24, screenMdMin, screenLgMin } from '@spotify-internal/encore-web-v3';
import { useCountryNames } from '@mrkt/features/country-names';
import { useT } from '@mrkt/features/i18n';
import { TableColgroup } from '../../../components/Table';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledWrapper = styled.div.withConfig({
  displayName: "TopCitiesTable__StyledWrapper",
  componentId: "sc-1y52cc0-0"
})(["@media (max-width:", "){margin-bottom:", ";}@media (min-width:", "){column-count:2;column-gap:", ";column-width:320px;}"], screenMdMin, spacer24, screenMdMin, spacer20);
var StyledTable = styled(Table).withConfig({
  displayName: "TopCitiesTable__StyledTable",
  componentId: "sc-1y52cc0-1"
})(["margin-bottom:0;table-layout:fixed;tr{break-inside:avoid;}@media (min-width:", "){width:90%;}@media (min-width:", "){width:70%;}"], screenMdMin, screenLgMin);
var StyledCountryName = styled(Type).withConfig({
  displayName: "TopCitiesTable__StyledCountryName",
  componentId: "sc-1y52cc0-2"
})(["color:", ";display:block;"], gray45);
var mobileCols = [{
  key: 'number',
  colWidth: 30
}, {
  key: 'city',
  colWidth: '*'
}, {
  key: 'count',
  colWidth: 80
}];
var desktopCols = [{
  key: 'number',
  colWidth: 40
}, {
  key: 'city',
  colWidth: '*'
}, {
  key: 'count',
  colWidth: 80
}];
var CITIES_TO_DISPLAY = 50;
export function TopCitiesTable(props) {
  var _props$data = props.data,
      data = _props$data === void 0 ? [] : _props$data,
      isMobile = props.isMobile,
      isSmallScreen = props.isSmallScreen,
      _props$metric = props.metric,
      metric = _props$metric === void 0 ? '' : _props$metric,
      qaId = props.qaId;
  var numCitiesHalved = Math.ceil(data.length / 2);
  var cities = isMobile || isSmallScreen ? CITIES_TO_DISPLAY : numCitiesHalved;
  var tableDataCol1 = data.slice(0, cities);
  var tableDataCol2 = data.slice(numCitiesHalved, CITIES_TO_DISPLAY);
  var hasSplitTable = !isMobile && !isSmallScreen;
  var colsData = isMobile ? mobileCols : desktopCols;
  var t = useT();
  var isoCountries = useCountryNames();
  if (!isoCountries) throw new Error('countries undefined not supported');

  function renderTableHead() {
    return /*#__PURE__*/_jsxs(TableRow, {
      children: [/*#__PURE__*/_jsx(TableHeaderCell, {
        scope: "col",
        colSpan: 2,
        children: t('CHART_TOP_CITIES_b75971', 'Last 28 Days', '')
      }), /*#__PURE__*/_jsx(TableHeaderCell, {
        align: "right",
        scope: "col",
        children: metric
      })]
    });
  }

  function renderTableBody(isoCountryCodes, rows) {
    var counterAdjustment = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    return rows.map(function (d, i) {
      return /*#__PURE__*/_jsx(Fragment, {
        children: /*#__PURE__*/_jsxs(TableRow, {
          "data-testid": "table-body-row",
          children: [/*#__PURE__*/_jsx(TableCell, {
            numerical: true,
            children: i + counterAdjustment + 1
          }), /*#__PURE__*/_jsxs(TableCell, {
            highlight: true,
            truncate: true,
            title: d.formatted.cityCountry,
            children: [d.city, d.country && /*#__PURE__*/_jsx(StyledCountryName, {
              children: isoCountryCodes[d.country]
            })]
          }), /*#__PURE__*/_jsx(TableCell, {
            numerical: true,
            align: "right",
            children: d.formatted.fullStat
          })]
        })
      }, "".concat(d.country, "-").concat(d.region, "-").concat(d.city));
    });
  }

  return /*#__PURE__*/_jsxs(StyledWrapper, {
    "data-testid": qaId,
    children: [/*#__PURE__*/_jsxs(StyledTable, {
      "data-testid": "top-cities",
      children: [/*#__PURE__*/_jsx(TableColgroup, {
        cols: colsData
      }), /*#__PURE__*/_jsx("thead", {
        children: renderTableHead()
      }), /*#__PURE__*/_jsx("tbody", {
        children: renderTableBody(isoCountries, tableDataCol1)
      })]
    }), hasSplitTable && /*#__PURE__*/_jsxs(StyledTable, {
      children: [/*#__PURE__*/_jsx(TableColgroup, {
        cols: desktopCols
      }), /*#__PURE__*/_jsx("thead", {
        children: renderTableHead()
      }), /*#__PURE__*/_jsx("tbody", {
        children: renderTableBody(isoCountries, tableDataCol2, numCitiesHalved)
      })]
    })]
  });
}