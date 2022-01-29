// ignore-string-externalization
import { createLoader, useRead } from '@spotify-internal/creator-data-loading';
import { S4X_DATA_API, webgateFetch } from '../../shared/lib/api';
var SongPermissionLoader = createLoader(function (props) {
  return webgateFetch("".concat(S4X_DATA_API, "/v1/artist/").concat(props.artistId, "/recording/").concat(props.songId, "/permissions")).then(function (response) {
    if (!response) {
      return {
        status: 204
      }; // No Content
    }

    switch (response.status) {
      case 200:
        return response.json();

      case 400: // Bad Request

      case 403: // Forbidden

      case 404: // Not Found

      default:
        return {
          status: response.status
        };
    }
  }).catch(function (error) {
    return error;
  });
}, {
  cacheKeyFn: function cacheKeyFn(props) {
    return "".concat(props.artistId, ",").concat(props.songId);
  }
});
export function useSongPermissionResource(artistId, songId) {
  return useRead(SongPermissionLoader, {
    artistId: artistId,
    songId: songId
  });
}