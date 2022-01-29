// ignore-string-externalization
import React from 'react';
import styled from 'styled-components';
import { Banner, screenSmMin, spacer24, spacer32 } from '@spotify-internal/encore-web';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledBannerContainer = styled.div.withConfig({
  displayName: "PageAlert__StyledBannerContainer",
  componentId: "sc-1asdwuy-0"
})(["margin-left:-", ";margin-right:-", ";@media (min-width:", "){margin-left:-", ";margin-right:-", ";}"], spacer24, spacer24, screenSmMin, spacer32, spacer32);
export var PageAlert = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var type = _ref.type,
      title = _ref.title,
      subtitle = _ref.subtitle,
      onDismiss = _ref.onDismiss;
  return /*#__PURE__*/_jsx(StyledBannerContainer, {
    "data-testid": "page-alert",
    ref: ref,
    children: /*#__PURE__*/_jsx(Banner, {
      variant: type,
      onClose: onDismiss,
      children: /*#__PURE__*/_jsxs("span", {
        children: [/*#__PURE__*/_jsx("strong", {
          children: title
        }), subtitle && ' ', subtitle]
      })
    })
  });
});