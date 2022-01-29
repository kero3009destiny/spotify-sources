// ignore-string-externalization
import React, { forwardRef } from 'react';
import { Wrapper } from './Wrapper';
import { jsx as _jsx } from "react/jsx-runtime";
export var Header = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var children = _ref.children;
  return /*#__PURE__*/_jsx(Wrapper, {
    ref: ref,
    "data-testid": "header",
    children: children
  });
});
export * from './variables';
export { FlyOutToggle } from './FlyOutToggle';