import { Base64 } from '@js-sdk/encoding';
/**
 * Generate a random Byte string of a specified length.
 *
 * @param numberOfBytes - The requested length of the string.
 * @return The generated string.
 */
function generateWithRandom(numberOfBytes) {
    let generated = '';
    for (let i = 0; i < numberOfBytes; i++) {
        generated += String.fromCharCode((Math.random() * 256) | 0);
    }
    return generated;
}
/**
 * Generate a random Base64 encoded string of a specified byte length.
 *
 * @param numberOfBytes - The length of the string in bytes (before
 *     encoding).
 * @return The generated Base64 encoded string.
 */
function generateWithBase64(numberOfBytes) {
    return Base64.encode(generateWithRandom(numberOfBytes));
}
export const randomString = {
    generate: generateWithRandom,
    generateBase64: generateWithBase64,
};
//# sourceMappingURL=random_string.js.map