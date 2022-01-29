// ignore-string-externalization
import React from 'react';
import styled from 'styled-components';
import { IconPlus, TextLink, Type, gray15, gray70, white } from '@spotify-internal/encore-web';
import { HSpacer16 } from './Spacer';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var OuterRect = styled.div.withConfig({
  displayName: "AddToProfile__OuterRect",
  componentId: "sc-9ya1km-0"
})(["display:flex;align-items:center;pointer-events:", ";opacity:", ";&:hover{background-color:", ";}"], function (props) {
  return props.disabled ? 'none' : null;
}, function (props) {
  return props.disabled ? 0.6 : 1;
}, gray15);
var Text = styled(Type).attrs({
  as: 'p'
}).withConfig({
  displayName: "AddToProfile__Text",
  componentId: "sc-9ya1km-1"
})(["color:", ";padding:0;"], white);
export function AddToProfile(props) {
  var textElement = /*#__PURE__*/_jsx(Text, {
    children: props.text
  });

  if (props.textHref) {
    textElement = /*#__PURE__*/_jsx(TextLink, {
      href: props.textHref,
      style: {
        textDecoration: 'none'
      },
      children: textElement
    });
  }

  return /*#__PURE__*/_jsxs(OuterRect, {
    "data-testid": props.dataTestId,
    disabled: props.disabled,
    onClick: props.onClick,
    role: "button",
    children: [/*#__PURE__*/_jsx(PlusBox, {}), /*#__PURE__*/_jsx(HSpacer16, {}), textElement, /*#__PURE__*/_jsx(HSpacer16, {})]
  });
}
var OutlinedBox = styled.div.withConfig({
  displayName: "AddToProfile__OutlinedBox",
  componentId: "sc-9ya1km-2"
})(["min-height:96px;min-width:96px;border:1px solid ", ";box-sizing:border-box;display:flex;justify-content:center;align-items:center;"], gray70);

function PlusBox() {
  return /*#__PURE__*/_jsx(OutlinedBox, {
    children: /*#__PURE__*/_jsx(IconPlus, {
      "aria-hidden": true,
      focusable: false,
      iconSize: 24
    })
  });
}