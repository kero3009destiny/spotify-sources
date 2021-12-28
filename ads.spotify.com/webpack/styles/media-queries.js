import { css } from 'styled-components';

import { getFirstNotUndefinedValue } from 'utils/get-first-not-undefined-value';
import { minBreakpoints, maxBreakpoints } from './variables';

/**
 * Iterates through the bp sizes and creates a media template.
 * @param {string} prop The string to use as the query.
 * @param {Object} breakpointSet An object with key/value pairs of a bp alias
 *    and a number.
 * eg usage:
 *  ${minWidth.xs`<style rules here>`}
 *  ${maxWidth.sm`<style rules here>`}
 */
const mediaQuery = (prop, breakpointSet) => {
  return Object.keys(breakpointSet).reduce((acc, label) => {
    const query = `${prop}: ${breakpointSet[label]}px`;

    acc[label] = (...args) => css`
      @media (${query}) {
        ${css(...args)}
      }
    `;
    return acc;
  }, {});
};

export const minWidth = mediaQuery('min-width', minBreakpoints);
export const maxWidth = mediaQuery('max-width', maxBreakpoints);

/**
 * Creates a min/max or "from"/"to" media query from breakpoint parameters.
 * @param {number} from A breakpoint number as a minWidth.
 * @param {number} to A breakpoint number as a maxWidth.
 * eg usage:
 *  ${minMax(minBreakpoints.lg, minBreakpoints.xl)`<style rules here>`}
 */
export const minMax = (from, to) => {
  // Ensure both values are passed.
  if (!from || !to) {
    return () => console.error('Please provide both a min and max value.');
  }
  // Ensure `to` value is greater than `from`.
  if (from > to) {
    return () =>
      console.error('Please ensure proper breakpoint order (min, max).');
  }

  const fromMq = `min-width: ${from}px`;
  const toMq = `max-width: ${to}px`;

  return (...args) => css`
    @media (${fromMq}) and (${toMq}) {
      ${css(...args)}
    }
  `;
};

// Viewport detection for Functional Components.

const windowWidth = () => window.innerWidth;

// Small and Medium viewports
export const isXSmallToMedium = () => windowWidth() < minBreakpoints.lg;

// Large and Extra large viewports
export const isLargeToXLarge = () => windowWidth() >= minBreakpoints.lg;

// Medium Large and Extra large viewports || Used only for Global Nav
export const isMLargeToXLarge = () => windowWidth() >= minBreakpoints.ml;

/**
 * breakpointSelect - Selects the value for the matched breakpoint
 * @param {Object} values
 * @param {*} values.sm - The value to be returned on small viewport, defaults to md and lg
 * @param {*} values.md - The value to be returned on medium viewport, defaults to sm and lg
 * @param {*} values.lg - The value to be returned on large viewport, defaults to md and lg
 * @returns {*} A value that satisfies the matched breakpoint or defaults
 */
export const breakpointSelect = ({ sm, md, lg }) => {
  if (windowWidth() < minBreakpoints.md) {
    return getFirstNotUndefinedValue(sm, md, lg);
  }

  if (windowWidth() < minBreakpoints.lg) {
    return getFirstNotUndefinedValue(md, sm, lg);
  }

  return getFirstNotUndefinedValue(lg, md, sm);
};
