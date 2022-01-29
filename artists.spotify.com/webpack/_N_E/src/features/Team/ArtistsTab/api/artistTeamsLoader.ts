import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { createLoader } from '@spotify-internal/creator-data-loading';
import { webgateFetchJson } from '@mrkt/features/webgate-fetch';
import { Logger } from '@mrkt/features/Platform';
import { MARKETPLACE_MGMT_API } from '../../../../shared/lib/api';
import { uriToMiniTeam } from '../../lib/util/uriToMiniTeam';

var toUrl = function toUrl(params) {
  return "".concat(params.labelUri).concat(params.query ? "?q=".concat(params.query) : '');
};

function rawTeamToTeam(_ref) {
  var uri = _ref.uri,
      name = _ref.name,
      imageUrl = _ref.imageUrl;
  return _objectSpread(_objectSpread({}, uriToMiniTeam(uri)), {}, {
    name: name,
    imageUrl: imageUrl
  });
}

export var artistTeamsLoader = createLoader( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(params) {
    var response;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return webgateFetchJson("".concat(MARKETPLACE_MGMT_API, "/v1/fullteam/artists/").concat(toUrl(params), " "));

          case 3:
            response = _context.sent;
            return _context.abrupt("return", response.map(rawTeamToTeam));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            Logger.logError('artist-team-transparency', _context.t0);
            throw new Error(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}(), {
  cacheKeyFn: function cacheKeyFn(params) {
    return toUrl(params);
  }
});