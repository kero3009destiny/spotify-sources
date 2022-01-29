import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { useEffect } from 'react';
import { createLoader, useRead } from '@spotify-internal/creator-data-loading';
import { S4X_DATA_API, webgateFetch } from '../../../shared/lib/api';
import { useCurrentArtist } from '../../../features/artists';

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
            url = "".concat(S4X_DATA_API, "/v1/artist/").concat(props.artistId, "/audience/source?time-filter=28day&aggregation-level=recording").concat(countryCode);
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
            return _context.abrupt("return", {
              status: 200,
              payload: data
            });

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
            return _context.abrupt("return", _context.t1);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 16]]);
  }));
  return _load.apply(this, arguments);
}

var SourceOfStreamsLoader = createLoader(load, {
  cacheKeyFn: function cacheKeyFn(props) {
    return "".concat(props.artistId, ",").concat(props.countryCode, ",");
  }
});
export function useSourceOfStreamsData(country) {
  var artist = useCurrentArtist();
  var artistId = artist.id;
  var countryCode = country.code;
  useEffect(function () {
    return function cleanup() {
      SourceOfStreamsLoader.clear({
        artistId: artistId,
        countryCode: countryCode
      });
    };
  }, [artistId, countryCode]);
  return useRead(SourceOfStreamsLoader, {
    artistId: artistId,
    countryCode: countryCode
  });
}