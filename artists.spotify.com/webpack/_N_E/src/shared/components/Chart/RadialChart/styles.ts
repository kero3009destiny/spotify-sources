// ignore-string-externalization
import styled, { css } from 'styled-components';
import { gray10, spacer4, spacer8, spacer12 } from '@spotify-internal/encore-web-v3';
var DISC = css(["::before{background-color:", ";border-radius:50%;content:'';height:8px;left:0;position:absolute;top:6px;width:8px;}"], function (props) {
  return props.discColor;
});
export var StyledMobileTooltipWrapper = styled.div.withConfig({
  displayName: "styles__StyledMobileTooltipWrapper",
  componentId: "sc-120qewt-0"
})(["position:absolute;top:25%;"]);
export var StyledDesktopTooltipWrapper = styled.div.withConfig({
  displayName: "styles__StyledDesktopTooltipWrapper",
  componentId: "sc-120qewt-1"
})(["", ";bottom:", "px;pointer-events:none;position:fixed;top:", "px;"], function (props) {
  return props.isRtl ? css(["left:auto;right:calc(25% + ", "px);"], props.tooltipX) : css(["left:", "px;"], props.tooltipX);
}, function (props) {
  return props.tooltipY;
}, function (props) {
  return props.tooltipY;
});
export var StyledTooltipContent = styled.div.withConfig({
  displayName: "styles__StyledTooltipContent",
  componentId: "sc-120qewt-2"
})(["display:flex;padding-left:14px;position:relative;width:175px;", ";"], DISC);
export var StyledTooltipContentList = styled.ul.withConfig({
  displayName: "styles__StyledTooltipContentList",
  componentId: "sc-120qewt-3"
})(["list-style:none;padding:5px 15px 0 0;width:200px;"]);
export var StyledTooltipContentListItem = styled.li.withConfig({
  displayName: "styles__StyledTooltipContentListItem",
  componentId: "sc-120qewt-4"
})(["display:flex;margin-bottom:", ";padding-left:15px;position:relative;", ";&:last-child{margin-bottom:0;}"], spacer4, DISC);
export var StyledTooltipValue = styled.span.withConfig({
  displayName: "styles__StyledTooltipValue",
  componentId: "sc-120qewt-5"
})(["flex:1;font-weight:bold;justify-content:flex-end;text-align:right;"]);
export var StyledOverlay = styled.div.withConfig({
  displayName: "styles__StyledOverlay",
  componentId: "sc-120qewt-6"
})(["position:relative;top:-12px;"]);
export var StyledRadialChartWrapper = styled.div.withConfig({
  displayName: "styles__StyledRadialChartWrapper",
  componentId: "sc-120qewt-7"
})(["align-items:center;cursor:default;display:flex;font-weight:book;justify-content:center;overflow:hidden;padding:", " 0;position:relative;&:focus{box-shadow:inset 0 0 0 3px ", ";outline:0;}"], spacer8, gray10);
export var StyledRadialChart = styled.svg.withConfig({
  displayName: "styles__StyledRadialChart",
  componentId: "sc-120qewt-8"
})(["margin:0 auto;"]);
export var StyledLegendWrapper = styled.div.withConfig({
  displayName: "styles__StyledLegendWrapper",
  componentId: "sc-120qewt-9"
})(["", ";position:absolute;top:50%;transform:translate(-50%,-50%);"], function (props) {
  return props.isRtl ? css(["right:50%;"]) : css(["left:50%;"]);
});
export var StyledLegend = styled.ul.withConfig({
  displayName: "styles__StyledLegend",
  componentId: "sc-120qewt-10"
})(["list-style:none;padding:0;"]);
export var StyledLegendItem = styled.li.withConfig({
  displayName: "styles__StyledLegendItem",
  componentId: "sc-120qewt-11"
})(["margin-bottom:", ";padding-left:", ";position:relative;", ";&::before{left:-10px;}&:last-child{margin-bottom:0;}"], spacer12, spacer4, DISC);
export var StyledLegendValue = styled.span.withConfig({
  displayName: "styles__StyledLegendValue",
  componentId: "sc-120qewt-12"
})(["font-weight:bold;"]);