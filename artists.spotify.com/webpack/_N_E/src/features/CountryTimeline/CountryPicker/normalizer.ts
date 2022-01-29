// ignore-string-externalization
import { useCountryNames } from '@mrkt/features/country-names';
export function useCountryPickerNormalizer() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var countryNames = useCountryNames();
  if (!countryNames) throw new Error('countries undefined not supported');
  var sortedData = data.filter(function (d) {
    return !!d.hasRights;
  }).map(function (d) {
    return {
      code: d.countryCode,
      value: countryNames[d.countryCode] || d.countryCode
    };
  }).sort(function (a, b) {
    if (a.value < b.value) return -1;
    if (a.value > b.value) return 1;
    return 0;
  });
  return sortedData;
}