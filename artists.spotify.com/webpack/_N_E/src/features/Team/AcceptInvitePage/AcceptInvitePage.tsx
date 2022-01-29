// ignore-string-externalization
import React from 'react';
import { AcceptInviteDialog } from './AcceptInviteDialog';
import { Backdrop } from './Backdrop';
import { InviteExpiredDialog } from './InviteExpiredDialog';
import { useTeamStore } from '../lib/store/useTeamStore';
import { AccessLevel } from '../lib';
import { InviteRedeemedDialog } from './InviteRedeemedDialog';
import { LoadingIndicator } from '@spotify-internal/encore-web';
import { AlreadyOnTeamMessage } from './AlreadyOnTeamMessage';
import { jsx as _jsx } from "react/jsx-runtime";
export var AcceptInvitePage = function AcceptInvitePage() {
  var _useTeamStore = useTeamStore(),
      pendingInvite = _useTeamStore.pendingInvite;

  if (!pendingInvite) {
    return /*#__PURE__*/_jsx(Backdrop, {
      "data-testid": "accept-invite-page",
      children: /*#__PURE__*/_jsx(LoadingIndicator, {
        className: "encore-creator-dark-theme",
        "data-testid": "invite-loading"
      })
    });
  }

  var acceptInviteBody = function acceptInviteBody() {
    switch (pendingInvite.state) {
      case 'expired':
        return /*#__PURE__*/_jsx(InviteExpiredDialog, {});

      case 'redeemed':
        return /*#__PURE__*/_jsx(InviteRedeemedDialog, {});

      case 'Full Access':
        return /*#__PURE__*/_jsx(AlreadyOnTeamMessage, {
          currentAccess: AccessLevel.Admin,
          teamName: pendingInvite.teamName
        });

      case 'Edit Access':
        return /*#__PURE__*/_jsx(AlreadyOnTeamMessage, {
          currentAccess: AccessLevel.Editor,
          teamName: pendingInvite.teamName
        });

      case 'View-only Access':
        return /*#__PURE__*/_jsx(AlreadyOnTeamMessage, {
          currentAccess: AccessLevel.Reader,
          teamName: pendingInvite.teamName
        });

      default:
        return /*#__PURE__*/_jsx(AcceptInviteDialog, {});
    }
  };

  return /*#__PURE__*/_jsx(Backdrop, {
    "data-testid": "accept-invite-page",
    children: acceptInviteBody()
  });
};