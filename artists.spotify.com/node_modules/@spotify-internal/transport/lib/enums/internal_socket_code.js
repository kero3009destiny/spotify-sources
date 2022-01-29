export var InternalSocketCode;
(function (InternalSocketCode) {
    /**
     * The internal close code.
     *
     * This is used when explicitly closing the WebSocket as part of the
     * disconnection routines. When this is encountered, reconnection mechanics
     * are not applied to the WebSocket.
     *
     * @constant
     */
    InternalSocketCode[InternalSocketCode["CLOSE"] = 4000] = "CLOSE";
    /**
     * The internal timeout code.
     *
     * This is used when explicitly marking the WebSocket as timed out.
     */
    InternalSocketCode[InternalSocketCode["TIMEOUT"] = 4001] = "TIMEOUT";
})(InternalSocketCode || (InternalSocketCode = {}));
//# sourceMappingURL=internal_socket_code.js.map