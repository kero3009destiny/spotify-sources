/**
 * Function to check if a given url path has a query rule.
 * @param {string} href A String with the url that will be checked
 * @returns {boolean}
 */
export const isQueryLink = href => /\?/.test(href);

export default isQueryLink;
