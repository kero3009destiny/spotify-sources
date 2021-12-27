/**
 * The events that are exposed by the library.
 */
export var DealerEvent;
(function (DealerEvent) {
    // Dealer Events
    /**
     * Emitted by the `Dealer` class when it receives a Connection ID.
     */
    DealerEvent["AUTHENTICATED"] = "authenticated";
    /**
     * Emitted by the `Dealer` class when the Dealer service encounters an error
     * during authentication.
     */
    DealerEvent["AUTHENTICATION_FAILED"] = "authentication_failed";
    /**
     * Emitted by the `Dealer` class when it has successfully connected.
     */
    DealerEvent["CONNECTED"] = "connected";
    /**
     * Emitted by the `Dealer` class when it receives a connection id from the
     * Dealer service.
     */
    DealerEvent["CONNECTION_ID"] = "connection_id";
    /**
     * Emitted by the `Dealer` class when it encounters an error.
     */
    DealerEvent["ERROR"] = "error";
    /**
     * Emitted by the `Dealer` class when it gets disconnected.
     */
    DealerEvent["DISCONNECTED"] = "disconnected";
    /*
     * Emitted by the `Dealer` class when it receives a message from the Dealer
     * service.
     */
    DealerEvent["MESSAGE"] = "message";
    /**
     * Emitted by the `Dealer` class when it receives a request from the Dealer
     * service.
     */
    DealerEvent["REQUEST"] = "request";
})(DealerEvent || (DealerEvent = {}));
//# sourceMappingURL=event.js.map