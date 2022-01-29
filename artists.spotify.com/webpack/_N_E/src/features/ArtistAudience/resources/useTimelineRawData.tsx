import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import qs from 'query-string';
import has from 'lodash/has';
import { createLoader, useRead } from '@spotify-internal/creator-data-loading';
import { S4X_DATA_API, webgateFetch } from '../../../shared/lib/api';
import { useCurrentArtist } from '../../../features/artists';
import { SIX_HOURS } from './constants';

var cacheKeyFn = function cacheKeyFn(props) {
  return "".concat(props.artistId, ",").concat(props.type, ",").concat(props.artists.join(';'), ",").concat(JSON.stringify(props.params), ",").concat(props.countryCode);
};

function load(_x) {
  return _load.apply(this, arguments);
}

function _load() {
  _load = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(props) {
    var countryCode, allArtists, allPromises, results, statusCode, data;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            countryCode = props.countryCode && props.countryCode !== 'worldwide' ? "&country=".concat(props.countryCode) : '';
            allArtists = props.artists.concat([props.artistId]);
            allPromises = allArtists.map( /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(artist) {
                var endpoint, res, data;
                return _regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        endpoint = "".concat(S4X_DATA_API, "/v1/artist/").concat(props.artistId, "/audience/timeline/").concat(props.type, "/").concat(artist, "?").concat(qs.stringify(props.params, false), "&aggregation-level=recording").concat(countryCode);
                        _context.next = 3;
                        return webgateFetch(endpoint);

                      case 3:
                        res = _context.sent;
                        _context.t0 = res.status;
                        _context.next = _context.t0 === 200 ? 7 : 11;
                        break;

                      case 7:
                        _context.next = 9;
                        return res.json();

                      case 9:
                        data = _context.sent;
                        return _context.abrupt("return", data);

                      case 11:
                        return _context.abrupt("return", {
                          status: res.status
                        });

                      case 12:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x2) {
                return _ref.apply(this, arguments);
              };
            }());
            _context2.prev = 3;
            _context2.next = 6;
            return Promise.all(allPromises);

          case 6:
            results = _context2.sent;
            statusCode = results.find(function (res) {
              return has(res, 'status');
            });

            if (!statusCode) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", statusCode);

          case 10:
            data = allArtists.reduce(function (accum, artist, index) {
              return _objectSpread(_objectSpread({}, accum), {}, _defineProperty({}, artist, results[index]));
            }, {});
            return _context2.abrupt("return", data);

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](3);
            return _context2.abrupt("return", {
              status: 500
            });

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 14]]);
  }));
  return _load.apply(this, arguments);
}

var useTimelineLoader = createLoader(load, {
  cacheKeyFn: cacheKeyFn
});
setInterval(function () {
  useTimelineLoader.clearAll();
}, SIX_HOURS);
export function useTimelineRawData(query, country) {
  var artist = useCurrentArtist();
  var artistId = artist.id;
  var type = query.type,
      artists = query.artists,
      params = query.params;
  var countryCode = country.code;
  return useRead(useTimelineLoader, {
    artistId: artistId,
    type: type,
    artists: artists,
    params: params,
    countryCode: countryCode
  });
}