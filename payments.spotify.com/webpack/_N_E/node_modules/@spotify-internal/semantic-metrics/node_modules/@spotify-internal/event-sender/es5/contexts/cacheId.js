"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCacheIdContext = void 0;
var hex_to_base64_1 = require("../_internal/hex_to_base64");
/**
 * A builder for CacheId
 *
 * @param cacheId - The cacheId to be attached to each evend
 * @return The function that attaches the cacheId to every event
 */
function createCacheIdContext(cacheId) {
    var encoded = hex_to_base64_1.hexToBase64(cacheId);
    return function () { return ({
        name: 'context_cache_id',
        data: { value: encoded },
    }); };
}
exports.createCacheIdContext = createCacheIdContext;
//# sourceMappingURL=cacheId.js.map