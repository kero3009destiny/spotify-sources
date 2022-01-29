import { useCountryNames } from '@mrkt/features/country-names';
import { useNumberFormatter, useT } from '@mrkt/features/i18n';
import { formatNumberWithFallback } from '@mrkt/features/stats-components/utils';

var getStateCode = function getStateCode(d) {
  return d.country === 'US' ? "".concat(d.region, ", ") : '';
};

var getCityCountryString = function getCityCountryString(d, isoCountries) {
  return "".concat(d.city, ", ").concat(getStateCode(d)).concat(isoCountries[d.country]);
};

export function useTopCitiesNormalizer() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var t = useT();
  var numberFormatter = useNumberFormatter();
  var isoCountries = useCountryNames();
  if (!isoCountries) throw new Error('countries undefined not supported');
  var normalized = data.map(function (location, index) {
    var _location$name, _location$country, _location$region;

    var count = parseInt(location.num, 10);
    var city = (_location$name = location === null || location === void 0 ? void 0 : location.name) !== null && _location$name !== void 0 ? _location$name : 'N/A';
    var country = (_location$country = location === null || location === void 0 ? void 0 : location.country) !== null && _location$country !== void 0 ? _location$country : 'N/A';
    var region = (_location$region = location === null || location === void 0 ? void 0 : location.region) !== null && _location$region !== void 0 ? _location$region : "region-".concat(index);
    var output = {
      city: city,
      count: count,
      country: country,
      region: region,
      formatted: {
        cityCountry: getCityCountryString({
          city: city,
          country: country,
          region: region
        }, isoCountries),
        fullStat: Number.isNaN(count) ? t('TOP_CITIES_NORMALIZER_f625b4', 'N/A', 'Not available.') : formatNumberWithFallback(count, numberFormatter)
      }
    };
    return output;
  }).sort(function (a, b) {
    return b.count - a.count;
  });
  return normalized;
}