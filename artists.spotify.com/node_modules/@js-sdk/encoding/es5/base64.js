"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BASE64_DIGITS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
var STRING_CHUNK_SIZE = 4096;
var INVERSE_DATA = (function () {
    var inverseDigits = [];
    for (var i = 0; i < 256; ++i) {
        inverseDigits[i] = 0xff;
    }
    for (var i = 0; i < BASE64_DIGITS.length; ++i) {
        inverseDigits[BASE64_DIGITS.charCodeAt(i)] = i;
    }
    return String.fromCharCode.apply(String, inverseDigits);
})();
function stringFromCharCode(data) {
    if (data.length < STRING_CHUNK_SIZE) {
        return String.fromCharCode.apply(String, data);
    }
    var ptr = 0;
    var results = [];
    do {
        results.push(String.fromCharCode.apply(String, data.slice(ptr, ptr + STRING_CHUNK_SIZE)));
        ptr += STRING_CHUNK_SIZE;
    } while (ptr < data.length);
    return results.join('');
}
function base64Encode(rawStr) {
    var str = String(rawStr);
    var out = [];
    var len = str.length;
    var i = 0;
    while (i < len) {
        var c1 = str.charCodeAt(i++) & 0xff;
        if (i === len) {
            out.push(BASE64_DIGITS.charAt(c1 >> 2), BASE64_DIGITS.charAt((c1 & 0x3) << 4), '==');
            break;
        }
        var c2 = str.charCodeAt(i++);
        if (i === len) {
            out.push(BASE64_DIGITS.charAt(c1 >> 2), BASE64_DIGITS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4)), BASE64_DIGITS.charAt((c2 & 0xf) << 2), '=');
            break;
        }
        var c3 = str.charCodeAt(i++);
        out.push(BASE64_DIGITS.charAt(c1 >> 2), BASE64_DIGITS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4)), BASE64_DIGITS.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6)), BASE64_DIGITS.charAt(c3 & 0x3f));
    }
    return out.join('');
}
function base64Decode(base64Str) {
    var str = String(base64Str);
    var out = [];
    var len = str.length;
    var j = 0;
    var tmp0;
    var tmp1;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        do {
            tmp0 = INVERSE_DATA.charCodeAt(str.charCodeAt(j++) & 0xff);
        } while (tmp0 === 0xff && j < len);
        do {
            tmp1 = INVERSE_DATA.charCodeAt(str.charCodeAt(j++) & 0xff);
        } while (tmp1 === 0xff && j < len);
        if (tmp1 === 0xff) {
            break;
        }
        out.push(((tmp0 << 2) | (tmp1 >> 4)) & 0xff);
        do {
            tmp0 = INVERSE_DATA.charCodeAt(str.charCodeAt(j++) & 0xff);
        } while (tmp0 === 0xff && j < len);
        if (tmp0 === 0xff) {
            break;
        }
        out.push(((tmp1 << 4) | (tmp0 >> 2)) & 0xff);
        do {
            tmp1 = INVERSE_DATA.charCodeAt(str.charCodeAt(j++) & 0xff);
        } while (tmp1 === 0xff && j < len);
        if (tmp1 === 0xff) {
            break;
        }
        out.push(((tmp0 << 6) | tmp1) & 0xff);
    }
    return stringFromCharCode(out);
}
/**
 * Encodes a raw string to a base64 string.
 *
 * @param rawStr - The string to encode.
 * @return out The base64 encoding of the `rawStr`.
 */
var encode = base64Encode;
exports.encode = encode;
/**
 * Decodes a base64 encoded string into a raw string.
 *
 * @param base64Str - The base64 encoded string.
 * @return rawStr The raw string.
 */
var decode = base64Decode;
exports.decode = decode;
if (typeof window !== 'undefined' && window.btoa && window.atob) {
    exports.encode = encode = function (str) { return window.btoa(str); };
    exports.decode = decode = function (str) { return window.atob(str); };
}
//# sourceMappingURL=base64.js.map