import React from 'react';
import { Backdrop, ButtonTertiary, ButtonPrimary, Type } from '@spotify-internal/encore-web';
import { useTeamStore } from '../../lib/store/useTeamStore';
import styled from 'styled-components';
import { useT } from '@mrkt/features/i18n';
import { DialogConfirmation } from '@mrkt/features/Dialog';
import { useWebTeamAccessLevelPopoverLeaveTeamCancelLinkLogger, useWebTeamAccessLevelPopoverLeaveTeamConfirmLogger } from '../../lib/hooks/useWebTeamUbi';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var DialogConfirmationStyled = styled(DialogConfirmation).withConfig({
  displayName: "MaybeLeaveTeamDialog__DialogConfirmationStyled",
  componentId: "pmdtwv-0"
})(["&:focus{outline:none;}@media (max-width:768px){width:90%;margin:auto;}"]);
var OptionsContainer = styled.div.withConfig({
  displayName: "MaybeLeaveTeamDialog__OptionsContainer",
  componentId: "pmdtwv-1"
})(["display:flex;"]);
export var MaybeLeaveTeamDialog = function MaybeLeaveTeamDialog() {
  var t = useT();
  var logLeaveTeamCancelPopoverHide = useWebTeamAccessLevelPopoverLeaveTeamCancelLinkLogger('leave_team_confirmation_dialog');
  var logLeaveTeamConfirm = useWebTeamAccessLevelPopoverLeaveTeamConfirmLogger('leave_team_confirmation_dialog');

  var _useTeamStore = useTeamStore(),
      currentUser = _useTeamStore.currentUser,
      confirmTeamMemberRemoval = _useTeamStore.confirmTeamMemberRemoval,
      currentTeam = _useTeamStore.currentTeam,
      currentTeamDetails = _useTeamStore.currentTeamDetails,
      confirmBillingContactChange = _useTeamStore.billingContact.confirmBillingContactChange,
      hideTeamMemberRemovalConfirmation = _useTeamStore.hideTeamMemberRemovalConfirmation,
      removeTeamMember = _useTeamStore.removeTeamMember;

  var isCurrentUser = (currentUser === null || currentUser === void 0 ? void 0 : currentUser.username) === (confirmTeamMemberRemoval === null || confirmTeamMemberRemoval === void 0 ? void 0 : confirmTeamMemberRemoval.username);

  if (confirmBillingContactChange || !confirmTeamMemberRemoval || !currentTeam || !isCurrentUser) {
    return null;
  }

  return /*#__PURE__*/_jsx(Backdrop, {
    center: true,
    onClose: hideTeamMemberRemovalConfirmation,
    children: /*#__PURE__*/_jsx(DialogConfirmationStyled, {
      "data-testid": "confirm-leave-team-dialog",
      dialogId: "confirm-leave-team-dialog",
      dialogTitle: t('CONFIRM_LEAVE_TEAM_DIALOG_TITLE', 'Leave {team}?', 'Title of the leave team confirmation dialog', {
        team: currentTeamDetails ? currentTeamDetails.name : 'team'
      }),
      body: /*#__PURE__*/_jsx("div", {
        children: /*#__PURE__*/_jsx(Type, {
          as: "p",
          children: t('CONFIRM_LEAVE_TEAM_DIALOG_BODY', 'You’ll lose access to the artists associated with this team. If you want to join again in the future, ask another admin to invite you.', 'Body of dialog to confirm leaving a team.')
        })
      }),
      footer: /*#__PURE__*/_jsxs(OptionsContainer, {
        children: [/*#__PURE__*/_jsx(ButtonTertiary, {
          "data-testid": "cancel-remove-button",
          onClick: function onClick() {
            hideTeamMemberRemovalConfirmation();
            logLeaveTeamCancelPopoverHide();
          },
          buttonSize: ButtonTertiary.sm,
          className: "encore-creator-light-theme",
          children: t('CANCEL_BUTTON', 'Cancel', 'Button to cancel leaving a team.')
        }), /*#__PURE__*/_jsx(ButtonPrimary, {
          colorSet: "negative",
          "data-testid": "confirm-remove-button",
          buttonSize: ButtonTertiary.sm,
          onClick: function onClick() {
            removeTeamMember(confirmTeamMemberRemoval, currentTeam, t, true);
            hideTeamMemberRemovalConfirmation();
            logLeaveTeamConfirm();
          },
          children: t('CONFIRM_LEAVE_TEAM_BUTTON', 'Leave team', 'Button to confirm leaving a team.')
        })]
      })
    })
  });
};