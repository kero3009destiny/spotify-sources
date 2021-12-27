import { __read, __spread } from "tslib";
/**
 * Recursively traverses an object to update an existing nested key.
 * Note: The provided key path must include existing properties,
 * the function will not create objects while traversing.
 *
 * @param obj An object to update
 * @param value The value to update the nested key with
 * @param keyPath The path to the key to update ex. fizz.buzz.foo
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setNestedKey(obj, keyPath, value) {
    // Ex. foo.bar.zoop will extract foo and bar.zoop
    var match = keyPath.match(/([a-z]+)\.(.*)/i);
    if (match === null) {
        obj[keyPath] = value;
    }
    else {
        setNestedKey(obj[match[1]], match[2], value);
    }
}
/**
 * Retrieves the patched integrations with the provided integration.
 *
 * The integration must be present in the final user integrations, and they are compared
 * by integration name. If the user has defined one, there's nothing to patch; if not,
 * the provided integration is added.
 *
 * @param integration The integration to patch, if necessary.
 * @param userIntegrations Integrations defined by the user.
 * @param options options to update for a particular integration
 * @returns Final integrations, patched if necessary.
 */
export function addIntegration(integration, userIntegrations, options) {
    if (options === void 0) { options = {}; }
    if (Array.isArray(userIntegrations)) {
        return addIntegrationToArray(integration, userIntegrations, options);
    }
    else {
        return addIntegrationToFunction(integration, userIntegrations, options);
    }
}
function addIntegrationToArray(integration, userIntegrations, options) {
    var includesName = false;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (var x = 0; x < userIntegrations.length; x++) {
        if (userIntegrations[x].name === integration.name) {
            includesName = true;
        }
        var op = options[userIntegrations[x].name];
        if (op) {
            setNestedKey(userIntegrations[x], op.keyPath, op.value);
        }
    }
    if (includesName) {
        return userIntegrations;
    }
    return __spread(userIntegrations, [integration]);
}
function addIntegrationToFunction(integration, userIntegrationsFunc, options) {
    var wrapper = function (defaultIntegrations) {
        var userFinalIntegrations = userIntegrationsFunc(defaultIntegrations);
        return addIntegrationToArray(integration, userFinalIntegrations, options);
    };
    return wrapper;
}
//# sourceMappingURL=userIntegrations.js.map