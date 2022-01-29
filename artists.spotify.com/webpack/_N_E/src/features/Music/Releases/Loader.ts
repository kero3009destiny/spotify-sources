// ignore-string-externalization
import { get, S4X_DATA_API } from '../../../shared/lib/api';
import { createResource } from '../../../shared/lib/createResource';
export var ReleasesResource = createResource(function (props) {
  return get("".concat(S4X_DATA_API, "/v1/artist/").concat(props.artistId, "/releases/released?time-filter=").concat(props.query)).then(function (response) {
    if (!response || !response.releases || response.releases.length === 0) {
      return {
        statusCode: 204
      };
    }

    return response;
  }).catch(function () {
    return {
      name: 'ResponseError'
    };
  });
}, function (props) {
  return "".concat(props.artistId).concat(props.query);
} // when key changes the loader is called again
);