import { isExternalLink } from 'utils/is-external-link';
import get from 'lodash/get';
import lowerCase from 'lodash/lowerCase';

import { cssGlobals } from 'styles/variables';

import { ANALYTICS_TARGET } from 'constants/js-css-classes';
import { TYPES, CATEGORY } from './event-types';
import { getLowerCase, removeTrailingSlash } from './event-utils';

/**
 * The PAGE_VIEW event map function
 * @param {object} data - The page event data
 * @param {object} data.path - The path of the page
 * @param {object} data.title - The title of the page
 */
export const PAGE_VIEW = ({ path, title }) => ({
  event: TYPES.pageView,
  pagePath: removeTrailingSlash(path),
  pageTitle: lowerCase(title),
});

/**
 * The OPTIMIZE_ACTIVATE event map function
 * @param {Function} eventCallback - The event callback
 */
export const OPTIMIZE_ACTIVATE = ({ eventCallback = () => {} } = {}) => ({
  event: TYPES.optimizeActivate,
  eventCallback: () => {
    document.body.classList.remove(cssGlobals.antiFlicker);
    eventCallback();
  },
});

/**
 * The LINK_CLICK event map function
 * @param {object} data - The link event data
 * @param {Event} data.event - The click event
 * @param {string} data.href - The href of the link
 * @param {boolean} data.isExternal - If the link points to an external link
 */
export const LINK_CLICK = ({ event, href, isExternal }) => {
  const external = isExternal || isExternalLink(href);
  const cta =
    event.currentTarget.querySelector(`.${ANALYTICS_TARGET}`) ||
    event.currentTarget;

  return {
    event: TYPES.trackEvent,
    eventCategory: CATEGORY.links,
    eventAction: `${external ? 'external' : 'internal'} clicks`,
    eventLabel: getLowerCase(cta, 'innerText'),
    linkUrl: href,
  };
};

/**
 * The CONTENT_SHARE_CLICK event map function
 * @param {Event} event - The click event
 * @param {string} authorName - The Author's name
 * @param {string} publishDate - The publish date
 */
export const CONTENT_SHARE_CLICK = ({ event, authorName, publishDate }) => ({
  event: TYPES.trackEvent,
  eventCategory: CATEGORY.social,
  eventAction: 'content share click',
  eventLabel: getLowerCase(event, 'currentTarget.dataset.name'),
  contentAuthor: authorName,
  contentDate: publishDate,
  sharedURL: removeTrailingSlash(get(window, 'location.href')),
});

/**
 * The FOOTER_ICONS_CLICK event map function
 * @param {Event} event - The click event
 */
export const FOOTER_ICONS_CLICK = ({ event }) => ({
  event: TYPES.trackEvent,
  eventCategory: CATEGORY.social,
  eventAction: 'footer icons click',
  eventLabel: getLowerCase(event, 'currentTarget.dataset.name'),
});

/**
 * The SUCCESSFUL_POPUP_REDIRECT event map function
 * @param {function} eventCallback - The event callback
 */
export const SUCCESSFUL_POPUP_REDIRECT = ({
  eventCallback = () => {},
} = {}) => ({
  event: TYPES.trackEvent,
  eventCategory: CATEGORY.authorization,
  eventAction: 'successful redirect',
  eventLabel: 'redirect to adstudio - popup',
  eventTimeout: 2000,
  eventCallback,
});

/**
 * The SUCCESSFUL_COOKIE_REDIRECT event map function
 */
export const SUCCESSFUL_COOKIE_REDIRECT = () => ({
  event: TYPES.trackEvent,
  eventCategory: CATEGORY.authorization,
  eventAction: 'successful redirect',
  eventLabel: 'redirect to adstudio - cookie',
});
