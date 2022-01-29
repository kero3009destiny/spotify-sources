// ignore-string-externalization
import React from 'react';
import { PaymentSettings } from '../../Payments';
import { PaymentHistory } from '../../Payments/components/PaymentHistory';
import { usePaymentHistoryFlag } from '../../Payments/lib/hooks/usePaymentHistoryFlag';
import { useTeamStore } from '../lib/store/useTeamStore';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var BillingPage = function BillingPage() {
  var _useTeamStore = useTeamStore(),
      showSuccessBanner = _useTeamStore.showSuccessBanner,
      showErrorBanner = _useTeamStore.showErrorBanner;

  var paymentHistoryEnabled = usePaymentHistoryFlag();
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(PaymentSettings, {
      onShowBanner: function onShowBanner(_ref) {
        var colorSet = _ref.colorSet,
            message = _ref.message;

        switch (colorSet) {
          case 'positive':
            showSuccessBanner(message);
            break;

          case 'negative':
            showErrorBanner(message);
            break;
        }

        return;
      }
    }), paymentHistoryEnabled && /*#__PURE__*/_jsx(PaymentHistory, {})]
  });
};