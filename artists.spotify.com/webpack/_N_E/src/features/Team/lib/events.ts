/**
 * Generators for all AlohomoraEvents.
 *
 * Centralized here to easily identify key strings when querying events, to make clear what
 * meta fields represent, and to isolate snake_case variables.
 *
 * Details in http://go/aloho-events
 */
export var bulkInvite = {
  sendInvites: function sendInvites(position, invitesToSend, invalidInvites) {
    return {
      action_intent: 'bulk-invite:send-invites',
      action_target: "bulk-invite:".concat(position, "-button"),
      action_type: 'bulk-invite:click',
      action_meta_num_1: invitesToSend,
      action_meta_num_2: invalidInvites
    };
  },
  sentInvites: function sentInvites(invitesSuccessfullySent, invitesWithSendError, timeTaken) {
    return {
      action_intent: 'bulk-invite:sent-invites',
      action_target: 'bulk-invite:send-task',
      action_type: 'bulk-invite:success',
      action_meta_num_1: invitesSuccessfullySent,
      action_meta_num_2: invitesWithSendError,
      action_meta_num_3: timeTaken
    };
  },
  downloadFile: function downloadFile() {
    return {
      action_intent: 'bulk-invite:download-file',
      action_target: 'bulk-invite:template-link',
      action_type: 'bulk-invite:click'
    };
  },
  uploadFile: function uploadFile(uploadMethod) {
    return {
      action_intent: 'bulk-invite:upload-file',
      action_target: 'bulk-invite:drop-zone',
      action_type: "bulk-invite:".concat(uploadMethod)
    };
  },
  uploadFailed: function uploadFailed(outcome, details) {
    return {
      action_intent: 'bulk-invite:upload-file',
      action_target: 'bulk-invite:process-file-task',
      action_type: "bulk-invite:failure",
      action_meta_str_1: outcome,
      action_meta_str_2: details
    };
  },
  uploadedFile: function uploadedFile(validInvites, invalidInvites, ignoredInvites, hasPreexistingInvites) {
    return {
      action_intent: 'bulk-invite:uploaded-file',
      action_target: 'bulk-invite:process-file-task',
      action_type: 'bulk-invite:success',
      action_meta_num_1: validInvites,
      action_meta_num_2: invalidInvites,
      action_meta_num_3: ignoredInvites,
      action_meta_str_1: hasPreexistingInvites ? 'yes' : 'no'
    };
  },
  editInvite: function editInvite(preEditStatus) {
    return {
      action_intent: 'bulk-invite:edit-invite',
      action_target: 'bulk-invite:edit-button',
      action_type: 'bulk-invite:click',
      action_meta_str_1: preEditStatus
    };
  },
  editedInvite: function editedInvite(preEditStatus) {
    return {
      action_intent: 'bulk-invite:edited-invite',
      action_target: 'bulk-invite:edit-form-submit',
      action_type: 'bulk-invite:click',
      action_meta_str_1: preEditStatus
    };
  }
};
export var soloInvite = {
  sendInvite: function sendInvite() {
    return {
      action_intent: 'solo-invite:send-invite',
      action_target: 'solo-invite:submit',
      action_type: 'solo-invite:click'
    };
  }
};
export var activity = {
  setTeamFilter: function setTeamFilter(item) {
    return {
      action_intent: 'activity:set-team-filter',
      action_target: 'activity:team-filter-item',
      action_type: 'activity:click',
      action_meta_str_1: item.id,
      action_meta_str_2: item.value
    };
  },
  editTeamMember: function editTeamMember(item) {
    return {
      action_intent: 'activity:edit-team-member',
      action_target: 'activity:edit-team-member-button',
      action_type: 'activity:click',
      action_meta_str_1: item.actor.username
    };
  },
  loadMore: function loadMore() {
    return {
      action_intent: 'activity:load-more',
      action_target: 'activity:load-more-button',
      action_type: 'activity:click'
    };
  }
};