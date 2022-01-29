import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.edb4648f-e97c-4fc3-81e7-9c46d49557bb/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.edb4648f-e97c-4fc3-81e7-9c46d49557bb/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
import React, { Suspense, useCallback, useRef } from 'react';
import styled from 'styled-components';
import Checkout, { Environment } from '@spotify-internal/checkout-sdk';
import { Backdrop, ButtonIcon, DialogConfirmation, IconX, Type, body3FontSize, spacer8, spacer24, cssColorValue } from '@spotify-internal/encore-web';
import { webgateFetchJson } from '../../shared/lib/api';
import { WALLET_API, MARQUEE_PRODUCT_TYPE, MARQUEE_CLIENT_ID, CARD_ADDED_SEARCH_PARAM, PAYMENT_PROVIDER_ID } from './constants';
import { useGetCheckout } from './hooks/useGetCheckout';
import { usePaymentModalCloseLogger, usePaymentModalUpdateCardLogger } from './hooks/usePaymentsUbi';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { useLocale, useT } from '@mrkt/features/i18n';
import { localeMarketMap } from './data/localeMarketMap';
import { useBillingCountry } from './lib/hooks/useBillingCountry';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var Title = styled.div.withConfig({
  displayName: "AddPaymentDialog__Title",
  componentId: "sc-1xsc7uo-0"
})(["display:flex;justify-content:space-between;align-items:center;"]);
var Heading = styled.div.withConfig({
  displayName: "AddPaymentDialog__Heading",
  componentId: "sc-1xsc7uo-1"
})(["margin-bottom:", ";"], spacer24); // targeting elements to style them in accordance with encore styles

var CheckoutWrapper = styled.div.withConfig({
  displayName: "AddPaymentDialog__CheckoutWrapper",
  componentId: "sc-1xsc7uo-2"
})(["form{p{font-size:", ";color:", ";background-color:", ";padding:", ";}}#checkout_submit{margin-right:0;}"], body3FontSize, cssColorValue('textBase'), cssColorValue('backgroundBase'), spacer8);
var DialogConfirmationNoFooter = styled(DialogConfirmation).withConfig({
  displayName: "AddPaymentDialog__DialogConfirmationNoFooter",
  componentId: "sc-1xsc7uo-3"
})(["width:auto;footer{display:none;}& > div{border-bottom:none;}"]);

var validateCheckout = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(orgUri) {
    var currentUrl, redirectUrl, cancelUrl, result;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            currentUrl = new URL(window.location.href);
            currentUrl.searchParams.delete(CARD_ADDED_SEARCH_PARAM);
            redirectUrl = new URL(currentUrl.href);
            redirectUrl.searchParams.append(CARD_ADDED_SEARCH_PARAM, 'true');
            cancelUrl = new URL(currentUrl.href);
            cancelUrl.searchParams.append(CARD_ADDED_SEARCH_PARAM, 'false');
            _context.next = 8;
            return webgateFetchJson("".concat(WALLET_API, "/v1/organization/").concat(orgUri, "/checkout"), {
              body: JSON.stringify({
                productType: MARQUEE_PRODUCT_TYPE,
                redirectUrl: redirectUrl,
                cancelUrl: cancelUrl
              }),
              headers: {
                'content-type': 'application/json'
              },
              method: 'POST'
            });

          case 8:
            result = _context.sent;
            return _context.abrupt("return", result.checkoutId);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function validateCheckout(_x) {
    return _ref.apply(this, arguments);
  };
}();

