// ignore-string-externalization
import React from 'react';
import { IconPlaylist } from '@spotify-internal/encore-web';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
var blockName = 'media';
export var MediaIcon = function MediaIcon(_ref) {
  var icon = _ref.icon;
  return /*#__PURE__*/_jsx("div", {
    className: styles[blockName],
    "data-testid": "media-icon",
    children: /*#__PURE__*/_jsx("span", {
      className: styles["".concat(blockName, "-icon")],
      children: icon
    })
  });
};
MediaIcon.defaultProps = {
  icon: /*#__PURE__*/_jsx(IconPlaylist, {
    "aria-hidden": true,
    focusable: false,
    iconSize: 32
  })
};