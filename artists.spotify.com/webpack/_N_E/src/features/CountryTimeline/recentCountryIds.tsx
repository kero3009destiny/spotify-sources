// ignore-string-externalization
import localStorageFallback from 'local-storage-fallback';
import { isoCountries } from '../Countries';
export function setRecentCountryIds(username, artistId, songId, countryIds) {
  var key = "".concat(username, ":").concat(artistId, ":").concat(songId, ":recentCountryIds");
  localStorageFallback.setItem(key, (countryIds || []).join(','));
}
export function getRecentCountryIds(username, artistId, songId) {
  var key = "".concat(username, ":").concat(artistId, ":").concat(songId, ":recentCountryIds");
  var json = localStorageFallback.getItem(key);

  if (json) {
    // filter out invalid countries
    return json.split(',').filter(function (d) {
      return Object.keys(isoCountries).includes(d);
    });
  }

  return null;
}