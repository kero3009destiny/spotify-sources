export class FetchHeaders {
    constructor(fetchHeaders) {
        this.get = fetchHeaders.get.bind(fetchHeaders);
        this.has = fetchHeaders.has.bind(fetchHeaders);
    }
    get(_) {
        return null;
    }
    has(_) {
        return false;
    }
}
//# sourceMappingURL=headers.js.map