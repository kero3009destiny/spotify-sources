// from https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding

export default function b64DecodeUnicode(str) {
  return decodeURIComponent(Array.prototype.map.call(atob(str), c => {
    return `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`;
  }).join(''));
}
