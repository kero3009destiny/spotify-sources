// ignore-string-externalization
import React from 'react';
import styled from 'styled-components';
import { FormGroup as ECWFormGroup, TextLink, Type, TypeList, TypeListItem, gray10, gray50, screenSmMin } from '@spotify-internal/encore-web';
import { jsx as _jsx } from "react/jsx-runtime";
export var Heading3FontSize16 = styled(Type).attrs({
  forwardedAs: 'h3',
  variant: Type.body2,
  color: gray10
}).withConfig({
  displayName: "StyleElements__Heading3FontSize16",
  componentId: "sc-1aqunii-0"
})(["font-size:16px;font-weight:", ";line-height:24px;"], Type.bold);
export var PFontSize16 = styled(Type).attrs({
  forwardedAs: 'p',
  variant: Type.body2,
  color: gray50
}).withConfig({
  displayName: "StyleElements__PFontSize16",
  componentId: "sc-1aqunii-1"
})(["font-size:16px;line-height:24px;"]);
export var Bullets = styled(TypeList).withConfig({
  displayName: "StyleElements__Bullets",
  componentId: "sc-1aqunii-2"
})(["padding:0;list-style-position:outside;margin-left:1em;"]);
export var Bullet = styled(TypeListItem).attrs({
  color: gray50,
  variant: Type.body1
}).withConfig({
  displayName: "StyleElements__Bullet",
  componentId: "sc-1aqunii-3"
})([""]);
export var TextLinkUnderlined = styled(TextLink).withConfig({
  displayName: "StyleElements__TextLinkUnderlined",
  componentId: "sc-1aqunii-4"
})(["text-decoration:underline;"]);
export function Heading3(props) {
  return /*#__PURE__*/_jsx(Heading3FontSize16, {
    style: {
      paddingBottom: '3px'
    },
    children: props.children
  });
}
export var FormGroup = styled(ECWFormGroup).withConfig({
  displayName: "StyleElements__FormGroup",
  componentId: "sc-1aqunii-5"
})(["padding-bottom:32px;"]);
export var FundraisingBannerWrapper = styled.div.withConfig({
  displayName: "StyleElements__FundraisingBannerWrapper",
  componentId: "sc-1aqunii-6"
})(["& > *{border-radius:4px;}@media (max-width:", "){width:100vw;position:relative;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw;& > *{border-radius:0;}}"], screenSmMin);