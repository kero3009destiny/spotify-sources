import React from 'react';
import { ButtonPrimary } from '@spotify-internal/encore-web';
import { useTeamStore } from '../lib/store/useTeamStore';
import { useT } from '@mrkt/features/i18n';
import { useBulkInviteSendInvitesButtonLogger } from './hooks/useBulkInviteUbi';
import { jsx as _jsx } from "react/jsx-runtime";
export var SendButton = function SendButton(_ref) {
  var isSending = _ref.isSending,
      numInvitesToSend = _ref.numInvitesToSend,
      positionForAnalytics = _ref.positionForAnalytics;

  var _useTeamStore = useTeamStore(),
      sendInvites = _useTeamStore.sendInvites,
      currentTeam = _useTeamStore.currentTeam,
      invites = _useTeamStore.bulkInvite.invites;

  var t = useT();
  var logSendBulkInvites = useBulkInviteSendInvitesButtonLogger();
  return /*#__PURE__*/_jsx(ButtonPrimary, {
    "data-testid": "send-action",
    onClick: function onClick() {
      if (!currentTeam) {
        throw new Error('Expected currentTeam to be set');
      }

      sendInvites(invites, currentTeam, positionForAnalytics, t);
      logSendBulkInvites();
    },
    disabled: isSending || numInvitesToSend === 0,
    children: isSending ? t('TEAM_BULK_INVITE_SENDING_STATUS_SENDING', 'Sending...', 'Sending invites status') : t('TEAM_BULK_INVITE_SENDING_STATUS_SEND', "Send {numInvitesToSend, plural,\n              one {{numInvitesToSend} invitation}\n              other {{numInvitesToSend} invitations}}", 'Send invites button', {
      numInvitesToSend: numInvitesToSend
    })
  });
};