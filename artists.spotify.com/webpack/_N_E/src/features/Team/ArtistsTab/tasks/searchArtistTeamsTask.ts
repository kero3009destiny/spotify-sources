import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { Logger } from '@mrkt/features/Platform';
import { artistTeamsLoader } from '../api/artistTeamsLoader';
export var searchArtistTeamsTask = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(labelUri, query, _ref) {
    var setArtistsTabSearchQuery, setArtistsTabTeams, result;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            setArtistsTabSearchQuery = _ref.setArtistsTabSearchQuery, setArtistsTabTeams = _ref.setArtistsTabTeams;
            setArtistsTabSearchQuery(query);
            _context.prev = 2;
            _context.next = 5;
            return artistTeamsLoader.load({
              labelUri: labelUri,
              query: query
            });

          case 5:
            result = _context.sent;
            setArtistsTabTeams(result);
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](2);
            Logger.logError('artist-team-transparency', _context.t0);
            throw new Error(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 9]]);
  }));

  return function searchArtistTeamsTask(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();