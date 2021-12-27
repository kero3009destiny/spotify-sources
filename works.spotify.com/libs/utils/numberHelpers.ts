import memoize from 'lodash/memoize';

export const formatter = memoize((config = { useGrouping: false, maximumFractionDigits: 0 }) =>
  Intl.NumberFormat(undefined, config),
);

const suffixes = ['k', 'M', 'B', 'T'];
const calcSuffix = (input: number) => {
  let value = input;
  let suffix = '';
  for (let i = 0, j = suffixes.length; i < j && Math.abs(value) >= 1e3; i += 1) {
    value /= 1000;
    suffix = suffixes[i];
  }

  return { value, suffix };
};

/**
 * Converts values to the units of the appropriate numeric suffix.
 * This applies to numbers < -1k && > 1k.
 */
export const formatNumber = (input: number) => {
  const { value, suffix } = calcSuffix(input);
  const formatted =
    Math.abs(input) > 1e6
      ? formatter({ useGrouping: false, maximumFractionDigits: 2 }).format(value)
      : formatter({ useGrouping: false, maximumFractionDigits: 1 }).format(value);
  const output = `${formatted}${suffix}`;

  return output;
};

/**
 * Converts decimal number below 1 into a usable percentage between 0 and 99
 */
export const roundDecimalToPercentage = (input: number) => Math.round(input * 100);
