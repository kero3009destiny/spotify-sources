import { TYPES, CATEGORY } from './event-types';
import { getLowerCase, removeTrailingSlash } from './event-utils';

/**
 * Joins common attributes to track navigation events with custom data
 * @param {object} data
 * @returns {object} joined data
 */
const navigationEvent = data => ({
  event: TYPES.trackEvent,
  eventCategory: CATEGORY.navigation,
  ...data,
});

/**
 * The NAVIGATION_LOGO_CLICK event map function
 * @param {object} data - The link event data
 * @param {object} data.path - The current path of the page
 */
export const NAVIGATION_LOGO_CLICK = ({ path }) =>
  navigationEvent({
    eventAction: 'logo click',
    eventLabel: removeTrailingSlash(path),
  });

/**
 * The NAVIGATION_MENU_CLICK event map function
 * @param {object} data - The link event data
 * @param {Event} data.event - The click event
 * @param {string} data.href - The href of the link
 */
export const NAVIGATION_MENU_CLICK = ({ event, href }) =>
  navigationEvent({
    eventAction: 'menu click',
    eventLabel: getLowerCase(event, 'currentTarget.innerText'),
    linkUrl: href,
  });

/**
 * The NAVIGATION_MULTI_CTA event map function
 * @param {object} data - The link event data
 * @param {Event} data.event - The click event
 * @param {string} actionText - The actionText matches with ACTIONS_MULTI_CTA
 */
export const NAVIGATION_MULTI_CTA = ({ event, actionText }) => {
  const elementText = getLowerCase(event, 'currentTarget.innerText');

  return navigationEvent({
    eventAction: 'menu click',
    eventLabel: `${elementText}_${actionText}`,
    linkUrl: getLowerCase(event, 'currentTarget.href', ''),
  });
};

/**
 * The NAVIGATION_COUNTRY_SELECTOR_TOGGLE event map function
 * @param {object} data - The link event data
 * @param {boolean} data.isOpen - The toggle open state
 */
export const NAVIGATION_BURGER_MENU_TOGGLE = ({ isOpen }) =>
  navigationEvent({
    eventAction: 'burger menu click',
    eventLabel: isOpen ? 'open' : 'close',
  });
