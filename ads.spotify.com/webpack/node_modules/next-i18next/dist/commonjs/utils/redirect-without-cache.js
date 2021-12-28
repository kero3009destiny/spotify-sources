"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redirectWithoutCache = void 0;

var redirectWithoutCache = function redirectWithoutCache(res, redirectLocation) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  res.redirect(302, redirectLocation);
};

exports.redirectWithoutCache = redirectWithoutCache;