import startCase from 'lodash/startCase';

import { DYNAMIC_COLLECTION_KEY } from 'constants/query';

/**
 * Throws an error for required params.
 * @param {string} val
 */
const isRequired = val => {
  throw new Error(`${val} is required.`);
};

/**
 * Formats a collection name based on the current locale.
 * eg. `pageLandingCollection` or `pageLandingEnGbCollection`
 * @param {Array} supportedLocaleCodes A list of supported locale codes.
 * @param {string} locale A locale id (eg. `en-GB`).
 * @param {string} collectionNameTemplate A stubbed collection name template
 *    (eg. `pageHome[locale]Collection`).
 * @param {string} key A key identifier for the string replacement.
 * @returns {string} A formatted collection name.
 */
const getCollectionName = (
  supportedLocaleCodes = [],
  locale = '',
  collectionNameTemplate = isRequired('collectionNameTemplate'),
  key = DYNAMIC_COLLECTION_KEY,
) => {
  const [defaultLocale] = supportedLocaleCodes;
  const defaultQuery = collectionNameTemplate.replace(key, '');

  if (supportedLocaleCodes.includes(locale)) {
    return locale === defaultLocale
      ? defaultQuery
      : collectionNameTemplate.replace(
          key,
          startCase(locale.toLowerCase()).replace(' ', ''),
        );
  }

  return defaultQuery;
};

export default getCollectionName;
