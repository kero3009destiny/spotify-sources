import _toConsumableArray from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import { useT } from '@mrkt/features/i18n';
import { useGetProductListings } from './api/getProductListings';
import { useGetDisplayedProducts } from './api/getDisplayedProducts';
import { useAddDisplayedProduct } from './api/addDisplayedProduct';
import { useDeleteDisplayedProduct } from './api/deleteDisplayedProduct'; // useShop contains all the functionality and data needed to manage which subset
// ProductListings from the linked shop's Products will appear on Spotify.

export function useShop() {
  var _React$useState = React.useState(''),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      userInputShopName = _React$useState2[0],
      setUserInputShopName = _React$useState2[1];

  var _useGetProductListing = useGetProductListings(),
      shopDomain = _useGetProductListing.shopDomain,
      productListings = _useGetProductListing.productListings,
      getProductsError = _useGetProductListing.error,
      getProductsLoading = _useGetProductListing.loading;

  var _useGetDisplayedProdu = useGetDisplayedProducts(),
      initialDisplayedProducts = _useGetDisplayedProdu.displayedProducts,
      getProductListingsError = _useGetDisplayedProdu.error,
      getProductListingsLoading = _useGetDisplayedProdu.loading;

  var _useDisplayedProducts = useDisplayedProductsManager(productListings, initialDisplayedProducts),
      displayedProducts = _useDisplayedProducts.displayedProducts,
      addDisplayedProduct = _useDisplayedProducts.addDisplayedProduct,
      deleteDisplayedProduct = _useDisplayedProducts.deleteDisplayedProduct,
      listOrUnlistProductLoading = _useDisplayedProducts.loading,
      listOrUnlistProductError = _useDisplayedProducts.error;

  var displayedProductsIDs = displayedProducts.map(function (p) {
    return p.id;
  });
  var productListingsWithDisplayed = productListings.map(function (productListing) {
    return _objectSpread(_objectSpread({}, productListing), {}, {
      displayed: displayedProductsIDs.includes(productListing.id)
    });
  });
  var productListingsWithDisplayedSorted = productListingsWithDisplayed.sort(unavailableProductsLast);
  return {
    isConnected: Boolean(shopDomain),
    isLoading: getProductsLoading || getProductListingsLoading,
    shopDomain: shopDomain,
    displayedProducts: displayedProducts,
    productListings: productListingsWithDisplayedSorted,
    userInputShopName: userInputShopName,
    setUserInputShopName: setUserInputShopName,
    addDisplayedProduct: addDisplayedProduct,
    deleteDisplayedProduct: deleteDisplayedProduct,
    listOrUnlistProductLoading: listOrUnlistProductLoading,
    getProductsError: getProductsError,
    getProductListingsError: getProductListingsError,
    listOrUnlistProductError: listOrUnlistProductError
  };
}

