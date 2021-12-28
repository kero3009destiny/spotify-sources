import { DEFAULT_LOCALIZED_FIELD } from 'constants/query';

/**
 * Gets the localized field to handle localized content types
 * @param {string} locale - The locale
 * @returns {string}
 */
const getLocalizedField = locale =>
  locale === DEFAULT_LOCALIZED_FIELD ? '' : locale;

export default getLocalizedField;
