"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subpathIsPresent = void 0;

require("core-js/modules/es6.string.starts-with");

var _url = require("url");

var subpathIsPresent = function subpathIsPresent(url, subpath) {
  if (typeof url !== 'string' || typeof subpath !== 'string') {
    return false;
  }

  var _parseUrl = (0, _url.parse)(url),
      pathname = _parseUrl.pathname;

  return typeof pathname === 'string' && (pathname.length === subpath.length + 1 && pathname === "/".concat(subpath) || pathname.startsWith("/".concat(subpath, "/")));
};

exports.subpathIsPresent = subpathIsPresent;