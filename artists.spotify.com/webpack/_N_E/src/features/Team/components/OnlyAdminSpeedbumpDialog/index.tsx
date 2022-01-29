import React from 'react';
import { Backdrop, ButtonTertiary, ButtonPrimary, Type } from '@spotify-internal/encore-web';
import { DialogConfirmation } from '@mrkt/features/Dialog';
import { useT } from '@mrkt/features/i18n';
import styled from 'styled-components';
import { useWebTeamLeaveTeamRestrictedLogger } from '../../lib/hooks/useWebTeamUbi';
import { jsx as _jsx } from "react/jsx-runtime";
var DialogConfirmationStyled = styled(DialogConfirmation).withConfig({
  displayName: "OnlyAdminSpeedbumpDialog__DialogConfirmationStyled",
  componentId: "hyl6x0-0"
})(["&:focus{outline:none;}@media (max-width:768px){width:90%;margin:auto;}"]);
export var OnlyAdminSpeedbumpDialog = function OnlyAdminSpeedbumpDialog(_ref) {
  var _onClose = _ref.onClose,
      isOnlyAdminWithNoTeamMembers = _ref.isOnlyAdminWithNoTeamMembers;
  var t = useT();
  var logLeaveTeamRestrictedAcknowledgement = useWebTeamLeaveTeamRestrictedLogger(isOnlyAdminWithNoTeamMembers ? 'only_team_member_dialog' : 'only_admin_dialog');
  var dialogTitle = t('ONLY_ADMIN_DIALOG_TITLE', 'To leave this team make someone else an admin', 'Title of dialog preventing the only admin from leaving the team.');
  var dialogBody = t('ONLY_ADMIN_DIALOG_BODY', 'Tap the three dot menu to edit another team member’s access level.', 'Body of dialog preventing the only admin from leaving the team.');

  if (isOnlyAdminWithNoTeamMembers) {
    dialogTitle = t('ONLY_ADMIN_AND_MEMBER_DIALOG_TITLE', 'To leave this team add a new team member', 'Title of dialog preventing the only admin from leaving the team as the only team member.');
    dialogBody = t('ONLY_ADMIN_AND_MEMBER_DIALOG_BODY', 'Every team needs at least one member. If you want to delete this team, contact us.', 'Body of dialog preventing the only admin from leaving the team as the only team member.');
  }

  return /*#__PURE__*/_jsx(Backdrop, {
    center: true,
    onClose: function onClose() {
      return _onClose(false);
    },
    children: /*#__PURE__*/_jsx(DialogConfirmationStyled, {
      "data-testid": "only-admin-speedbump-dialog",
      dialogId: "only-admin-speedbump-dialog",
      dialogTitle: dialogTitle,
      body: /*#__PURE__*/_jsx("div", {
        "data-testid": "only-admin-speedbump-dialog-body",
        children: /*#__PURE__*/_jsx(Type, {
          as: "p",
          children: dialogBody
        })
      }),
      footer: /*#__PURE__*/_jsx("div", {
        children: /*#__PURE__*/_jsx(ButtonPrimary, {
          "data-testid": "acknowledge-speedbump-button",
          buttonSize: ButtonTertiary.sm,
          onClick: function onClick() {
            _onClose(false);

            logLeaveTeamRestrictedAcknowledgement();
          },
          children: t('ACKNOWLEDGE_DIALOG_BUTTON', 'Got it', 'Button to acknowledge the dialog.')
        })
      })
    })
  });
};