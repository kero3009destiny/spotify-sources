export function logDeveloperWarning() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn.apply(console, args);
    }
}
export function swallowException(e) {
    logDeveloperWarning('Caught exception that would have been swallowed in production:', e);
    // TODO Also send to sentry
}
//# sourceMappingURL=logging.js.map