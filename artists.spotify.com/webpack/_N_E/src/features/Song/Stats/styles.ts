// ignore-string-externalization
import styled, { css } from 'styled-components';
import { Banner, Type, kleinBlue, gray75, spacer12, spacer16, spacer32, Popover } from '@spotify-internal/encore-web-v3';
import { SplitRightsIcon } from '../../../features/Music/SplitRightsBadge';
var TIMELINE_SECTION_ASPECT_RATIO = 0.35;
export var Wrapper = styled.div.withConfig({
  displayName: "styles__Wrapper",
  componentId: "sc-13gvzpa-0"
})(["section:first-child{padding-top:0;}"]);
export var CustomPopover = styled(Popover).withConfig({
  displayName: "styles__CustomPopover",
  componentId: "sc-13gvzpa-1"
})(["", ""], function (props) {
  return !props.isMobile && css(["max-width:none;width:500px;"]);
});
export var SplitRightsBanner = styled(Banner).withConfig({
  displayName: "styles__SplitRightsBanner",
  componentId: "sc-13gvzpa-2"
})(["margin-bottom:", ";"], spacer32);
export var CountryList = styled.ul.withConfig({
  displayName: "styles__CountryList",
  componentId: "sc-13gvzpa-3"
})(["display:grid;grid-gap:9px;grid-template-columns:repeat(", ",1fr);margin:", " 0;"], function (props) {
  return props.isMobile ? 9 : 11;
}, spacer16);
export var HasRightsIndicator = styled.span.withConfig({
  displayName: "styles__HasRightsIndicator",
  componentId: "sc-13gvzpa-4"
})(["color:", ";"], function (props) {
  return props.hasRights ? null : "".concat(gray75);
});
export var ExternalLink = styled(Type.p).attrs({
  color: "".concat(kleinBlue),
  variant: Type.body3,
  weight: Type.bold
}).withConfig({
  displayName: "styles__ExternalLink",
  componentId: "sc-13gvzpa-5"
})(["display:flex;justify-content:flex-end;text-transform:uppercase;"]);
export var TriggerLink = styled(Type.span).withConfig({
  displayName: "styles__TriggerLink",
  componentId: "sc-13gvzpa-6"
})(["color:", ";text-decoration:underline;"], kleinBlue);
export var CustomSplitRightsIcon = styled(SplitRightsIcon).withConfig({
  displayName: "styles__CustomSplitRightsIcon",
  componentId: "sc-13gvzpa-7"
})(["margin-right:", ";"], spacer12);
export var BannerContent = styled.div.withConfig({
  displayName: "styles__BannerContent",
  componentId: "sc-13gvzpa-8"
})(["display:flex;"]);
export var BannerText = styled.div.withConfig({
  displayName: "styles__BannerText",
  componentId: "sc-13gvzpa-9"
})(["flex:1;"]);
export var LoadingContainer = styled.div.withConfig({
  displayName: "styles__LoadingContainer",
  componentId: "sc-13gvzpa-10"
})(["height:", "px;"], window.innerWidth * TIMELINE_SECTION_ASPECT_RATIO);