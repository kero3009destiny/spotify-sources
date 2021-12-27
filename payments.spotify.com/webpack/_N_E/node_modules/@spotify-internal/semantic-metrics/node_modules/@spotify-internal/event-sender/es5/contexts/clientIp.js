"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientIpContext = void 0;
/**
 * A builder for ClientIp
 * ClientIp is optional in Browser and Device env.
 *
 * @param clientIp - The ip address of the connection that sent the event from client to Spotify Backend.
 * @return The formatted event data for ClientIpContext
 */
function createClientIpContext(clientIp) {
    return function () {
        return {
            name: 'context_client_ip',
            data: {
                value: clientIp,
            },
        };
    };
}
exports.createClientIpContext = createClientIpContext;
//# sourceMappingURL=clientIp.js.map