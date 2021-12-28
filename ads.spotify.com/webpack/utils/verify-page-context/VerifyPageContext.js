import includes from 'lodash/includes';
import values from 'lodash/values';

import { PAGES } from 'constants/content-types';

/**
 * Ensures a proper page context is available for use with styles, logic, etc.
 * ***NOTE***: Until components have a 'theme' property, we'll use the page
 * context for conditional styling.
 * @param {string} pageContext A page context string.
 * @returns {string|null}
 */
const VerifyPageContext = (pageContext = '') => {
  const matchedContext = values(PAGES).find(pageType =>
    includes(pageContext, pageType),
  );

  return matchedContext || null;
};

export default VerifyPageContext;
