"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCorrelationIdContext = void 0;
/**
 * A builder for CorrelationId
 *
 * @param correlationId - For Device events: unique id per App installation. For Browser events: users of the sending Javascript SDK can set this value: the recommendation is to use the Spotify cookie (sp_t), if available.
 * @return The formatted event data for CorrelationIdContext
 */
function createCorrelationIdContext(correlationId) {
    return function () {
        return {
            name: 'context_correlation_id',
            data: {
                value: correlationId,
            },
        };
    };
}
exports.createCorrelationIdContext = createCorrelationIdContext;
//# sourceMappingURL=correlationId.js.map