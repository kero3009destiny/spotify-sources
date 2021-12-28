import lowerCase from 'lodash/lowerCase';
import get from 'lodash/get';

import { TYPES, CATEGORY } from './event-types';
import { getLowerCase, removeTrailingSlash } from './event-utils';

/**
 * Joins common attributes to track topic carousel events with custom data
 * @param {object} data
 * @returns {object} joined data
 */
const topicCarouselEvent = data => ({
  event: TYPES.trackEvent,
  eventCategory: CATEGORY.pageBody,
  cardGroup: 'topic carousel',
  ...data,
});

/**
 * The TOPIC_CAROUSEL_INLINE_CLICK event map function
 * @param {Event} event - The click event
 * @param {string} eyebrow - Component eyebrow
 */
export const TOPIC_CAROUSEL_INLINE_CLICK = ({ event, eyebrow }) => {
  const headerText = getLowerCase(
    event,
    'currentTarget.parentNode.previousSibling.innerText',
  );
  const ctaText = getLowerCase(event, 'currentTarget.innerText');

  return topicCarouselEvent({
    eventAction: 'topic carousel cta click - inline link',
    eventLabel: `${headerText} - ${ctaText}`,
    linkUrl: getLowerCase(event, 'currentTarget.href'),
    eyebrowText: lowerCase(eyebrow),
  });
};

/**
 * The TOPIC_CAROUSEL_OPEN event map function
 * @param {Event} event - The click event
 * @param {string} eyebrow - Component eyebrow
 */
export const TOPIC_CAROUSEL_OPEN = ({ event, eyebrow }) => {
  const parentElement = get(event, 'currentTarget.parentElement');

  return topicCarouselEvent({
    eventAction: 'topic carousel click - open item',
    eventLabel: `${getLowerCase(event, 'currentTarget.innerText')} - open`,
    linkUrl: parentElement.querySelector('a')
      ? removeTrailingSlash(parentElement.querySelector('a').href)
      : '',
    eyebrowText: lowerCase(eyebrow),
  });
};
