import React from 'react';
import { EmptyState, EmptyStateButton, EmptyStateTitle, EmptyStateText, IconArrowTopRight, TextLink, spacer4, cssColorValue } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { VSpacer16 } from '../../../Elements';
import { TARGET_MANAGE_ON_SHOPIFY } from '../../lib/constants';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function ProductListingsViewEmpty(props) {
  var t = useT();
  return /*#__PURE__*/_jsxs(EmptyState, {
    variant: "contextual",
    children: [/*#__PURE__*/_jsx(EmptyStateTitle, {
      children: t('artistprofile_merch_merchtab_productlistingsviewempty_1', 'There are no products published to Spotify', '')
    }), /*#__PURE__*/_jsx(EmptyStateText, {
      children: t('artistprofile_merch_merchtab_productlistingsviewempty_2', 'To publish merch from your Shopify store, enable your products by clicking "Manage Availability" in the Spotify sales channel within your Shopify dashboard. Once published, you can manage merch in Spotify for Artists.', '')
    }), /*#__PURE__*/_jsx(VSpacer16, {}), /*#__PURE__*/_jsxs(TextLink, {
      href: "https://".concat(props.shopURL, "/admin"),
      target: TARGET_MANAGE_ON_SHOPIFY,
      standalone: true,
      component: EmptyStateButton,
      style: {
        color: cssColorValue('essentialBrightAccent')
      },
      children: [t('artistprofile_merch_merchtab_productlistingsviewempty_3', 'Add products on Shopify ', ''), /*#__PURE__*/_jsx(IconArrowTopRight, {
        iconSize: 16,
        style: {
          marginLeft: spacer4
        }
      })]
    })]
  });
}