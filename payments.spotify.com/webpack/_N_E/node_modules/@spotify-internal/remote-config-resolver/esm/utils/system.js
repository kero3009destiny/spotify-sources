var LOCAL_STORAGE_CHECK_KEY = 'random-key-8bd1050edb44';
export function getCookie(key) {
    try {
        var cookies = " " + document.cookie + ";";
        var begin = cookies.indexOf(" " + key + "=");
        if (begin >= 0) {
            begin += key.length + 2;
            var end = cookies.indexOf(';', begin);
            return cookies.slice(begin, end);
        }
        else if (cookies.indexOf(" " + key + ";") >= 0) {
            return '';
        }
    }
    catch (e) {
        // ignore
    }
    return undefined;
}
export function getLocalStorage() {
    try {
        localStorage.setItem(LOCAL_STORAGE_CHECK_KEY, LOCAL_STORAGE_CHECK_KEY);
        if (localStorage.getItem(LOCAL_STORAGE_CHECK_KEY) !== LOCAL_STORAGE_CHECK_KEY) {
            return undefined;
        }
        localStorage.removeItem(LOCAL_STORAGE_CHECK_KEY);
        return localStorage;
    }
    catch (e) {
        // ignore
    }
    return undefined;
}
export function resolveTimeout(millis, weak) {
    if (weak === void 0) { weak = true; }
    return new Promise(function (resolve) {
        var ref = setTimeout(resolve, millis);
        // In node, don't keep event-loop alive
        if (weak && typeof ref === 'object' && typeof ref.unref === 'function') {
            try {
                ref.unref();
            }
            catch (e) {
                // ignore
            }
        }
    });
}
export function resolveOnLoad() {
    return new Promise(function (resolve) {
        try {
            if (document.readyState === 'complete') {
                resolve();
            }
            else {
                window.addEventListener('load', function () {
                    resolve();
                });
            }
        }
        catch (e) {
            resolve();
        }
    });
}
//# sourceMappingURL=system.js.map