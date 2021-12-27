import { DealerErrors } from './typedefs';
export class DealerError extends Error {
    /**
     * Represents a dealer error.
     *
     * @param code - The error code.
     * @param message - The error message.
     * @param event - Remote event from dealer.
     */
    constructor(code = DealerErrors.DEALER_ERROR, message, event = {}) {
        super(message);
        this.name = 'DealerError';
        this.message = message;
        this.code = code;
        this.raw = event;
        this.wsCode = event.code || null;
        this.wsReason = event.reason || null;
    }
}
//# sourceMappingURL=error.js.map