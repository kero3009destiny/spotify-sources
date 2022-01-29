import { useT } from '@mrkt/features/i18n'; // Catalog Routes

export var UPCOMING_ROUTE = 'upcoming'; // Released Routes

export var SONGS_ROUTE = 'songs';
export var PLAYLISTS_ROUTE = 'playlists';
export var RELEASES_ROUTE = 'releases';
export var DEFAULT_ROUTE = SONGS_ROUTE; // Filters

export var TIME_FILTER = 'time-filter';
export var FILTER_VALUE_1DAY = '1day';
export var FILTER_VALUE_7DAY = '7day';
export var FILTER_VALUE_28DAY = '28day';
export var FILTER_VALUE_LAST5YEARS = 'last5years';
export var FILTER_VALUE_ALL = 'all';
export var DEFAULT_FILTER = FILTER_VALUE_28DAY;
export var useGetCatalogFilterOptions = function useGetCatalogFilterOptions() {
  var t = useT();
  var CATALOG_FILTER_OPTIONS = [{
    label: t('CATALOG_UTILS_FILTER_82cc0a', 'Last 24 hours', 'This is label text in a dropdown, and that dropdown filters tabular data.'),
    value: FILTER_VALUE_1DAY
  }, {
    label: t('CATALOG_UTILS_FILTER_b3d567', 'Last 7 days', 'This is label text in a dropdown, and that dropdown filters tabular data.'),
    value: FILTER_VALUE_7DAY
  }, {
    label: t('CATALOG_UTILS_FILTER_33154a', 'Last 28 days', 'This is label text in a dropdown, and that dropdown filters tabular data.'),
    value: FILTER_VALUE_28DAY
  }, {
    label: t('CATALOG_UTILS_FILTER_0ecc18', 'Since 2015', 'This is label text in a dropdown, and that dropdown filters tabular data.'),
    value: FILTER_VALUE_LAST5YEARS
  }];
  var filterOptions = {
    playlists: CATALOG_FILTER_OPTIONS,
    releases: CATALOG_FILTER_OPTIONS,
    songs: [].concat(CATALOG_FILTER_OPTIONS, [{
      label: t('CATALOG_UTILS_FILTER_9937d4', 'All time', 'This is label text in a dropdown, and that dropdown filters tabular data.'),
      value: FILTER_VALUE_ALL
    }])
  };
  return function getCatalogFilterOptions(key) {
    return filterOptions[key];
  };
}; // Thumbnail Sizes

export var THUMB_SMALL = '64px';
export var THUMB_LRG = '96px'; // Icon Sizes

export var ICON_SM = 48;
export var ICON_LG = 64;
export var ICON_SIZE_MORE = 32; // Tracking Exports

export var CATALOG_UPCOMING = 'catalogUpcoming';
export var SUBMIT_FOCUS_TRACK = 'submitFocusTrack';
export var VIEW_FOCUS_TRACK = 'viewFocusTrack';
export var REPLACE_FOCUS_TRACK = 'replaceFocusTrack'; // Aggregation Level

export var RECORDING = 'recording'; // Text Consts

export var EMDASH = '—';