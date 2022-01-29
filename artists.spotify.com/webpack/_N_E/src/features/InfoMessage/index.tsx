// ignore-string-externalization
import React from 'react';
import styled from 'styled-components';
import { announcement, gray95, IconArrowTopRight, IconTrending, kleinBlue, spacer4, spacer12, spacer16, spacer24, spacer48, Type, TextLink, white } from '@spotify-internal/encore-web-v3';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var Wrapper = styled.div.withConfig({
  displayName: "InfoMessage__Wrapper",
  componentId: "sc-1vomk6r-0"
})(["background-color:", ";margin:0 ", ";display:flex;flex-direction:column;justify-content:center;align-items:center;padding:", " 0;"], gray95, spacer24, spacer48);
var StyledTextLink = styled(TextLink).withConfig({
  displayName: "InfoMessage__StyledTextLink",
  componentId: "sc-1vomk6r-1"
})(["margin-top:", ";color:", ";"], spacer24, kleinBlue);
var iconStyles = "\n  border-radius: 50%;\n  padding: ".concat(spacer12, ";\n  margin-bottom: ").concat(spacer16, ";\n");
var BlueIconTrending = styled(IconTrending).withConfig({
  displayName: "InfoMessage__BlueIconTrending",
  componentId: "sc-1vomk6r-2"
})(["background-color:", ";", ";"], announcement, iconStyles);
var presetIcons = {
  blueIconTrending: /*#__PURE__*/_jsx(BlueIconTrending, {
    color: white,
    iconSize: 48
  })
};
export var InfoMessage = function InfoMessage(_ref) {
  var title = _ref.title,
      text = _ref.text,
      icon = _ref.icon,
      link = _ref.link;
  return /*#__PURE__*/_jsxs(Wrapper, {
    children: [presetIcons[icon], /*#__PURE__*/_jsx(Type, {
      as: "h1",
      variant: Type.heading3,
      children: title
    }), /*#__PURE__*/_jsx(Type, {
      children: text
    }), link && /*#__PURE__*/_jsxs(StyledTextLink, {
      href: link.url,
      target: "blank",
      children: [link.text, /*#__PURE__*/_jsx(IconArrowTopRight, {
        iconSize: 16,
        style: {
          marginLeft: spacer4
        }
      })]
    })]
  });
};