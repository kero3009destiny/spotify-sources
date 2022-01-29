import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import moment from 'moment';
import { createLoader, useRead } from '@spotify-internal/creator-data-loading';
import { S4X_DATA_API, webgateFetch } from '../../shared/lib/api';
import { useCurrentArtist } from '../artists';
var mostRecentDateWithDataLoader = createLoader( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
  var fallbackDate, response, payload, momentDate;
  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          fallbackDate = moment().utc().subtract(1, 'day').startOf('day');
          _context.prev = 1;
          _context.next = 4;
          return webgateFetch("".concat(S4X_DATA_API, "/v1/meta/latest-date"));

        case 4:
          response = _context.sent;

          if (!(response && response.status === 200)) {
            _context.next = 11;
            break;
          }

          _context.next = 8;
          return response.json();

        case 8:
          payload = _context.sent;
          momentDate = moment(payload.latest_date).utc().startOf('day');
          return _context.abrupt("return", momentDate);

        case 11:
          return _context.abrupt("return", fallbackDate);

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", fallbackDate);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[1, 14]]);
})));
export function useMostRecentDateWithData() {
  var _useCurrentArtist = useCurrentArtist(),
      artistId = _useCurrentArtist.id;

  return useRead(mostRecentDateWithDataLoader, artistId);
}