"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.silly = exports.verbose = exports.debug = exports.info = exports.warn = exports.error = exports.log = exports.logger = void 0;
exports.logger = {
    log: (...args) => console.log(...args),
    error: (...args) => console.error(...args),
    warn: (...args) => console.warn(...args),
    info: (...args) => console.info(...args),
    debug: (...args) => console.debug(...args),
    verbose: (...args) => console.log('verbose:', ...args),
    silly: (...args) => console.log('silly:', ...args),
};
exports.default = exports.logger;
exports.log = exports.logger.log.bind(exports.logger);
exports.error = exports.logger.error.bind(exports.logger);
exports.warn = exports.logger.warn.bind(exports.logger);
exports.info = exports.logger.info.bind(exports.logger);
exports.debug = exports.logger.debug.bind(exports.logger);
exports.verbose = exports.logger.verbose.bind(exports.logger);
exports.silly = exports.logger.silly.bind(exports.logger);
//# sourceMappingURL=logger.browser.js.map