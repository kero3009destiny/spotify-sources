import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import React from 'react';
import { webgateFetch } from '@mrkt/features/webgate-fetch';
import { MERCH_SERVICE_URL } from '../constants';
import { useCurrentArtist } from '../artist';
export function useAddDisplayedProduct() {
  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      loading = _React$useState2[0],
      setLoading = _React$useState2[1];

  var _React$useState3 = React.useState(),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      error = _React$useState4[0],
      setError = _React$useState4[1];

  var _React$useState5 = React.useState(null),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      productID = _React$useState6[0],
      setProductID = _React$useState6[1];

  var artistID = useCurrentArtist().id;
  React.useEffect(function () {
    function putDisplayedProducts() {
      return _putDisplayedProducts.apply(this, arguments);
    }

    function _putDisplayedProducts() {
      _putDisplayedProducts = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var resp;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (productID) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                setLoading(true);
                _context.prev = 3;
                _context.next = 6;
                return webgateFetch("".concat(MERCH_SERVICE_URL, "/artist/").concat(artistID, "/products/displayed/").concat(productID), {
                  method: 'put',
                  headers: {
                    'content-type': 'application/json'
                  }
                });

              case 6:
                resp = _context.sent;

                if (!resp.ok) {
                  setError(new Error("".concat(artistID, "/displayed-products PUT failed with: ").concat(resp.status)));
                }

                setLoading(false);
                _context.next = 15;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](3);
                setError(_context.t0);
                setLoading(false);

              case 15:
                _context.prev = 15;
                // Make sure to reset productID to null so that duplicate requests keyed
                // to the same artistID, productID pair are successful.
                setProductID(null);
                return _context.finish(15);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 11, 15, 18]]);
      }));
      return _putDisplayedProducts.apply(this, arguments);
    }

    putDisplayedProducts();
  }, [artistID, productID]);
  return {
    addDisplayedProduct: setProductID,
    loading: loading,
    error: error
  };
}