import _toConsumableArray from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
import { useT } from '@mrkt/features/i18n';

function compare(a, b) {
  var labelA = Number(a.label);
  var labelB = Number(b.label);
  var comparison = 0;

  if (labelA < labelB) {
    comparison = 1;
  } else if (labelA > labelB) {
    comparison = -1;
  }

  return comparison;
}

export var yearRegex = /^year\d{4}$/i;
export var maxYear = new Date(Date.now()).getFullYear();
export var minYear = maxYear - 5;
export function getPresetYears() {
  var range = maxYear - minYear + 1;
  return _toConsumableArray(Array(range).keys()).reduce(function (prev, _curr, index) {
    var year;

    if (index === 0) {
      year = minYear;
    } else {
      year = Number(prev[index - 1].label) + 1;
    }

    return prev.concat({
      label: "".concat(year),
      value: "year".concat(year)
    });
  }, []).sort(compare);
}
export var FILTER_OPTIONS = function FILTER_OPTIONS(t) {
  return [{
    label: t('CHART_FILTER_OPTIONS_6b855d', 'Last 7 days', 'Dropdown option for a timeline chart that filters data for the last 7 days.'),
    value: '7day'
  }, {
    label: t('CHART_FILTER_OPTIONS_c80388', 'Last 28 days', 'Dropdown option for a timeline chart that filters data for the last 28 days.'),
    value: '28day'
  }, {
    label: t('CHART_FILTER_OPTIONS_366b1e', 'Since 2015', 'Dropdown option for a timeline chart that filters data for the last 5 years.'),
    value: 'last5years'
  }];
};
export var SONG_TIMELINE_FILTER_OPTIONS_SMALL_SCREEN = function SONG_TIMELINE_FILTER_OPTIONS_SMALL_SCREEN(t) {
  return [{
    label: t('CHART_FILTER_OPTIONS_0039cd', 'Last 7 days', 'Dropdown option for a song timeline chart that filters data for the last 7 days.'),
    value: '7day'
  }, {
    label: t('CHART_FILTER_OPTIONS_ea4fbc', 'Last 28 days', 'Dropdown option for a song timeline chart that filters data for the last 28 days.'),
    value: '28day'
  }, {
    label: t('CHART_FILTER_OPTIONS_b2461f', 'Last 12 months', 'Dropdown option for a song timeline chart that filters data for the last 12 months.'),
    value: '1year'
  }];
};
export var SONG_TIMELINE_FILTER_OPTIONS = function SONG_TIMELINE_FILTER_OPTIONS(t) {
  return [{
    label: t('CHART_FILTER_OPTIONS_4b986e', 'Last 7 days', 'Dropdown option for a song timeline chart that filters data for the last 7 days.'),
    value: '7day'
  }, {
    label: t('CHART_FILTER_OPTIONS_b7c43c', 'Last 28 days', 'Dropdown option for a song timeline chart that filters data for the last 28 days.'),
    value: '28day'
  }, {
    label: t('CHART_FILTER_OPTIONS_50c22a', 'Last 12 months', 'Dropdown option for a song timeline chart that filters data for the last 12 months.'),
    value: '1year'
  }, {
    label: t('CHART_FILTER_OPTIONS_a2a1fa', 'Custom', 'Dropdown option for a song timeline chart that filters data for a custom timeframe.'),
    value: 'custom'
  }];
};
export var TIMELINE_FILTERS_YEARLY_PRESETS = function TIMELINE_FILTERS_YEARLY_PRESETS(t) {
  return [{
    label: t('CHART_FILTER_OPTIONS_82e99c', 'Last 7 days', 'Dropdown option for a timeline chart that filters data for the last 7 days.'),
    value: '7day'
  }, {
    label: t('CHART_FILTER_OPTIONS_d3ddd0', 'Last 28 days', 'Dropdown option for a timeline chart that filters data for the last 28 days.'),
    value: '28day'
  }].concat(getPresetYears());
};
export var animationDuration = 250;
export var useGetFilterOptions = function useGetFilterOptions() {
  var t = useT();
  var filterOptions = {
    FILTER_OPTIONS: FILTER_OPTIONS,
    SONG_TIMELINE_FILTER_OPTIONS_SMALL_SCREEN: SONG_TIMELINE_FILTER_OPTIONS_SMALL_SCREEN,
    SONG_TIMELINE_FILTER_OPTIONS: SONG_TIMELINE_FILTER_OPTIONS,
    TIMELINE_FILTERS_YEARLY_PRESETS: TIMELINE_FILTERS_YEARLY_PRESETS
  };
  return function getFilterOptions(key) {
    var generateFilters = filterOptions[key];
    return generateFilters(t);
  };
};