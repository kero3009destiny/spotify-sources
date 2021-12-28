import { TYPES, CATEGORY } from './event-types';
import { getLowerCase } from './event-utils';

/**
 * Joins common attributes to track catalog card events with custom data
 * @param {object} data
 * @returns {object} joined data
 */
const catalogEvent = data => ({
  event: TYPES.trackEvent,
  eventCategory: CATEGORY.pageBody,
  ...data,
});

/**
 * The CATALOG_CTA_CLICK event map function
 * @param {Event} event - The click event
 * @param {string} url - The URL where cta redirects
 * @param {string} title - The title of the card
 * @param {string} eyebrow - The eyebrow of the card
 * @param {string} groupTitle - The parent card group title
 */
export const CATALOG_CTA_CLICK = ({ event, title, eyebrow, groupTitle }) =>
  catalogEvent({
    eventAction: 'card cta click',
    eventLabel: getLowerCase(event, 'currentTarget.innerText'),
    linkUrl: getLowerCase(event, 'currentTarget.href'),
    headerText: title,
    eyebrowText: eyebrow,
    cardGroupTitle: groupTitle,
  });
