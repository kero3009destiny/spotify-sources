import { TYPES, CATEGORY } from './event-types';
import { getLowerCase } from './event-utils';

/**
 * Joins common attributes to track topic carousel events with custom data
 * @param {object} data
 * @returns {object} joined data
 */
const topicScrollEvent = data => ({
  event: TYPES.trackEvent,
  eventCategory: CATEGORY.topicScoll,
  ...data,
});

/**
 * The TOPIC_SCROLL_SCROLLED event map function
 * @param {number} slide - slide index into the view
 */
export const TOPIC_SCROLL_SCROLLED = ({ slide }) =>
  topicScrollEvent({
    eventAction: 'Scrolled Horizontal',
    eventLabel: `Scroll into view: Title ${slide}`,
  });

/**
 * The TOPIC_SCROLL_CLICK event map function
 * @param {Event} event - The click event
 */
export const TOPIC_SCROLL_CLICK = ({ event }) =>
  topicScrollEvent({
    eventAction: 'CTA click',
    eventLabel: getLowerCase(event, 'currentTarget.innerText'),
  });
