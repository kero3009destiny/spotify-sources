import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "onClick", "testIdPrefix"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import React from 'react';
import { ButtonIcon, IconEdit } from '@spotify-internal/encore-web';
import { jsx as _jsx } from "react/jsx-runtime";
export var PencilButton = function PencilButton(_ref) {
  var className = _ref.className,
      onClick = _ref.onClick,
      testIdPrefix = _ref.testIdPrefix,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/_jsx(ButtonIcon, _objectSpread(_objectSpread({
    className: className,
    "data-testid": "".concat(testIdPrefix || '', "edit-button"),
    onClick: onClick
  }, props), {}, {
    children: /*#__PURE__*/_jsx(IconEdit, {
      "aria-hidden": true,
      focusable: false
    })
  }));
};