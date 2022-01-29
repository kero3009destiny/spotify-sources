// ignore-string-externalization
export var FileProcessingFailureType;

(function (FileProcessingFailureType) {
  FileProcessingFailureType["INVALID_FILETYPE"] = "error:invalid-filetype";
  FileProcessingFailureType["EMPTY_FILE"] = "error:empty-file";
  FileProcessingFailureType["MISSING_HEADER"] = "error:missing-header";
})(FileProcessingFailureType || (FileProcessingFailureType = {}));

export var BulkInviteActionType;

(function (BulkInviteActionType) {
  BulkInviteActionType["BULK_INVITE_ADVANCE_STAGE"] = "BULK_INVITE_ADVANCE_STAGE";
  BulkInviteActionType["BULK_INVITE_CANCEL_UPDATE_INVITE"] = "BULK_INVITE_CANCEL_UPDATE_INVITE";
  BulkInviteActionType["BULK_INVITE_EDIT_INVITE"] = "BULK_INVITE_EDIT_INVITE";
  BulkInviteActionType["BULK_INVITE_ERROR_SENDING_INVITE"] = "BULK_INVITE_ERROR_SENDING_INVITE";
  BulkInviteActionType["BULK_INVITE_FILE_PROCESSING_FAILED"] = "BULK_INVITE_FILE_PROCESSING_FAILED";
  BulkInviteActionType["BULK_INVITE_FINISHED_SENDING"] = "BULK_INVITE_FINISHED_SENDING";
  BulkInviteActionType["BULK_INVITE_REMOVE_INVITE"] = "BULK_INVITE_REMOVE_INVITE";
  BulkInviteActionType["BULK_INVITE_SAVE_INVITE"] = "BULK_INVITE_SAVE_INVITE";
  BulkInviteActionType["BULK_INVITE_SENDING_INVITE"] = "BULK_INVITE_SENDING_INVITE";
  BulkInviteActionType["BULK_INVITE_SENT_INVITE"] = "BULK_INVITE_SENT_INVITE";
  BulkInviteActionType["BULK_INVITE_SET_FILE_LOADING"] = "BULK_INVITE_SET_FILE_LOADING";
  BulkInviteActionType["BULK_INVITE_SET_INVITES"] = "BULK_INVITE_SET_INVITES";
  BulkInviteActionType["BULK_INVITE_SET_STAGE"] = "BULK_INVITE_SET_STAGE";
  BulkInviteActionType["BULK_INVITE_UPDATE_INVITE"] = "BULK_INVITE_UPDATE_INVITE";
})(BulkInviteActionType || (BulkInviteActionType = {}));

export var createBulkInviteActionDispatchers = function createBulkInviteActionDispatchers(dispatch) {
  return {
    advanceStage: function advanceStage() {
      return dispatch({
        type: BulkInviteActionType.BULK_INVITE_ADVANCE_STAGE
      });
    },
    finishedSending: function finishedSending() {
      return dispatch({
        type: BulkInviteActionType.BULK_INVITE_FINISHED_SENDING
      });
    },
    fileProcessingFailed: function fileProcessingFailed(failureType, message) {
      return dispatch({
        type: BulkInviteActionType.BULK_INVITE_FILE_PROCESSING_FAILED,
        message: message,
        failureType: failureType
      });
    },
    setStage: function setStage(stage) {
      return dispatch({
        type: BulkInviteActionType.BULK_INVITE_SET_STAGE,
        stage: stage
      });
    },
    setFileLoading: function setFileLoading(isLoading) {
      return dispatch({
        type: BulkInviteActionType.BULK_INVITE_SET_FILE_LOADING,
        isLoading: isLoading
      });
    },
    setInvites: function setInvites(invites, numInvitesOmitted) {
      return dispatch({
        type: BulkInviteActionType.BULK_INVITE_SET_INVITES,
        invites: invites,
        numInvitesOmitted: numInvitesOmitted
      });
    },
    updateInvite: function updateInvite(invite) {
      return dispatch({
        type: BulkInviteActionType.BULK_INVITE_UPDATE_INVITE,
        invite: invite
      });
    },
    cancelUpdateInvite: function cancelUpdateInvite(inviteId) {
      return dispatch({
        type: BulkInviteActionType.BULK_INVITE_CANCEL_UPDATE_INVITE,
        inviteId: inviteId
      });
    },
    removeInvite: function removeInvite(inviteId) {
      return dispatch({
        type: BulkInviteActionType.BULK_INVITE_REMOVE_INVITE,
        inviteId: inviteId
      });
    },
    saveInvite: function saveInvite(invite) {
      return dispatch({
        type: BulkInviteActionType.BULK_INVITE_SAVE_INVITE,
        invite: invite
      });
    },
    editInvite: function editInvite(inviteId) {
      return dispatch({
        type: BulkInviteActionType.BULK_INVITE_EDIT_INVITE,
        inviteId: inviteId
      });
    },
    sendingInvite: function sendingInvite(inviteId) {
      return dispatch({
        type: BulkInviteActionType.BULK_INVITE_SENDING_INVITE,
        inviteId: inviteId
      });
    },
    sentInvite: function sentInvite(inviteId) {
      return dispatch({
        type: BulkInviteActionType.BULK_INVITE_SENT_INVITE,
        inviteId: inviteId
      });
    },
    errorSendingInvite: function errorSendingInvite(inviteId, message) {
      return dispatch({
        type: BulkInviteActionType.BULK_INVITE_ERROR_SENDING_INVITE,
        inviteId: inviteId,
        message: message
      });
    }
  };
};
export var isBulkInviteActionType = function isBulkInviteActionType(action) {
  return action.type && action.type in BulkInviteActionType;
};