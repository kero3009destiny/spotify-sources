"use strict";
// NOTE: This code was generated and should not be changed
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfigurationAppliedNonAuth = void 0;
/**
 * A builder for ConfigurationAppliedNonAuth
 *
 * @param data - The event data
 * @return The formatted event data for ConfigurationAppliedNonAuthEvent
 */
function createConfigurationAppliedNonAuth(data) {
    return {
        name: 'ConfigurationAppliedNonAuth',
        environments: ['devicenonauth', 'browsernonauth'],
        data: data,
    };
}
exports.createConfigurationAppliedNonAuth = createConfigurationAppliedNonAuth;
//# sourceMappingURL=createConfigurationAppliedNonAuth.js.map