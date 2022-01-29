import _defineProperty from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["head", "colgroup", "body", "className", "responsive", "bordered"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import classNames from 'classnames';
import React from 'react';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function Table(_ref) {
  var head = _ref.head,
      colgroup = _ref.colgroup,
      body = _ref.body,
      className = _ref.className,
      responsive = _ref.responsive,
      bordered = _ref.bordered,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/_jsx("div", {
    className: responsive ? styles.table_responsive : undefined,
    children: /*#__PURE__*/_jsxs("table", _objectSpread(_objectSpread({
      className: classNames(styles.table, className, bordered && styles.table__bordered)
    }, props), {}, {
      "data-testid": "table",
      children: [colgroup, head && /*#__PURE__*/_jsx("thead", {
        className: classNames(styles.table_head),
        children: head
      }), body && /*#__PURE__*/_jsx("tbody", {
        className: classNames(styles.table_body),
        children: body
      })]
    }))
  });
}