// ignore-string-externalization
import { createResource } from '../../../shared/lib/createResource';
import { WEBGATE_DOMAIN, webgateFetchJson } from '../../../shared/lib/api';
// eslint-disable-line
import { formatArtist } from './formatArtist';
export var ArtistsResource = createResource(function () {
  return webgateFetchJson("".concat(WEBGATE_DOMAIN, "/s4x-me/v0/artists")).then(function (_ref) {
    var artists = _ref.artists;
    return artists.map(formatArtist);
  });
});
export function useArtists() {
  return ArtistsResource.read();
}