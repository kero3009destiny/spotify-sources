"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subpathIsRequired = void 0;

var subpathIsRequired = function subpathIsRequired(config, language) {
  return typeof config.localeSubpaths[language] === 'string';
};

exports.subpathIsRequired = subpathIsRequired;