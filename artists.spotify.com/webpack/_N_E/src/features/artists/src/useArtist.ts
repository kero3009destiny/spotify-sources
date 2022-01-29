import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { createBatchLoader, useRead } from '@spotify-internal/creator-data-loading';
import { WEBGATE_DOMAIN, webgateFetch } from '../../../shared/lib/api';
import { formatArtist } from './formatArtist';
import { useArtistGraphqlBool } from './useArtistGraphqlBool';
import { getArtistsByUris } from './api';
var artistLoader = createBatchLoader( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(artistIds) {
    var artistUris, response, _ref2, artists, artistMap;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            artistUris = artistIds.map(function (artistId) {
              return "spotify:artist:".concat(artistId);
            });
            _context.next = 3;
            return webgateFetch("".concat(WEBGATE_DOMAIN, "/creator-search-service/v0/artists/authorizeAndDecorate"), {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify({
                artistUris: artistUris
              })
            });

          case 3:
            response = _context.sent;

            if (!response.ok) {
              _context.next = 10;
              break;
            }

            _context.next = 7;
            return response.json();

          case 7:
            _context.t0 = _context.sent;
            _context.next = 11;
            break;

          case 10:
            _context.t0 = {
              artists: []
            };

          case 11:
            _ref2 = _context.t0;
            artists = _ref2.artists;
            artistMap = new Map(artists.map(function (artist) {
              return [artist.uri, artist];
            })); // the backend doesn't guarantee order

            return _context.abrupt("return", artistUris.map(function (uri) {
              var artist = artistMap.get(uri);
              return artist ? formatArtist(artist) : null;
            }));

          case 15:
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
var artistLoaderGraphql = createBatchLoader( /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(artistIds) {
    var result;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getArtistsByUris({
              ids: artistIds
            });

          case 2:
            result = _context2.sent;
            return _context2.abrupt("return", result.artists);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2) {
    return _ref3.apply(this, arguments);
  };
}());
/** For when useArtist can't be used because of conditional logic. */

export function getArtist(artistId) {
  return artistLoader.load(artistId);
}
export function useArtist(artistId) {
  return useRead(useArtistGraphqlBool() ? artistLoaderGraphql : artistLoader, artistId);
}
/**
 * this function is for updating an artist in the cache if one exists, or for
 * priming a new artist. Currently used to keep the artist avatar up to date when
 * editing the artist profile
 * @param artist new artist object to update + store
 */

export function updateArtist(_x3) {
  return _updateArtist.apply(this, arguments);
}

function _updateArtist() {
  _updateArtist = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(artist) {
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            [artistLoader, artistLoaderGraphql].forEach(function (loader) {
              return loader.clear(artist.id).prime(artist.id, _objectSpread({}, artist));
            });

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _updateArtist.apply(this, arguments);
}