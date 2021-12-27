/**
 * The possible reasons for rejection of events
 */
export var RejectReason;
(function (RejectReason) {
    /**
     * events are dropped with this reason when when provided event payload is
     * invalid, for example empty
     */
    RejectReason["INVALID_PAYLOAD"] = "INVALID_PAYLOAD";
    /**
     * events are dropped with this reason when provided event name is not valid,
     * an empty string for example.
     */
    RejectReason["INVALID_NAME"] = "INVALID_NAME";
    /**
     * events are dropped with this reason when EventOwnerProvider interface
     * does not return a user identifier for an authenticated event.
     */
    RejectReason["UNKNOWN_OWNER"] = "UNKNOWN_OWNER";
    /**
     * events are dropped with this reason when a size of an event exceeds 5KB
     */
    RejectReason["PAYLOAD_SIZE_LIMIT_EXCEEDED"] = "PAYLOAD_SIZE_LIMIT_EXCEEDED";
})(RejectReason || (RejectReason = {}));
//# sourceMappingURL=reject_reason.js.map