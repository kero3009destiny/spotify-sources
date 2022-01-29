import _slicedToArray from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import React, { useMemo } from 'react';
import { webgateFetch } from '@mrkt/features/webgate-fetch';
import { useCurrentArtist } from '../artist';
var WEBGATE_DOMAIN = "https://generic.wg.spotify.com";

function getEndpointURL(artistID) {
  return "".concat(WEBGATE_DOMAIN, "/merch/v1/shopify/").concat(artistID, "/rollout");
}

export function getLinkedArtists(_x) {
  return _getLinkedArtists.apply(this, arguments);
} // TODO Use data loader

function _getLinkedArtists() {
  _getLinkedArtists = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(artistIDs) {
    var response, _ref2, shopForArtist;

    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return webgateFetch("".concat(WEBGATE_DOMAIN, "/shopify-merch/v0/artists/"), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              },
              body: JSON.stringify({
                artist_uids: artistIDs
              })
            });

          case 3:
            response = _context4.sent;

            if (!response.ok) {
              _context4.next = 10;
              break;
            }

            _context4.next = 7;
            return response.json();

          case 7:
            _ref2 = _context4.sent;
            shopForArtist = _ref2.shopForArtist;
            return _context4.abrupt("return", shopForArtist.flatMap(function (artist) {
              return artist.shop_name ? artist.artist_uid : [];
            }));

          case 10:
            throw new Error("Could not fetch already linked artists: Response status: ".concat(response.status));

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](0);
            throw new Error("Could not fetch already linked artists: ".concat(_context4.t0));

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 13]]);
  }));
  return _getLinkedArtists.apply(this, arguments);
}

export function useGetArtistRollout(_artistID) {
  var _React$useState = React.useState(true),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      loading = _React$useState2[0],
      setLoading = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      rolledOut = _React$useState4[0],
      setRolledOut = _React$useState4[1];

  var currentArtistID = useCurrentArtist().id;
  var artistID = _artistID || currentArtistID;
  React.useEffect(function () {
    function getArtistRollout() {
      return _getArtistRollout.apply(this, arguments);
    }

    function _getArtistRollout() {
      _getArtistRollout = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var resp;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return webgateFetch(getEndpointURL(artistID));

              case 3:
                resp = _context.sent;

                // merch/v1/shopify/<artistID>/rollout communicates rollout status via
                // the status code. 200 = rolled out, 401 = not rolled out. So, checking
                // whether the reponse was successful (status in the range 200-299) or
                // not is sufficient to determine the rollout status.
                // See: https://ghe.spotify.net/creator/merch/blob/master/merch-service/src/main/java/com/spotify/merch/handlers/ShopifyHandler.java#L36
                if (!resp.ok) {
                  setRolledOut(false);
                } else {
                  setRolledOut(true);
                }

                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                setRolledOut(false);

              case 10:
                _context.prev = 10;
                setLoading(false);
                return _context.finish(10);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7, 10, 13]]);
      }));
      return _getArtistRollout.apply(this, arguments);
    }

    getArtistRollout();
  }, [artistID]);
  return {
    rolledOut: rolledOut,
    loading: loading
  };
}
export function useGetArtistsRollout(artists, _shop) {
  var _React$useState5 = React.useState(true),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      loading = _React$useState6[0],
      setLoading = _React$useState6[1];

  var _React$useState7 = React.useState([]),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      filteredArtistIDs = _React$useState8[0],
      setFilteredArtistIDs = _React$useState8[1];

  var _React$useState9 = React.useState(),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      error = _React$useState10[0],
      setError = _React$useState10[1];

  var artistsIDs = useMemo(function () {
    return artists.map(function (a) {
      return a.id;
    });
  }, [artists]);
  var artistsIDsRef = React.useRef(artistsIDs);

  if (!artistsIDsRef.current.every(function (value, idx) {
    return value === artistsIDs[idx];
  })) {
    artistsIDsRef.current = artistsIDs;
  }

  React.useEffect(function () {
    function getArtistRollout() {
      return _getArtistRollout2.apply(this, arguments);
    }

    function _getArtistRollout2() {
      _getArtistRollout2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        var responses, linkedArtists;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return Promise.all(artistsIDsRef.current.map( /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(artistID) {
                    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return webgateFetch(getEndpointURL(artistID));

                          case 2:
                            return _context2.abrupt("return", _context2.sent);

                          case 3:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function (_x2) {
                    return _ref.apply(this, arguments);
                  };
                }()));

              case 3:
                responses = _context3.sent;
                _context3.next = 6;
                return getLinkedArtists(artistsIDs);

              case 6:
                linkedArtists = _context3.sent;
                setFilteredArtistIDs( // relying on order of array being guaranteed
                artistsIDsRef.current.filter(function (id, index) {
                  return Boolean(responses[index].ok) && !linkedArtists.includes(id);
                })); // merch/v1/shopify/<artistID>/rollout communicates rollout status via
                // the status code. 200 = rolled out, 401 = not rolled out. So, checking
                // whether the reponse was successful (status in the range 200-299) or
                // not is sufficient to determine the rollout status.
                // See: https://ghe.spotify.net/creator/merch/blob/master/merch-service/src/main/java/com/spotify/merch/handlers/ShopifyHandler.java#L36

                _context3.next = 14;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](0);
                setFilteredArtistIDs([]);
                setError(_context3.t0);

              case 14:
                _context3.prev = 14;
                setLoading(false);
                return _context3.finish(14);

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 10, 14, 17]]);
      }));
      return _getArtistRollout2.apply(this, arguments);
    }

    getArtistRollout();
  }, [artistsIDsRef, artistsIDs]);
  return {
    filteredArtists: artists.filter(function (a) {
      return filteredArtistIDs.includes(a.id);
    }),
    loading: loading,
    error: error
  };
}