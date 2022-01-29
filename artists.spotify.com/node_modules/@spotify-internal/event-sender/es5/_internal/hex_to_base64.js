"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hexToBase64 = void 0;
var encoding_1 = require("@js-sdk/encoding");
/**
 * @param hexString - a string representation of a hexadecimal number.
 * @return a base 64 encoded string representing the same value as the hexString input.
 */
function hexToBase64(hexString) {
    if (!hexString || hexString.length % 2 !== 0) {
        throw new TypeError('Invalid hexString value.');
    }
    // Each 8-bit byte is represented by two characters 00 - ff
    var bytes = hexString
        .split('')
        .reduce(function (acc, character, index) {
        if (index % 2 === 0) {
            acc.push(character);
            return acc;
        }
        acc[acc.length - 1] = "" + acc[acc.length - 1] + character;
        return acc;
    }, []);
    var bytestr = String.fromCharCode.apply(null, bytes.map(function (i) {
        var asInt = parseInt(i, 16);
        if (isNaN(asInt)) {
            throw new TypeError('Invalid hexString value.');
        }
        return asInt;
    }));
    return encoding_1.Base64.encode(bytestr);
}
exports.hexToBase64 = hexToBase64;
//# sourceMappingURL=hex_to_base64.js.map