/**
 * An HTTP Response from Transport.
 *
 * @typeParam T - The type of the `body` field.
 */
export class HTTPResponse {
    /**
     * @param url - An optional URL for the response.
     * @param status - An optional status for the response;
     */
    constructor(url, status = 0) {
        /**
         * The resolved URL of the response.
         */
        this.url = '';
        /**
         * The status code of the response.
         */
        this.status = 0;
        /**
         * The response headers.
         *
         * This field is null unless the request was made with
         * `options.parseResponseHeaders` set to true.
         */
        this.headers = null;
        /**
         * The body of the response, or null if there is no body.
         *
         * The type of this field is dependent on the `options.responseType` value set
         * in the request. If the `responseType` is `'json'`, the type of this value
         * will also depend on whether the request was type-hinted.
         */
        this.body = null;
        /**
         * A flag that indicates whether the navigator was online when the request
         * response was sent.
         */
        this.offline = false;
        /**
         * A timers object for the response.
         */
        this.timing = null;
        /**
         * Data that was included in the request.
         */
        this.metadata = null;
        /**
         * The retries counter.
         */
        this.retries = {
            count: 0,
        };
        this.url = url;
        this.status = status;
        this.ok = status >= 200 && status <= 299;
    }
    /**
     * Return the status family of the status code.
     *
     * @returns The status family of the response.
     */
    getStatusFamily() {
        return 0 | (this.status / 100);
    }
}
//# sourceMappingURL=response.js.map