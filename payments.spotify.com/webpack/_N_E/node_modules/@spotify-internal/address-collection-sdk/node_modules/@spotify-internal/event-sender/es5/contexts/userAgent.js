"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserAgentContext = void 0;
/**
 * A builder for UserAgent
 *
 * @param userAgent - userAgent is a string that identifies the OS and OS version, and browser and browser version. Defaults to extract from `navigator.userAgent`.
 * @return The formatted event data for UserAgentContext
 */
function createUserAgentContext(userAgent) {
    if (!userAgent && typeof navigator === 'undefined') {
        throw new Error('userAgent is not provided and navigator.UserAgent is not available');
    }
    return function () {
        return {
            name: 'context_user_agent',
            data: { value: userAgent || navigator.userAgent },
        };
    };
}
exports.createUserAgentContext = createUserAgentContext;
//# sourceMappingURL=userAgent.js.map