import { HTTPRequestHeaders } from './request_headers';
export class HTTPRequest {
    constructor(url, params) {
        this.url = url;
        this.method = (params === null || params === void 0 ? void 0 : params.method) || 'GET';
        this.headers = new HTTPRequestHeaders(params === null || params === void 0 ? void 0 : params.headers);
        this.options = (params === null || params === void 0 ? void 0 : params.options) || {};
        this.payload = params === null || params === void 0 ? void 0 : params.payload;
        this.urlExpanded = (params === null || params === void 0 ? void 0 : params.urlExpanded) || false;
        this.retryOptions = (params === null || params === void 0 ? void 0 : params.retryOptions) || {};
    }
    static create(url, params) {
        return new HTTPRequest(url, params);
    }
}
//# sourceMappingURL=request.js.map