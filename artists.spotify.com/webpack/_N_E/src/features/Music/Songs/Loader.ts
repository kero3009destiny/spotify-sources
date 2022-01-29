// ignore-string-externalization
import { get, S4X_DATA_API } from '../../../shared/lib/api';
import { createResource } from '../../../shared/lib/createResource';
var Loader = createResource(function (props) {
  return get("".concat(S4X_DATA_API, "/v2/artist/").concat(props.artistId, "/recordings?aggregation-level=recording&time-filter=").concat(props.query)).then(function (response) {
    if (!response || !response.recordingStats || response.recordingStats.length === 0) {
      return {
        statusCode: 204
      };
    }

    return response;
  }).catch(function (error) {
    return error;
  });
}, function (props) {
  return "".concat(props.artistId).concat(props.query);
} // when key changes the loader is called again
);
/* eslint-disable-next-line import/no-default-export */

export default Loader;