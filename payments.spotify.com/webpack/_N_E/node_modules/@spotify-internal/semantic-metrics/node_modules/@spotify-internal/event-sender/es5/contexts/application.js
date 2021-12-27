"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApplicationContext = void 0;
/**
 * A builder for Application
 *
 * @param data - The event data.
 * @param data.version - The application version.
 * @return The formatted event data for ApplicationContext
 */
function createApplicationContext(data) {
    return function () {
        return { name: 'context_application', data: data };
    };
}
exports.createApplicationContext = createApplicationContext;
//# sourceMappingURL=application.js.map