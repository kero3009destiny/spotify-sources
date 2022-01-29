import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import React from 'react';
import { webgateFetch } from '@mrkt/features/webgate-fetch';
import { useCurrentArtist } from '../artist';
import { MERCH_SERVICE_URL } from '../constants';
export function useGetDisplayedProducts() {
  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      loading = _React$useState2[0],
      setLoading = _React$useState2[1];

  var _React$useState3 = React.useState(),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      error = _React$useState4[0],
      setError = _React$useState4[1];

  var _React$useState5 = React.useState([]),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      displayedProducts = _React$useState6[0],
      setDisplayedProducts = _React$useState6[1];

  var artistID = useCurrentArtist().id;
  React.useEffect(function () {
    function fetchProducts() {
      return _fetchProducts.apply(this, arguments);
    }

    function _fetchProducts() {
      _fetchProducts = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var resp, _ref, _displayedProducts;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                setLoading(true);
                _context.prev = 1;
                _context.next = 4;
                return webgateFetch("".concat(MERCH_SERVICE_URL, "/artist/").concat(artistID, "/products/displayed"));

              case 4:
                resp = _context.sent;

                if (resp.ok) {
                  _context.next = 10;
                  break;
                }

                // To prevent noise in Sentry as 404 is expected when a user has not yet linked a shop
                if (resp.status !== 404) {
                  setError(new Error("".concat(artistID, "/displayed-products GET failed with: ").concat(resp.status)));
                }

                setLoading(false);
                _context.next = 16;
                break;

              case 10:
                _context.next = 12;
                return resp.json();

              case 12:
                _ref = _context.sent;
                _displayedProducts = _ref.displayed_products;
                setDisplayedProducts(_displayedProducts);
                setLoading(false);

              case 16:
                _context.next = 22;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](1);
                setError(_context.t0);
                setLoading(false);

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 18]]);
      }));
      return _fetchProducts.apply(this, arguments);
    }

    fetchProducts();
  }, [artistID]);
  return {
    displayedProducts: displayedProducts,
    loading: loading,
    error: error
  };
}