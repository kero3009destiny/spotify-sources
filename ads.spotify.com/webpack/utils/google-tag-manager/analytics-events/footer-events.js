import lowerCase from 'lodash/lowerCase';

import { TYPES, CATEGORY } from './event-types';
import { getLowerCase, removeTrailingSlash } from './event-utils';

/**
 * Joins common attributes to track footer events with custom data
 * @param {object} data
 * @returns {object} joined data
 */
const footerEvent = data => ({
  event: TYPES.trackEvent,
  eventCategory: CATEGORY.footer,
  ...data,
});

/**
 * The FOOTER_LINK_CLICK event map function
 * @param {object} data - The link event data
 * @param {Event} data.event - The click event
 * @param {string} data.href - The href of the link
 * @param {string} data.columnName - The column title where the link is
 */
export const FOOTER_LINK_CLICK = ({ event, href, columnName }) =>
  footerEvent({
    eventAction: `${lowerCase(columnName)} click`,
    eventLabel: getLowerCase(event, 'target.innerText'),
    linkUrl: href,
  });

/**
 * The FOOTER_MENU_ITEM_CLICK event map function
 * @param {object} data - The link event data
 * @param {Event} data.event - The click event
 * @param {string} data.href - The href of the link
 */
export const FOOTER_MENU_ITEM_CLICK = ({ event, href }) =>
  footerEvent({
    eventAction: 'other click',
    eventLabel: getLowerCase(event, 'target.innerText'),
    linkUrl: href,
  });

/**
 * The FOOTER_LOGO_CLICK event map function
 * @param {object} data - The link event data
 * @param {object} data.href - The href of the link
 * @param {object} data.path - The path of the page
 */
export const FOOTER_LOGO_CLICK = ({ href, path }) =>
  footerEvent({
    eventAction: 'logo click',
    eventLabel: removeTrailingSlash(path),
    linkUrl: href,
  });

/**
 * The FOOTER_COUNTRY_SELECTOR_TOGGLE event map function
 * @param {object} data - The link event data
 * @param {boolean} data.isOpen - The toggle open state
 */
export const FOOTER_COUNTRY_SELECTOR_TOGGLE = ({ isOpen }) =>
  footerEvent({
    eventAction: 'country selector modal click',
    eventLabel: isOpen ? 'open' : 'close',
  });

/**
 * The FOOTER_COUNTRY_SELECTED event map function
 * @param {object} data - The link event data
 * @param {string} data.href - The href of the link
 * @param {string} data.country - The country selected
 */
export const FOOTER_COUNTRY_SELECTED = ({ href, country }) =>
  footerEvent({
    eventAction: 'country selector click',
    eventLabel: lowerCase(country),
    linkUrl: href,
  });
