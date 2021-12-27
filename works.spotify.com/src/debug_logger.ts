import { LogLevel } from './enums/log_level';
import { DummyLogger } from './_internal/dummy_logger';
class ConsoleLogger {
    constructor(tag, description = '', predicate = () => false) {
        this._tagParts = [];
        this._tagText = '';
        this._enabled = true;
        this._level = LogLevel.NONE;
        this.tag = '';
        this.description = '';
        this._predicate = function () {
            return false;
        };
        this.tag = tag;
        this.description = description;
        this._predicate = predicate;
        this._tagParts = tag.split('.');
        this._tagText = `[${tag}]`;
    }
    _print(levelName, logLevel, args) {
        if (!this._enabled && !(this._level & logLevel)) {
            return;
        }
        const logObj = {
            args,
            type: levelName,
            tag: this.tag,
        };
        if (this._predicate(logObj)) {
            return;
        }
        /* eslint-disable-next-line no-console */
        console[levelName](this._tagText, ...args);
    }
    matchesTag(tag) {
        const _tag = Array.isArray(tag) ? tag : tag.split('.');
        const tagParts = this._tagParts;
        if (_tag.length > tagParts.length) {
            return false;
        }
        for (let i = 0, l = _tag.length; i < l; i++) {
            if (_tag[i] === '*' && tagParts[i]) {
                // matches anything
                continue;
            }
            if (_tag[i] !== tagParts[i]) {
                return false;
            }
        }
        return true;
    }
    setLevel(level) {
        let value = 0;
        switch (level) {
            case 'error':
                value = LogLevel.ERROR;
                break;
            case 'warn':
                value = LogLevel.WARN | LogLevel.ERROR;
                break;
            case 'info':
                value = LogLevel.INFO | LogLevel.WARN | LogLevel.ERROR;
                break;
            case 'debug':
                value = LogLevel.DEBUG | LogLevel.INFO | LogLevel.WARN | LogLevel.ERROR;
                break;
            case 'log':
            default:
                value =
                    LogLevel.LOG |
                        LogLevel.DEBUG |
                        LogLevel.INFO |
                        LogLevel.WARN |
                        LogLevel.ERROR;
                break;
        }
        this._level = value;
    }
    enable() {
        this._enabled = true;
    }
    disable() {
        this._enabled = false;
    }
    log(..._args) {
        this._print('log', LogLevel.LOG, _args);
    }
    debug(..._args) {
        this._print('debug', LogLevel.DEBUG, _args);
    }
    info(..._args) {
        this._print('info', LogLevel.INFO, _args);
    }
    warn(..._args) {
        this._print('warn', LogLevel.WARN, _args);
    }
    error(..._args) {
        this._print('error', LogLevel.ERROR, _args);
    }
}
export const DebugLogger = process.env.DEBUG === 'true' ? ConsoleLogger : DummyLogger;
//# sourceMappingURL=debug_logger.js.map