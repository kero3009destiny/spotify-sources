import lowerCase from 'lodash/lowerCase';

import { TYPES, CATEGORY } from './event-types';
import { getLowerCase } from './event-utils';

/**
 * Joins common attributes to track hero carousel events with custom data
 * @param {object} data
 * @returns {object} joined data
 */
const heroCarouselEvent = data => ({
  event: TYPES.trackEvent,
  eventCategory: CATEGORY.pageBody,
  ...data,
});

const BUTTON_TAG_NAME = 'BUTTON';

/**
 * The HERO_CTA_CLICK event map function
 * @param {object} data - The event data
 * @param {Event} data.event - The click event
 * @param {number} data.index - The carousel current index
 * @param {string} data.href - The cta link
 * @param {string} actionText - The actionText matches with ACTIONS_MULTI_CTA
 */
export const HERO_CTA_CLICK = ({ event, index, href, actionText }) => {
  const elementText = getLowerCase(event, 'currentTarget.innerText');

  return heroCarouselEvent({
    eventAction: `hero cta click - ${
      event.currentTarget.tagName === BUTTON_TAG_NAME ? 'button' : 'inline-link'
    }`,
    eventLabel: `${elementText}_${actionText}`,
    linkUrl: href,
    index: index + 1,
  });
};

/**
 * The HERO_CAROUSEL_ENTRIES_CLICK event map function
 * @param {object} data - The event data
 * @param {number} data.index - The carousel current index
 * @param {string} data.label - The entry label
 */
export const HERO_CAROUSEL_ENTRIES_CLICK = ({ index, label }) =>
  heroCarouselEvent({
    eventAction: 'hero carousel entries click',
    eventLabel: lowerCase(label),
    index: index + 1,
  });
