import React from 'react';
import { DialogConfirmation, ButtonPrimary, screenXsMax, spacer12, spacer32 } from '@spotify-internal/encore-web';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TitleContainer } from './TitleContainer';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
var BodyText = styled.div.withConfig({
  displayName: "InviteExpiredDialog__BodyText",
  componentId: "rqvwzq-0"
})(["font-size:12px;margin-bottom:", ";padding-left:125px;padding-right:125px;text-align:center;@media (max-width:", "){padding-left:", ";padding-right:", ";}"], spacer32, screenXsMax, spacer12, spacer12);
export var InviteExpiredDialog = function InviteExpiredDialog() {
  var t = useT();
  return /*#__PURE__*/_jsx(DialogConfirmation, {
    "data-testid": "invite-expired-dialog",
    dialogTitle: /*#__PURE__*/_jsx(TitleContainer, {
      children: t('INVITE_EXPIRED_DIALOG_TITLE', 'This invitation has expired', 'this invitation has expired')
    }),
    body: /*#__PURE__*/_jsx(BodyText, {
      children: t('INVITE_EXPIRED_DIALOG_BODY_TEXT', 'Contact your team admin to request a new one. Invitations expire after 7 days.', 'Contact the team admin to request a new invitation to the team. Invitation expire after 7 days.')
    }),
    footer: /*#__PURE__*/_jsx(Link, {
      to: "/",
      children: /*#__PURE__*/_jsx(ButtonPrimary, {
        children: t('INVITE_EXPIRED_DIALOG_BUTTON_TEXT', 'Got it', 'Got it')
      })
    })
  });
};