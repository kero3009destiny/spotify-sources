"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOsContext = void 0;
/**
 * A builder for the operating system context
 *
 * @param data - The event data
 * @param data.name - The name of the operating system.
 * @param data.version - The version of the operating system.
 * @return The formatted event data for OsContext
 */
function createOsContext(data) {
    return function () {
        return { name: 'context_os', data: data };
    };
}
exports.createOsContext = createOsContext;
//# sourceMappingURL=os.js.map