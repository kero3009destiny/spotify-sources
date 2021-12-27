"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.silly = exports.verbose = exports.debug = exports.info = exports.warn = exports.error = exports.log = exports.logger = exports.default = void 0;
var logger_browser_1 = require("./logger.browser");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(logger_browser_1).default; } });
Object.defineProperty(exports, "logger", { enumerable: true, get: function () { return logger_browser_1.logger; } });
Object.defineProperty(exports, "log", { enumerable: true, get: function () { return logger_browser_1.log; } });
Object.defineProperty(exports, "error", { enumerable: true, get: function () { return logger_browser_1.error; } });
Object.defineProperty(exports, "warn", { enumerable: true, get: function () { return logger_browser_1.warn; } });
Object.defineProperty(exports, "info", { enumerable: true, get: function () { return logger_browser_1.info; } });
Object.defineProperty(exports, "debug", { enumerable: true, get: function () { return logger_browser_1.debug; } });
Object.defineProperty(exports, "verbose", { enumerable: true, get: function () { return logger_browser_1.verbose; } });
Object.defineProperty(exports, "silly", { enumerable: true, get: function () { return logger_browser_1.silly; } });
//# sourceMappingURL=index.browser.js.map