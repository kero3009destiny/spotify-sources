import { h64 } from 'xxhashjs';
export default function hashJsonValue(value) {
    var empty = true;
    var hash = h64();
    pushValue(function (chunk) {
        hash.update(chunk);
        empty = false;
    }, value);
    return !empty ? hash.digest().toString(16) : undefined;
}
function pushValue(sink, value) {
    switch (typeof value) {
        case 'boolean':
            pushBoolean(sink, value);
            break;
        case 'number':
            pushNumber(sink, value);
            break;
        case 'string':
            pushString(sink, value);
            break;
        case 'object':
            if (value === null) {
                pushNull(sink);
                break;
            }
            if (Array.isArray(value)) {
                pushArray(sink, value);
                break;
            }
            if (typeof value.toJSON === 'function') {
                pushValue(sink, value.toJSON());
                break;
            }
            pushObject(sink, value);
            break;
        default:
            break;
    }
}
function pushNull(sink) {
    sink('null');
}
function pushNumber(sink, value) {
    sink("number:" + value);
}
function pushString(sink, value) {
    sink("string:" + value.length + ":" + value);
}
function pushBoolean(sink, value) {
    sink("boolean:" + value);
}
function pushObject(sink, value) {
    var keys = Object.keys(value).filter(function (key) { return typeof value[key] !== 'undefined'; });
    keys.sort();
    sink("object:" + keys.length + ":");
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        sink(key + ":");
        pushValue(sink, value[key]);
    }
}
function pushArray(sink, value) {
    sink("array:" + value.length + ":");
    for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
        var item = value_1[_i];
        if (typeof item === 'undefined') {
            pushNull(sink);
        }
        else {
            pushValue(sink, item);
        }
    }
}
//# sourceMappingURL=hash.js.map