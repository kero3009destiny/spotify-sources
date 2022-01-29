import hashJsonValue from './hash';
import { PropDefinition } from './propdef';
import { RCProperties } from './types';
var PropertySet = /** @class */ (function () {
    function PropertySet(properties) {
        this.properties = objectMap(properties, function (spec) {
            return PropDefinition.fromSpec(spec);
        });
        this.size = Object.keys(this.properties).length;
    }
    PropertySet.prototype.getPropertySetKey = function (_a) {
        var clientId = _a.clientId, version = _a.version;
        return hashJsonValue({ clientId: clientId, version: version, properties: this.properties });
    };
    PropertySet.prototype.getDefaultValues = function () {
        return objectMap(this.properties, function (def) { return def.default; });
    };
    PropertySet.prototype.coerceValues = function (values) {
        if (values === void 0) { values = {}; }
        return objectMerge(function (def, val, name) {
            if (!def)
                throw new Error("Unknown property " + name);
            if (!val)
                return def.default;
            if (!def.isValid(val))
                throw new Error("Invalid property " + name);
            return val;
        }, this.properties, values);
    };
    PropertySet.prototype.override = function (values) {
        if (values === void 0) { values = {}; }
        return objectMerge(function (def, value, name) {
            if (!def)
                throw new Error("Unknown property " + name);
            if (!value)
                return def.default;
            if (!def.isValidValue(value))
                throw new Error("Invalid property " + name);
            return { type: def.type, value: value };
        }, this.properties, values);
    };
    PropertySet.fromPropertiesDefinition = function (config) {
        RCProperties.validate(config);
        return RCProperties.toPropertySet(config);
    };
    return PropertySet;
}());
export { PropertySet };
export default PropertySet;
function objectMerge(fn, a, b) {
    var merged = {};
    for (var _i = 0, _a = Object.keys(a); _i < _a.length; _i++) {
        var key = _a[_i];
        var v = fn(a[key], b[key], key);
        if (v !== undefined)
            merged[key] = v;
    }
    for (var _b = 0, _c = Object.keys(b); _b < _c.length; _b++) {
        var key = _c[_b];
        if (!(key in a)) {
            var v = fn(undefined, b[key], key);
            if (v !== undefined)
                merged[key] = v;
        }
    }
    return merged;
}
function objectMap(src, fn) {
    var dst = {};
    for (var _i = 0, _a = Object.entries(src); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        dst[key] = fn(value, key);
    }
    return dst;
}
//# sourceMappingURL=propertyset.js.map