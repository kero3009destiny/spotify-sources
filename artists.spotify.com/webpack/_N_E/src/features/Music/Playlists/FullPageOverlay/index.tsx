// ignore-string-externalization
import React from 'react';
import styled from 'styled-components';
import { IconX, spacer16, spacer24, white } from '@spotify-internal/encore-web-v3';
import { buttonReset } from '../../../../shared/styles/mixins/buttons';
import { zIndexPopover } from '../../../../shared/styles/variables';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledOverlay = styled.div.withConfig({
  displayName: "FullPageOverlay__StyledOverlay",
  componentId: "sc-1d2t5dd-0"
})(["background:", ";height:100%;left:0;max-width:none;position:fixed;top:0;width:100%;z-index:", ";"], white, zIndexPopover);
var StyledInner = styled.div.withConfig({
  displayName: "FullPageOverlay__StyledInner",
  componentId: "sc-1d2t5dd-1"
})(["height:100%;overflow:auto;padding:", ";position:relative;"], spacer24);
var StyledBtnClose = styled.button.withConfig({
  displayName: "FullPageOverlay__StyledBtnClose",
  componentId: "sc-1d2t5dd-2"
})(["", ";position:absolute;right:", ";top:", ";"], buttonReset(), spacer16, spacer16);
/* eslint-disable-next-line import/no-default-export */

export default function FullPageOverlay(_ref) {
  var body = _ref.body,
      header = _ref.header,
      footer = _ref.footer,
      onClose = _ref.onClose;
  return /*#__PURE__*/_jsx(StyledOverlay, {
    "data-testid": "full-page-overlay",
    children: /*#__PURE__*/_jsxs(StyledInner, {
      children: [header && /*#__PURE__*/_jsx("header", {
        children: header
      }), body && /*#__PURE__*/_jsx("div", {
        children: body
      }), footer && /*#__PURE__*/_jsx("footer", {
        children: footer
      }), /*#__PURE__*/_jsx(StyledBtnClose, {
        type: "button",
        onClick: onClose,
        children: /*#__PURE__*/_jsx(IconX, {
          "aria-hidden": "true"
        })
      })]
    })
  });
}