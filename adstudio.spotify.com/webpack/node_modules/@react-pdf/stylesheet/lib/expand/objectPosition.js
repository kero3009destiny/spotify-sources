"use strict";

exports.__esModule = true;
exports.default = void 0;

var expandObjectPosition = function expandObjectPosition(key, value) {
  var match = ("" + value).split(' ');
  return {
    objectPositionX: (match === null || match === void 0 ? void 0 : match[0]) || value,
    objectPositionY: (match === null || match === void 0 ? void 0 : match[1]) || value
  };
};

var _default = expandObjectPosition;
exports.default = _default;