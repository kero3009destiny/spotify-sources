import { TYPES, CATEGORY } from './event-types';
import { getLowerCase } from './event-utils';

/**
 * Joins common attributes to track multi cta events with custom data
 * @param {object} data
 * @returns {object} joined data
 */
const multiCtaEvent = data => ({
  event: TYPES.trackEvent,
  eventCategory: CATEGORY.pageBody,
  ...data,
});

/**
 * The MULTI_CTA_CLICK event map function
 * @param {Event} event - The click event
 * @param {string} module - The parent module name
 * @param {string} actionText - The actionText matches with ACTIONS_MULTI_CTA
 * @param {string} headerText - The title of the module
 * @param {string} eyebrowText - The eyebrow of the module
 */

export const MULTI_CTA_CLICK = ({
  event,
  module,
  actionText,
  headerText,
  eyebrowText,
}) => {
  const elementText = getLowerCase(event, 'currentTarget.innerText');

  return multiCtaEvent({
    eventAction: `${module} cta click`,
    eventLabel: `${elementText}_${actionText}`,
    linkUrl: getLowerCase(event, 'currentTarget.href', ''),
    headerText,
    eyebrowText,
  });
};
