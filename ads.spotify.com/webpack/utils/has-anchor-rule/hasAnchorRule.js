/**
 * Function to check if a given url path has an anchor rule.
 * @param {string} href A String with the url that will be checked
 * @returns {boolean}
 */
export default function hasAnchorRule(href) {
  return /#/.test(href);
}
