import React from 'react';
import styled from 'styled-components';
import { ButtonTertiary, cssColorValue, Type, spacer16 } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { useMerchLogger } from './useMerchUbi';
import { stripHtml } from './utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var ProductListingContainer = styled.div.withConfig({
  displayName: "DisplayedProductListingView__ProductListingContainer",
  componentId: "epxdts-0"
})(["margin-right:", ";padding:", ";background-color:", ";border:1px solid transparent;width:250px;"], spacer16, spacer16, cssColorValue('decorativeSubdued'));
var NoPadButtonTertiary = styled(ButtonTertiary).withConfig({
  displayName: "DisplayedProductListingView__NoPadButtonTertiary",
  componentId: "epxdts-1"
})(["padding:0;"]);
export function DisplayedProductListingView(props) {
  var t = useT();
  var displayedProductListing = props.displayedProductListing;
  var merchLogger = useMerchLogger();
  return /*#__PURE__*/_jsxs(ProductListingContainer, {
    className: "encore-muted-accent-set",
    children: [/*#__PURE__*/_jsx(Type, {
      as: Type.p,
      variant: Type.body2,
      semanticColor: "textBase",
      children: displayedProductListing.name
    }), /*#__PURE__*/_jsx(Type, {
      as: Type.p,
      variant: Type.body2,
      color: "textSubdued",
      children: stripHtml(displayedProductListing.price)
    }), /*#__PURE__*/_jsx(NoPadButtonTertiary, {
      condensed: true,
      buttonSize: ButtonTertiary.sm,
      onClick: function onClick() {
        merchLogger.logShopItemRemove(displayedProductListing.id);
        props.unlist();
      },
      color: "gray",
      children: t('artistprofile_merch_merchtab_displayedproductlistingview_1', 'Remove', '')
    })]
  });
}