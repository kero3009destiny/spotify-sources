// ignore-string-externalization
export var InviteState;

(function (InviteState) {
  InviteState["VIEWING"] = "VIEWING";
  InviteState["EDITING"] = "EDITING";
  InviteState["INVITING"] = "INVITING";
  InviteState["INVITED"] = "INVITED";
  InviteState["ALREADY_EXISTS"] = "ALREADY_EXISTS";
})(InviteState || (InviteState = {}));

export var BulkInviteStage;

(function (BulkInviteStage) {
  BulkInviteStage[BulkInviteStage["Download"] = 1] = "Download";
  BulkInviteStage[BulkInviteStage["Upload"] = 2] = "Upload";
  BulkInviteStage[BulkInviteStage["Uploading"] = 3] = "Uploading";
  BulkInviteStage[BulkInviteStage["Verify"] = 4] = "Verify";
  BulkInviteStage[BulkInviteStage["Sending"] = 5] = "Sending";
  BulkInviteStage[BulkInviteStage["Sent"] = 6] = "Sent";
})(BulkInviteStage || (BulkInviteStage = {}));

export var defaultBulkInviteState = {
  stage: BulkInviteStage.Download,
  invites: [],
  numInvitesOmitted: 0
};