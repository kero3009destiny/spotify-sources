// ignore-string-externalization
import { InviteState } from '../store/BulkInviteState';
export var groupInvitesBySendableStatus = function groupInvitesBySendableStatus(invites) {
  return invites.reduce(function (memo, invite) {
    var status = function () {
      if (invite.state === InviteState.INVITED) return 'sent';
      if (invite.state === InviteState.ALREADY_EXISTS) return 'alreadyExists';
      if (invite.validationErrors.length > 0) return 'error';
      return 'sendable';
    }();

    memo[status].push(invite);
    return memo;
  }, {
    sendable: [],
    sent: [],
    error: [],
    alreadyExists: []
  });
};