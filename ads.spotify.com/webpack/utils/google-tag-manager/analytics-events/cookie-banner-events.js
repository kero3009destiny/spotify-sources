import { TYPES, CATEGORY } from './event-types';
import { getLowerCase } from './event-utils';

/**
 * Joins common attributes to track cookie banner events with custom data
 * @param {object} data
 * @returns {object} joined data
 */
const cookieBannerEvent = data => ({
  event: TYPES.cookieBannerEvent,
  eventCategory: CATEGORY.cookie,
  ...data,
});

/**
 * The COOKIE_BANNER_CLOSE event map function
 */
export const COOKIE_BANNER_CLOSE = () =>
  cookieBannerEvent({
    eventAction: 'click',
    eventLabel: 'close',
  });

/**
 * The COOKIE_BANNER_LINK event map function
 * @param {Event} event - The click event
 */
export const COOKIE_BANNER_LINK = ({ event }) =>
  cookieBannerEvent({
    eventCategory: 'cookie policy',
    eventAction: 'inline link click',
    eventLabel: getLowerCase(event, 'currentTarget.text'),
    linkUrl: getLowerCase(event, 'currentTarget.href', ''),
  });
