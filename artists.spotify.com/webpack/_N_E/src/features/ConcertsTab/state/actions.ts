import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
// @ts-ignore
import createAction from 'redux-actions/lib/createAction';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { FETCH_CONCERT_VIEW } from '../../../shared/store';
import { get } from '../../../shared/lib/api';
export var fetchConcertView = createAction(FETCH_CONCERT_VIEW, /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref) {
    var artistId, _ref$useNewEndpoint, useNewEndpoint, endpoint, response;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            artistId = _ref.artistId, _ref$useNewEndpoint = _ref.useNewEndpoint, useNewEndpoint = _ref$useNewEndpoint === void 0 ? false : _ref$useNewEndpoint;
            endpoint = "https://generic.wg.spotify.com/sponcerts/v3/s4a/concerts/artist/".concat(artistId);
            _context.prev = 2;
            _context.next = 5;
            return get(
            /* istanbul ignore next */
            useNewEndpoint ? "".concat(endpoint, "?greyedOutRow=true") : endpoint);

          case 5:
            response = _context.sent;
            return _context.abrupt("return", response);

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](2);

            // track Gateway timeouts

            /* istanbul ignore next */
            if (_context.t0.message === '504') {
              sendEvent({
                eventCategory: 'concerts',
                eventAction: 'timeout',
                eventLabel: '504 Request Timeout'
              });
            }

            throw _context.t0;

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 9]]);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}());