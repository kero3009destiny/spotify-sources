export function byteLength(str) {
    let strLength = str.length;
    let i = strLength;
    while (i--) {
        const code = str.charCodeAt(i);
        if (code > 0x7f && code <= 0x7ff) {
            strLength++;
        }
        else if (code > 0x7ff && code <= 0xffff) {
            strLength += 2;
        }
        if (code >= 0xdc00 && code <= 0xdfff) {
            i--; // trail surrogate
        }
    }
    return strLength;
}
//# sourceMappingURL=byte_length.js.map