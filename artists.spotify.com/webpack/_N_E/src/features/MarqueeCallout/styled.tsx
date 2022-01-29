// ignore-string-externalization
import styled from 'styled-components';
import { Type, spacer12, spacer20, spacer4, cssColorValue, opacityBlack10 } from '@spotify-internal/encore-web';
export var CallOutWrapper = styled.div.withConfig({
  displayName: "styled__CallOutWrapper",
  componentId: "kp3xe6-0"
})(["position:absolute;top:100px;left:-195px;@media (max-width:991px){left:inherit;right:", ";}> div{color:", ";min-width:500px;height:177px;padding-left:35px;background:linear-gradient( 90deg,", " 0%,#766e8b 165% );filter:drop-shadow(0 2.6914px 8.0742px ", ");border-radius:", ";display:flex;cursor:pointer;&::after{border-left:", " solid transparent;border-bottom:", " solid #5323d4;border-right:", " solid transparent;left:calc(50% - ", ");top:-", ";@media (max-width:991px){left:calc(100% - 65px);border-bottom:", " solid #603ebc;}}}"], spacer4, cssColorValue('textBase'), cssColorValue('backgroundBase'), opacityBlack10, spacer4, spacer20, spacer20, spacer20, spacer20, spacer20, spacer20);
export var ContentWrapper = styled.div.withConfig({
  displayName: "styled__ContentWrapper",
  componentId: "kp3xe6-1"
})(["flex-grow:2;padding-top:", ";cursor:pointer;"], spacer12);
export var ImgWrapper = styled.div.withConfig({
  displayName: "styled__ImgWrapper",
  componentId: "kp3xe6-2"
})(["min-width:160px;height:100%;padding-left:", ";flex-grow:1;"], spacer20);
export var MarqueeIcon = styled.img.withConfig({
  displayName: "styled__MarqueeIcon",
  componentId: "kp3xe6-3"
})(["height:160px;position:absolute;bottom:0;"]);
export var CalloutSubtitle = styled(Type).attrs({
  forwardedAs: 'p',
  variant: Type.body3,
  weight: Type.bold
}).withConfig({
  displayName: "styled__CalloutSubtitle",
  componentId: "kp3xe6-4"
})([""]);
export var ContentHeader = styled(Type).attrs({
  forwardedAs: 'h4',
  variant: Type.heading4,
  weight: Type.bold
}).withConfig({
  displayName: "styled__ContentHeader",
  componentId: "kp3xe6-5"
})(["padding:0 0 0.5em;"]);