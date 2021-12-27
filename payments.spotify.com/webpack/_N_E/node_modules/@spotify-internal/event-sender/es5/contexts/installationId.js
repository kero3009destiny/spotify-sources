"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInstallationIdContext = void 0;
var hex_to_base64_1 = require("../_internal/hex_to_base64");
/**
 * A context creator for installationId.
 *
 * Note that the installation id needs to be sent to the server as a hex bytestring.
 *
 * @param installationId - The installationId to be attached to each event
 * @return  The function that attaches the installationId to every event
 */
function createInstallationIdContext(installationId) {
    var encoded = hex_to_base64_1.hexToBase64(installationId);
    return function () { return ({
        name: 'context_installation_id',
        data: { value: encoded },
    }); };
}
exports.createInstallationIdContext = createInstallationIdContext;
//# sourceMappingURL=installationId.js.map