"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DIGITS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
var INV_HEX_DIGITS = {};
var INV_DIGITS = {};
// Prepare tables.
(function () {
    for (var i = 0, l = DIGITS.length; i < l; ++i) {
        INV_DIGITS[DIGITS[i]] = i;
    }
    for (var i = 0; i < 16; ++i) {
        INV_HEX_DIGITS['0123456789abcdef'[i]] = i;
    }
    for (var i = 0; i < 16; ++i) {
        INV_HEX_DIGITS['0123456789ABCDEF'[i]] = i;
    }
})();
function mul(lhs, rhs, base) {
    var rest = 0;
    for (var i = 0; i < lhs.length; ++i) {
        var tmp = lhs[i] * rhs + rest;
        lhs[i] = tmp % base;
        rest = ~~(tmp / base);
    }
    while (rest) {
        lhs.push(rest % base);
        rest = ~~(rest / base);
    }
}
function madd(acc, lhs, rhs, base) {
    var rest = 0;
    var tmp;
    var i;
    for (i = 0; i < lhs.length; ++i) {
        tmp = ~~acc[i] + lhs[i] * rhs + rest;
        acc[i] = tmp % base;
        rest = ~~(tmp / base);
    }
    while (rest) {
        tmp = ~~acc[i] + rest;
        acc[i] = tmp % base;
        rest = ~~(tmp / base);
        ++i;
    }
}
function convert(data, fromBase, toBase) {
    var r = [0];
    var b = [1];
    for (var i = 0; i < data.length; ++i) {
        madd(r, b, data[i], toBase);
        mul(b, fromBase, toBase);
    }
    return r;
}
function mapr(data, mapping) {
    var r = [];
    for (var i = 0; i < data.length; ++i) {
        r.push(mapping[data[i]]);
    }
    return r.reverse();
}
function pad(data, length) {
    if (length === void 0) { length = 0; }
    while (data.length < length) {
        data.push(0);
    }
    return data;
}
function fromBytes(data, length) {
    var r = convert(data.slice(0).reverse(), 256, 62);
    return mapr(pad(r, length), DIGITS).join('');
}
exports.fromBytes = fromBytes;
function toBytes(str, length) {
    var r = convert(mapr(str.split(''), INV_DIGITS), 62, 256);
    return pad(r, length).reverse();
}
exports.toBytes = toBytes;
function toHex(str, length) {
    var r = convert(mapr(str.split(''), INV_DIGITS), 62, 16);
    return mapr(pad(r, length), DIGITS).join('');
}
exports.toHex = toHex;
function fromHex(str, length) {
    var r = convert(mapr(str.split(''), INV_HEX_DIGITS), 16, 62);
    return mapr(pad(r, length), DIGITS).join('');
}
exports.fromHex = fromHex;
//# sourceMappingURL=base62.js.map