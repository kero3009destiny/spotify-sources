import React from 'react';
import styled from 'styled-components';
import { ButtonIcon, IconHelpAlt, Tooltip, Type, white } from '@spotify-internal/encore-web';
import { TooltipTrigger } from '@mrkt/features/TooltipTrigger';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var Header = styled.header.withConfig({
  displayName: "Title__Header",
  componentId: "s0x2de-0"
})(["align-items:flex-start;color:", ";display:flex;justify-content:space-between;"], white);
var Heading = styled(Type).attrs({
  as: Type.h3,
  color: white,
  variant: Type.heading4,
  weight: Type.bold
}).withConfig({
  displayName: "Title__Heading",
  componentId: "s0x2de-1"
})(["padding-right:10px;"]);
var HeadingAndTooltip = styled.div.withConfig({
  displayName: "Title__HeadingAndTooltip",
  componentId: "s0x2de-2"
})(["display:flex;"]);
export function Title(props) {
  var t = useT();
  return /*#__PURE__*/_jsxs(Header, {
    children: [/*#__PURE__*/_jsxs(HeadingAndTooltip, {
      children: [/*#__PURE__*/_jsx(Heading, {
        children: t('artistprofile_fundraising_artistfundraisingpick_shared_title_1', 'Artist Fundraising Pick', '')
      }), /*#__PURE__*/_jsx(HeadingTooltip, {})]
    }), props.children]
  });
}
var ButtonIconMarginBottom = styled(ButtonIcon).withConfig({
  displayName: "Title__ButtonIconMarginBottom",
  componentId: "s0x2de-3"
})(["margin-bottom:1em;"]);

function HeadingTooltip() {
  var t = useT();
  return /*#__PURE__*/_jsx(TooltipTrigger, {
    className: "encore-muted-accent-set",
    tooltip: /*#__PURE__*/_jsx(Tooltip, {
      children: t('artistprofile_fundraising_artistfundraisingpick_shared_title_2', 'Artist Fundraising Pick links fans to a fundraising destination of your choice.', 'Artist Fundraising Pick should be translated as it is in the consumer product. Refer to translation memory.')
    }),
    placement: "topLeft",
    tooltipId: "profile-artist-fundraising-pick-help",
    children: /*#__PURE__*/_jsx(ButtonIconMarginBottom, {
      children: /*#__PURE__*/_jsx(IconHelpAlt, {
        "aria-label": t('artistprofile_fundraising_artistfundraisingpick_shared_title_3', 'artist fundraising pick help', ''),
        focusable: false,
        iconSize: 24
      })
    })
  });
}