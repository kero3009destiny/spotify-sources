import get from 'lodash/get';

/**
 * Gets eyebrow page value according to the weight of the values provides
 *
 * If there is eyebrowOverride, then it will use it
 * If not , it will try to get the title of the category tag
 * If not, it will try to get the title of the navigation tag
 * If not, it retuns null.
 * @param {Object} navigationTag Navigation tag object data of the page
 * @param {Object} categoryTag Category tag object data of the page
 * @param {String} eyebrowOverride Eyebrow override value
 * @returns {String}
 */
const getPageEyebrow = ({ navigationTag, categoryTag, eyebrowOverride }) => {
  return (
    eyebrowOverride ||
    get(categoryTag, 'title') ||
    get(navigationTag, 'title') ||
    null
  );
};

export default getPageEyebrow;
