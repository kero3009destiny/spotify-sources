"use strict";
// NOTE: This code was generated and should not be changed
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRejectedClientEventNonAuth = void 0;
/**
 * A builder for RejectedClientEventNonAuth
 *
 * @param data - The event data
 * @return The formatted event data for RejectedClientEventNonAuthEvent
 */
function createRejectedClientEventNonAuth(data) {
    return {
        name: 'RejectedClientEventNonAuth',
        environments: ['browsernonauth', 'desktopnonauth', 'devicenonauth'],
        data: data,
    };
}
exports.createRejectedClientEventNonAuth = createRejectedClientEventNonAuth;
//# sourceMappingURL=createRejectedClientEventNonAuth.js.map