// ignore-string-externalization
import { createResource } from '../../../shared/lib/createResource';
import { WEBGATE_DOMAIN, webgateFetchJson } from '../../../shared/lib/api';
// eslint-disable-line
import { formatArtist } from './formatArtist';
var InitialArtistsResource = createResource(function () {
  return webgateFetchJson("".concat(WEBGATE_DOMAIN, "/creator-search-service/v0/artists/initial")).then(function (_ref) {
    var artists = _ref.artists;
    return artists.map(formatArtist);
  });
});
export function useInitialArtists() {
  return InitialArtistsResource.read(0);
}