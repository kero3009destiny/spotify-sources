// ignore-string-externalization
import styled, { css } from 'styled-components';
import { TextLink, Type, spacer8, spacer64, screenSmMin, gray20, screenXsMax, spacer12, spacer20, spacer32, spacer16, spacer24, screenXsMin, spacer40, spacer4 } from '@spotify-internal/encore-web';
export var Container = styled.div.withConfig({
  displayName: "sharedStyles__Container",
  componentId: "ard6nf-0"
})(["text-align:center;margin-bottom:96px;"]);
export var SocialButton = styled.button.withConfig({
  displayName: "sharedStyles__SocialButton",
  componentId: "ard6nf-1"
})(["background:transparent;border:0;margin-right:", ";svg{vertical-align:middle;margin-right:", ";margin-left:", ";}"], spacer24, spacer4, spacer4);
export var ArtistFlowContainer = styled.div.withConfig({
  displayName: "sharedStyles__ArtistFlowContainer",
  componentId: "ard6nf-2"
})(["align-items:center;display:flex;flex-direction:column;text-align:center;"]);
export var ParentContainer = styled.div.withConfig({
  displayName: "sharedStyles__ParentContainer",
  componentId: "ard6nf-3"
})(["@media (min-width:", "){width:700px;}margin:0;"], screenSmMin);
export var ButtonContainer = styled.div.withConfig({
  displayName: "sharedStyles__ButtonContainer",
  componentId: "ard6nf-4"
})(["display:flex;justify-content:space-between;"]);
export var FormContainer = styled.div.withConfig({
  displayName: "sharedStyles__FormContainer",
  componentId: "ard6nf-5"
})(["@media (min-width:", "){padding-left:15%;padding-right:15%;}"], screenSmMin);
export var FormHeadingContainer = styled.div.withConfig({
  displayName: "sharedStyles__FormHeadingContainer",
  componentId: "ard6nf-6"
})(["padding-top:", ";@media (min-width:", "){padding-left:", ";}"], spacer64, screenSmMin, spacer8);
export var InfoBox = styled.div.withConfig({
  displayName: "sharedStyles__InfoBox",
  componentId: "ard6nf-7"
})(["background:", ";border-radius:", ";padding:", ";margin:", " auto;@media (max-width:", "){margin:", " auto;}text-align:center;width:calc(100% - ", ");max-width:500px;"], gray20, spacer12, spacer20, spacer32, screenXsMax, spacer12, spacer20);
export var Link = styled(TextLink).withConfig({
  displayName: "sharedStyles__Link",
  componentId: "ard6nf-8"
})(["text-decoration:underline;&:hover{opacity:0.7;}"]);
export var ActionContainer = styled.div.withConfig({
  displayName: "sharedStyles__ActionContainer",
  componentId: "ard6nf-9"
})(["display:flex;justify-content:space-between;width:100%;margin-top:", ";"], spacer32);
export var Row = styled.div.withConfig({
  displayName: "sharedStyles__Row",
  componentId: "ard6nf-10"
})(["display:flex;width:100%;justify-content:center;text-align:center;margin-top:", ";margin-bottom:", ";", ""], spacer12, spacer12, function (props) {
  return props.extraPadding && css(["margin-top:", ";margin-bottom:", ";@media (min-width:", "){margin-top:", ";margin-bottom:", ";}"], spacer16, spacer16, screenXsMin, spacer20, spacer20);
});
var stackedButtonsStyle = css(["flex-direction:column-reverse;align-content:center;width:auto;a,button{margin-bottom:", ";}"], spacer12);
export var ButtonRow = styled(Row).withConfig({
  displayName: "sharedStyles__ButtonRow",
  componentId: "ard6nf-11"
})(["display:flex;flex-flow:row wrap;justify-content:space-between;&.stacked{", "}@media (max-width:", "){", ";width:100%;max-width:650px;margin-left:auto;margin-right:auto;div{display:flex;flex-direction:column-reverse;}}"], stackedButtonsStyle, screenXsMax, stackedButtonsStyle);
export var AvatarContainer = styled.div.withConfig({
  displayName: "sharedStyles__AvatarContainer",
  componentId: "ard6nf-12"
})(["display:flex;align-content:center;flex-direction:column;align-items:center;margin-top:0;margin-bottom:0;width:100%;"]);
export var HeaderContainer = styled.div.withConfig({
  displayName: "sharedStyles__HeaderContainer",
  componentId: "ard6nf-13"
})(["margin-bottom:", ";"], spacer24);
export var TextContainer = styled.div.withConfig({
  displayName: "sharedStyles__TextContainer",
  componentId: "ard6nf-14"
})(["padding-top:", ";"], spacer16);
export var Subheading = styled(Type.h2).attrs({
  variant: 'body1'
}).withConfig({
  displayName: "sharedStyles__Subheading",
  componentId: "ard6nf-15"
})(["align-items:center;display:flex;justify-content:center;"]);
export var SearchContainer = styled.div.withConfig({
  displayName: "sharedStyles__SearchContainer",
  componentId: "ard6nf-16"
})(["display:flex;width:100%;justify-content:center;text-align:center;margin-bottom:", ";margin-top:", ";", ""], spacer24, spacer24, function (props) {
  return props.extraPadding && css(["margin-top:", ";margin-bottom:", ";@media (min-width:", "){margin-top:", ";margin-bottom:", ";}"], spacer16, spacer16, screenXsMin, spacer20, spacer20);
});
export var FaqLinkContainer = styled.div.withConfig({
  displayName: "sharedStyles__FaqLinkContainer",
  componentId: "ard6nf-17"
})(["div{padding-top:", ";}"], spacer20);
export var ParagraphContainer = styled.div.withConfig({
  displayName: "sharedStyles__ParagraphContainer",
  componentId: "ard6nf-18"
})(["margin-bottom:", ";padding-left:15%;padding-right:15%;"], spacer40);
export var Heading = styled(Type.h1).attrs({
  variant: 'heading2',
  condensed: true
}).withConfig({
  displayName: "sharedStyles__Heading",
  componentId: "ard6nf-19"
})(["margin-bottom:", ";"], spacer24);