export var AddPaymentDialog = function AddPaymentDialog(_ref2) {
  var orgUri = _ref2.orgUri,
      onClose = _ref2.onClose,
      onSuccess = _ref2.onSuccess,
      paymentMethod = _ref2.paymentMethod,
      teamName = _ref2.teamName,
      country = _ref2.country;
  var getCheckout = useGetCheckout();
  var checkoutIdRef = useRef('');
  var t = useT();
  var locale = useLocale();
  var market = localeMarketMap[locale] || 'us';
  var billingCountry = useBillingCountry(country);
  var logPaymentModalClose = usePaymentModalCloseLogger(orgUri);
  var logPaymentModalUpdateCard = usePaymentModalUpdateCardLogger(orgUri, !!paymentMethod);
  var handleClose = useCallback(function () {
    logPaymentModalClose();
    onClose();
  }, [onClose, logPaymentModalClose]);
  var handleSubmit = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return validateCheckout(orgUri);

          case 2:
            checkoutIdRef.current = _context2.sent;
            logPaymentModalUpdateCard(checkoutIdRef.current);
            return _context2.abrupt("return", checkoutIdRef.current);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })), [orgUri, logPaymentModalUpdateCard]);
  var handleSuccess = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
    var cards;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getCheckout(orgUri, checkoutIdRef.current);

          case 2:
            cards = _context3.sent;
            onSuccess && onSuccess(cards);

            if (!paymentMethod) {
              sendEvent({
                eventCategory: 'campaigns',
                eventAction: 'click',
                eventLabel: 'add_payment'
              });

              if ('fbq' in window) {
                window.fbq('trackCustom', 'MarqueeAddPaymentInfo');
              }
            }

            handleClose();

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })), [checkoutIdRef, getCheckout, handleClose, onSuccess, orgUri]);
  var handleDialogClose = useCallback(function () {
    handleClose();
    window.location.reload(); //  Reload the window when dialog is manually closed to force reload of checkout-sdk
  }, [handleClose]);
  var submitCta = paymentMethod ? t('PAYMENTS_DIALOG_UPDATE_CARD_BUTTON', 'Update card', 'Card refers to credit card') : t('PAYMENTS_DIALOG_ADD_CARD_BUTTON', 'Add card', 'Card refers to credit card');
  var legalTerms = paymentMethod ? [{
    html: t('PAYMENTS_LEGAL_TERMS', 'Updating the card on file will impact all scheduled, active, and future campaigns. If you have outstanding charges, they will be charged to your new card within 24 hours.', 'Describes the legal terms for updating a credit card. '),
    type: 'text'
  }] : [];
  var dialogTitleCopy = t('PAYMENTS_ADD_PAYMENT_METHOD', 'Add payment method', 'Button to add a payment method');
  return /*#__PURE__*/_jsx(Backdrop, {
    center: true,
    onClose: handleDialogClose,
    children: /*#__PURE__*/_jsx(DialogConfirmationNoFooter, {
      "data-testid": "add-payment-dialog",
      title: dialogTitleCopy,
      dialogTitle: /*#__PURE__*/_jsxs(Title, {
        children: [/*#__PURE__*/_jsx("span", {
          children: dialogTitleCopy
        }), /*#__PURE__*/_jsx(ButtonIcon, {
          "data-testid": "payment-dialog-close-button",
          onClick: handleDialogClose,
          children: /*#__PURE__*/_jsx(IconX, {
            "aria-label": "Close"
          })
        })]
      }),
      body: /*#__PURE__*/_jsxs(Suspense, {
        fallback: /*#__PURE__*/_jsx(_Fragment, {
          children: t('PAYMENTS_DIALOG_LOADING', 'Loading...', 'Describes a form data loading state')
        }),
        children: [/*#__PURE__*/_jsx(Heading, {
          children: /*#__PURE__*/_jsx(Type, {
            as: "p",
            children: t('PAYMENTS_DIALOG_DESCRIPTION', 'This credit card can be used by any admin or editor on {teamName}.', 'teamName is the name of the team whose card is being added for. Admin or editor refers to a user', {
              teamName: teamName
            })
          })
        }), /*#__PURE__*/_jsx(CheckoutWrapper, {
          children: /*#__PURE__*/_jsx(Checkout, {
            clientId: MARQUEE_CLIENT_ID,
            paymentProviderIds: [PAYMENT_PROVIDER_ID],
            country: billingCountry,
            locale: market,
            isPayment: false,
            buttonLabel: submitCta,
            offerLegalTerms: legalTerms,
            onSubmit: handleSubmit,
            onSuccess: handleSuccess,
            customErrors: [],
            onClearErrors: function onClearErrors() {},
            environment: Environment.PRODUCTION,
            clientName: "s4a",
            clientContext: "update-payment-details"
          })
        })]
      })
    })
  });
};