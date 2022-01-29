import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import React from 'react';
import { webgateFetch } from '@mrkt/features/webgate-fetch';
import { useCurrentArtist } from '../artist';
import { MERCH_SERVICE_URL } from '../constants';
export function useGetProductListings() {
  // Initialize to true to prevent a flash of unintended content
  var _React$useState = React.useState(true),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      loading = _React$useState2[0],
      setLoading = _React$useState2[1];

  var _React$useState3 = React.useState(),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      error = _React$useState4[0],
      setError = _React$useState4[1];

  var _React$useState5 = React.useState(''),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      shopDomain = _React$useState6[0],
      setShopDomain = _React$useState6[1];

  var _React$useState7 = React.useState([]),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      productListings = _React$useState8[0],
      setProductListings = _React$useState8[1];

  var artistID = useCurrentArtist().id;
  React.useEffect(function () {
    function fetchProducts() {
      return _fetchProducts.apply(this, arguments);
    }

    function _fetchProducts() {
      _fetchProducts = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var resp, _ref, _productListings, _shopDomain;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                setLoading(true);
                _context.prev = 1;
                _context.next = 4;
                return webgateFetch("".concat(MERCH_SERVICE_URL, "/artist/").concat(artistID, "/products/listings"));

              case 4:
                resp = _context.sent;

                if (resp.ok) {
                  _context.next = 10;
                  break;
                }

                if (resp.status !== 404) {
                  setError(new Error("".concat(artistID, "/product-listings GET failed with: ").concat(resp.status)));
                }

                setLoading(false);
                _context.next = 18;
                break;

              case 10:
                _context.next = 12;
                return resp.json();

              case 12:
                _ref = _context.sent;
                _productListings = _ref.product_listings;
                _shopDomain = _ref.shop_domain;
                setShopDomain(_shopDomain);
                setProductListings(_productListings);
                setLoading(false);

              case 18:
                _context.next = 24;
                break;

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](1);
                setError(_context.t0);
                setLoading(false);

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 20]]);
      }));
      return _fetchProducts.apply(this, arguments);
    }

    fetchProducts();
  }, [artistID]);
  return {
    productListings: productListings,
    shopDomain: shopDomain,
    loading: loading,
    error: error
  };
}