import React from 'react';
import styled, { css } from 'styled-components';
import { IconChartDown, IconChartUp, IconHelpAlt, ButtonIcon, OverlayTrigger, Tooltip, Type, failure, gray60, screenMdMin, screenSmMin, spacer8, spacer16, spacer20, success } from '@spotify-internal/encore-web-v3';
import { TooltipTrigger } from '@mrkt/features/TooltipTrigger';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledWrapper = styled.div.withConfig({
  displayName: "DataTrendHdrDesktop__StyledWrapper",
  componentId: "sc-3zd26d-0"
})(["margin-bottom:", ";text-align:left;"], spacer8);
var StyledHeader = styled.span.withConfig({
  displayName: "DataTrendHdrDesktop__StyledHeader",
  componentId: "sc-3zd26d-1"
})(["@media (min-width:", "){display:inline-block;margin-right:", ";}", ""], screenSmMin, spacer16, function (props) {
  return props.isTimeline && css(["font-size:28px;font-weight:900;letter-spacing:-0.015em;line-height:1.3;margin-bottom:0;@media (min-width:", "){font-size:32px;}"], screenMdMin);
});
var StyledDeltaHeader = styled.span.withConfig({
  displayName: "DataTrendHdrDesktop__StyledDeltaHeader",
  componentId: "sc-3zd26d-2"
})(["color:", ";"], gray60);
var StyledButtonIcon = styled(ButtonIcon).withConfig({
  displayName: "DataTrendHdrDesktop__StyledButtonIcon",
  componentId: "sc-3zd26d-3"
})(["display:inline-block;margin-left:10px;vertical-align:middle;"]);
var StyledHeaderTools = styled.div.withConfig({
  displayName: "DataTrendHdrDesktop__StyledHeaderTools",
  componentId: "sc-3zd26d-4"
})(["align-items:center;display:flex;float:right;margin-top:-1px;padding:0 ", " 0 ", ";"], spacer20, spacer8);
var StyledTrendIconDown = styled(IconChartDown).withConfig({
  displayName: "DataTrendHdrDesktop__StyledTrendIconDown",
  componentId: "sc-3zd26d-5"
})(["color:", ";display:inline-block;vertical-align:middle;"], failure);
var StyledTrendIconUp = styled(IconChartUp).withConfig({
  displayName: "DataTrendHdrDesktop__StyledTrendIconUp",
  componentId: "sc-3zd26d-6"
})(["color:", ";display:inline-block;vertical-align:middle;"], success);
export function DataTrendHdrDesktop(_ref) {
  var data = _ref.data,
      toolIcons = _ref.toolIcons,
      isTimeline = _ref.isTimeline,
      qaId = _ref.qaId;
  var t = useT();
  return /*#__PURE__*/_jsxs(StyledWrapper, {
    "data-testid": "data-trend-hdr-desktop",
    children: [/*#__PURE__*/_jsx(StyledHeader, {
      isTimeline: isTimeline,
      "data-testid": qaId,
      "data-slo-id": qaId,
      children: !(data !== null && data !== void 0 && data.dataNumber) && !(data !== null && data !== void 0 && data.delta) ? [/*#__PURE__*/_jsx(Type, {
        as: "h2",
        variant: Type.heading2,
        condensed: true,
        children: t('CHART_DATA_TREND_HDR_a20dd7', 'Not available', 'This label appears in the UX when data is not available.')
      }, "noData"), /*#__PURE__*/_jsx(TooltipTrigger, {
        tooltipId: "help",
        placement: OverlayTrigger.top,
        tooltip: /*#__PURE__*/_jsx(Tooltip, {
          children: /*#__PURE__*/_jsx("span", {
            children: data !== null && data !== void 0 && data.dataLabel ? data.dataLabel() : t('CHART_DATA_TREND_HDR_f0a6e0', 'No Data Available', 'This label appears in the UX when data is not available.')
          })
        }),
        children: /*#__PURE__*/_jsx(StyledButtonIcon, {
          "aria-label": "Help",
          children: /*#__PURE__*/_jsx(IconHelpAlt, {
            "aria-hidden": "true"
          })
        })
      }, "help")] : /*#__PURE__*/_jsx(Type, {
        as: "h2",
        variant: Type.heading2,
        condensed: true,
        children: data.dataLabel ? data.dataLabel(data.dataNumber) : null
      })
    }), data && data.delta && /*#__PURE__*/_jsxs(StyledDeltaHeader, {
      children: [data.delta.deltaNumber !== '0' && data.delta.deltaNumber !== '0%' && (data.delta.trend === 'down' ? /*#__PURE__*/_jsx(StyledTrendIconDown, {
        iconSize: 16,
        "data-testid": "arrow-down",
        "aria-label": t('CHART_DATA_TREND_HDR_6f8821', 'decreasing', 'This aria label is attached to an arrow facing down, indicating a downward delta trend.')
      }) : /*#__PURE__*/_jsx(StyledTrendIconUp, {
        iconSize: 16,
        "data-testid": "arrow-up",
        "aria-label": t('CHART_DATA_TREND_HDR_8e4ebf', 'increasing', 'This aria label is attached to an arrow facing up, indicating an upwards delta trend.')
      })), /*#__PURE__*/_jsx("span", {
        children: data.delta.deltaLabel ? data.delta.deltaLabel(data.delta.deltaNumber) : null
      })]
    }), toolIcons && /*#__PURE__*/_jsx(StyledHeaderTools, {
      "data-testid": "header-tools",
      children: toolIcons
    })]
  });
}