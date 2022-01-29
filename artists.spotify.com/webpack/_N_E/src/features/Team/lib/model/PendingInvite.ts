// ignore-string-externalization
export var PendingInviteState; // An invite that has been received by the currentUser

(function (PendingInviteState) {
  PendingInviteState["pending"] = "pending";
  PendingInviteState["expired"] = "expired";
  PendingInviteState["redeemed"] = "redeemed";
  PendingInviteState["admin"] = "Full Access";
  PendingInviteState["editor"] = "Edit Access";
  PendingInviteState["reader"] = "View-only Access";
})(PendingInviteState || (PendingInviteState = {}));