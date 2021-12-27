/**
 * An error originating from the Transport class.
 */
export class TransportError extends Error {
    constructor(code, message, origin = null) {
        super(message);
        this.name = 'TransportError';
        this.message = message;
        this.code = code;
        this.origin = origin;
    }
}
//# sourceMappingURL=transport.js.map