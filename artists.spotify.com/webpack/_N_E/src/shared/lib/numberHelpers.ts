// ignore-string-externalization

/**
 * Number Helpers
 *
 */
import invariant from 'invariant';
import memoize from 'lodash/memoize';
export var formatter = memoize(function () {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    useGrouping: false,
    maximumFractionDigits: 0
  };
  return (// eslint-disable-next-line new-cap
    Intl.NumberFormat(undefined, config)
  );
});
var suffixes = ['k', 'M', 'B', 'T'];

var calcSuffix = function calcSuffix(input) {
  var value = input;
  var suffix = '';

  for (var i = 0, j = suffixes.length; i < j && Math.abs(value) >= 1e3; i += 1) {
    value /= 1000;
    suffix = suffixes[i];
  }

  return {
    value: value,
    suffix: suffix
  };
};
/**
 * Converts values to the units of the appropriate numeric suffix.
 * This applies to numbers < -1k && > 1k.
 * @param  {Number} number
 * @return {String}
 */


export var applyMetricSuffix = function applyMetricSuffix(input) {
  invariant(!(typeof input === 'string' && isNaN(input)), "The value of \"".concat(input, "\" must be a number or a string of numerals."));

  var _calcSuffix = calcSuffix(input),
      value = _calcSuffix.value,
      suffix = _calcSuffix.suffix;

  var formatted = Math.abs(input) > 1e6 ? formatter({
    useGrouping: false,
    maximumFractionDigits: 2
  }).format(value) : formatter({
    useGrouping: false,
    maximumFractionDigits: 1
  }).format(value);
  var output = "".concat(formatted).concat(suffix);
  return output;
};
/**
 *
 * Converts a number to a string with appropriate delimiters
 *
 */

export var basicNumberFormatter = function basicNumberFormatter(input) {
  invariant(!(typeof input === 'string' && isNaN(input)), "The value of \"".concat(input, "\" must be a number or a string of numerals."));
  return formatter({
    useGrouping: true
  }).format(input);
};
export var numberSuffixFormatter = function numberSuffixFormatter(val) {
  return val < 1000 ? val : applyMetricSuffix(val);
};