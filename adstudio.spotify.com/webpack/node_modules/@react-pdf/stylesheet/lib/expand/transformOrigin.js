"use strict";

exports.__esModule = true;
exports.default = void 0;
var Y_AXIS_SHORTHANDS = {
  top: true,
  bottom: true
};

var sortTransformOriginPair = function sortTransformOriginPair(a, b) {
  if (Y_AXIS_SHORTHANDS[a]) return 1;
  if (Y_AXIS_SHORTHANDS[b]) return -1;
  return 0;
};

var getTransformOriginPair = function getTransformOriginPair(values) {
  if (!values || values.length === 0) return ['center', 'center'];
  var pair = values.length === 1 ? [values[0], 'center'] : values;
  return pair.sort(sortTransformOriginPair);
}; // Transforms shorthand transformOrigin values


var expandTransformOrigin = function expandTransformOrigin(key, value) {
  var match = ("" + value).split(' ');
  var pair = getTransformOriginPair(match);
  return {
    transformOriginX: pair[0],
    transformOriginY: pair[1]
  };
};

var _default = expandTransformOrigin;
exports.default = _default;