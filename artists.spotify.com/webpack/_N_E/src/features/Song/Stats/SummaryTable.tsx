import React from 'react';
import styled from 'styled-components';
import { IconChartDown, IconChartUp, Table, TableCell, TableHeaderCell, TableRow, Type, failure, gray10, success } from '@spotify-internal/encore-web-v3';
import { useT } from '@mrkt/features/i18n';
import { useGetString } from '../../../shared/messages/strings';
import { useGenerateLabel } from '../normalizers/summaryTable';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledTrendIconDown = styled(IconChartDown).withConfig({
  displayName: "SummaryTable__StyledTrendIconDown",
  componentId: "l1vf4o-0"
})(["color:", ";display:inline-block;vertical-align:middle;"], failure);
var StyledTrendIconUp = styled(IconChartUp).withConfig({
  displayName: "SummaryTable__StyledTrendIconUp",
  componentId: "l1vf4o-1"
})(["color:", ";display:inline-block;vertical-align:middle;"], success);
var StyledDeltaWrapper = styled.div.withConfig({
  displayName: "SummaryTable__StyledDeltaWrapper",
  componentId: "l1vf4o-2"
})(["align-items:center;display:flex;justify-content:flex-end;"]);
var StyledTableCell = styled(TableCell).withConfig({
  displayName: "SummaryTable__StyledTableCell",
  componentId: "l1vf4o-3"
})(["color:", ";"], gray10);
export function SummaryTable(props) {
  var data = props.data,
      filterHeader = props.filterHeader,
      isViewportXS = props.isViewportXS;
  var t = useT();

  var Label = function Label(_ref) {
    var rightsType = _ref.rightsType,
        deniedCountries = _ref.deniedCountries;
    var strings = useGetString();
    var label = useGenerateLabel(rightsType, deniedCountries, strings);
    return /*#__PURE__*/_jsx(Type, {
      weight: Type.bold,
      children: label
    });
  };

  return /*#__PURE__*/_jsxs(Table, {
    "data-testid": "summary-table",
    children: [/*#__PURE__*/_jsx("thead", {
      children: /*#__PURE__*/_jsxs(TableRow, {
        children: [/*#__PURE__*/_jsx(TableHeaderCell, {
          children: filterHeader === null || filterHeader === void 0 ? void 0 : filterHeader.label
        }), !isViewportXS && /*#__PURE__*/_jsx(TableHeaderCell, {
          align: "right",
          children: t('SONG_STATS_8e0f86', 'previous period', '')
        }), /*#__PURE__*/_jsx(TableHeaderCell, {
          align: "right",
          children: t('SONG_STATS_6f171c', 'this period', '')
        }), /*#__PURE__*/_jsx(TableHeaderCell, {
          align: "right",
          children: t('SONG_STATS_c9321f', 'change', '')
        })]
      })
    }), /*#__PURE__*/_jsx("tbody", {
      children: data.map(function (item, idx) {
        return /*#__PURE__*/_jsxs(TableRow, {
          children: [/*#__PURE__*/_jsx(StyledTableCell, {
            children: /*#__PURE__*/_jsx(Label, {
              rightsType: item.rightsType || '',
              deniedCountries: item.deniedCountries || []
            })
          }), !isViewportXS && /*#__PURE__*/_jsx(StyledTableCell, {
            align: "right",
            numerical: true,
            children: item.streamsPrevious
          }), /*#__PURE__*/_jsx(StyledTableCell, {
            align: "right",
            numerical: true,
            "data-slo-id": "this-period-streams",
            children: item.streams
          }), /*#__PURE__*/_jsx(StyledTableCell, {
            align: "right",
            numerical: true,
            children: /*#__PURE__*/_jsxs(StyledDeltaWrapper, {
              children: [item.comparisonDelta < 0 && /*#__PURE__*/_jsx(StyledTrendIconDown, {
                iconSize: 16,
                "data-testid": "arrow-down"
              }), item.comparisonDelta > 0 && /*#__PURE__*/_jsx(StyledTrendIconUp, {
                iconSize: 16,
                "data-testid": "arrow-up"
              }), item.deltaPct]
            })
          })]
        }, "".concat(idx, "-").concat(item.streams));
      })
    })]
  });
}