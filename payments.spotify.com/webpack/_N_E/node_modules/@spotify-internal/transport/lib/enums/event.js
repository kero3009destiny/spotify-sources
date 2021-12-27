/**
 * The events that are exposed by the library.
 */
export var Event;
(function (Event) {
    // ConnectionObserver Events
    /**
     * Emitted by the `ConnectionObserver` class when the connection goes back online.
     */
    Event["CONNECTION_ONLINE"] = "online";
    /**
     * Emitted by the `ConnectionObserver` class when the connection goes offline.
     */
    Event["CONNECTION_OFFLINE"] = "offline";
    /**
     * Emitted by the `ProductStateObserver` class when the user's product state
     * has changed.
     */
    Event["PRODUCT_STATE_CHANGED"] = "product_state_changed";
    // Transport Events
    /**
     * Emitted by Transport when it receives an access token.
     */
    Event["ACCESS_TOKEN"] = "access_token";
    /**
     * Emitted by Transport when it successfully authenticates.
     */
    Event["AUTHENTICATED"] = "authenticated";
    /**
     * Emitted by Transport when it encounters an error during authentication.
     */
    Event["AUTHENTICATION_FAILED"] = "authentication_failed";
    /**
     * Emitted by Transport before disconnection while offline.
     */
    Event["BEFORE_OFFLINE_DISCONNECT"] = "before_offline_disconnect";
    /**
     * Emitted by Transport before disconnection while online.
     */
    Event["BEFORE_ONLINE_DISCONNECT"] = "before_online_disconnect";
    /**
     * Emitted by Transport when it successfully connects to the messaging endpoints.
     */
    Event["CONNECTED"] = "connected";
    /**
     * Emitted by Transport when it encounters an error while trying to connect to
     * the messaging endpoints.
     */
    Event["CONNECTION_FAILED"] = "connection_failed";
    /**
     * Emitted by Transport when it receives a connection id.
     */
    Event["CONNECTION_ID"] = "connection_id";
    /**
     * Emitted by Transport when it gets disconnected.
     */
    Event["DISCONNECTED"] = "disconnected";
    /**
     * Emitted when the endpoints have been resolved.
     */
    Event["ENDPOINTS_RESOLVED"] = "endpoints_resolved";
    /**
     * Emitted when the current transport instance is directed by the backend to logout.
     */
    Event["LOGGED_OUT"] = "logged_out";
    /**
     * Emitted by Transport when it gets disconnected after being connected less
     * than five seconds.
     */
    Event["SHORT_SESSION_DISCONNECTED"] = "short_session_disconnected";
    /**
     * Emitted by the Transport instance when there is an issue with the access
     * token returned by the TokenProvider.
     */
    Event["TOKEN_PROVIDER_ERROR"] = "token_provider_error";
    /**
     * Emitted by Transport when it starts reconnecting.
     */
    Event["RECONNECTED"] = "reconnected";
    /**
     * Emitted by Transport when it successfully reconnects.
     */
    Event["RECONNECTING"] = "reconnecting";
    /**
     * Emitted by the `window` when it's about to unload.
     */
    Event["WINDOW_BEFORE_UNLOAD"] = "beforeunload";
})(Event || (Event = {}));
//# sourceMappingURL=event.js.map