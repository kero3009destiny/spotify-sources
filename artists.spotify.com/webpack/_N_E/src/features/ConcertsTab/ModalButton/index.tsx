import _defineProperty from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["children", "primary"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import React from 'react';
import { ButtonPrimary, ButtonTertiary } from '@spotify-internal/encore-web';
import { useViewport, Viewport } from '../../../shared/lib/useViewport';
import { jsx as _jsx } from "react/jsx-runtime";
export var ModalButton = function ModalButton(props) {
  var viewport = useViewport();

  var children = props.children,
      primary = props.primary,
      otherProps = _objectWithoutProperties(props, _excluded);

  var outProps = {};
  var Btn = ButtonPrimary;

  if (primary) {
    outProps.color = 'green';
  } else {
    Btn = ButtonTertiary;
    outProps.condensed = true;
  }

  if (viewport === Viewport.XS) {
    Btn = ButtonTertiary;
    outProps.condensed = true;
  }

  var btnProps = _objectSpread(_objectSpread({}, otherProps), outProps);

  return /*#__PURE__*/_jsx(Btn, _objectSpread(_objectSpread({
    buttonSize: Btn.sm
  }, btnProps), {}, {
    children: children
  }));
};