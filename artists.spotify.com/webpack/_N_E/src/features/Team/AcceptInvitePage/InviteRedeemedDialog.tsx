import React from 'react';
import { DialogConfirmation, ButtonPrimary, screenXsMax, spacer12, spacer32, spacer72 } from '@spotify-internal/encore-web';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TitleContainer } from './TitleContainer';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
var BodyText = styled.div.withConfig({
  displayName: "InviteRedeemedDialog__BodyText",
  componentId: "sc-1x93u3r-0"
})(["font-size:12px;margin-bottom:", ";padding-left:", ";padding-right:", ";text-align:center;@media (max-width:", "){padding-left:", ";padding-right:", ";}"], spacer32, spacer72, spacer72, screenXsMax, spacer12, spacer12);
export var InviteRedeemedDialog = function InviteRedeemedDialog() {
  var t = useT();
  return /*#__PURE__*/_jsx(DialogConfirmation, {
    "data-testid": "invite-redeemed-dialog",
    dialogTitle: /*#__PURE__*/_jsx(TitleContainer, {
      children: t('INVITE_REDEEMED_DIALOG_TITLE', 'This invitation has been claimed', 'This invitation has already been redeemed')
    }),
    body: /*#__PURE__*/_jsx(BodyText, {
      children: t('INVITE_REDEEMED_DIALOG_TEXT', 'We leverage individual team member activities to empower transparency. Account sharing breaks our policies and may result in loss of access. Contact your team admin to request a new invitation. Invitations expire after 7 days.', 'This invitation has already been redeemed. Please do not share your Spotify account information or you may lose access to Spotify for Artists. Individual Spotify accounts are meant to help with transparency. Contact your team admin for another invitation. Invites expire after 7 days.')
    }),
    footer: /*#__PURE__*/_jsx(Link, {
      to: "/",
      children: /*#__PURE__*/_jsx(ButtonPrimary, {
        children: t('INVITE_REDEEMED_DIALOG_BUTTON_TEXT', 'Got it', 'Got it')
      })
    })
  });
};