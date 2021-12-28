import lowerCase from 'lodash/lowerCase';
import get from 'lodash/get';

import { ANALYTICS_TARGET } from 'constants/js-css-classes';
import { TYPES, CATEGORY } from './event-types';
import { getLowerCase, removeTrailingSlash } from './event-utils';

/**
 * Joins common attributes to track curatedList events with custom data
 * @param {object} data
 * @returns {object} joined data
 */
const curatedListEvent = data => ({
  event: TYPES.trackEvent,
  eventCategory: CATEGORY.pageBody,
  ...data,
});

/**
 * The curatedList_LINK_CLICK event map function
 * @param {object} data - The link event data
 * @param {Event} data.event - The click event
 * @param {string} data.title - The title of the card
 * @param {string} data.eyebrow - The eyebrow of the card
 */
export const CURATED_LIST_CTA_CLICK = ({ event, title, eyebrow, length }) => {
  const cta =
    event.currentTarget.querySelector(`.${ANALYTICS_TARGET}`) ||
    event.currentTarget;

  return curatedListEvent({
    eventAction: 'cta click',
    eventLabel: getLowerCase(cta, 'innerText'),
    headerText: lowerCase(title),
    eyebrowText: lowerCase(eyebrow),
    cardGroup: `${length}up`,
    linkUrl: removeTrailingSlash(get(event, 'currentTarget.pathname', '')),
  });
};
