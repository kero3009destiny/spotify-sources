import _defineProperty from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { useNumberFormatter } from '@mrkt/features/i18n';
import invariant from 'invariant';
import { useCountryNames } from '@mrkt/features/country-names';
/**
 * Normalizes the data for use in the column chart
 * @param  {Array} data – The original payload
 * @return {Object} – Normalized data
 */

export function useLocationsNormalizer(data) {
  invariant(data instanceof Object, 'data must be an object');
  var countryNames = useCountryNames();
  var numberFormatter = useNumberFormatter();
  return data.filter(function (d) {
    return d instanceof Object;
  }) // each element must be an Object
  .sort(function (a, b) {
    var aStat = parseInt(a.num, 10);
    var bStat = parseInt(b.num, 10);
    if (aStat === bStat) return 0;
    return aStat > bStat ? -1 : 1;
  }).reduce(function (acum, _ref, idx) {
    var name = _ref.name,
        num = _ref.num;
    return _objectSpread(_objectSpread({}, acum), {}, _defineProperty({}, name, {
      count: parseInt(num, 10),
      rank: idx + 1,
      // @ts-ignore
      name: countryNames[name] || name,
      formatted_count: numberFormatter.format(num)
    }));
  }, {});
}