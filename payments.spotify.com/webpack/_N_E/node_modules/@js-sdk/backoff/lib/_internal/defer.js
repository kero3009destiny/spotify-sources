export function defer() {
    let resolve = () => { };
    let reject = () => { };
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    return {
        promise: promise,
        resolve: resolve,
        reject: reject,
    };
}
//# sourceMappingURL=defer.js.map