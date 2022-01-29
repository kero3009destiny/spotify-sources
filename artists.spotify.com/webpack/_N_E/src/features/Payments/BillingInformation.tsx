import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { ButtonPrimary, FormGroup, FormSelect, Type, spacer32, screenXsMax } from '@spotify-internal/encore-web';
import { useLaunchedCountries } from '@mrkt/features/country-names';
import { Container, StyledHeader, BADGE_HEIGHT } from './styled';
import { BillingAdmin } from './BillingAdmin';
import { useBillingSaveButtonLogger, useBillingCountrySelectionLogger, useBillingCountryDropdownLogger } from './hooks/usePaymentsUbi';
import { useInvoicingPaymentMethod } from './lib/hooks/useInvoicingPaymentMethod';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var FlexContainer = styled.div.withConfig({
  displayName: "BillingInformation__FlexContainer",
  componentId: "ja8z1s-0"
})(["display:flex;align-items:baseline;& > *{width:50%;& + *{margin-left:2%;}}margin:", " 0px;@media (max-width:", "){flex-direction:column;& > *{width:100%;& + *{margin-left:0px;}}}"], spacer32, screenXsMax);
export var BillingInformation = function BillingInformation(_ref) {
  var paymentMethod = _ref.paymentMethod,
      onSubmit = _ref.onSubmit,
      _ref$savedEmail = _ref.savedEmail,
      savedEmail = _ref$savedEmail === void 0 ? '' : _ref$savedEmail,
      _ref$savedCountry = _ref.savedCountry,
      savedCountry = _ref$savedCountry === void 0 ? '' : _ref$savedCountry,
      savedBillingContactId = _ref.savedBillingContactId,
      orgUri = _ref.orgUri,
      isAdmin = _ref.isAdmin,
      isInvoiced = _ref.isInvoiced;
  var launchedCountries = useLaunchedCountries();

  var _useState = useState(savedEmail),
      unsavedEmail = _useState[0],
      setUnsavedEmail = _useState[1];

  var _useState2 = useState(savedCountry),
      unsavedCountry = _useState2[0],
      setUnsavedCountry = _useState2[1];

  var _useState3 = useState(savedBillingContactId),
      unsavedBillingContactId = _useState3[0],
      setUnsavedBillingContactId = _useState3[1];

  var _useState4 = useState(false),
      isDirty = _useState4[0],
      setIsDirty = _useState4[1];

  var _useState5 = useState(false),
      countryIsInvalid = _useState5[0],
      setCountryIsInvalid = _useState5[1];

  var logBillingSaveButton = useBillingSaveButtonLogger(orgUri);
  var logBillingCountrySelection = useBillingCountrySelectionLogger(orgUri);
  var logBillingCountryDropdownReveal = useBillingCountryDropdownLogger(orgUri);
  var hasInvoiceFeatureFlag = useInvoicingPaymentMethod();
  var t = useT();
  useEffect(function () {
    if (unsavedBillingContactId === savedBillingContactId && unsavedCountry === savedCountry) {
      setIsDirty(false);
    } else {
      setIsDirty(true);
    }
  }, [savedCountry, setIsDirty, unsavedCountry, savedBillingContactId, unsavedBillingContactId]);
  var countryOnChange = useCallback(function (countryName) {
    setUnsavedCountry(countryName);
    logBillingCountrySelection(countryName);

    if (countryName === savedCountry && unsavedBillingContactId === savedBillingContactId) {
      setIsDirty(false);
    } else {
      setIsDirty(true);
    }

    if (countryName !== 'US' && (paymentMethod || isInvoiced)) {
      setCountryIsInvalid(true);
    } else {
      setCountryIsInvalid(false);
    }
  }, [setUnsavedCountry, logBillingCountrySelection, setIsDirty, setCountryIsInvalid, savedCountry, paymentMethod, unsavedBillingContactId, savedBillingContactId, isInvoiced]);
  var billingContactOnChange = useCallback(function (teamMember) {
    setUnsavedBillingContactId(teamMember.id);
    setUnsavedEmail(teamMember.businessEmail);

    if (teamMember.id === savedBillingContactId && unsavedCountry === savedCountry) {
      setIsDirty(false);
    } else {
      setIsDirty(true);
    }
  }, [savedCountry, unsavedCountry, savedBillingContactId, setIsDirty]);

  var handleSubmit = function handleSubmit() {
    logBillingSaveButton({
      hasCountry: !!unsavedCountry,
      hasEmail: !!unsavedBillingContactId
    });
    onSubmit({
      country: unsavedCountry,
      billingContactId: unsavedBillingContactId,
      email: unsavedEmail
    });
  };

  var billingLabel = function billingLabel() {
    return /*#__PURE__*/_jsx(Type, {
      variant: Type.body2,
      weight: "bold",
      children: t('PAYMENTS_CONTACT_LABEL', 'Billing contact', 'Label text for billing contact field. Contact is a person who handles billing.')
    });
  };

  return /*#__PURE__*/_jsxs(Container, {
    "aria-labelledby": "billing-information-header",
    "data-testid": "payment-billing-information",
    children: [/*#__PURE__*/_jsx(StyledHeader, {
      id: "billing-information-header",
      variant: "heading3",
      children: t('PAYMENTS_BILLING_HEADER', 'Billing information', 'Title text for billing section')
    }), /*#__PURE__*/_jsx(Type, {
      as: "p",
      variant: Type.body2,
      semanticColor: "textBase",
      children: t('PAYMENTS_BILLING_DESCRIPTION', 'Right now, you can only use paid features like Marquee if the United States is your primary billing country.', 'Marquee refers to a paid feature')
    }), /*#__PURE__*/_jsxs(FlexContainer, {
      children: [/*#__PURE__*/_jsx(FormGroup, {
        label: t('PAYMENTS_COUNTRY_LABEL', 'Primary billing country', 'Label text for billing country field'),
        labelFor: "billing-team-country",
        children: /*#__PURE__*/_jsxs(FormSelect, {
          style: {
            height: BADGE_HEIGHT
          },
          onClick: function onClick() {
            return logBillingCountryDropdownReveal();
          },
          onKeyPress: function onKeyPress(e) {
            var SPACE = ' ';
            if (e.key === SPACE) logBillingCountryDropdownReveal();
          },
          "data-testid": "billing-team-country",
          defaultValue: savedCountry || '',
          disabled: Boolean(paymentMethod || !isAdmin || hasInvoiceFeatureFlag && isInvoiced),
          id: "billing-team-country",
          onChange: function onChange(e) {
            return countryOnChange(e.target.value);
          },
          children: [/*#__PURE__*/_jsx("option", {
            disabled: true,
            value: "",
            children: t('PAYMENTS_COUNTRY_SELECTOR', 'Choose country', 'Placeholder for country dropdown list')
          }), launchedCountries.map(function (_ref2) {
            var code = _ref2.code,
                name = _ref2.name;
            return /*#__PURE__*/_jsx("option", {
              value: code,
              children: name
            }, code);
          })]
        })
      }), /*#__PURE__*/_jsx(FormGroup, {
        label: billingLabel(),
        labelFor: "billing-admin",
        children: /*#__PURE__*/_jsx(BillingAdmin, {
          disabled: !isAdmin,
          onChange: billingContactOnChange,
          orgUri: orgUri,
          billingContactId: unsavedBillingContactId
        })
      })]
    }), /*#__PURE__*/_jsx(ButtonPrimary, {
      "data-testid": "billing-save",
      disabled: countryIsInvalid || !isDirty || !isAdmin,
      onClick: handleSubmit,
      children: t('PAYMENTS_SAVE_BUTTON', 'Save', 'Save billing information')
    })]
  });
};