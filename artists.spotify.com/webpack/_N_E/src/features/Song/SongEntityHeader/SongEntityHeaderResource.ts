// ignore-string-externalization
import { useEffect } from 'react';
import { get, S4X_DATA_API } from '../../../shared/lib/api';
import { createResource } from '../../../shared/lib/createResource';
var SongEntityHeaderResource = createResource(function (props) {
  return get("".concat(S4X_DATA_API, "/v1/artist/").concat(props.artistId, "/recording/").concat(props.songId, "/realtime")).then(function (response) {
    if (!response) {
      return {
        statusCode: 204
      };
    }

    return response;
  }).catch(function (error) {
    return error;
  });
}, function (props) {
  return "".concat(props.artistId).concat(props.songId);
});
export function useSongEntityHeaderData(artistId, songId) {
  useEffect(function () {
    // do nothing for now on mount, but invalidate when things change or on unmount
    return function cleanup() {
      SongEntityHeaderResource.invalidate({
        artistId: artistId,
        songId: songId
      });
    };
  }, [artistId, songId]);
  return SongEntityHeaderResource.read({
    artistId: artistId,
    songId: songId
  });
}