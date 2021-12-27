"use strict";

exports.__esModule = true;
exports.default = void 0;
var flexDefaults = [1, 1, 0];

var expandFlex = function expandFlex(key, value) {
  var matches = ("" + value).split(' ');
  var flexGrow = matches[0] || flexDefaults[0];
  var flexShrink = matches[1] || flexDefaults[1];
  var flexBasis = matches[2] || flexDefaults[2];
  return {
    flexGrow: flexGrow,
    flexShrink: flexShrink,
    flexBasis: flexBasis
  };
};

var _default = expandFlex;
exports.default = _default;