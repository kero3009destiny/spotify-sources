import React from 'react';
import styled from 'styled-components';
import { IconChartDown, IconChartUp, IconHelpAlt, ButtonIcon, OverlayTrigger, Tooltip, Type, brightRed, gray60, gray90, spacer4, spacer16, success } from '@spotify-internal/encore-web-v3';
import { TooltipTrigger } from '@mrkt/features/TooltipTrigger';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledContainer = styled.div.withConfig({
  displayName: "DataTrendHdrMobile__StyledContainer",
  componentId: "sc-10ata2n-0"
})(["align-items:flex-end;border-bottom:1px solid ", ";display:flex;margin:0 -", " 8px -", ";padding:20px ", ";"], gray90, spacer16, spacer16, spacer16);
var StyledMetricBlock = styled.div.withConfig({
  displayName: "DataTrendHdrMobile__StyledMetricBlock",
  componentId: "sc-10ata2n-1"
})(["font-size:12px;letter-spacing:0.1em;text-transform:capitalize;"]);
var StyledMetricHeader = styled(Type.h2).withConfig({
  displayName: "DataTrendHdrMobile__StyledMetricHeader",
  componentId: "sc-10ata2n-2"
})(["display:flex;padding-bottom:0;"]);
var StyledDeltaBlock = styled.div.withConfig({
  displayName: "DataTrendHdrMobile__StyledDeltaBlock",
  componentId: "sc-10ata2n-3"
})(["color:", ";flex:1;text-align:right;"], gray60);
var StyledDelta = styled.div.withConfig({
  displayName: "DataTrendHdrMobile__StyledDelta",
  componentId: "sc-10ata2n-4"
})(["font-size:14px;"]);
var StyledButtonIcon = styled(ButtonIcon).withConfig({
  displayName: "DataTrendHdrMobile__StyledButtonIcon",
  componentId: "sc-10ata2n-5"
})(["margin-left:10px;"]);
var StyledTrendIconDown = styled(IconChartDown).withConfig({
  displayName: "DataTrendHdrMobile__StyledTrendIconDown",
  componentId: "sc-10ata2n-6"
})(["color:", ";display:inline-block;margin:-2px ", " 0 0;vertical-align:middle;"], brightRed, spacer4);
var StyledTrendIconUp = styled(IconChartUp).withConfig({
  displayName: "DataTrendHdrMobile__StyledTrendIconUp",
  componentId: "sc-10ata2n-7"
})(["color:", ";display:inline-block;margin:-2px ", " 0 0;vertical-align:middle;"], success, spacer4);
var StyledDeltaLabel = styled.div.withConfig({
  displayName: "DataTrendHdrMobile__StyledDeltaLabel",
  componentId: "sc-10ata2n-8"
})(["font-size:12px;letter-spacing:0.1em;"]);
export function DataTrendHdrMobile(_ref) {
  var data = _ref.data;
  var t = useT();

  function renderNoDataMsg(label) {
    return [/*#__PURE__*/_jsx("span", {
      children: t('CHART_DATA_TREND_HDR_a20dd7', 'Not available', 'This label appears in the UX when data is not available.')
    }, "noData"), /*#__PURE__*/_jsx(TooltipTrigger, {
      tooltipId: "help",
      placement: OverlayTrigger.top,
      tooltip: /*#__PURE__*/_jsx(Tooltip, {
        children: /*#__PURE__*/_jsx("span", {
          children: label
        })
      }),
      children: /*#__PURE__*/_jsx(StyledButtonIcon, {
        "aria-label": "help",
        children: /*#__PURE__*/_jsx(IconHelpAlt, {
          "aria-hidden": "true"
        })
      })
    }, "help")];
  }

  return /*#__PURE__*/_jsxs(StyledContainer, {
    "data-testid": "data-trend-hdr-mobile",
    children: [/*#__PURE__*/_jsx(StyledMetricBlock, {
      children: /*#__PURE__*/_jsx("span", {
        children: data !== null && data !== void 0 && data.deltaLabelMobile ? data.deltaLabelMobile( /*#__PURE__*/_jsx(StyledMetricHeader, {
          variant: "heading2",
          color: "black",
          children: !data.dataNumber && !data.delta ? renderNoDataMsg(data.dataLabel ? data.dataLabel() : null) : data.dataNumber
        })) : null
      })
    }), data && data.delta && /*#__PURE__*/_jsxs(StyledDeltaBlock, {
      children: [/*#__PURE__*/_jsxs(StyledDelta, {
        children: [data.delta.deltaNumber !== '0' && data.delta.deltaNumber !== '0%' && (data.delta.trend === 'down' ? /*#__PURE__*/_jsx(StyledTrendIconDown, {
          iconSize: 16,
          "data-testid": "arrow-down",
          "aria-label": "decreasing"
        }) : /*#__PURE__*/_jsx(StyledTrendIconUp, {
          iconSize: 16,
          "data-testid": "arrow-up",
          "aria-label": "increasing"
        })), data.delta.deltaNumber]
      }), /*#__PURE__*/_jsx(StyledDeltaLabel, {
        children: /*#__PURE__*/_jsx("span", {
          children: data.delta.deltaLabel ? data.delta.deltaLabel('') : null
        })
      })]
    })]
  });
}