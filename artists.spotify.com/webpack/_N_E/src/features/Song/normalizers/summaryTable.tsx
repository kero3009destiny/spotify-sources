import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { useNumberFormatter, useT } from '@mrkt/features/i18n';
import { EM_DASH, formatNumberWithFallback, formatPercentWithFallback } from '@mrkt/features/stats-components/utils';
import { useCountryNames, useLaunchedCountries } from '@mrkt/features/country-names';

function useGenerateAllowedList(deniedCountries) {
  var deniedCountriesSet = new Set(deniedCountries);
  var launchedCountries = useLaunchedCountries();
  return launchedCountries.filter(function (country) {
    return !deniedCountriesSet.has(country.code);
  }).map(function (country) {
    return country.name;
  });
}

function useGenerateDeniedCountryNames(deniedCountries) {
  var countryNames = useCountryNames();
  return deniedCountries ? deniedCountries.map(function (country) {
    return countryNames[country];
  }) : [];
}

export function useGenerateLabel(rightsType, deniedCountries, strings) {
  var t = useT();
  var allowedCountries = useGenerateAllowedList(deniedCountries);
  var deniedCountryNames = useGenerateDeniedCountryNames(deniedCountries); // full rights

  if (rightsType === 'FULL') {
    return strings.worldwide.name;
  } // split rights


  if (!deniedCountries) {
    return t('SONG_SUMMARY_TABLE_00d78e', 'Worldwide (releases you own)', '');
  }

  if (deniedCountries.length === 1) {
    return t('SONG_SUMMARY_TABLE_a34402', 'Worldwide excluding: {countryNameOne}', 'Example Usage: Worldwide excluding: Argentina', {
      countryNameOne: deniedCountryNames[0]
    });
  }

  if (deniedCountries.length === 2) {
    return t('SONG_SUMMARY_TABLE_ca8028', 'Worldwide excluding: {countryNameOne} and {countryNameTwo}', 'Example Usage: Worldwide excluding: Argentina and Peru', {
      countryNameOne: deniedCountryNames[0],
      countryNameTwo: deniedCountryNames[1]
    });
  }

  if (deniedCountries.length === 3) {
    return t('SONG_SUMMARY_TABLE_dd4467', 'Worldwide excluding: {countryNameOne}, {countryNameTwo}, and {countryNameThree}', 'Example Usage: Worldwide excluding: Norway, Argentina, and Peru', {
      countryNameOne: deniedCountryNames[0],
      countryNameTwo: deniedCountryNames[1],
      countryNameThree: deniedCountryNames[2]
    });
  }

  if (allowedCountries.length > 3) {
    return t('SONG_SUMMARY_TABLE_d07998', '{countryNameOne}, {countryNameTwo}, {countryNameThree}, and {numberOfRemainingCountries} more', 'A list of 3 country names and the number of remaining country names the user can view. Example Usage: Albania, Brazil, Norway, and 23 more.', {
      countryNameOne: allowedCountries[0],
      countryNameTwo: allowedCountries[1],
      countryNameThree: allowedCountries[2],
      numberOfRemainingCountries: allowedCountries.length - 3
    });
  }

  if (allowedCountries.length === 1) {
    return allowedCountries[0];
  }

  if (allowedCountries.length === 2) {
    return t('SONG_SUMMARY_TABLE_80ace1', '{countryNameOne} and {countryNameTwo}', 'Example Usage: Argentina and Peru', {
      countryNameOne: allowedCountries[0],
      countryNameTwo: allowedCountries[1]
    });
  }

  if (allowedCountries.length === 3) {
    return t('SONG_SUMMARY_TABLE_422d75', '{countryNameOne}, {countryNameTwo}, and {countryNameThree}', 'A list of 3 country names. Example Usage: Albania, Brazil, and Norway', {
      countryNameOne: allowedCountries[0],
      countryNameTwo: allowedCountries[1],
      countryNameThree: allowedCountries[2]
    });
  }

  return '';
}
export function useSummaryTableNormalizer() {
  var numFormatter = useNumberFormatter();
  var percentFormatter = useNumberFormatter({
    style: 'percent'
  });
  return function normalize(data) {
    return data.summaryRow.map(function (row) {
      var hasDelta = (row === null || row === void 0 ? void 0 : row.deltaPct) && isFinite(row.deltaPct);
      var hasStreams = row === null || row === void 0 ? void 0 : row.streams;
      var hasStreamsPrevious = row === null || row === void 0 ? void 0 : row.streamsPrevious;
      var formattedDelta = hasDelta ? formatPercentWithFallback(row.deltaPct, percentFormatter) : EM_DASH;
      return {
        deltaPct: formattedDelta,
        comparisonDelta: row.deltaPct,
        rightsType: row === null || row === void 0 ? void 0 : row.rightsType,
        deniedCountries: row === null || row === void 0 ? void 0 : row.deniedCountries,
        streams: hasStreams ? formatNumberWithFallback(row.streams, numFormatter) : EM_DASH,
        streamsPrevious: hasStreamsPrevious ? formatNumberWithFallback(row.streamsPrevious, numFormatter) : EM_DASH,
        originalValues: _objectSpread({}, row)
      };
    });
  };
}