// ignore-string-externalization
import { AccessLevel } from './AccessLevel';
export var JoinRequestStatusType;

(function (JoinRequestStatusType) {
  JoinRequestStatusType["UNKNOWN"] = "UNKNOWN";
  JoinRequestStatusType["PENDING"] = "PENDING";
  JoinRequestStatusType["APPROVED"] = "APPROVED";
  JoinRequestStatusType["REJECTED"] = "REJECTED";
  JoinRequestStatusType["EXPIRED"] = "EXPIRED";
})(JoinRequestStatusType || (JoinRequestStatusType = {}));

export var JoinRequestRejectionReason;

(function (JoinRequestRejectionReason) {
  JoinRequestRejectionReason["UNKNOWN_REQUESTER"] = "UNKNOWN_REQUESTER";
  JoinRequestRejectionReason["MORE_INFO_NEEDED"] = "MORE_INFO_NEEDED";
  JoinRequestRejectionReason["SPAM"] = "SPAM";
  JoinRequestRejectionReason["OTHER"] = "OTHER";
  JoinRequestRejectionReason["NO_REASON_SELECTED"] = "NO_REASON_SELECTED";
})(JoinRequestRejectionReason || (JoinRequestRejectionReason = {}));

export var joinRequestToTeamMember = function joinRequestToTeamMember(joinRequest) {
  return {
    id: joinRequest.id,
    fullName: joinRequest.fullName,
    role: joinRequest.role,
    accessLevel: joinRequest.accessLevel ? joinRequest.accessLevel : AccessLevel.Reader,
    company: joinRequest.company || '',
    status: 'active',
    username: "pending-".concat(joinRequest.id),
    businessEmail: joinRequest.businessEmail
  };
};