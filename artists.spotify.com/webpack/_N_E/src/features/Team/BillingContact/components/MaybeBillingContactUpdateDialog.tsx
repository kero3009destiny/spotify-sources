import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useState } from 'react';
import styled from 'styled-components';
import { Backdrop, ButtonTertiary, DialogConfirmation } from '@spotify-internal/encore-web';
import { useTeamStore } from '../../lib/store/useTeamStore';
import { BillingAdmin } from '../../../Payments/BillingAdmin';
import { useT } from '@mrkt/features/i18n';
import { useWebTeamCancelBillingContactLogger, useWebTeamSaveBillingContactLogger } from '../../lib/hooks/useWebTeamUbi';
import { useBillingInformation } from '../../../Payments/lib/hooks/useBillingInformation';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledDialogConfirmation = styled(DialogConfirmation).withConfig({
  displayName: "MaybeBillingContactUpdateDialog__StyledDialogConfirmation",
  componentId: "sc-7zjh9t-0"
})(["> *{overflow:visible;}"]);
export var MaybeBillingContactUpdateDialog = function MaybeBillingContactUpdateDialog() {
  var _useTeamStore = useTeamStore(),
      _useTeamStore$billing = _useTeamStore.billingContact,
      confirmBillingContactChange = _useTeamStore$billing.confirmBillingContactChange,
      removeSelectedTeamMember = _useTeamStore$billing.removeSelectedTeamMember,
      billingCountry = _useTeamStore$billing.billingCountry,
      updateBillingContact = _useTeamStore.updateBillingContact,
      hideBillingContactSpeedbump = _useTeamStore.hideBillingContactSpeedbump,
      currentTeamDetails = _useTeamStore.currentTeamDetails,
      currentUser = _useTeamStore.currentUser;

  var t = useT();

  var _useBillingInformatio = useBillingInformation((currentTeamDetails === null || currentTeamDetails === void 0 ? void 0 : currentTeamDetails.uri) || ''),
      billingSettings = _useBillingInformatio.billingSettings,
      updateBillingInformationCache = _useBillingInformatio.updateBillingInformationCache;

  var _useState = useState(undefined),
      newBillingContactId = _useState[0],
      setNewBillingContactId = _useState[1];

  var _useState2 = useState(undefined),
      newBillingContactEmail = _useState2[0],
      setNewBillingContactEmail = _useState2[1];

  var _useState3 = useState(false),
      isSelectingBillingContact = _useState3[0],
      setIsSelectingBillingContact = _useState3[1];

  var logCloseBillingContactDialog = useWebTeamCancelBillingContactLogger('billing_contact_dialog');
  var logSaveBillingContactDialog = useWebTeamSaveBillingContactLogger('billing_contact_dialog');

  if (!confirmBillingContactChange || !currentTeamDetails) {
    return null;
  }

  var currentUserIsBillingContact = (currentUser === null || currentUser === void 0 ? void 0 : currentUser.username) && (currentUser === null || currentUser === void 0 ? void 0 : currentUser.username) === confirmBillingContactChange.username;
  var otherUserDialogTitle = removeSelectedTeamMember ? t('UPDATE_BILLING_CONTACT_DIALOG_TITLE', 'To remove {name}, replace the billing contact for {teamName}', 'Title of dialog when billing contact is not current user', {
    name: confirmBillingContactChange.fullName || confirmBillingContactChange.username,
    teamName: currentTeamDetails.name
  }) : t('UPDATE_BILLING_CONTACT_DIALOG_TITLE_DOWNGRADING', 'To change this user’s access level make someone else the billing contact', 'Title of dialog when billing contact access level is downgraded');
  var dialogTitle = currentUserIsBillingContact ? t('UPDATE_BILLING_CONTACT_DIALOG_TITLE_CURRENT_USER', 'To leave this team make someone else the billing contact', 'Title of dialog when current user is billing contact') : otherUserDialogTitle;
  return /*#__PURE__*/_jsx(Backdrop, {
    center: true,
    onClose: function onClose() {
      !isSelectingBillingContact && hideBillingContactSpeedbump();
    },
    children: /*#__PURE__*/_jsx(StyledDialogConfirmation, {
      "data-testid": "update-billing-contact-before-removal-dialog",
      dialogTitle: dialogTitle,
      body: /*#__PURE__*/_jsxs("div", {
        style: {
          overflow: 'visible'
        },
        children: [/*#__PURE__*/_jsx("p", {
          children: t('BILLING_CONTACT_ADMIN_DESCRIPTION', 'Every team needs an admin assigned to receive billing notifications.', 'Billing contact admin requirement description')
        }), /*#__PURE__*/_jsx(BillingAdmin, {
          disabled: false,
          filterOptions: function filterOptions(tm) {
            return tm.id !== confirmBillingContactChange.id;
          },
          orgUri: currentTeamDetails.uri,
          billingContactId: newBillingContactId,
          onChange: function onChange(adminTeamMember) {
            setNewBillingContactId(adminTeamMember.id);
            setNewBillingContactEmail(adminTeamMember.businessEmail);
          },
          onDropdownChange: function onDropdownChange(isSelecting) {
            return setIsSelectingBillingContact(isSelecting);
          }
        })]
      }),
      footer: /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(ButtonTertiary, {
          condensed: true,
          onClick: function onClick() {
            hideBillingContactSpeedbump();
            logCloseBillingContactDialog();
          },
          children: t('BILLING_CONTACT_CANCEL_BUTTON', 'Cancel', 'Cancel Saving Billing Contact')
        }), /*#__PURE__*/_jsx(ButtonTertiary, {
          "data-testid": "confirm-update-billing-contact-button",
          semanticColor: "textBrightAccent",
          disabled: !newBillingContactId,
          condensed: true,
          onClick: function onClick() {
            updateBillingContact(currentTeamDetails, confirmBillingContactChange, newBillingContactId, newBillingContactEmail, billingCountry, t, removeSelectedTeamMember);
            logSaveBillingContactDialog();
            updateBillingInformationCache(_objectSpread(_objectSpread({}, billingSettings), {}, {
              billingContactId: newBillingContactId,
              country: billingCountry,
              email: newBillingContactEmail
            }));
          },
          children: t('BILLING_CONTACT_SAVE_BUTTON', 'Save changes', 'Save Billing Contact')
        })]
      })
    })
  });
};