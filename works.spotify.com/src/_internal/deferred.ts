const hasWindow = typeof window !== 'undefined';
const deferreds = [];
function executeDeferreds() {
    const fns = deferreds.splice(0);
    if (!fns.length) {
        return;
    }
    for (let i = 0, l = fns.length; i < l; i++) {
        try {
            fns[i]();
        }
        finally {
            // Do nothing.
        }
    }
}
let send;
function bindSendDom() {
    const origin = window.location.origin ||
        `${window.location.protocol}//${window.location.hostname}`;
    send = window.postMessage.bind(window, '@execute_deferreds', origin);
    if (!window.__hasDeferredHandler) {
        if (typeof Object.defineProperty === 'function') {
            Object.defineProperty(window, '__hasDeferredHandler', { value: true });
        }
        else {
            window.__hasDeferredHandler = true;
        }
        const handler = function (e) {
            if (e.origin !== origin && e.data !== '@execute_deferreds') {
                return;
            }
            executeDeferreds();
        };
        if (window.addEventListener) {
            window.addEventListener('message', handler);
        }
        else if (window.attachEvent) {
            window.attachEvent('onmessage', handler);
        }
    }
}
function bindQueueMicroTask() {
    send = queueMicrotask.bind(null, executeDeferreds);
}
function bindSendImmediate() {
    send = setImmediate.bind(null, executeDeferreds);
}
function bindSendTimeout() {
    send = setTimeout.bind(null, executeDeferreds, 10);
}
function bindSendAuto() {
    if (hasWindow && typeof window.postMessage === 'function') {
        bindSendDom();
    }
    else if (typeof queueMicrotask === 'function') {
        bindQueueMicroTask();
    }
    else if (typeof setImmediate === 'function') {
        bindSendImmediate();
    }
    else {
        bindSendTimeout();
    }
}
bindSendAuto();
let defer = (fn) => {
    const trigger = !deferreds.length;
    deferreds.push(fn);
    if (trigger) {
        send();
    }
};
if (hasWindow) {
    if (typeof window.__modDefFn === 'function') {
        defer = window.__modDefFn;
    }
    else if (typeof Object.defineProperty === 'function') {
        Object.defineProperty(window, '__modDefFn', { value: defer });
    }
    else {
        window.__modDefFn = defer;
    }
}
export { defer };
//# sourceMappingURL=deferred.js.map