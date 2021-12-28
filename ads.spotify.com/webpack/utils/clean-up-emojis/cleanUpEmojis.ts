const emojisRegexp = /[^\p{L}\p{N}\p{P}\p{Z}]/gu;

/**
 * Removes emojis.
 * @param {string} text - The text to clean up
 * @return {string}
 */
const cleanUpEmojis = (text: string) => text.replace(emojisRegexp, '');

export default cleanUpEmojis;
