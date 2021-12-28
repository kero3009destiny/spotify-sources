/**
 * Function to check wether a given url is an in page anchor or not
 * @param {string} href A String with the url that will be checked as an in page anchor
 * @returns {boolean}
 */
export default function isInPageAnchor(href) {
  return /^#/.test(href);
}
