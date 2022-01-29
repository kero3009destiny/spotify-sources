"use strict";
// NOTE: This code was generated and should not be changed
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSemanticMetricClient = void 0;
/**
 * A builder for SemanticMetricClient
 *
 * @param data - The event data
 * @return The formatted event data for SemanticMetricClientEvent
 */
function createSemanticMetricClient(data) {
    return {
        name: 'SemanticMetricClient',
        environments: ['browser', 'device'],
        data: data,
    };
}
exports.createSemanticMetricClient = createSemanticMetricClient;
//# sourceMappingURL=createSemanticMetricClient.js.map