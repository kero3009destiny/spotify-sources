import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { useEffect } from 'react';
import { createLoader, useRead } from '@spotify-internal/creator-data-loading';
import { S4X_DATA_API, webgateFetch } from '../../../shared/lib/api';
import { TimeFilterOptions } from '../../TimelineDatePicker';

function load(_x) {
  return _load.apply(this, arguments);
}

function _load() {
  _load = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(props) {
    var baseUrl, dateRangeString, url, response, data;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            baseUrl = "".concat(S4X_DATA_API, "/v1/artist/").concat(props.artistId, "/recording/").concat(props.songId, "/timeline/streams?aggregation-level=recording&time-filter=").concat(props.timeFilter);
            dateRangeString = props.timeFilter === TimeFilterOptions.CUSTOM ? "&start-date=".concat(props.startDate, "&end-date=").concat(props.endDate) : '';
            url = baseUrl.concat(dateRangeString);
            _context.prev = 3;
            _context.next = 6;
            return webgateFetch(url);

          case 6:
            response = _context.sent;
            _context.t0 = response.status;
            _context.next = _context.t0 === 200 ? 10 : _context.t0 === 204 ? 14 : _context.t0 === 400 ? 15 : _context.t0 === 401 ? 15 : _context.t0 === 403 ? 15 : _context.t0 === 404 ? 15 : 16;
            break;

          case 10:
            _context.next = 12;
            return response.json();

          case 12:
            data = _context.sent;
            return _context.abrupt("return", {
              status: 200,
              payload: data
            });

          case 14:
            return _context.abrupt("return", {
              status: 204
            });

          case 15:
            return _context.abrupt("return", {
              status: 403
            });

          case 16:
            return _context.abrupt("return", {
              status: response.status
            });

          case 17:
            _context.next = 22;
            break;

          case 19:
            _context.prev = 19;
            _context.t1 = _context["catch"](3);
            return _context.abrupt("return", _context.t1);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 19]]);
  }));
  return _load.apply(this, arguments);
}

var SongTimelineLoader = createLoader(load, {
  cacheKeyFn: function cacheKeyFn(props) {
    return "".concat(props.artistId, ",").concat(props.songId, ",").concat(props.timeFilter, ",").concat(props.startDate, ",").concat(props.endDate);
  }
});
export function useSongTimelineData(artistId, songId, timeFilter, startDate, endDate) {
  useEffect(function () {
    return function cleanup() {
      SongTimelineLoader.clear({
        artistId: artistId,
        songId: songId,
        timeFilter: timeFilter,
        startDate: startDate,
        endDate: endDate
      });
    };
  }, [artistId, songId, timeFilter, startDate, endDate]);
  return useRead(SongTimelineLoader, {
    artistId: artistId,
    songId: songId,
    timeFilter: timeFilter,
    startDate: startDate,
    endDate: endDate
  });
}