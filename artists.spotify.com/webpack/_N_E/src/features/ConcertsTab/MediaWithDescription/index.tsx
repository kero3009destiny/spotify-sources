// ignore-string-externalization
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var Wrapper = styled.div.withConfig({
  displayName: "MediaWithDescription__Wrapper",
  componentId: "hz8xmw-0"
})(["align-items:center;display:flex;"]);
var Media = styled.div.withConfig({
  displayName: "MediaWithDescription__Media",
  componentId: "hz8xmw-1"
})(["margin-right:12px;"]);
var Description = styled.div.withConfig({
  displayName: "MediaWithDescription__Description",
  componentId: "hz8xmw-2"
})(["flex-grow:1;overflow:hidden;"]);
/* eslint-disable-next-line import/no-default-export */

export default function MediaWithDescription(_ref) {
  var media = _ref.media,
      description = _ref.description,
      className = _ref.className;
  return /*#__PURE__*/_jsxs(Wrapper, {
    className: className,
    children: [/*#__PURE__*/_jsx(Media, {
      children: media
    }), /*#__PURE__*/_jsx(Description, {
      children: description
    })]
  });
}