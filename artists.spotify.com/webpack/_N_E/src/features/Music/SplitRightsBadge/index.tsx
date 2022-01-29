import React, { useState } from 'react';
import { TooltipTrigger, Tooltip, spacer24, gray45, gray10, gray85, gray90 } from '@spotify-internal/encore-web-v3';
import { useT } from '@mrkt/features/i18n';
import { isTouchDevice } from '../../../shared/lib/isTouchDevice';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function getBackgroundColor(props) {
  if (props.setBgColor) return props.setBgColor;
  if (props.isActive) return gray85;
  return gray90;
}

export var SplitRightsType;

(function (SplitRightsType) {
  SplitRightsType["RELEASE"] = "release";
  SplitRightsType["SONG"] = "song";
})(SplitRightsType || (SplitRightsType = {}));

export function SplitRightsIcon(_ref) {
  var isActive = _ref.isActive,
      setBgColor = _ref.setBgColor;
  var activeColor = isActive ? gray10 : gray45;
  var backgroundColor = getBackgroundColor({
    setBgColor: setBgColor,
    isActive: isActive
  });
  return /*#__PURE__*/_jsxs("svg", {
    "data-testid": "split-rights-icon",
    fill: "none",
    height: spacer24,
    viewBox: "0 0 ".concat(spacer24, " ").concat(spacer24),
    width: spacer24,
    xmlns: "http://www.w3.org/2000/svg",
    children: [/*#__PURE__*/_jsx("rect", {
      width: spacer24,
      height: spacer24,
      rx: "4",
      fill: backgroundColor
    }), /*#__PURE__*/_jsx("path", {
      d: "M9.5 4.36838C6.30607 5.41817 4 8.42478 4 11.97C4 15.5152 6.30607 18.5218 9.5 19.5716V17.9718C7.15105 16.9923 5.5 14.674 5.5 11.97C5.5 9.26605 7.15105 6.94772 9.5 5.96816V4.36838Z",
      fill: activeColor
    }), /*#__PURE__*/_jsx("path", {
      d: "M11 4L11.3024 4C11.5323 3.98014 11.7649 3.97 12 3.97C12.2351 3.97 12.4677 3.98014 12.6976 4L12.5 4L12.5 20H11L11 4Z",
      fill: activeColor
    }), /*#__PURE__*/_jsx("path", {
      d: "M18.5 11.97C18.5 14.862 16.6113 17.3129 14 18.1565V19.718C17.4505 18.8299 20 15.6977 20 11.97C20 8.24232 17.4505 5.11012 14 4.22204V5.7835C16.6113 6.62706 18.5 9.07796 18.5 11.97Z",
      fill: activeColor
    })]
  });
}
export function SplitRightsBadge(_ref2) {
  var _ref2$type = _ref2.type,
      type = _ref2$type === void 0 ? SplitRightsType.SONG : _ref2$type;

  var _useState = useState(false),
      show = _useState[0],
      toggleShow = _useState[1];

  var t = useT();
  return /*#__PURE__*/_jsx(TooltipTrigger, {
    overlay: show && /*#__PURE__*/_jsx(Tooltip, {
      children: type === SplitRightsType.RELEASE ? t('MUSIC_SPLIT_RIGHTS_BADGE_7525be', 'You have split rights to this release', '') : t('MUSIC_SPLIT_RIGHTS_BADGE_34d482', 'You have split rights to this song', '')
    }),
    onClick: function onClick(e) {
      e.stopPropagation();
    },
    onShow: function onShow() {
      toggleShow(true);
    },
    isTouch: isTouchDevice(),
    onHide: function onHide() {
      toggleShow(false);
    },
    placement: TooltipTrigger.left,
    children: /*#__PURE__*/_jsx(SplitRightsIcon, {
      isActive: show
    })
  });
}