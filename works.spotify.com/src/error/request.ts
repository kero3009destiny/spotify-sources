/**
 * An error that was thrown during the process of making a request.
 */
export class RequestError extends Error {
    constructor(message, code, status) {
        super(message);
        this.name = 'RequestError';
        this.message = message;
        this.code = code;
        this.status = status || 0;
    }
}
//# sourceMappingURL=request.js.map