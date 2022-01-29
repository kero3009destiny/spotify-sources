// ignore-string-externalization
import { TIME_FILTER, SONGS_ROUTE, FILTER_VALUE_ALL, FILTER_VALUE_LAST5YEARS, useGetCatalogFilterOptions } from './constants';
import { deriveRoute, validateQueryOptions } from './urls';
export function useGetSelectedFilter() {
  var getCatalogFilterOptions = useGetCatalogFilterOptions();
  var CATALOG_FILTER_OPTIONS = getCatalogFilterOptions(SONGS_ROUTE);
  return function setSelectedFilter(location) {
    var route = deriveRoute(location.pathname); // always validate against SONGS_ROUTE options to maintain the FILTER_VALUE_ALL override

    var selectedFilter = validateQueryOptions(TIME_FILTER, location.search, CATALOG_FILTER_OPTIONS, route);

    if (selectedFilter === FILTER_VALUE_ALL && route !== SONGS_ROUTE) {
      /**
       * The songs route is the only route that contains a filter value
       * of 'all'. Here we're resetting that value to 'last5years' when
       * a user navigates to the 'releases' and 'playlists' routes.
       */
      selectedFilter = FILTER_VALUE_LAST5YEARS;
    }

    return selectedFilter;
  };
}