import { TYPES, CATEGORY } from './event-types';
import { getLowerCase } from './event-utils';

/**
 * Joins common attributes to track topic body events with custom data
 * @param {object} data
 * @returns {object} joined data
 */
const bodyEvent = data => ({
  event: TYPES.trackEvent,
  eventCategory: CATEGORY.pageBody,
  ...data,
});

/**
 * The BODY_INLINE_CLICK event map function
 * @param {Event} event - The click event
 * @param {string} href - href reference
 */
export const BODY_INLINE_CLICK = ({ event, href }) => {
  return bodyEvent({
    eventAction: 'inline link click',
    eventLabel: getLowerCase(event, 'currentTarget.innerText'),
    linkUrl: href,
  });
};
