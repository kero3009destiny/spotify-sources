import React from 'react';
import formatNumber from 'format-number';

import { FormatNumber } from '@spotify-internal/adstudio-shared';

export const numberWithCommas = formatNumber({ integerSeparator: ',' });

export const roundedWithCommas = formatNumber({
  integerSeparator: ',',
  round: 2,
});

export function calculateRatio(x, y) {
  if (x && y) {
    return Math.min(x / y, 1);
  }
  return 0;
}

/**
 * Return the decimal order of magnitude of a positive number (1-9 -> 0, 10-99 -> 1, 100-999 -> 2
 * 1000-9999 -> 3 etc).
 * For safety returns 0 if input is <= 0 (real result for 0 would -Infinity and for < 0 NaN
 * @param {number} [x = 0] The number to examine.
 * @returns {number} The decimal order of magnitude.
 */
export function getMagnitude(x = 0) {
  if (x <= 0) {
    return 0;
  }
  return Math.floor(Math.log10(x));
}

export function ratioToPercent(ratio) {
  return Math.round(ratio * 100);
}

export function roundToWholeNumber(x) {
  return Math.round(x);
}

export const formatPercentRate = number => (
  <FormatNumber
    format={{ suffix: '%', round: 2, padRight: 2 }}
    number={number}
  />
);
