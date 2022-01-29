// ignore-string-externalization
import React from 'react';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
export function CardHorizontal(_ref) {
  var children = _ref.children,
      className = _ref.className;
  return /*#__PURE__*/_jsx("aside", {
    className: "".concat(styles.layout_card, " ").concat(className),
    "data-testid": "card-horizontal",
    children: children
  });
}
CardHorizontal.defaultProps = {
  children: '',
  className: ''
};