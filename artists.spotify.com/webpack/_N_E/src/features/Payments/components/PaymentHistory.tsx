import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Type, LoadingIndicator, spacer80, spacer24, HorizontalRule, spacer64, List } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { PaymentHistoryPagination } from './PaymentHistoryPagination';
import { usePaymentHistory } from '../lib/hooks/usePaymentHistory';
import { useCurrentTeamUri } from '../lib/hooks/useCurrentTeamUri';
import { PaymentTransactionItem } from './PaymentTransactionItem';
import { StyledHeader } from '../styled';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var LoadingContainer = styled.div.withConfig({
  displayName: "PaymentHistory__LoadingContainer",
  componentId: "vbeztv-0"
})(["display:flex;align-items:center;justify-content:center;padding:", ";"], spacer80);
var PaginationContainer = styled.div.withConfig({
  displayName: "PaymentHistory__PaginationContainer",
  componentId: "vbeztv-1"
})(["display:flex;justify-content:flex-end;"]);
var StyledHorizontalRule = styled(HorizontalRule).withConfig({
  displayName: "PaymentHistory__StyledHorizontalRule",
  componentId: "vbeztv-2"
})(["margin-top:0px;"]);
var StyledType = styled(Type).withConfig({
  displayName: "PaymentHistory__StyledType",
  componentId: "vbeztv-3"
})(["max-width:1000px;"]);
var StyledTransactionListContainer = styled(List).withConfig({
  displayName: "PaymentHistory__StyledTransactionListContainer",
  componentId: "vbeztv-4"
})(["margin-top:", ";"], spacer24);

function Loading() {
  return /*#__PURE__*/_jsx(LoadingContainer, {
    children: /*#__PURE__*/_jsx(LoadingIndicator, {})
  });
}

export function TransactionList(props) {
  var payments = props.payments;
  return /*#__PURE__*/_jsx(StyledTransactionListContainer, {
    children: payments.map(function (payment) {
      return /*#__PURE__*/_jsx(PaymentTransactionItem, {
        payment: payment
      }, payment.paymentId);
    })
  });
}
var PaymentHistoryContainer = styled.div.withConfig({
  displayName: "PaymentHistory__PaymentHistoryContainer",
  componentId: "vbeztv-5"
})(["margin-top:", ";"], spacer64);

function PaymentHistoryBase() {
  var t = useT();
  var teamUri = useCurrentTeamUri();

  var _usePaymentHistory = usePaymentHistory(teamUri),
      _usePaymentHistory$pa = _usePaymentHistory.paymentHistory,
      payments = _usePaymentHistory$pa.payments,
      page = _usePaymentHistory$pa.page,
      updatePaymentHistory = _usePaymentHistory.updatePaymentHistory,
      isLoading = _usePaymentHistory.isLoading;

  if (!payments.length) return null;
  return /*#__PURE__*/_jsxs(PaymentHistoryContainer, {
    children: [/*#__PURE__*/_jsx(StyledHeader, {
      variant: "heading3",
      children: t('PAYMENTS_PAYMENT_HISTORY_HEADER', 'Transactions', 'Header text for the payment transaction history section for a team.')
    }), /*#__PURE__*/_jsx(StyledType, {
      children: t('PAYMENTS_PAYMENT_HISTORY_DESCRIPTION', 'If paying with a card, you’ll be charged each day that your spend reaches a $250 billing threshold. Anything outstanding will be charged at the end of the month.', 'Informational text for the payment transaction history section for a team.')
    }), isLoading ? /*#__PURE__*/_jsx(Loading, {}) : /*#__PURE__*/_jsx(TransactionList, {
      payments: payments
    }), /*#__PURE__*/_jsx(StyledHorizontalRule, {}), /*#__PURE__*/_jsx(PaginationContainer, {
      children: /*#__PURE__*/_jsx(PaymentHistoryPagination, {
        page: page,
        onPageChange: updatePaymentHistory
      })
    })]
  });
}

export function PaymentHistory() {
  return /*#__PURE__*/_jsx(Suspense, {
    fallback: /*#__PURE__*/_jsx(Loading, {}),
    children: /*#__PURE__*/_jsx(PaymentHistoryBase, {})
  });
}