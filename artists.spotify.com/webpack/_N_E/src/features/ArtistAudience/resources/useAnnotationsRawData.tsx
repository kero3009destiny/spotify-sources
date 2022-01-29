import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import qs from 'query-string';
import { createLoader, useRead } from '@spotify-internal/creator-data-loading';
import { S4X_DATA_API, webgateFetch } from '../../../shared/lib/api';
import { useCurrentArtist } from '../../../features/artists';
import { SIX_HOURS } from './constants';

function load(_x) {
  return _load.apply(this, arguments);
}

function _load() {
  _load = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(props) {
    var countryCode, url, response, data;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            countryCode = props.countryCode && props.countryCode !== 'worldwide' ? "&country=".concat(props.countryCode) : '';
            url = "".concat(S4X_DATA_API, "/v1/artist/").concat(props.artistId, "/audience/timeline/annotations/").concat(props.artistId, "?").concat(qs.stringify(props.queryParams, false), "&aggregation-level=recording").concat(countryCode);
            _context.prev = 2;
            _context.next = 5;
            return webgateFetch(url);

          case 5:
            response = _context.sent;
            _context.t0 = response.status;
            _context.next = _context.t0 === 200 ? 9 : 13;
            break;

          case 9:
            _context.next = 11;
            return response.json();

          case 11:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 13:
            return _context.abrupt("return", {
              status: response.status
            });

          case 14:
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t1 = _context["catch"](2);
            return _context.abrupt("return", {
              status: 500
            });

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 16]]);
  }));
  return _load.apply(this, arguments);
}

var useAnnotationsLoader = createLoader(load, {
  cacheKeyFn: function cacheKeyFn(props) {
    return "".concat(props.artistId, ",").concat(JSON.stringify(props.queryParams), ",").concat(props.countryCode, ",");
  }
});
setInterval(function () {
  useAnnotationsLoader.clearAll();
}, SIX_HOURS);
export function useAnnotationsRawData(queryParams, country) {
  var artist = useCurrentArtist();
  var artistId = artist.id;
  var countryCode = country.code;
  return useRead(useAnnotationsLoader, {
    artistId: artistId,
    queryParams: queryParams,
    countryCode: countryCode
  });
}