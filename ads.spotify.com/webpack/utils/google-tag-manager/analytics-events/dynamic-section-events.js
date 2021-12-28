import { TYPES, CATEGORY } from './event-types';
import { getLowerCase } from './event-utils';

/**
 * Joins common attributes to track dynamicSection events with custom data
 * @param {object} data
 * @returns {object} joined data
 */
const dynamicSectionEvent = data => ({
  event: TYPES.trackEvent,
  eventCategory: CATEGORY.pageBody,
  ...data,
});

/**
 * The JUMP_LINK_CLICK event map function
 * @param {Event} event - The click event
 */
export const JUMP_LINK_CLICK = ({ event }) => {
  return dynamicSectionEvent({
    eventAction: 'dynamic link click',
    eventLabel: getLowerCase(event, 'currentTarget.text'),
  });
};

/**
 * The DYNAMIC_CARD_CLICK event map function
 * @param {Event} event - The click event
 */
export const DYNAMIC_CARD_CLICK = ({ event }) => {
  return dynamicSectionEvent({
    eventAction: 'dynamic card click',
    eventLabel: getLowerCase(event, 'currentTarget.text'),
  });
};
