import { BulkInviteStage } from '../store/BulkInviteState';
import { groupInvitesBySendableStatus } from './groupInvitesBySendableStatus';
/**
 * Calculates "static" stages (i.e. when no in flight operations are in progress) based on
 * invite state
 */

export var calculateStageBasedOnInvites = function calculateStageBasedOnInvites(invites) {
  if (!invites) {
    // could be any stage up to Verify, but Download is the safest bet
    return BulkInviteStage.Download;
  }

  var invitesBySendableStatus = groupInvitesBySendableStatus(invites);
  var numToSend = invites.length - (invitesBySendableStatus.sent.length + invitesBySendableStatus.alreadyExists.length);
  return numToSend === 0 ? BulkInviteStage.Sent : BulkInviteStage.Verify;
};