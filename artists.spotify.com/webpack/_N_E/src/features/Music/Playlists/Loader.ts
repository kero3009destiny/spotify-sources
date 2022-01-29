// ignore-string-externalization
import _get from 'lodash/get';
import { get, S4X_DATA_API } from '../../../shared/lib/api';
import { createResource } from '../../../shared/lib/createResource';
export var PlaylistsResource = createResource(function (props) {
  return Promise.all([get("".concat(S4X_DATA_API, "/v1/artist/").concat(props.artistId, "/playlists/curated?time-filter=").concat(props.query)), get("".concat(S4X_DATA_API, "/v1/artist/").concat(props.artistId, "/playlists/listener?time-filter=").concat(props.query)), get("".concat(S4X_DATA_API, "/v1/artist/").concat(props.artistId, "/playlists/personalized?time-filter=").concat(props.query))]).then(function (response) {
    // @ts-ignore
    if (!response || !response.length === 0) {
      return {
        status: 204
      };
    }

    var _ref = [response[0], response[1], response[2]],
        curated = _ref[0],
        listener = _ref[1],
        personalized = _ref[2];
    return {
      algorithmic: {
        playlists: _get(personalized, 'data', [])
      },
      editorial: {
        playlists: _get(curated, 'data', []),
        count: _get(curated, 'playlistOverall', '0')
      },
      listener: {
        playlists: _get(listener, 'data', []),
        count: _get(listener, 'playlistOverall', '0')
      }
    };
  }).catch(function (error) {
    if (error.name === 'ResponseError') {
      return {
        status: error.statusCode
      };
    }

    throw error;
  });
}, function (props) {
  return "".concat(props.artistId).concat(props.query);
} // when key changes the loader is called again
);