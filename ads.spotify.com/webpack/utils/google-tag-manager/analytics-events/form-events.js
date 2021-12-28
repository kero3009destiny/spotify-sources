import { TYPES, CATEGORY } from './event-types';

/**
 * Joins common attributes to track contact form events with custom data
 * @param {object} data
 * @returns {object} joined data
 */
const formEvent = data => ({
  event: TYPES.trackEvent,
  eventCategory: CATEGORY.forms,
  ...data,
});

/**
 * The CONTACT_FORM_TOGGLE event map function
 * @param {string} formName - Name defined by analyst
 * @param {boolean} status - The state of form visibility
 */
export const CONTACT_FORM_TOGGLE = ({ formName, status }) =>
  formEvent({
    eventAction: formName,
    eventLabel: status ? 'open' : 'close',
  });

/**
 * The FORM_SUCCESS event map function
 * @param {string} formName - Name defined by analyst
 * @param {boolean} newsletterSignup - Newsletter checked value
 * @param {string} formIAm - iam value from dropdown
 * @param {string} formTo - looking-to value from dropdown
 * @param {string} formCountry - country value from dropdown
 */

export const CONTACT_FORM_SUCCESS = ({
  formName,
  newsletterSignup,
  formIAm,
  formTo,
  formCountry,
}) =>
  formEvent({
    eventAction: formName,
    eventLabel: 'success',
    newsletterSignup: newsletterSignup ? 'yes' : 'no',
    formIAm,
    formTo,
    formCountry,
  });

/**
 * The FORM_ERROR event map function
 * @param {string} formName - Name defined by analyst
 * @param {string} error - The error message from server
 * @param {boolean} newsletterSignup - Newsletter checked value
 */
export const CONTACT_FORM_ERROR = ({ formName, error, newsletterSignup }) =>
  formEvent({
    eventAction: `${formName} - error`,
    eventLabel: error,
    newsletterSignup: newsletterSignup ? 'yes' : 'no',
  });

/**
 * The INLINE_FORM_SUCCESS event map function
 * @param {string} name - The name of the form
 * @param {string} title - The title of the form
 */
export const INLINE_FORM_SUCCESS = ({ name, title }) =>
  formEvent({
    eventAction: `${name} - inline form`,
    eventLabel: 'success',
    headerText: title,
  });

/**
 * The INLINE_FORM_ERROR event map function
 * @param {string} name - The name of the form
 * @param {string} title - The title of the form
 * @param {string} error - The error name or identifier
 */
export const INLINE_FORM_ERROR = ({ name, title, error }) =>
  formEvent({
    eventAction: `${name} - inline form - error`,
    eventLabel: error,
    headerText: title,
  });
