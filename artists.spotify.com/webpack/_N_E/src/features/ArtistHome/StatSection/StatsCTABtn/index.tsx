// ignore-string-externalization
import React from 'react';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { CTABtnAsLink, CTABtnArrow } from '../../Style';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StatsCTABtn = /*#__PURE__*/React.memo(function (props) {
  return /*#__PURE__*/_jsxs(CTABtnAsLink, {
    to: props.url,
    onClick: function onClick() {
      return sendEvent({
        eventCategory: 'Navigate',
        eventAction: "".concat(props.action),
        eventLabel: "".concat(props.label)
      });
    },
    children: [props.title, /*#__PURE__*/_jsx(CTABtnArrow, {})]
  });
});
/* eslint-disable-next-line import/no-default-export */

export default StatsCTABtn;