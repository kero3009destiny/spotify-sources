import _defineProperty from "/var/jenkins_home/workspace/tingle.cd962a55-a742-407f-a437-251a69d63f52/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "/var/jenkins_home/workspace/tingle.cd962a55-a742-407f-a437-251a69d63f52/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["allData", "xAcc", "yAcc", "colorScale"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import React from 'react';
import PropTypes from 'prop-types';
import { PathPointMarker, PathPointLine } from '@spotify-internal/spoticharts';
import { jsx as _jsx } from "react/jsx-runtime";
export function TooltipMarker(_ref) {
  var allData = _ref.allData,
      xAcc = _ref.xAcc,
      yAcc = _ref.yAcc,
      colorScale = _ref.colorScale,
      rest = _objectWithoutProperties(_ref, _excluded);

  var LineArray = allData.map(function (d) {
    return /*#__PURE__*/_jsx(PathPointLine, _objectSpread({
      data: d.timeline,
      x: xAcc,
      y: yAcc
    }, rest), "line-".concat(d.countryCode));
  });
  var MarkerArray = allData.map(function (d) {
    return /*#__PURE__*/_jsx(PathPointMarker, _objectSpread({
      data: d.timeline,
      x: xAcc,
      y: yAcc,
      fill: colorScale(d.countryCode)
    }, rest), "marker-".concat(d.countryCode));
  });
  return LineArray.concat(MarkerArray);
}
TooltipMarker.propTypes = {
  allData: PropTypes.arrayOf(PropTypes.shape({
    countryCode: PropTypes.string,
    timeline: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.instanceOf(Date),
      num: PropTypes.number.isRequired
    })).isRequired
  })).isRequired,
  xAcc: PropTypes.func.isRequired,
  yAcc: PropTypes.func.isRequired,
  colorScale: PropTypes.func.isRequired
};