import _slicedToArray from "/var/jenkins_home/workspace/tingle.1d9bbf01-b030-4b00-bcd2-ebd3bbb0c725/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
import React, { Suspense } from 'react';
import { useSidePanel, setSidePanelOpening, showSidePanel } from '../../../../features/SidePanel';
import { Trigger } from './Trigger';
import { IconMore } from './IconMore';
import { Name } from './Name';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function FlyOutToggle(_ref) {
  var avatar = _ref.avatar,
      name = _ref.name,
      onShow = _ref.onShow;

  var _useSidePanel = useSidePanel(),
      _useSidePanel2 = _slicedToArray(_useSidePanel, 2),
      shouldShowSidePanel = _useSidePanel2[0].shouldShowSidePanel,
      sidePanelDispatch = _useSidePanel2[1];

  var openSidepanel = function openSidepanel(e) {
    e.preventDefault();
    sidePanelDispatch(showSidePanel());
    sidePanelDispatch(setSidePanelOpening(true));
    onShow === null || onShow === void 0 ? void 0 : onShow();
  };

  return /*#__PURE__*/_jsxs(Trigger, {
    "aria-controls": "side-panel-container",
    "aria-expanded": shouldShowSidePanel,
    onClick: openSidepanel,
    "data-testid": "navigation-flyout-toggle",
    children: [/*#__PURE__*/_jsx(IconMore, {}), /*#__PURE__*/_jsxs(Suspense, {
      fallback: null,
      children: [avatar, " ", /*#__PURE__*/_jsx(Name, {
        "data-slo-id": "active-artist",
        children: name
      })]
    })]
  });
}