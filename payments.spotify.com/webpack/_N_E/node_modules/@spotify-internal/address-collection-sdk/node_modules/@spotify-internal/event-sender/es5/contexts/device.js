"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeviceContext = void 0;
/**
 * A builder for Device
 *
 * @param data - The event data.
 * @param data.manufacturer - The manufacturer of the device.
 * @param data.model - The model of the device.
 * @return The formatted event data for DeviceContext
 */
function createDeviceContext(data) {
    return function () {
        return { name: 'context_device', data: data };
    };
}
exports.createDeviceContext = createDeviceContext;
//# sourceMappingURL=device.js.map