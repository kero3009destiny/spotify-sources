"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isServer = void 0;

var _detectNode = _interopRequireDefault(require("detect-node"));

var isServer = function isServer() {
  return _detectNode["default"] && typeof window === 'undefined';
};

exports.isServer = isServer;