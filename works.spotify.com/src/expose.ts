export function expose(key, value) {
    if (process.env.DEBUG === 'true') {
        global[key] = value;
    }
}
//# sourceMappingURL=expose.js.map