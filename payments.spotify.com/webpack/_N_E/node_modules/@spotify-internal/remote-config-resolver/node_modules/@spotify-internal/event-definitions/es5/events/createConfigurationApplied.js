"use strict";
// NOTE: This code was generated and should not be changed
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfigurationApplied = void 0;
/**
 * A builder for ConfigurationApplied
 *
 * @param data - The event data
 * @return The formatted event data for ConfigurationAppliedEvent
 */
function createConfigurationApplied(data) {
    return {
        name: 'ConfigurationApplied',
        environments: ['device', 'browser'],
        data: data,
    };
}
exports.createConfigurationApplied = createConfigurationApplied;
//# sourceMappingURL=createConfigurationApplied.js.map