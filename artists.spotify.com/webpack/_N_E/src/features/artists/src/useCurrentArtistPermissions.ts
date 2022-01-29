import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { createResource } from '../../../shared/lib/createResource';
import { webgateFetch, WEBGATE_DOMAIN } from '../../../shared/lib/api';
import { useCurrentArtistId } from './useCurrentArtistId';
// eslint-disable-line
var ArtistPermissionsResource = createResource( /*#__PURE__*/function () {
  var _loadArtistPermissions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(artistId) {
    var response, _yield, permissions;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return webgateFetch("".concat(WEBGATE_DOMAIN, "/s4x-me/v0/artists/").concat(artistId, "/permissions"));

          case 2:
            response = _context.sent;

            if (!(response.status >= 500)) {
              _context.next = 5;
              break;
            }

            throw new Error("".concat(response.status, " ").concat(response.url));

          case 5:
            if (!(response.status >= 400)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", []);

          case 7:
            _context.next = 9;
            return response.json();

          case 9:
            _yield = _context.sent;
            permissions = _yield.permissions;
            return _context.abrupt("return", permissions);

          case 12:
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
export function useCurrentArtistPermissions() {
  var artistId = useCurrentArtistId();
  return useArtistPermissions(artistId);
}
export function useArtistPermissions(artistId) {
  return ArtistPermissionsResource.read(artistId);
}