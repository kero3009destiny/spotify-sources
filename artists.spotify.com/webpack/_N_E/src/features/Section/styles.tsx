// ignore-string-externalization
import styled, { css } from 'styled-components';
import { screenXsMax, screenSmMin, screenMdMin, gray60, spacer8, spacer20, spacer24, spacer48, spacer64, spacer72, Type } from '@spotify-internal/encore-web-v3';
export var StyledSection = styled.section.withConfig({
  displayName: "styles__StyledSection",
  componentId: "nm8aur-0"
})(["@media (max-width:", "){padding-bottom:", ";padding-top:", ";}@media (min-width:", "){padding-bottom:", ";}"], screenXsMax, spacer24, spacer24, screenSmMin, spacer72);
export var StyledTitleContainer = styled.div.withConfig({
  displayName: "styles__StyledTitleContainer",
  componentId: "nm8aur-1"
})(["", " ", ""], function (props) {
  return props.hasToolIcons && css(["position:relative;"]);
}, function (props) {
  return !props.hasSubtitle && css(["padding-bottom:", ";@media (min-width:", "){padding-bottom:", ";}@media (min-width:", "){padding-bottom:", ";}"], spacer24, screenSmMin, spacer48, screenMdMin, spacer64);
});
export var StyledTitle = styled(Type).attrs(function (props) {
  return {
    forwardedAs: 'h2',
    variant: props.variant
  };
}).withConfig({
  displayName: "styles__StyledTitle",
  componentId: "nm8aur-2"
})(["@media (max-width:", "){max-width:230px;}", " ", ""], screenXsMax, function (props) {
  return props.hasToolIcons && css(["display:inline-block;"]);
}, function (props) {
  return props.hasSubtitle && css(["padding-bottom:", ";"], spacer8);
});
export var StyledToolIconContainer = styled.div.withConfig({
  displayName: "styles__StyledToolIconContainer",
  componentId: "nm8aur-3"
})(["margin-top:0;@media (min-width:", "){position:absolute;display:inline-block;margin-top:", ";margin-right:", ";right:0;}"], screenSmMin, spacer8, spacer20);
export var StyledSubtitle = styled(Type).attrs({
  forwardedAs: 'p',
  variant: Type.cta3,
  color: gray60
}).withConfig({
  displayName: "styles__StyledSubtitle",
  componentId: "nm8aur-4"
})(["@media (max-width:", "){padding-bottom:", ";}@media (min-width:", "){padding-bottom:", ";}@media (min-width:", "){padding-bottom:", ";}"], screenXsMax, spacer24, screenSmMin, spacer48, screenMdMin, spacer64);