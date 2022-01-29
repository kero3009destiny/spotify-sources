import React from 'react';
import { Type } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { VSpacer8, VSpacer24, VSpacer48 } from '../../../Elements';
import { useShopifyShopImpression } from './useMerchUbi';
import { DisplayedProductListingView } from './DisplayedProductListingView'; // DisplayedProductListings are product listings from a linked shop that are
// published for display on Spotify.

import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export function DisplayedProductListingsView(props) {
  var t = useT();
  var displayedProductListings = props.displayedProductListings;

  var _useShopifyShopImpres = useShopifyShopImpression(),
      ref = _useShopifyShopImpres.ref;

  if (displayedProductListings.length === 0) return null;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs("section", {
      className: "encore-muted-accent-set",
      children: [/*#__PURE__*/_jsx(Type, {
        condensed: true,
        as: Type.p,
        variant: Type.heading3,
        semanticColor: "textBase",
        style: {
          fontSize: '18px'
        },
        children: t('artistprofile_merch_merchtab_displayedproductlistingsview_1', 'Your Spotify shop', 'The place an artist edits their merchandise on Spotify.')
      }), /*#__PURE__*/_jsx(VSpacer8, {}), /*#__PURE__*/_jsx(Type, {
        condensed: true,
        as: Type.p,
        variant: Type.body2,
        semanticColor: "textSubdued",
        children: t('artistprofile_merch_merchtab_displayedproductlistingsview_2', 'These are the Shopify products currently being displayed on Spotify. Out of stock items have been removed from your Artist profile.', '')
      }), /*#__PURE__*/_jsx(VSpacer24, {}), /*#__PURE__*/_jsx("div", {
        style: {
          display: 'flex'
        },
        ref: ref,
        children: displayedProductListings.map(function (productListing) {
          return /*#__PURE__*/_jsx(DisplayedProductListingView, {
            displayedProductListing: productListing,
            unlist: function unlist() {
              props.unlistProduct(productListing.id);
            }
          }, productListing.id);
        })
      })]
    }), /*#__PURE__*/_jsx(VSpacer48, {})]
  });
}