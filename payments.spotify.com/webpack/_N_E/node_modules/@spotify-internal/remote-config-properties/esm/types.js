var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { createCheckers } from 'ts-interface-checker';
import typesTI from './types-ti';
import { PropertySet } from './propertyset';
export var RCProperties;
(function (RCProperties) {
    function validate(properties) {
        if (!properties) {
            throw new Error('properties are not defined!');
        }
        var RCPropertiesChecker = createCheckers(typesTI).RCProperties;
        try {
            RCPropertiesChecker.strictCheck(properties);
        }
        catch (e) {
            throw new Error("Validation error in properties: " + e.message);
        }
        return true;
    }
    RCProperties.validate = validate;
    function toPropertySet(config) {
        var properties = config.properties.reduce(function (acc, prop) {
            var _a;
            return (__assign(__assign({}, acc), (_a = {}, _a[prop.name] = RCPublishProperty.toPropSpec(prop), _a)));
        }, {});
        return new PropertySet(properties);
    }
    RCProperties.toPropertySet = toPropertySet;
})(RCProperties || (RCProperties = {}));
export var RCPublishProperty;
(function (RCPublishProperty) {
    function toPropSpec(_a) {
        var name = _a.name, description = _a.description, spec = __rest(_a, ["name", "description"]);
        if ('boolSpec' in spec)
            return __assign({ type: 'bool', description: description }, spec.boolSpec);
        if ('intSpec' in spec)
            return __assign({ type: 'int', description: description }, spec.intSpec);
        if ('enumSpec' in spec)
            return __assign({ type: 'enum', description: description }, spec.enumSpec);
        throw new Error("Missing valid spec for property " + name);
    }
    RCPublishProperty.toPropSpec = toPropSpec;
})(RCPublishProperty || (RCPublishProperty = {}));
//# sourceMappingURL=types.js.map