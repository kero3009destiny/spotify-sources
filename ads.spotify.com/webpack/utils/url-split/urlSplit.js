/**
 * urlSplit - Splits the URL into pathname, search and hash
 * @param {string} url - The URL string
 * @returns {object} result
 * @returns {string} result.pathname - The URL pathname
 * @returns {string} result.search - The URL search
 * @returns {string} result.hash - The URL hash
 */
const urlSplit = (url = '') => {
  const [, pathname = ''] = url.match(/^([^?#]+)/) || [];
  const [, search = ''] = url.match(/(\?[^#]+)/) || [];
  const [, hash = ''] = url.match(/(#.+)/) || [];

  return {
    pathname,
    search,
    hash,
  };
};

export default urlSplit;
