import React from 'react';
import { Backdrop, ButtonTertiary, ButtonPrimary, Type } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { useT } from '@mrkt/features/i18n';
import { DialogConfirmation } from '@mrkt/features/Dialog';
import { jsx as _jsx } from "react/jsx-runtime";
var DialogConfirmationStyled = styled(DialogConfirmation).withConfig({
  displayName: "NoTeamAccessDialog__DialogConfirmationStyled",
  componentId: "sc-1txm2gh-0"
})(["text-align:unset;&:focus{outline:none;}@media (max-width:768px){width:90%;margin:auto;}"]);
export var NoTeamAccessDialog = function NoTeamAccessDialog(_ref) {
  var bodyText = _ref.bodyText,
      _onClose = _ref.onClose;
  var t = useT();
  return /*#__PURE__*/_jsx(Backdrop, {
    center: true,
    onClose: function onClose() {
      return _onClose(false);
    },
    children: /*#__PURE__*/_jsx(DialogConfirmationStyled, {
      "data-testid": "no-team-access-dialog",
      dialogId: "no-team-access-dialog",
      dialogTitle: t('NO_TEAM_ACCESS_DIALOG_TITLE', 'You can’t go to team details', 'Title of the dialog informing the user that they do not have access to the team'),
      body: /*#__PURE__*/_jsx("div", {
        children: /*#__PURE__*/_jsx(Type, {
          as: "p",
          children: bodyText
        })
      }),
      footer: /*#__PURE__*/_jsx(ButtonPrimary, {
        "data-testid": "confirm-no-team-access-button",
        buttonSize: ButtonTertiary.sm,
        onClick: function onClick() {
          return _onClose(false);
        },
        children: t('CONFIRM_NO_TEAM_ACCESS_BUTTON', 'Got it', 'Button to confirm no team access dialog.')
      })
    })
  });
};