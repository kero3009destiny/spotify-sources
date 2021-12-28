"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeSubpath = void 0;

require("core-js/modules/es6.regexp.replace");

var removeSubpath = function removeSubpath(url, subpath) {
  return url.replace(subpath, '').replace(/(https?:\/\/)|(\/)+/g, "$1$2");
};

exports.removeSubpath = removeSubpath;