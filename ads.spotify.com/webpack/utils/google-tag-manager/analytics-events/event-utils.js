import lowerCase from 'lodash/lowerCase';
import get from 'lodash/get';

/**
 * Gets the value in lower case at the object's path
 * @param {object} obj - the object to lookup the value on
 * @param {string} path - the path inside the object to find the value
 * @returns {string} lower case value
 */
export const getLowerCase = (obj, path) => {
  return lowerCase(get(obj, path, ''));
};

/**
 * Removes the last slash from the path url
 * @param {string} path - the path url
 * @returns {string}
 */
export const removeTrailingSlash = path => {
  return path.replace(/\/$/, '');
};
