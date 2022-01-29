import _slicedToArray from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import React from 'react';
import { Backdrop, ButtonTertiary, EmptyState, EmptyStateButton, EmptyStateText, EmptyStateTitle, FormHelpText, FormInput, TextLink, Type } from '@spotify-internal/encore-web';
import { DialogAlert } from '@mrkt/features/Dialog';
import { useT } from '@mrkt/features/i18n';
import { DarkModeFullScreenLoadingIndicator, VSpacer8 } from '../../../../ArtistProfile/Elements';
import { useLinkShopModalImpression, useMerchLogger } from './useMerchUbi';
import { getShopSubdomain, isValidShopName } from '../../lib/validation';
import { SHOPIFY_EMBEDDED_URL } from '../../lib/constants';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export function LinkShopView() {
  var t = useT();

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      showDialog = _React$useState2[0],
      setShowDialog = _React$useState2[1];

  var merchLogger = useMerchLogger();
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(EmptyState, {
      variant: "contextual",
      children: [/*#__PURE__*/_jsx(EmptyStateTitle, {
        children: t('artistprofile_merch_merchtab_linkshopview_1', 'Connect your Shopify', 'Linking your Shopify account to your Spotify account.')
      }), /*#__PURE__*/_jsx(EmptyStateText, {
        children: t('artistprofile_merch_merchtab_linkshopview_2', 'To connect the Spotify sales channel to your store, you must log in to Shopify.', '')
      }), /*#__PURE__*/_jsx(EmptyStateButton, {
        onClick: function onClick() {
          merchLogger.logLinkShopButtonClick();
          setShowDialog(true);
        },
        children: t('artistprofile_merch_merchtab_linkshopview_3', 'Log in to Shopify', '')
      })]
    }), showDialog ? /*#__PURE__*/_jsx(LinkShopDialog, {
      onClose: function onClose() {
        setShowDialog(false);
      }
    }) : null]
  });
}

function LinkShopDialog(props) {
  var t = useT();

  var _React$useState3 = React.useState(''),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      shopName = _React$useState4[0],
      setShopName = _React$useState4[1];

  var _React$useState5 = React.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      formError = _React$useState6[0],
      setFormError = _React$useState6[1];

  var _React$useState7 = React.useState(false),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      loading = _React$useState8[0],
      setLoading = _React$useState8[1];

  var merchLogger = useMerchLogger();

  var onClose = function onClose() {
    merchLogger.logLinkShopCancel();
    props.onClose();
  };

  var _useLinkShopModalImpr = useLinkShopModalImpression(),
      ref = _useLinkShopModalImpr.ref;

  function handleSubmit(event) {
    event.preventDefault();

    if (!isValidShopName(shopName)) {
      setFormError(true);
    } else {
      var shopifyUrl = "".concat(SHOPIFY_EMBEDDED_URL, "/auth?shop=").concat(getShopSubdomain(shopName), ".myshopify.com");
      setFormError(false);
      setLoading(true);
      merchLogger.logLinkShopConfirm(shopifyUrl);
      window.location.replace(shopifyUrl);
    }
  }

  function handleChange(event) {
    setShopName(event.target.value);
  }

  function handleBlur(event) {
    var newShopName = event.target.value;

    if (!isValidShopName(newShopName)) {
      setFormError(true);
    } else {
      setFormError(false);
    }
  }

  return /*#__PURE__*/_jsx(Backdrop, {
    center: true,
    onClose: onClose,
    children: /*#__PURE__*/_jsx("form", {
      onSubmit: handleSubmit,
      autoComplete: "off",
      ref: ref,
      children: /*#__PURE__*/_jsx(DialogAlert, {
        dialogId: "merch-link-shop-dialog",
        dialogTitle: t('artistprofile_merch_merchtab_linkshopview_4', 'Enter Shopify store address to connect your account', ''),
        body: /*#__PURE__*/_jsxs(_Fragment, {
          children: [loading ? /*#__PURE__*/_jsx(DarkModeFullScreenLoadingIndicator, {}) : null, /*#__PURE__*/_jsxs("div", {
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            },
            children: [/*#__PURE__*/_jsx(FormInput, {
              type: "text",
              placeholder: t('artistprofile_merch_merchtab_linkshopview_5', 'Enter shop name...', ''),
              onChange: handleChange,
              onBlur: handleBlur,
              value: shopName,
              error: formError
            }), formError && /*#__PURE__*/_jsx(FormHelpText, {
              error: true,
              children: t('artistprofile_merch_merchtab_linkshopview_6', 'Please provide a valid Shopify store address', '')
            }), /*#__PURE__*/_jsx(VSpacer8, {}), /*#__PURE__*/_jsxs(Type, {
              as: Type.p,
              children: [t('artistprofile_merch_merchtab_linkshopview_7', 'New to Shopify?', ''), ' ', /*#__PURE__*/_jsx(TextLink, {
                href: "https://shopify.com/sell-on-spotify",
                children: t('artistprofile_merch_merchtab_linkshopview_8', 'Get started', '')
              })]
            })]
          })]
        }),
        footer: /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx(ButtonTertiary, {
            condensed: true,
            buttonSize: ButtonTertiary.sm,
            onClick: onClose,
            type: "button",
            children: t('artistprofile_merch_merchtab_linkshopview_9', 'Cancel', '')
          }), /*#__PURE__*/_jsx(ButtonTertiary, {
            condensed: true,
            buttonSize: ButtonTertiary.sm,
            color: "green",
            type: "submit",
            children: t('artistprofile_merch_merchtab_linkshopview_10', 'Link shop', '')
          })]
        })
      })
    })
  });
}