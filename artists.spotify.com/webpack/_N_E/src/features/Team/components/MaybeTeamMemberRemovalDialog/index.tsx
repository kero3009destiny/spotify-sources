import React from 'react';
import { Backdrop, ButtonTertiary, DialogAlert } from '@spotify-internal/encore-web';
import { useTeamStore } from '../../lib/store/useTeamStore';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var MaybeTeamMemberRemovalDialog = function MaybeTeamMemberRemovalDialog() {
  var _useTeamStore = useTeamStore(),
      removeTeamMember = _useTeamStore.removeTeamMember,
      confirmTeamMemberRemoval = _useTeamStore.confirmTeamMemberRemoval,
      confirmBillingContactChange = _useTeamStore.billingContact.confirmBillingContactChange,
      hideTeamMemberRemovalConfirmation = _useTeamStore.hideTeamMemberRemovalConfirmation,
      currentTeamDetails = _useTeamStore.currentTeamDetails,
      currentTeam = _useTeamStore.currentTeam,
      currentUser = _useTeamStore.currentUser;

  var t = useT();
  var isCurrentUser = (currentUser === null || currentUser === void 0 ? void 0 : currentUser.username) === (confirmTeamMemberRemoval === null || confirmTeamMemberRemoval === void 0 ? void 0 : confirmTeamMemberRemoval.username);

  if (confirmBillingContactChange || !confirmTeamMemberRemoval || !currentTeam || isCurrentUser) {
    return null;
  }

  return /*#__PURE__*/_jsx(Backdrop, {
    center: true,
    onClose: hideTeamMemberRemovalConfirmation,
    children: /*#__PURE__*/_jsx(DialogAlert, {
      "data-testid": "confirm-team-member-removal-dialog",
      dialogTitle: t('TEAM_MEMBER_REMOVAL_DIALOG_TITLE', 'Remove {name}?', 'Confirm team member removal dialog title', {
        name: confirmTeamMemberRemoval.fullName || confirmTeamMemberRemoval.username
      }),
      body: currentTeamDetails ? t('TEAM_MEMBER_REMOVAL_DIALOG_BODY_WITH_TEAM_NAME', "This will remove {name}'s access to {teamName}.", "This will remove this person's access to the team", {
        name: confirmTeamMemberRemoval.fullName || confirmTeamMemberRemoval.username,
        teamName: currentTeamDetails.name
      }) : t('TEAM_MEMBER_REMOVAL_DIALOG_BODY_WITHOUT_TEAM_NAME', "This will remove {name}'s access to this team.", "This will remove this person's access to the team", {
        name: confirmTeamMemberRemoval.fullName || confirmTeamMemberRemoval.username
      }),
      footer: /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(ButtonTertiary, {
          condensed: true,
          onClick: hideTeamMemberRemovalConfirmation,
          children: t('TEAM_MEMBER_REMOVAL_DIALOG_CANCEL_BUTTON', 'Cancel', 'Cancel and dismiss this dialog')
        }), /*#__PURE__*/_jsx(ButtonTertiary, {
          "data-testid": "confirm-remove-button",
          semanticColor: "textBrightAccent",
          condensed: true,
          onClick: function onClick() {
            removeTeamMember(confirmTeamMemberRemoval, currentTeam, t);
            hideTeamMemberRemovalConfirmation();
          },
          children: t('TEAM_MEMBER_REMOVAL_DIALOG_REMOVE_BUTTON', 'Remove', 'Remove this team member')
        })]
      })
    })
  });
};