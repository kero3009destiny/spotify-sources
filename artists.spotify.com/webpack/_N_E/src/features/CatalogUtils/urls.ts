import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import qs from 'query-string';
import { DEFAULT_FILTER, DEFAULT_ROUTE, FILTER_VALUE_ALL, RELEASES_ROUTE, SONGS_ROUTE, PLAYLISTS_ROUTE, UPCOMING_ROUTE, FILTER_VALUE_LAST5YEARS } from './constants';

/**
 * Extracts a route from a location path.
 */
export var deriveRoute = function deriveRoute(pathname) {
  var defaultRoute = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_ROUTE;
  // @todo: refactor once tabbed navigation is rolled out to 100%
  var currentSubRoute = (pathname.split('/').pop() || defaultRoute).split('?')[0];
  var catalogRoutes = [RELEASES_ROUTE, UPCOMING_ROUTE, SONGS_ROUTE, PLAYLISTS_ROUTE];

  if (catalogRoutes.includes(currentSubRoute)) {
    return currentSubRoute;
  }

  return defaultRoute;
};
/**
 * Extracts filter value from a location path.
 */

export var getQueryFromUrl = function getQueryFromUrl(queryType, query) {
  var queryObj = qs.parse(query);
  return queryObj[queryType];
};
/**
 * Validates a queryString and returns a valid option from dropdowns.
 */

export var validateQueryOptions = function validateQueryOptions(queryType, query, filterOptions, route) {
  if (filterOptions.length === 0) {
    // fall out if no filterOptions
    return undefined;
  }

  var selectedFilter = getQueryFromUrl(queryType, query);

  if (selectedFilter === FILTER_VALUE_ALL && route !== SONGS_ROUTE) {
    /**
     * The songs route is the only route that contains a filter value
     * of 'all'. Here we're resetting that value to 'last5years' when
     * a user navigates to the 'releases' and 'playlists' routes.
     */
    selectedFilter = FILTER_VALUE_LAST5YEARS;
  }

  return filterOptions.find(function (d) {
    return d.value === selectedFilter;
  }) ? selectedFilter : DEFAULT_FILTER;
};
/**
 * Generates a URL for the song detail page.
 */

export var generateSongDetailUrl = function generateSongDetailUrl(track, artistId) {
  return "/artist/".concat(artistId, "/song/").concat(track.trackURI.split(':')[2]);
};
/**
 * Generates a query string from the new parameter.
 */

export var getQueryStringFromObj = function getQueryStringFromObj(newParam, query) {
  var queryObj = qs.parse(query);
  return qs.stringify(_objectSpread(_objectSpread({}, queryObj), newParam));
};