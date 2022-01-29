export class HTTPRequestHeaders {
    constructor(init) {
        /**
         * The actual headers.
         */
        this._headers = {};
        /**
         * The number of headers present.
         */
        this._count = 0;
        this._setAll(init);
    }
    _setAll(init) {
        let count = 0;
        for (const key in init) {
            if (!init.hasOwnProperty(key) || !init[key]) {
                continue;
            }
            this._headers[key.toLowerCase()] = init[key];
            count++;
        }
        this._count = count;
    }
    get(name) {
        return this._headers[name.toLowerCase()] || null;
    }
    has(name) {
        return !!this._headers[name.toLowerCase()];
    }
    set(name, value) {
        this._headers[name.toLowerCase()] = value;
        this._count++;
    }
    delete(name) {
        const _name = name.toLowerCase();
        if (this._headers[_name]) {
            this._count--;
        }
        delete this._headers[name.toLowerCase()];
    }
    count() {
        return this._count;
    }
    toJSON() {
        return Object.assign({}, this._headers);
    }
}
//# sourceMappingURL=request_headers.js.map