function useDisplayedProductsManager(initialProductListings, initialDisplayedProducts) {
  var t = useT();

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      loading = _React$useState4[0],
      setLoading = _React$useState4[1];

  var _React$useState5 = React.useState(),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      error = _React$useState6[0],
      setError = _React$useState6[1];

  var _useAddDisplayedProdu = useAddDisplayedProduct(),
      addDisplayedProduct = _useAddDisplayedProdu.addDisplayedProduct,
      addDisplayedProductError = _useAddDisplayedProdu.error,
      addDisplayedProductLoading = _useAddDisplayedProdu.loading;

  var _useDeleteDisplayedPr = useDeleteDisplayedProduct(),
      deleteDisplayedProduct = _useDeleteDisplayedPr.deleteDisplayedProduct,
      deleteDisplayedProductError = _useDeleteDisplayedPr.error,
      deleteDisplayedProductLoading = _useDeleteDisplayedPr.loading;

  var _React$useState7 = React.useState([]),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      displayedProducts = _React$useState8[0],
      setDisplayedProducts = _React$useState8[1];

  var _React$useState9 = React.useState([]),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      stagedDisplayedProductIDs = _React$useState10[0],
      setStagedDisplayedProductIDs = _React$useState10[1];

  var displayedProductIDs = React.useMemo(function listingIDs() {
    return displayedProducts.map(function (l) {
      return l.id;
    });
  }, [displayedProducts]);
  React.useEffect(function synchronizeListingsInStateOnceDataLoads() {
    setDisplayedProducts(initialDisplayedProducts);
    setStagedDisplayedProductIDs(initialDisplayedProducts.map(function (p) {
      return p.id;
    }));
  }, [initialDisplayedProducts]);
  var getNextDisplayedProducts = React.useCallback(function listingIsStaged() {
    return initialProductListings.filter(function (listing) {
      return stagedDisplayedProductIDs.includes(listing.id);
    }) // Maintain the correct displayed product ordering
    .sort(function (a, b) {
      return stagedDisplayedProductIDs.indexOf(a.id) - stagedDisplayedProductIDs.indexOf(b.id);
    });
  }, [initialProductListings, stagedDisplayedProductIDs]);
  var listingsAreDirty = React.useCallback(function listingsAreDirty() {
    var _sort = [displayedProductIDs, stagedDisplayedProductIDs].sort(function (a, b) {
      return a.length - b.length;
    }),
        _sort2 = _slicedToArray(_sort, 2),
        shorter = _sort2[0],
        longer = _sort2[1];

    var diff = longer.filter(function (id) {
      return !shorter.includes(id);
    });
    return diff.length > 0;
  }, [displayedProductIDs, stagedDisplayedProductIDs]);
  React.useEffect( // If any of the dependencies have changed and the if-condition
  // is truthy, then it indicates that a add-displayed-product
  // server request just completed successfully.
  function handleMutationSuccess() {
    if (!addDisplayedProductLoading && !addDisplayedProductError && !deleteDisplayedProductLoading && !deleteDisplayedProductError && loading && listingsAreDirty()) {
      setDisplayedProducts(getNextDisplayedProducts());
      setLoading(false);
    }
  }, [addDisplayedProductError, addDisplayedProductLoading, deleteDisplayedProductError, deleteDisplayedProductLoading, getNextDisplayedProducts, listingsAreDirty, loading]);
  React.useEffect( // Make sure the mutation effect handlers below are only triggered
  // when the network request state goes from loading to not-loading.
  function intializeLoadingWhenAddOrDeleteLoadingStarts() {
    if (addDisplayedProductLoading || deleteDisplayedProductLoading) {
      setLoading(true);
    }
  }, [addDisplayedProductLoading, deleteDisplayedProductLoading]);
  React.useEffect( // If any of the dependencies have changed and the if-condition
  // is truthy, then it indicates that a add-displayed-product
  // server request just completed unsuccessfully.
  function handleAddDisplayedProductError() {
    if (!addDisplayedProductLoading && !deleteDisplayedProductLoading && (addDisplayedProductError || deleteDisplayedProductError) && loading && listingsAreDirty()) {
      // Rollback staged listings
      setStagedDisplayedProductIDs(displayedProductIDs);
      setLoading(false);
    }
  }, [addDisplayedProductError, addDisplayedProductLoading, deleteDisplayedProductError, deleteDisplayedProductLoading, displayedProductIDs, listingsAreDirty, loading]); // This triggers the request to add-displayed-product. The result
  // is handled in effects above, whether successful or not.

  function handleAddDisplayedProduct(productID) {
    // Clear any previous errors on add/delete
    setError(undefined);
    if (stagedDisplayedProductIDs !== null && stagedDisplayedProductIDs !== void 0 && stagedDisplayedProductIDs.includes(productID)) return; // Can't add more than 3 displayed products

    if (stagedDisplayedProductIDs.length >= 3) {
      setError(new Error(t('artistprofile_merch_lib_shop_1', "Can't add more than 3 displayed products", "You can't show more than 3 products on your profile that consumers see (but you can have more in your store).")));
      return;
    }

    var nextStagedDisplayedProductIDs = [].concat(_toConsumableArray(stagedDisplayedProductIDs || []), [productID]);
    addDisplayedProduct(productID);
    setStagedDisplayedProductIDs(nextStagedDisplayedProductIDs);
  } // This triggers the request to delete-displayed-product. The result
  // is handled in effects above, whether successful or not.


  function handleDeleteDisplayedProduct(productID) {
    // Clear any previous errors on add/delete
    setError(undefined);
    if (!(displayedProductIDs !== null && displayedProductIDs !== void 0 && displayedProductIDs.includes(productID))) return;
    var nextStagedDisplayedProductIDs = stagedDisplayedProductIDs.filter(function (stagedID) {
      return stagedID !== productID;
    });
    deleteDisplayedProduct(productID);
    setStagedDisplayedProductIDs(nextStagedDisplayedProductIDs);
  }

  return {
    displayedProducts: displayedProducts,
    addDisplayedProduct: handleAddDisplayedProduct,
    deleteDisplayedProduct: handleDeleteDisplayedProduct,
    error: addDisplayedProductError || deleteDisplayedProductError || error,
    loading: loading || addDisplayedProductLoading || deleteDisplayedProductLoading
  };
}

function unavailableProductsLast(a, b) {
  if (a.available && !b.available) return -1;else if (b.available && !a.available) return 1;
  return 0;
}