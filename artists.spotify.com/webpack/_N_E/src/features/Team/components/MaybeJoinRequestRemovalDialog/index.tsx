import React from 'react';
import { Backdrop, ButtonTertiary, DialogAlert, FormGroup, FormRadio, Type } from '@spotify-internal/encore-web';
import { useTeamStore } from '../../lib/store/useTeamStore';
import styled from 'styled-components';
import { JoinRequestRejectionReason } from '../../lib/model/JoinRequest';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledFormGroup = styled(FormGroup).withConfig({
  displayName: "MaybeJoinRequestRemovalDialog__StyledFormGroup",
  componentId: "sc-1fub9y9-0"
})(["padding:0;"]);
export var MaybeJoinRequestRemovalDialog = function MaybeJoinRequestRemovalDialog() {
  var _useTeamStore = useTeamStore(),
      removeJoinRequest = _useTeamStore.removeJoinRequest,
      confirmJoinRequestRemoval = _useTeamStore.confirmJoinRequestRemoval,
      hideJoinRequestRemovalConfirmation = _useTeamStore.hideJoinRequestRemovalConfirmation,
      currentTeamDetails = _useTeamStore.currentTeamDetails,
      setJoinRequestRejectionReason = _useTeamStore.setJoinRequestRejectionReason;

  var t = useT();
  var rejectionReasonData = [{
    id: JoinRequestRejectionReason.UNKNOWN_REQUESTER,
    title: t('JOIN_REQUEST_REJECTION_DIALOG_UNKNOWN_TITLE', 'Unknown requester', 'Unknown requester option title'),
    description: t('JOIN_REQUEST_REJECTION_DIALOG_UNKNOWN_DESCRIPTION', "I don't know who this is", "I'm rejecting this request because I don't know who this requester is")
  }, {
    id: JoinRequestRejectionReason.MORE_INFO_NEEDED,
    title: t('JOIN_REQUEST_REJECTION_DIALOG_MORE_INFO_TITLE', 'More info needed', 'More info needed option title'),
    description: t('JOIN_REQUEST_REJECTION_DIALOG_MORE_INFO_DESCRIPTION', 'Not enough info to approve', "I'm rejecting this request because I don't have enough information")
  }, {
    id: JoinRequestRejectionReason.SPAM,
    title: t('JOIN_REQUEST_REJECTION_DIALOG_SPAM_TITLE', 'Spam', 'Spam option title'),
    description: t('JOIN_REQUEST_REJECTION_SPAM_DESCRIPTION', 'This looks like spam', "I'm rejecting this request because it looks like spam")
  }, {
    id: JoinRequestRejectionReason.OTHER,
    title: t('JOIN_REQUEST_REJECTION_OTHER', 'Other', "I'm rejecting this request for a different reason"),
    description: t('JOIN_REQUEST_REJECTION_OTHER', 'Other', "I'm rejecting this request for a different reason")
  }];

  if (!confirmJoinRequestRemoval || !currentTeamDetails) {
    return null;
  }

  return /*#__PURE__*/_jsx(Backdrop, {
    center: true,
    onClose: hideJoinRequestRemovalConfirmation,
    children: /*#__PURE__*/_jsx(DialogAlert, {
      "data-testid": "confirm-join-request-removal-dialog",
      dialogTitle: t('JOIN_REQUEST_REMOVAL_DIALOG_TITLE', "Deny {fullName}'s request?", 'Would you like to deny this request? Dialog title', {
        fullName: confirmJoinRequestRemoval.fullName
      }),
      body: /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(Type, {
          as: "p",
          variant: Type.body2,
          children: t('JOIN_REQUEST_REMOVAL_DIALOG_BODY', "We'll let them know via email. We won't say who denied the request or why.", "We will let the requester know they were denied, but we won't say who denied the request or why")
        }), /*#__PURE__*/_jsx(StyledFormGroup, {
          id: "rejectionReason",
          label: t('JOIN_REQUEST_REMOVAL_REASON_FORM_LABEL', 'Choose a reason', 'Choose a reason why you are denying this request'),
          value: confirmJoinRequestRemoval.rejectionReason,
          onChange: function onChange(e) {
            setJoinRequestRejectionReason(confirmJoinRequestRemoval, e.target.value);
          },
          children: rejectionReasonData.map(function (rejectionReason) {
            return /*#__PURE__*/_jsx(FormRadio, {
              id: rejectionReason.id,
              name: "rejectionReason",
              value: rejectionReason.id,
              children: rejectionReason.description
            }, rejectionReason.id);
          })
        })]
      }),
      footer: /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(ButtonTertiary, {
          condensed: true,
          onClick: hideJoinRequestRemovalConfirmation,
          children: t('JOIN_REQUEST_REMOVAL_DIALOG_CANCEL_BUTTON', 'Cancel', 'Cancel, dismiss this dialog')
        }), /*#__PURE__*/_jsx(ButtonTertiary, {
          "data-testid": "confirm-remove-button",
          "data-slo-id": "confirm-remove-button",
          semanticColor: "textBrightAccent",
          condensed: true,
          onClick: function onClick() {
            removeJoinRequest(confirmJoinRequestRemoval, currentTeamDetails, t);
            hideJoinRequestRemovalConfirmation();
          },
          children: t('JOIN_REQUEST_REMOVAL_DIALOG_DENY_BUTTON', 'Deny', 'Deny this request')
        })]
      })
    })
  });
};