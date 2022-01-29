import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.acf7316e-c5eb-4849-947a-e5dd91fd7b9e/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.acf7316e-c5eb-4849-947a-e5dd91fd7b9e/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { createResource } from '../../../shared/lib/createResource';
import { useCurrentArtistId } from './useCurrentArtistId';
import { getCanvasPermissions } from '@mrkt/features/canvas/lib/actions';
import { CANVAS_PERMISSION_EDITOR } from '@mrkt/features/canvas/lib/constants';
var ArtistCanvasAccessResource = createResource( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(artistId) {
    var permissions;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getCanvasPermissions(artistId);

          case 2:
            permissions = _context.sent;
            return _context.abrupt("return", permissions.includes(CANVAS_PERMISSION_EDITOR));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
export function useCurrentArtistCanvasAccess() {
  var artistId = useCurrentArtistId();
  return ArtistCanvasAccessResource.read(artistId);
}