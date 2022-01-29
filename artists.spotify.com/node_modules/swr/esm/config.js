import deepEqual from 'fast-deep-equal';
import isDocumentVisible from './libs/is-document-visible';
import isOnline from './libs/is-online';
import Cache from './cache';
// cache
var cache = new Cache();
// state managers
var CONCURRENT_PROMISES = {};
var CONCURRENT_PROMISES_TS = {};
var FOCUS_REVALIDATORS = {};
var CACHE_REVALIDATORS = {};
var MUTATION_TS = {};
// error retry
function onErrorRetry(_, __, config, revalidate, opts) {
    if (!isDocumentVisible()) {
        // if it's hidden, stop
        // it will auto revalidate when focus
        return;
    }
    if (config.errorRetryCount && opts.retryCount > config.errorRetryCount) {
        return;
    }
    // exponential backoff
    var count = Math.min(opts.retryCount || 0, 8);
    var timeout = ~~((Math.random() + 0.5) * (1 << count)) * config.errorRetryInterval;
    setTimeout(revalidate, timeout, opts);
}
// client side: need to adjust the config
// based on the browser status
// slow connection (<= 70Kbps)
var slowConnection = typeof window !== 'undefined' &&
    navigator['connection'] &&
    ['slow-2g', '2g'].indexOf(navigator['connection'].effectiveType) !== -1;
// config
var defaultConfig = {
    // events
    onLoadingSlow: function () { },
    onSuccess: function () { },
    onError: function () { },
    onErrorRetry: onErrorRetry,
    errorRetryInterval: (slowConnection ? 10 : 5) * 1000,
    focusThrottleInterval: 5 * 1000,
    dedupingInterval: 2 * 1000,
    loadingTimeout: (slowConnection ? 5 : 3) * 1000,
    refreshInterval: 0,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    shouldRetryOnError: true,
    suspense: false,
    compare: deepEqual
};
// Focus revalidate
var eventsBinded = false;
if (typeof window !== 'undefined' && window.addEventListener && !eventsBinded) {
    var revalidate = function () {
        if (!isDocumentVisible() || !isOnline())
            return;
        for (var key in FOCUS_REVALIDATORS) {
            if (FOCUS_REVALIDATORS[key][0])
                FOCUS_REVALIDATORS[key][0]();
        }
    };
    window.addEventListener('visibilitychange', revalidate, false);
    window.addEventListener('focus', revalidate, false);
    // only bind the events once
    eventsBinded = true;
}
export { CONCURRENT_PROMISES, CONCURRENT_PROMISES_TS, FOCUS_REVALIDATORS, CACHE_REVALIDATORS, MUTATION_TS, cache };
export default defaultConfig;
