/**
 * Creates a new PromiseResolver.
 *
 * @returns A new PromiseResolver instance.
 */
export function createPromiseResolver() {
    let resolve;
    let reject;
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
//# sourceMappingURL=promise_resolver.js.map