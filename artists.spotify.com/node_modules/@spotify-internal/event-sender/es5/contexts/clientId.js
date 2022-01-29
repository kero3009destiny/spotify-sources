"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientIdContext = void 0;
var hex_to_base64_1 = require("../_internal/hex_to_base64");
/**
 * A context creator for clientId.
 *
 * Note that the client id needs to be sent to the server as a hex bytestring.
 *
 * @param clientId - The clientId to be attached to each event
 * @return  The function that attaches the clientId to every event
 */
function createClientIdContext(clientId) {
    var encoded = hex_to_base64_1.hexToBase64(clientId);
    return function () { return ({
        name: 'context_client_id',
        data: { value: encoded },
    }); };
}
exports.createClientIdContext = createClientIdContext;
//# sourceMappingURL=clientId.js.map