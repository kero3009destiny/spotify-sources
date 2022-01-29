import React from 'react';
import styled from 'styled-components';
import { Type, cssColorValue, spacer64 } from '@spotify-internal/encore-web';
import { Container, StyledHeader } from './styled';
import { Payment } from './Payment';
import { useInvoicingPaymentMethod } from './lib/hooks/useInvoicingPaymentMethod';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledType = styled(Type.p).withConfig({
  displayName: "PaymentMethod__StyledType",
  componentId: "sc-1fu3xjy-0"
})(["color:", ";margin-bottom:18px;"], cssColorValue('textBase'));
var StyledContainer = styled(Container).withConfig({
  displayName: "PaymentMethod__StyledContainer",
  componentId: "sc-1fu3xjy-1"
})(["margin-top:", ";"], spacer64);
export var PaymentMethod = function PaymentMethod(_ref) {
  var paymentMethod = _ref.paymentMethod,
      savedCountry = _ref.savedCountry,
      savedBillingContactId = _ref.savedBillingContactId,
      savedEmail = _ref.savedEmail,
      teamName = _ref.teamName,
      orgUri = _ref.orgUri,
      onSuccess = _ref.onSuccess,
      isInvoiced = _ref.isInvoiced,
      _ref$isAdmin = _ref.isAdmin,
      isAdmin = _ref$isAdmin === void 0 ? true : _ref$isAdmin,
      onClick = _ref.onClick;
  var invoiceFlagEnabled = useInvoicingPaymentMethod();
  var t = useT();
  var cardOnFileCopy = t('PAYMENTS_CARD_LABEL', 'Card on file', 'Label text for a credit card field');
  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsxs(StyledContainer, {
      "aria-labelledby": "payment-method-header",
      "data-testid": "payment-method",
      children: [/*#__PURE__*/_jsx(StyledHeader, {
        "data-testid": "title",
        id: "payment-method-header",
        variant: "heading3",
        children: t('PAYMENTS_PAYMENT_METHOD_HEADER', 'Payment method', 'Title text for payment method section')
      }), /*#__PURE__*/_jsx(StyledType, {
        "data-testid": "description",
        children: t('PAYMENTS_PAYMENT_METHOD_DESCRIPTION', 'Admins and editors will be able to use this payment method to create campaigns.', 'Description text for a payment method (eg: credit card, invoicing)')
      }), invoiceFlagEnabled ? /*#__PURE__*/_jsx(_Fragment, {
        children: !Boolean(isInvoiced) && /*#__PURE__*/_jsx(Type, {
          as: "p",
          "data-testid": "subtitle",
          variant: Type.body2,
          weight: Type.bold,
          children: cardOnFileCopy
        })
      }) : /*#__PURE__*/_jsx(Type, {
        as: "p",
        "data-testid": "subtitle",
        variant: Type.body2,
        weight: Type.bold,
        children: cardOnFileCopy
      }), /*#__PURE__*/_jsx(Payment, {
        isInvoiced: isInvoiced,
        isAdmin: isAdmin,
        onClick: onClick,
        onSuccess: onSuccess,
        orgUri: orgUri,
        paymentMethod: paymentMethod,
        savedCountry: savedCountry,
        savedEmail: savedEmail,
        savedBillingContactId: savedBillingContactId,
        teamName: teamName
      })]
    })
  });
};