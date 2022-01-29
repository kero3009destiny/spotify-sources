import { hashJsonValue } from '@spotify-internal/remote-config-properties';
var addedProperties = {};
export var properties = [];
function defineProperty(spec) {
    var hash = hashJsonValue(spec);
    if (typeof addedProperties[spec.name] === 'string' &&
        addedProperties[spec.name] !== hash) {
        throw new Error("A different definition with the name \"" + spec.name + "\" already exists.");
    }
    addedProperties[spec.name] = hash;
    properties.push(spec);
    return spec.name;
}
export function defineEnum(_a) {
    var name = _a.name, description = _a.description, values = _a.values, def = _a.default;
    return defineProperty({
        name: name,
        description: description,
        enumSpec: {
            values: Object.values(values),
            default: def,
        },
    });
}
export function defineBool(_a) {
    var name = _a.name, description = _a.description, def = _a.default;
    return defineProperty({
        name: name,
        description: description,
        boolSpec: {
            default: def,
        },
    });
}
export function defineInt(_a) {
    var name = _a.name, description = _a.description, upper = _a.upper, lower = _a.lower, def = _a.default;
    return defineProperty({
        name: name,
        description: description,
        intSpec: {
            upper: upper,
            lower: lower,
            default: def,
        },
    });
}
//# sourceMappingURL=define.js.map