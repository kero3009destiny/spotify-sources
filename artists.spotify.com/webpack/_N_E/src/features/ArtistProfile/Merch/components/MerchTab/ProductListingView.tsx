import React from 'react';
import styled from 'styled-components';
import { ButtonTertiary, Image, Type } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { VSpacer4, VSpacer8 } from '../../../Elements';
import { useMerchLogger } from './useMerchUbi';
import { stripHtml } from './utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var ProductViewContainer = styled.div.withConfig({
  displayName: "ProductListingView__ProductViewContainer",
  componentId: "us4v66-0"
})(["display:flex;flex-direction:column;align-items:flex-start;overflow:hidden;opacity:", ";"], function (props) {
  return props.unavailable ? '0.7' : '1';
});
var PictureFrame = styled.div.withConfig({
  displayName: "ProductListingView__PictureFrame",
  componentId: "us4v66-1"
})(["display:flex;justify-content:center;position:relative;padding-bottom:100%;width:100%;& > img{position:absolute;top:0;left:0;bottom:0;right:0;width:100%;height:100%;object-fit:contain;}"]);
var EllipsisOverflowVisibleOnHover = styled(Type).withConfig({
  displayName: "ProductListingView__EllipsisOverflowVisibleOnHover",
  componentId: "us4v66-2"
})(["text-overflow:ellipsis;overflow:hidden;white-space:nowrap;padding:0;max-width:100%;"]);
export function ProductListingView(props) {
  var t = useT();
  var productListing = props.productListing,
      list = props.list,
      unlist = props.unlist;
  var unavailable = !productListing.available;
  var merchUbiLogger = useMerchLogger();

  function ctaText() {
    if (unavailable) return t('artistprofile_merch_merchtab_productlistingview_1', 'Out of stock', '');
    if (productListing.displayed) return t('artistprofile_merch_merchtab_productlistingview_2', 'Added to shop', '');
    return t('artistprofile_merch_merchtab_productlistingview_3', 'Add to shop', '');
  }

  function ctaColor() {
    if (unavailable) return 'textSubdued';
    if (productListing.displayed) return 'textSubdued';
    return 'textBrightAccent';
  }

  return /*#__PURE__*/_jsxs(ProductViewContainer, {
    unavailable: unavailable,
    className: "encore-muted-accent-set",
    children: [/*#__PURE__*/_jsx(PictureFrame, {
      children: /*#__PURE__*/_jsx(Image, {
        src: productListing.image_uri,
        alt: productListing.name
      })
    }), /*#__PURE__*/_jsx(VSpacer8, {}), /*#__PURE__*/_jsx(EllipsisOverflowVisibleOnHover, {
      as: Type.p,
      variant: Type.body2,
      semanticColor: "textBase",
      children: productListing.name
    }), /*#__PURE__*/_jsx(VSpacer4, {}), /*#__PURE__*/_jsx(Type, {
      condensed: true,
      as: Type.p,
      variant: Type.body3,
      semanticColor: "textSubdued",
      children: stripHtml(productListing.price)
    }), /*#__PURE__*/_jsx(VSpacer8, {}), /*#__PURE__*/_jsx(ButtonTertiary, {
      condensed: true,
      buttonSize: ButtonTertiary.sm,
      disabled: unavailable,
      onClick: function onClick() {
        if (!productListing.displayed) {
          merchUbiLogger.logShopItemAdd(productListing.id);
          list();
        } else {
          merchUbiLogger.logShopItemRemove(productListing.id);
          unlist();
        }
      },
      semanticColor: ctaColor(),
      children: ctaText()
    })]
  });
}