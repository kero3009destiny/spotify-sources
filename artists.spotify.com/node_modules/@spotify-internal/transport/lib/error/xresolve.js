/**
 * An error thrown by the XResolve EndpointsProvider function.
 */
export class XResolveError extends Error {
    constructor(code, message, status = -1) {
        super(message);
        this.name = 'XResolveError';
        this.message = message;
        this.code = code;
        this.status = status;
    }
}
//# sourceMappingURL=xresolve.js.map