// ignore-string-externalization
import React from 'react';
import styled from 'styled-components';
import { Type, IconX, black, white, gray20 } from '@spotify-internal/encore-web-v3';
import { textOverflow } from '../../shared/styles/mixins/textOverflow';
import { buttonReset } from '../../shared/styles/mixins/buttons';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledWrapper = styled.div.withConfig({
  displayName: "ComparisonButton__StyledWrapper",
  componentId: "sc-7uk9mm-0"
})(["align-items:center;display:flex;justify-content:space-between;padding:18px 14px 16px;"]);
var StyledButton = styled.button.withConfig({
  displayName: "ComparisonButton__StyledButton",
  componentId: "sc-7uk9mm-1"
})(["", " background:", ";border-radius:3px;color:", ";margin-top:5px;max-width:290px;min-width:100px;transition:background 0.1s;&:hover,&:focus{background-color:", ";}&:active{background-color:", ";}&:not(:last-child){float:left;margin-right:5px;}"], buttonReset(), black, white, gray20, black);
var StyledButtonText = styled(Type).withConfig({
  displayName: "ComparisonButton__StyledButtonText",
  componentId: "sc-7uk9mm-2"
})(["", " margin-right:14px;line-height:1;"], textOverflow());
var StyledIconX = styled(IconX).withConfig({
  displayName: "ComparisonButton__StyledIconX",
  componentId: "sc-7uk9mm-3"
})(["flex-shrink:0;"]);
export function ComparisonButton(_ref) {
  var onClick = _ref.onClick,
      buttonText = _ref.buttonText;
  return /*#__PURE__*/_jsx(StyledButton, {
    "data-testid": "compared-item-".concat(buttonText),
    onClick: onClick,
    children: /*#__PURE__*/_jsxs(StyledWrapper, {
      children: [/*#__PURE__*/_jsx(StyledButtonText, {
        forwardedAs: "p",
        weight: Type.book,
        condensed: true,
        children: buttonText
      }), /*#__PURE__*/_jsx(StyledIconX, {
        "aria-label": "Close",
        iconSize: 16
      })]
    })
  });
}