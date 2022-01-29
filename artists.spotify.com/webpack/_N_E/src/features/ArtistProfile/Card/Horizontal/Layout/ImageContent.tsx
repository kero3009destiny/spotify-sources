// ignore-string-externalization
import React from 'react';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
export function ImageContent(_ref) {
  var children = _ref.children,
      className = _ref.className;
  return /*#__PURE__*/_jsx("div", {
    className: "".concat(styles['layout_card-left'], " ").concat(className),
    "data-testid": "image-content",
    children: children
  });
}
ImageContent.defaultProps = {
  children: '',
  className: ''
};