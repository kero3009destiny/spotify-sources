import flow from 'lodash/flow';

import { cleanUpEmojis } from 'utils/clean-up-emojis';

const notAllowedCharacters = /[!@#$%^*()+=}{?/><[\]\\⁄€‹›ﬁﬂ‡°·™¡£¢∞§¶•ªº≠«æ…≥≤÷¿ÆÚ»±]/gu;

/**
 * Removes not allowed characters.
 * @param {string} text - The text to clean up
 * @return {string}
 */

const cleanNotAllowedCharacters = text =>
  text.replace(notAllowedCharacters, '');

const sanitizeUserInput = flow([cleanUpEmojis, cleanNotAllowedCharacters]);

export default sanitizeUserInput;
