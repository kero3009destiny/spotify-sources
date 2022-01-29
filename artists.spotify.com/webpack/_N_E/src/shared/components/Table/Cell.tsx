import _defineProperty from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "highlight", "truncate", "alignRight", "numerical"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import classNames from 'classnames';
import React from 'react';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
export var TableCell = function TableCell(_ref) {
  var className = _ref.className,
      highlight = _ref.highlight,
      truncate = _ref.truncate,
      alignRight = _ref.alignRight,
      numerical = _ref.numerical,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/_jsx("td", _objectSpread({
    "data-testid": "tablecell",
    className: classNames(styles.table_cell, highlight && styles.table_cell__highlight, truncate && styles.table_cell__truncate, alignRight && styles.table_cell__align_right, numerical && styles.table_cell__numerical, className)
  }, props));
};