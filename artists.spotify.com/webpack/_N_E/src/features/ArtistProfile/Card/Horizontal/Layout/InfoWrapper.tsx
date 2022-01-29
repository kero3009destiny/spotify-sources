// ignore-string-externalization
import React from 'react';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
export function InfoWrapper(_ref) {
  var children = _ref.children,
      className = _ref.className,
      isSearch = _ref.isSearch;

  var getClassName = function getClassName() {
    var classNameString = isSearch ? styles['layout_card-right--no-mobile-padding'] : styles['layout_card-right'];

    if (className) {
      classNameString += " ".concat(className);
    }

    return classNameString;
  };

  return /*#__PURE__*/_jsx("div", {
    className: getClassName(),
    "data-testid": "info-wrapper",
    children: children
  });
}
InfoWrapper.defaultProps = {
  children: '',
  className: ''
};