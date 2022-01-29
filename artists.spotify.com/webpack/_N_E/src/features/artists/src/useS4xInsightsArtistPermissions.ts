import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { useEffect } from 'react';
import { createResource } from '../../../shared/lib/createResource';
import { webgateFetchJson, S4X_DATA_API } from '../../../shared/lib/api';
import { useCurrentArtist } from './useCurrentArtist';
import { useCurrentArtistPermissions } from './useCurrentArtistPermissions';
import { VIEWER } from './permissions';
export var ArtistStatPermission;

(function (ArtistStatPermission) {
  ArtistStatPermission["STATS_AUDIENCE"] = "STATS_AUDIENCE";
  ArtistStatPermission["STATS_UPCOMING"] = "STATS_UPCOMING";
  ArtistStatPermission["STATS_PLAYLISTS"] = "STATS_PLAYLISTS";
})(ArtistStatPermission || (ArtistStatPermission = {}));

var S4xInsightsArtistPermissionsResource = createResource( /*#__PURE__*/function () {
  var _loadArtistPermissions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(artistId) {
    var response;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return webgateFetchJson("".concat(S4X_DATA_API, "/v1/artist/").concat(artistId, "/permissions")).then(function (_ref) {
              var permissions = _ref.permissions;
              return permissions;
            }).catch(function () {
              return [];
            });

          case 2:
            response = _context.sent;
            return _context.abrupt("return", response);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  function loadArtistPermissions(_x) {
    return _loadArtistPermissions.apply(this, arguments);
  }

  return loadArtistPermissions;
}());
export var useS4xInsightsArtistPermissions = function useS4xInsightsArtistPermissions() {
  var artist = useCurrentArtist();
  useEffect(function () {
    return function cleanup() {
      S4xInsightsArtistPermissionsResource.invalidate(artist.id);
    };
  }, [artist.id]);
  return S4xInsightsArtistPermissionsResource.read(artist.id);
};
export function useHasS4XInsights() {
  var permissions = useCurrentArtistPermissions();
  var statsPermissions = useS4xInsightsArtistPermissions();
  return statsPermissions.includes(ArtistStatPermission.STATS_UPCOMING) && !permissions.includes(VIEWER);
}