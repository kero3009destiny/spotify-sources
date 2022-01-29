import React from 'react';
import styled from 'styled-components';
import { IconArrowTopRight, PaginationControls, TextLink, Type, screenXsMax, spacer4, spacer24, screenLgMax } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { VSpacer8, VSpacer24 } from '../../../Elements';
import { useMerchLogger, useShopifyProductsImpression } from './useMerchUbi';
import { ProductListingView } from './ProductListingView';
import { ProductListingsViewEmpty } from './ProductListingsViewEmpty';
import { MerchErrorBanner } from './ErrorBanner';
import { usePagination } from '../../lib/pagination';
import { TARGET_MANAGE_ON_SHOPIFY } from '../../lib/constants';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var ProductGrid = styled.div.withConfig({
  displayName: "ProductListingsView__ProductGrid",
  componentId: "sc-1wclni7-0"
})(["display:grid;height:100%;width:100%;grid-template-columns:repeat(2,1fr);grid-template-rows:1fr;grid-gap:", ";@media (min-width:", "){grid-template-columns:repeat(5,1fr);}max-width:", ";"], spacer24, screenXsMax, screenLgMax);
var StyledPaginationControls = styled(PaginationControls).withConfig({
  displayName: "ProductListingsView__StyledPaginationControls",
  componentId: "sc-1wclni7-1"
})(["justify-content:flex-end;"]);
export function ProductListingsView(props) {
  var t = useT();
  var productListings = props.productListings,
      error = props.error;
  var count = productListings.length;
  var isEmpty = count <= 0;

  var _useShopifyProductsIm = useShopifyProductsImpression(),
      ref = _useShopifyProductsIm.ref;

  var _usePagination = usePagination(count),
      first = _usePagination.first,
      last = _usePagination.last,
      next = _usePagination.next,
      prev = _usePagination.prev,
      displayFirst = _usePagination.displayFirst,
      displayLast = _usePagination.displayLast;

  var paginationString = '';

  if (displayFirst > count) {
    paginationString = t('artistprofile_merch_merchtab_productlistingsview_1', "{count}-{displayLast} of {count}", 'Pagination count', {
      count: count,
      displayLast: displayLast
    });
  } else {
    paginationString = t('artistprofile_merch_merchtab_productlistingsview_2', "{displayFirst}-{displayLast} of {count}", 'Pagination count', {
      count: count,
      displayFirst: displayFirst,
      displayLast: displayLast
    });
  }

  function getProductListingView(_productListings) {
    var paginatedProductListings = [];

    var _loop = function _loop(i) {
      var productListing = _productListings[i];

      if (productListing) {
        paginatedProductListings.push( /*#__PURE__*/_jsx(ProductListingView, {
          productListing: productListing,
          list: function list() {
            props.listProduct(productListing.id);
          },
          unlist: function unlist() {
            props.unlistProduct(productListing.id);
          }
        }, productListing.id));
      }
    };

    for (var i = first; i < last; i++) {
      _loop(i);
    }

    return paginatedProductListings;
  }

  var merchUbiLogger = useMerchLogger();
  if (error) return /*#__PURE__*/_jsx(MerchErrorBanner, {
    error: error
  });
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      },
      className: "encore-muted-accent-set",
      children: [/*#__PURE__*/_jsx(Type, {
        condensed: true,
        as: Type.p,
        variant: Type.heading3,
        semanticColor: "textBase",
        style: {
          fontSize: '18px'
        },
        children: t('artistprofile_merch_merchtab_productlistingsview_3', 'Your products on Shopify', '')
      }), /*#__PURE__*/_jsxs(TextLink, {
        onClick: function onClick() {
          return merchUbiLogger.logManageShopify("https://".concat(props.shopURL, "/admin"));
        },
        href: "https://".concat(props.shopURL, "/admin"),
        target: TARGET_MANAGE_ON_SHOPIFY,
        standalone: true,
        children: [t('artistprofile_merch_merchtab_productlistingsview_4', "Manage on Shopify ", 'Shopify is a third party provider name, do not translate.'), /*#__PURE__*/_jsx(IconArrowTopRight, {
          iconSize: 16,
          style: {
            marginLeft: spacer4
          }
        })]
      })]
    }), /*#__PURE__*/_jsx(VSpacer8, {}), /*#__PURE__*/_jsx(Type, {
      condensed: true,
      as: Type.p,
      variant: Type.body2,
      semanticColor: "textSubdued",
      children: t('artistprofile_merch_merchtab_productlistingsview_5', "You can add up to 3 items to showcase in this shop. Fans will be able to\n        see the items you select on your artist profile.", '')
    }), /*#__PURE__*/_jsx(VSpacer24, {}), isEmpty ? /*#__PURE__*/_jsx(ProductListingsViewEmpty, {
      shopURL: props.shopURL
    }) : /*#__PURE__*/_jsxs("section", {
      ref: ref,
      children: [/*#__PURE__*/_jsx(ProductGrid, {
        children: getProductListingView(productListings)
      }), /*#__PURE__*/_jsx(VSpacer8, {}), /*#__PURE__*/_jsx(StyledPaginationControls, {
        onIncrement: last < count ? function () {
          return next();
        } : undefined,
        onDecrement: first > 0 ? function () {
          return prev();
        } : undefined,
        children: /*#__PURE__*/_jsx(Type, {
          as: Type.p,
          variant: Type.body1,
          condensed: true,
          children: paginationString
        })
      })]
    })]
  });
}