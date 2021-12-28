const COOKIE_SPLIT_KEY = ';';

/**
 * Converts a cookie string into a cookie object.
 * @param {string} cookie A cookie string.
 * @returns {Object} A cookie object.
 */
const getCookieObject = cookie =>
  cookie.split(COOKIE_SPLIT_KEY).reduce((acc, current) => {
    const [key, value] = current.trim().split('=');

    return {
      ...acc,
      [key]: value,
    };
  }, {});

export default getCookieObject;
