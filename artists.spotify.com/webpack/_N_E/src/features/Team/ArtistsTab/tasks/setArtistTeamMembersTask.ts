import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { Logger } from '@mrkt/features/Platform';
import { artistTeamMembersLoader } from '../api/artistTeamMembersLoader';
export var setArtistTeamMembersTask = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(artistUri, labelUri, _ref) {
    var setArtistsTabCurrentTeamMembers, result;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            setArtistsTabCurrentTeamMembers = _ref.setArtistsTabCurrentTeamMembers;
            _context.prev = 1;
            _context.next = 4;
            return artistTeamMembersLoader.load({
              artistUri: artistUri,
              labelUri: labelUri
            });

          case 4:
            result = _context.sent;
            setArtistsTabCurrentTeamMembers(result);
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            Logger.logError('artist-team-transparency', _context.t0);
            throw new Error(_context.t0);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));

  return function setArtistTeamMembersTask(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();