import { TYPES, CATEGORY } from './event-types';
import { getLowerCase } from './event-utils';

/**
 * Joins common attributes to track link list events with custom data
 * @param {object} data
 * @returns {object} joined data
 */
const linkListEvent = data => ({
  event: TYPES.trackEvent,
  eventCategory: CATEGORY.pageBody,
  ...data,
});

/**
 * The LINK_LIST_CTA_CLICK event map function
 * @param {Event} event - The click event
 */
export const LINK_LIST_CTA_CLICK = ({ event }) =>
  linkListEvent({
    eventAction: 'link list links',
    eventLabel: getLowerCase(event, 'currentTarget.innerText'),
    linkUrl: getLowerCase(event, 'currentTarget.href', ''),
    eyebrowText: getLowerCase(
      event,
      'currentTarget.parentElement.firstElementChild.innerText',
    ),
    cardGroup: 'link list',
  });
