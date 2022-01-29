import _defineProperty from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { useCollator, useT } from '@mrkt/features/i18n';
import { useCountryNames } from '@mrkt/features/country-names';
export function useNormalizeCountryNames(countries) {
  var t = useT();
  var collator = useCollator();
  var countryNames = useCountryNames();
  return countries.map(function (val) {
    var _countryNames$val$cou;

    return _objectSpread(_objectSpread({}, val), {}, {
      // @todo: ping UX writer for copy
      // https://trello.com/c/PB8Tonz1/1222-copy-for-missing-country-names
      country_name: (_countryNames$val$cou = countryNames[val.country_code]) !== null && _countryNames$val$cou !== void 0 ? _countryNames$val$cou : t('split-rights-62fdd8', 'Country name not available', 'Error text that appears if a country name cannot be found.')
    });
  }).sort(function (_ref, _ref2) {
    var a = _ref.country_name;
    var b = _ref2.country_name;
    return collator.compare(a, b);
  });
}