"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.for-each");

var _detectNode = _interopRequireDefault(require("detect-node"));

var _i18next = _interopRequireDefault(require("i18next"));

var _cjs = _interopRequireDefault(require("i18next-http-backend/cjs"));

var _i18nextBrowserLanguagedetector = _interopRequireDefault(require("i18next-browser-languagedetector"));

var _default = function _default(config) {
  var initPromise;

  if (!_i18next["default"].isInitialized) {
    if (_detectNode["default"]) {
      var i18nextFSBackend = eval("require('i18next-fs-backend/cjs')");
      var i18nextMiddleware = eval("require('i18next-http-middleware/cjs')");

      _i18next["default"].use(i18nextFSBackend);

      if (config.serverLanguageDetection) {
        var serverDetectors = new i18nextMiddleware.LanguageDetector();
        config.customDetectors.forEach(function (detector) {
          return serverDetectors.addDetector(detector);
        });

        _i18next["default"].use(serverDetectors);
      }
    } else {
      _i18next["default"].use(_cjs["default"]);

      if (config.browserLanguageDetection) {
        var browserDetectors = new _i18nextBrowserLanguagedetector["default"]();
        config.customDetectors.forEach(function (detector) {
          return browserDetectors.addDetector(detector);
        });

        _i18next["default"].use(browserDetectors);
      }
    }

    config.use.forEach(function (x) {
      return _i18next["default"].use(x);
    });
    initPromise = _i18next["default"].init(config);
  }

  return {
    i18n: _i18next["default"],
    initPromise: initPromise
  };
};

exports["default"] = _default;