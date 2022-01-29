import { DebugLogger } from './debug_logger';
const GLOBAL_LOGGER_REGISTRY_KEY = '__dbgLoggerRegistry';
let globalRegistry = global[GLOBAL_LOGGER_REGISTRY_KEY];
if (!globalRegistry) {
    globalRegistry = {
        map: {},
        list: [],
        loggingPredicate: function () { },
    };
    if (Object.defineProperty) {
        Object.defineProperty(global, GLOBAL_LOGGER_REGISTRY_KEY, {
            value: globalRegistry,
        });
    }
    else {
        global[GLOBAL_LOGGER_REGISTRY_KEY] = globalRegistry;
    }
}
const loggerMap = globalRegistry.map;
const loggers = globalRegistry.list;
function _checkLog(logObj) {
    if (globalRegistry.loggingPredicate &&
        globalRegistry.loggingPredicate(logObj)) {
        return true;
    }
    return false;
}
let _level = 'log';
export function intercept(predicate) {
    if (typeof predicate !== 'function') {
        throw new TypeError('Logging.intercept requires a function predicate.');
    }
    globalRegistry.loggingPredicate = predicate;
}
export function unintercept() {
    globalRegistry.loggingPredicate = () => { };
}
export function list(asArray) {
    const keys = Object.keys(loggerMap)
        .filter((key) => loggerMap[key])
        .sort();
    if (asArray) {
        return keys.map((key) => {
            return {
                tag: key,
                description: loggerMap[key].description || 'No description.',
            };
        });
    }
    return keys.reduce((obj, key) => {
        obj[key] = loggerMap[key].description || 'No description';
        return obj;
    }, {});
}
export function enable(tag) {
    var _a;
    const tags = Array.isArray(tag) ? tag : [tag];
    let tagLen = tags.length;
    while (tagLen--) {
        const tagName = (_a = tags[tagLen]) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        let loggerLen = loggers.length;
        while (loggerLen--) {
            const logger = loggers[loggerLen];
            if (logger.matchesTag(tagName)) {
                logger.enable();
            }
        }
    }
}
export function disable(tag) {
    var _a;
    const tags = Array.isArray(tag) ? tag : [tag];
    let tagLen = tags.length;
    while (tagLen--) {
        const tagName = (_a = tags[tagLen]) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        let loggerLen = loggers.length;
        while (loggerLen--) {
            const logger = loggers[loggerLen];
            if (logger.matchesTag(tagName)) {
                logger.disable();
            }
        }
    }
}
export function setLevel(levelName) {
    _level = levelName;
    let loggerLen = loggers.length;
    while (loggerLen--) {
        const logger = loggers[loggerLen];
        if (logger) {
            logger.setLevel(levelName);
        }
    }
}
export function enableAll() {
    let l = loggers.length;
    while (l--) {
        if (!loggers[l]) {
            continue;
        }
        loggers[l].enable();
    }
}
export function disableAll() {
    let l = loggers.length;
    while (l--) {
        if (!loggers[l]) {
            continue;
        }
        loggers[l].disable();
    }
}
export function forTag(tag, descriptor) {
    let tagName;
    let description;
    if (typeof tag === 'string') {
        tagName = tag.toLowerCase();
        description = descriptor;
    }
    else {
        tagName = tag.tag;
        description = tag.description;
    }
    if (loggerMap.hasOwnProperty(tagName) && loggerMap[tagName]) {
        return loggerMap[tagName];
    }
    const logger = new DebugLogger(tagName, description, _checkLog);
    logger.setLevel(_level);
    loggerMap[tagName] = logger;
    loggers.push(logger);
    return logger;
}
export function remove(tag) {
    const tagName = tag.toLowerCase();
    if (!loggerMap.hasOwnProperty(tagName) || !loggerMap[tagName]) {
        return;
    }
    const logger = loggerMap[tagName];
    loggerMap[tagName] = null;
    const index = loggers.indexOf(logger);
    if (index !== -1) {
        loggers.splice(index, 1);
    }
    return;
}
//# sourceMappingURL=logging.js.map