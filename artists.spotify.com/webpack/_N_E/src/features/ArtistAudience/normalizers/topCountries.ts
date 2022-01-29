// ignore-string-externalization
import invariant from 'invariant';
import { useCountryNames } from '@mrkt/features/country-names';
import { useNumberFormatter } from '@mrkt/features/i18n';
import { formatNumberWithFallback } from '@mrkt/features/stats-components/utils';
/**
 * Normalizes the data for use in the top countries table
 * @param  {Array} data – The original payload
 * @return {Array} – Normalized data
 */

export function useTopCountriesNormalizer() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  invariant(Array.isArray(data), 'The argument "data" must an Array');
  var countryNames = useCountryNames();
  var numberFormatter = useNumberFormatter();
  var normalized = data.filter(function (item) {
    return parseInt(item.num, 10) > 0;
  }).sort(function (a, b) {
    var aStat = parseInt(a.num, 10);
    var bStat = parseInt(b.num, 10);
    if (aStat === bStat) return 0;
    return aStat > bStat ? -1 : 1;
  }).map(function (item, index) {
    var num = item.num.toString();
    var output = {
      name: item.name,
      num: num,
      rank: index + 1,
      formatted: {
        country: countryNames[item.name] || item.name,
        fullStat: formatNumberWithFallback(num, numberFormatter)
      }
    };
    return output;
  });
  return normalized;
}