"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUniversalReporter = void 0;
const EventSender_1 = require("../reporters/EventSender");
const contexts_1 = require("@spotify-internal/event-sender/es5/contexts");
function createUniversalReporter(config = {}) {
    const context = config.context
        ? [contexts_1.createUserAgentContext(), ...config.context]
        : [contexts_1.createUserAgentContext()];
    return EventSender_1.EventSenderReporter.create(Object.assign(Object.assign({ environment: 'browser' }, config), { context }));
}
exports.createUniversalReporter = createUniversalReporter;
//# sourceMappingURL=createUniversalReporter.browser.js.map