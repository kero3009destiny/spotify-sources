import React from 'react';
import { DarkModeFullScreenLoadingIndicator, VSpacer48, VSpacer56 } from '../../../Elements';
import { useShop } from '../../lib/shop';
import { DisplayedProductListingsView } from './DisplayedProductListingsView';
import { MerchErrorBanner } from './ErrorBanner';
import { LinkShopView } from './LinkShopView';
import { ProductListingsView } from './ProductListingsView';
import { useMerchTabImpression } from './useMerchUbi';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function MerchTab() {
  var _useShop = useShop(),
      isLoading = _useShop.isLoading,
      isConnected = _useShop.isConnected,
      displayedProducts = _useShop.displayedProducts,
      productListings = _useShop.productListings,
      linkedShopDomain = _useShop.shopDomain,
      unlistProduct = _useShop.deleteDisplayedProduct,
      listProduct = _useShop.addDisplayedProduct,
      listOrUnlistProductLoading = _useShop.listOrUnlistProductLoading,
      getProductListingsError = _useShop.getProductListingsError,
      listOrUnlistProductError = _useShop.listOrUnlistProductError,
      getProductsError = _useShop.getProductsError;

  var _useMerchTabImpressio = useMerchTabImpression(),
      ref = _useMerchTabImpressio.ref;

  if (isLoading) return /*#__PURE__*/_jsx(DarkModeFullScreenLoadingIndicator, {});

  if (!isConnected) {
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(VSpacer56, {}), /*#__PURE__*/_jsx(LinkShopView, {})]
    });
  }

  return /*#__PURE__*/_jsxs("div", {
    ref: ref,
    className: "encore-muted-accent-set",
    children: [listOrUnlistProductError ? /*#__PURE__*/_jsx(MerchErrorBanner, {
      error: getProductListingsError || listOrUnlistProductError
    }) : null, listOrUnlistProductLoading ? /*#__PURE__*/_jsx(DarkModeFullScreenLoadingIndicator, {}) : null, /*#__PURE__*/_jsx(VSpacer56, {}), /*#__PURE__*/_jsx(DisplayedProductListingsView, {
      displayedProductListings: displayedProducts,
      unlistProduct: unlistProduct
    }), /*#__PURE__*/_jsx(ProductListingsView, {
      productListings: productListings,
      listProduct: listProduct,
      unlistProduct: unlistProduct,
      shopURL: linkedShopDomain,
      error: getProductsError
    }), /*#__PURE__*/_jsx(VSpacer48, {})]
  });
}