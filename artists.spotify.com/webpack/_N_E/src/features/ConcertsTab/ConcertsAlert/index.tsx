// ignore-string-externalization
import React from 'react';
import styled from 'styled-components';
import { spacer, cssColorValue } from '@spotify-internal/encore-web';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var Container = styled.div.withConfig({
  displayName: "ConcertsAlert__Container",
  componentId: "sc-1cw3tuw-0"
})(["background-color:var(--background-elevated-base);border:1px solid ", ";border-radius:4px;display:flex;flex-direction:column;left:50%;position:absolute;top:30%;transform:translate(-50%);width:330px;text-align:center;"], cssColorValue('backgroundPress'));
var Message = styled.div.withConfig({
  displayName: "ConcertsAlert__Message",
  componentId: "sc-1cw3tuw-1"
})(["padding:", " ", " 0;"], spacer.spacer16, spacer.spacer24);
var ConcertLink = styled.p.withConfig({
  displayName: "ConcertsAlert__ConcertLink",
  componentId: "sc-1cw3tuw-2"
})(["padding:0;"]);
/* eslint-disable-next-line import/no-default-export */

export default function ConcertsAlert(_ref) {
  var message = _ref.message,
      link = _ref.link;
  return /*#__PURE__*/_jsxs(Container, {
    children: [/*#__PURE__*/_jsx(Message, {
      children: message
    }), /*#__PURE__*/_jsx(ConcertLink, {
      children: link
    })]
  });
}
ConcertsAlert.defaultProps = {
  message: 'Yo!'
};