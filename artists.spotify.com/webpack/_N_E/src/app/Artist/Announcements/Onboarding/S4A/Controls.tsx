import _defineProperty from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import { ButtonPrimary, ButtonTertiary } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { useViewport, Viewport } from '../../../../../shared/lib/useViewport';
import { jsx as _jsx } from "react/jsx-runtime";
export function Controls(_ref) {
  var _ref$primaryAction = _ref.primaryAction,
      primaryAction = _ref$primaryAction === void 0 ? function () {} : _ref$primaryAction,
      viewport = _ref.viewport;
  var t = useT();
  var xs = viewport === Viewport.XS;
  var Btn = xs ? ButtonTertiary : ButtonPrimary;
  return /*#__PURE__*/_jsx("div", {
    children: /*#__PURE__*/_jsx(Btn, {
      condensed: xs,
      buttonSize: Btn.sm,
      color: "green",
      onClick: primaryAction,
      children: /*#__PURE__*/_jsx("span", {
        children: t('LETS_GO_BUTTON', "Let's Go", 'Button to move to the next step of the onboarding flow')
      })
    })
  });
}
export function S4AControls(props) {
  var viewport = useViewport();
  return /*#__PURE__*/_jsx(Controls, _objectSpread(_objectSpread({}, props), {}, {
    viewport: viewport
  }));
}