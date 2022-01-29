export class XHRHeaders {
    constructor(headerText) {
        this._headers = {};
        this._init(headerText);
    }
    _init(headerText) {
        if (headerText) {
            const headerPairs = headerText.split('\u000d\u000a');
            for (const headerPair of headerPairs) {
                // Can't use split() here because it does the wrong thing
                // if the header value has the string ": " in it.
                const index = headerPair.indexOf('\u003a\u0020');
                if (index > 0) {
                    const key = headerPair.substring(0, index).toLowerCase();
                    const val = headerPair.substring(index + 2);
                    this._headers[key] = val;
                }
            }
        }
    }
    get(key) {
        return this._headers[key.toLowerCase()] || null;
    }
    has(key) {
        return this._headers.hasOwnProperty(key.toLowerCase());
    }
}
//# sourceMappingURL=headers.js.map