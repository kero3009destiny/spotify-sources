// ignore-string-externalization
import has from 'lodash/has';
import { spotifyOpenLink } from '../../../shared/lib/urlHelpers';
export function normalize() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var imageWidthMinimum = 50;
  return data.slice(0, 10).map(function (artist) {
    return {
      artistName: has(artist, 'name') ? artist.name : 'N/A',
      imageUrl: artist.images.reduce(function (acum, image) {
        if (!acum.width) return image;
        return image.width >= imageWidthMinimum * (window.devicePixelRatio || 1) && image.width < acum.width ? image : acum;
      }, {}).url,
      key: artist.id,
      spotifyLink: has(artist, 'uri') ? spotifyOpenLink(artist.uri) : undefined
    };
  });
}