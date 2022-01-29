import React, { useState, useEffect } from 'react';
import { AddPaymentButton } from './AddPaymentButton';
import { AddPaymentDialog } from './AddPaymentDialog';
import { SavedCard } from './SavedCard';
import { usePaymentMethodAddCardLogger, usePaymentMethodUpdateCardLogger } from './hooks/usePaymentsUbi';
import { InvoicePaymentMethod } from './InvoicePaymentMethod';
import { useInvoicingPaymentMethod } from './lib/hooks/useInvoicingPaymentMethod';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var Payment = function Payment(props) {
  var isInvoiced = props.isInvoiced,
      isAdmin = props.isAdmin,
      onClick = props.onClick,
      onSuccess = props.onSuccess,
      orgUri = props.orgUri,
      paymentMethod = props.paymentMethod,
      savedCountry = props.savedCountry,
      savedBillingContactId = props.savedBillingContactId,
      savedEmail = props.savedEmail,
      _props$teamName = props.teamName,
      teamName = _props$teamName === void 0 ? 'your team' : _props$teamName;

  var _useState = useState(false),
      addPaymentDialogIsOpen = _useState[0],
      setAddPaymentDialogIsOpen = _useState[1];

  var _useState2 = useState(false),
      paymentButtonDisabled = _useState2[0],
      setPaymentButtonDisabled = _useState2[1];

  var logPaymentMethodAddCard = usePaymentMethodAddCardLogger(orgUri);
  var logPaymentMethodUpdateCard = usePaymentMethodUpdateCardLogger(orgUri);
  var invoiceFlagEnabled = useInvoicingPaymentMethod();

  var openAddPaymentDialog = function openAddPaymentDialog(addOrEdit) {
    return function () {
      addOrEdit === 'add' ? logPaymentMethodAddCard() : logPaymentMethodUpdateCard();
      return setAddPaymentDialogIsOpen(true);
    };
  };

  var onClickAdd = onClick ? onClick : openAddPaymentDialog('add');
  var onClickEdit = onClick ? onClick : openAddPaymentDialog('edit');
  useEffect(function () {
    if (savedBillingContactId && savedBillingContactId !== '' && savedCountry === 'US') {
      setPaymentButtonDisabled(false);
    } else {
      setPaymentButtonDisabled(true);
    }
  }, [savedCountry, savedEmail, savedBillingContactId]);
  var button = paymentMethod ? /*#__PURE__*/_jsx(SavedCard, {
    isAdmin: isAdmin,
    onClick: onClickEdit,
    paymentMethod: paymentMethod,
    teamName: teamName
  }) : /*#__PURE__*/_jsx(AddPaymentButton, {
    buttonDisabled: paymentButtonDisabled,
    onClick: onClickAdd
  });
  return /*#__PURE__*/_jsxs("div", {
    "data-testid": "payment",
    children: [invoiceFlagEnabled && isInvoiced ? /*#__PURE__*/_jsx(InvoicePaymentMethod, {
      teamName: teamName
    }) : button, addPaymentDialogIsOpen ? /*#__PURE__*/_jsx(AddPaymentDialog, {
      country: savedCountry,
      orgUri: orgUri,
      onClose: function onClose() {
        return setAddPaymentDialogIsOpen(false);
      },
      onSuccess: onSuccess,
      paymentMethod: paymentMethod,
      teamName: teamName
    }) : '']
  });
};