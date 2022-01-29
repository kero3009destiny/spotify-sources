// ignore-string-externalization
import React from 'react';
import styled from 'styled-components';
import { cssColorValue, white, brightRed100 } from '@spotify-internal/encore-web';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function getWrapperSize(size) {
  switch (size) {
    case 'sm':
      return 48;

    case 'ap':
      return 55;

    case 'apCompact':
      return 80;

    case 'lg':
      return 96;

    case 'md':
    default:
      return 64;
  }
}

var Wrapper = styled.div.withConfig({
  displayName: "CalendarIcon__Wrapper",
  componentId: "um5kv6-0"
})(["height:", "px;width:", "px;text-align:center;min-width:", ";flex-shrink:", ";flex-shrink:", ";flex-shrink:0;"], function (props) {
  return getWrapperSize(props.size);
}, function (props) {
  return getWrapperSize(props.size);
}, function (props) {
  return props.size === 'sm' ? '48px' : null;
}, function (props) {
  return props.size === 'apCompact' ? 0 : null;
}, function (props) {
  return props.size === 'ap' ? 0 : null;
});
var Month = styled.div.withConfig({
  displayName: "CalendarIcon__Month",
  componentId: "um5kv6-1"
})(["align-items:center;color:", ";display:flex;justify-content:center;text-transform:uppercase;font-weight:bold;font-size:", ";height:", ";font-size:", ";height:", ";font-size:", ";height:", ";font-size:", ";height:", ";font-size:", ";height:", ";background-color:", ";"], white, function (props) {
  return props.size === 'sm' ? '11px' : null;
}, function (props) {
  return props.size === 'sm' ? '16px' : null;
}, function (props) {
  return props.size === 'md' ? '14px' : null;
}, function (props) {
  return props.size === 'md' ? '21px' : null;
}, function (props) {
  return props.size === 'lg' ? '22px' : null;
}, function (props) {
  return props.size === 'lg' ? '32px' : null;
}, function (props) {
  return props.size === 'ap' ? '9px' : null;
}, function (props) {
  return props.size === 'ap' ? '18px' : null;
}, function (props) {
  return props.size === 'apCompact' ? '13px' : null;
}, function (props) {
  return props.size === 'apCompact' ? '26px' : null;
}, function (props) {
  return props.inactive ? cssColorValue('backgroundPress') : brightRed100;
});
var Day = styled.div.withConfig({
  displayName: "CalendarIcon__Day",
  componentId: "um5kv6-2"
})(["align-items:center;background-color:", ";border:1px solid ", ";border-top:default;display:flex;justify-content:center;font-weight:bold;font-size:", ";height:", ";font-size:", ";height:", ";font-size:", ";height:", ";font-size:", ";height:", ";font-size:", ";height:", ";color:", ";"], white, cssColorValue('decorativeSubdued'), function (props) {
  return props.size === 'sm' ? '22px' : null;
}, function (props) {
  return props.size === 'sm' ? '32px' : null;
}, function (props) {
  return props.size === 'md' ? '29px' : null;
}, function (props) {
  return props.size === 'md' ? '42px' : null;
}, function (props) {
  return props.size === 'lg' ? '44px' : null;
}, function (props) {
  return props.size === 'lg' ? '64px' : null;
}, function (props) {
  return props.size === 'ap' ? '21px' : null;
}, function (props) {
  return props.size === 'ap' ? '37px' : null;
}, function (props) {
  return props.size === 'apCompact' ? '30px' : null;
}, function (props) {
  return props.size === 'apCompact' ? '54px' : null;
}, function (props) {
  return props.inactive ? cssColorValue('backgroundPress') : '#282828';
});
/* eslint-disable-next-line import/no-default-export */

export default function CalendarIcon(_ref) {
  var size = _ref.size,
      month = _ref.month,
      day = _ref.day,
      variant = _ref.variant;
  return (
    /*#__PURE__*/
    // @ts-ignore
    _jsxs(Wrapper, {
      "data-testid": "ci-".concat(size),
      children: [/*#__PURE__*/_jsx(Month, {
        size: size,
        variant: variant,
        children: month
      }), /*#__PURE__*/_jsx(Day, {
        size: size,
        variant: variant,
        children: day
      })]
    })
  );
}
CalendarIcon.defaultProps = {
  size: 'md',
  variant: 'default'
};