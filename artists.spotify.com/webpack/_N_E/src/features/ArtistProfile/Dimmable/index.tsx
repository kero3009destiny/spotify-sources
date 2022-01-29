import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
// ignore-string-externalization
import classNames from 'classnames';
import React from 'react';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var blockName = 'dimmable';
export var Dimmable = function Dimmable(_ref) {
  var children = _ref.children,
      active = _ref.active;
  return /*#__PURE__*/_jsxs("div", {
    "data-testid": "dimmable",
    className: classNames(styles[blockName], _defineProperty({}, styles["".concat(blockName, "--active")], active)),
    children: [active && /*#__PURE__*/_jsx("div", {
      "data-testid": "overlay",
      className: styles["".concat(blockName, "-overlay")]
    }), /*#__PURE__*/_jsx("div", {
      className: classNames(styles["".concat(blockName, "-children")], _defineProperty({}, styles["".concat(blockName, "-promoted")], active)),
      children: children
    })]
  });
};
Dimmable.defaultProp = {
  children: ''
};