/**
 * Function to check if a given url path is external or not.
 * @param {string} href A String with the url that will be checked as external
 * @returns {boolean}
 */
export default function isExternalLink(href) {
  return /^(?:https?:\/\/)/.test(href);
}
