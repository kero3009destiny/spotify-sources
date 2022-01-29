/**
 * The disconnection reason.
 */
export var DisconnectionReason;
(function (DisconnectionReason) {
    /**
     * When the reconnection is failed.
     */
    DisconnectionReason["RECONNECTION_FAILED"] = "reconnection_failed";
    /**
     * When the `disconnect` or `forceDisconnect` method is called.
     */
    DisconnectionReason["EXPLICIT"] = "explicit";
    /**
     * When backend sends logout message.
     */
    DisconnectionReason["LOG_OUT"] = "log_out";
    /**
     * When the browser about to close.
     */
    DisconnectionReason["WINDOW_BEFORE_UNLOAD"] = "window_before_unload";
})(DisconnectionReason || (DisconnectionReason = {}));
//# sourceMappingURL=disconnection_reason.js.map