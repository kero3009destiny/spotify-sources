import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import React from 'react';
import styled from 'styled-components';
import { PayStatus } from '../types';
import { List, cssColorValue, spacer4, spacer12, spacer16, ListItem } from '@spotify-internal/encore-web';
import { useDateTimeFormatter, useNumberFormatter, useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function PaymentTransactionItem(props) {
  var payment = props.payment;
  var dateFormatter = useDateTimeFormatter({
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  return /*#__PURE__*/_jsx(ListItem, {
    "data-testid": "payment-transaction-item",
    children: /*#__PURE__*/_jsxs(List, {
      children: [/*#__PURE__*/_jsx(PaymentTransactionHeader, {
        transactionDate: dateFormatter.format(new Date(payment.updatedAt))
      }), /*#__PURE__*/_jsx(PaymentTransactionBody, {
        payment: payment
      })]
    })
  });
}
var TransactionHeaderContainer = styled(ListItem).withConfig({
  displayName: "PaymentTransactionItem__TransactionHeaderContainer",
  componentId: "sc-1hb87do-0"
})(["display:flex;padding:", " 0px ", " ", ";background-color:", ";width:100%;"], spacer12, spacer12, spacer16, cssColorValue('backgroundHighlight'));

function PaymentTransactionHeader(props) {
  return /*#__PURE__*/_jsx(TransactionHeaderContainer, {
    children: props.transactionDate
  });
}

var TransactionBodyContainer = styled(List).withConfig({
  displayName: "PaymentTransactionItem__TransactionBodyContainer",
  componentId: "sc-1hb87do-1"
})(["display:flex;flex-direction:column;padding:", ";"], spacer16);
var TransactionAmountRow = styled(ListItem).withConfig({
  displayName: "PaymentTransactionItem__TransactionAmountRow",
  componentId: "sc-1hb87do-2"
})(["display:flex;justify-content:space-between;"]);
var TransactionStatusRow = styled(ListItem).withConfig({
  displayName: "PaymentTransactionItem__TransactionStatusRow",
  componentId: "sc-1hb87do-3"
})(["margin-top:", ";display:flex;align-items:center;justify-content:flex-start;"], spacer12);
var TransactionCardRow = styled(ListItem).withConfig({
  displayName: "PaymentTransactionItem__TransactionCardRow",
  componentId: "sc-1hb87do-4"
})(["margin-top:", ";"], spacer12);
var PaymentStatusIndicator = styled.div.withConfig({
  displayName: "PaymentTransactionItem__PaymentStatusIndicator",
  componentId: "sc-1hb87do-5"
})(["", " height:8px;width:8px;margin-right:", ";border-radius:50%;"], function (props) {
  return "background-color: ".concat(props.color, ";");
}, spacer4);

function PaymentTransactionBody(props) {
  var _PAY_STATUS_METADATA;

  var t = useT();
  var _props$payment = props.payment,
      status = _props$payment.status,
      paymentId = _props$payment.paymentId,
      currency = _props$payment.currency,
      amount = _props$payment.amount,
      _props$payment$card = _props$payment.card,
      network = _props$payment$card.network,
      lastFour = _props$payment$card.lastFour;
  var IN_PROGRESS_LABEL = t('PAYMENTS_PAYMENT_STATUS_IN_PROGRESS', 'In progress', 'This refers to the payment status of a credit card. It is currently being processed.');
  var FAILED_LABEL = t('PAYMENTS_PAYMENT_STATUS_FAILED', 'Failed', 'This refers to the payment status of a credit card. The payment has failed.');
  var PAID_LABEL = t('PAYMENTS_PAYMENT_STATUS_PAID', 'Paid', 'This refers to the payment status of a credit card. It is been successfully paid.');
  var PAY_STATUS_METADATA = (_PAY_STATUS_METADATA = {}, _defineProperty(_PAY_STATUS_METADATA, PayStatus.IN_PROGRESS, {
    color: cssColorValue('essentialSubdued'),
    label: IN_PROGRESS_LABEL
  }), _defineProperty(_PAY_STATUS_METADATA, PayStatus.FAILED, {
    color: cssColorValue('essentialNegative'),
    label: FAILED_LABEL
  }), _defineProperty(_PAY_STATUS_METADATA, PayStatus.PAID, {
    color: cssColorValue('essentialPositive'),
    label: PAID_LABEL
  }), _PAY_STATUS_METADATA);
  var _PAY_STATUS_METADATA$ = PAY_STATUS_METADATA[status],
      statusColor = _PAY_STATUS_METADATA$.color,
      statusLabel = _PAY_STATUS_METADATA$.label;
  var currencyFormatter = useNumberFormatter({
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0
  });
  return /*#__PURE__*/_jsx(ListItem, {
    className: "encore-creator-light-theme",
    children: /*#__PURE__*/_jsxs(TransactionBodyContainer, {
      children: [/*#__PURE__*/_jsxs(TransactionAmountRow, {
        children: [/*#__PURE__*/_jsxs("div", {
          children: [t('PAYMENTS_PAYMENT_ID_LABEL', 'Payment:', 'This is the label for a specific payment id. An example is: "Payment: 8266026."'), ' ', paymentId, ' ']
        }), /*#__PURE__*/_jsxs("div", {
          children: [" ", "".concat(currencyFormatter.format(amount), " ").concat(currency), " "]
        })]
      }), /*#__PURE__*/_jsx(TransactionCardRow, {
        children: "".concat(network, " ****").concat(lastFour)
      }), /*#__PURE__*/_jsxs(TransactionStatusRow, {
        children: [/*#__PURE__*/_jsx(PaymentStatusIndicator, {
          color: statusColor
        }), /*#__PURE__*/_jsx("span", {
          children: statusLabel
        })]
      })]
    })
  });
}