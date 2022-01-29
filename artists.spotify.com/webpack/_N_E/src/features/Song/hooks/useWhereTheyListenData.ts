// ignore-string-externalization
import { useEffect } from 'react';
import { createResource } from '../../../shared/lib/createResource';
import { S4X_DATA_API, webgateFetch } from '../../../shared/lib/api';
import { useCurrentArtist } from '../../../features/artists';
export var WhereTheyListenResource = createResource(function (props) {
  return webgateFetch("".concat(S4X_DATA_API, "/v1/artist/").concat(props.artistId, "/recording/").concat(props.songId, "/locations/streams?time-filter=28day&aggregation-level=recording")).then(function (response) {
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
  });
}, function (props) {
  return "".concat(props.artistId).concat(props.songId);
} // when key changes the loader is called again
);
export function useWhereTheyListenData(songId) {
  var artist = useCurrentArtist();
  useEffect(function () {
    // do nothing for now on mount, but invalidate when things change or on unmount
    return function cleanup() {
      WhereTheyListenResource.invalidate({
        artistId: artist.id,
        songId: songId
      });
    };
  }, [artist.id, songId]);
  return WhereTheyListenResource.read({
    artistId: artist.id,
    songId: songId
  });
}