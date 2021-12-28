/**
 * Function to properly add a URL query separator.
 * @param {string} path A URL string to evaluate.
 * @returns {string} The new path with a delimiter of ? or &
 */
const queryStringDelimiter = (path = '') => {
  if (/[?]/.test(path)) {
    return `${path}&`;
  }

  return `${path}?`;
};

export default queryStringDelimiter;
