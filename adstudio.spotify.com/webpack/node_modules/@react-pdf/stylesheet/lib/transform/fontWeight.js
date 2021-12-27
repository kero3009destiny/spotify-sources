"use strict";

exports.__esModule = true;
exports.default = void 0;
var FONT_WEIGHTS = {
  thin: 100,
  hairline: 100,
  ultralight: 200,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  demibold: 600,
  bold: 700,
  ultrabold: 800,
  extrabold: 800,
  heavy: 900,
  black: 900
};

var processFontWeight = function processFontWeight(value) {
  if (!value) return FONT_WEIGHTS.normal;
  if (typeof value === 'number') return value;
  var lv = value.toLowerCase();
  if (FONT_WEIGHTS[lv]) return FONT_WEIGHTS[lv];
  return value;
};

var _default = processFontWeight;
exports.default = _default;