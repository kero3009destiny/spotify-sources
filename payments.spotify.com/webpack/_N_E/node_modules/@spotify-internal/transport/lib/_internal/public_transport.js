import { EventEmitter, } from '@spotify-internal/emitter';
import { Event } from '../enums/event';
import { StatusCode } from '../enums/status_code';
import { StatusFamily } from '../enums/status_family';
var PublicTransportEvent;
(function (PublicTransportEvent) {
    PublicTransportEvent["EVENT_ACCESS_TOKEN"] = "access_token";
    PublicTransportEvent["EVENT_CONNECTION_ID"] = "connection_id";
    PublicTransportEvent["EVENT_CONNECTION_OFFLINE"] = "connection_offline";
    PublicTransportEvent["EVENT_CONNECTION_ONLINE"] = "connection_online";
    PublicTransportEvent["EVENT_ENDPOINTS_RESOLVED"] = "endpoints_resolved";
})(PublicTransportEvent || (PublicTransportEvent = {}));
/**
 * A lightweight, fully encapsulated Transport-like object that exposes some of
 * the functionality of Transport without exporting the lifecycle methods.
 *
 * An important difference with a Transport instance is that the event types for
 * a PublicTransport instance are attached as properties of the instance itself.
 * Thus, Transport's `TransportEvent.CONNECTION_ID` corresponds to
 * PublicTransport's `publicTransport.EVENT_CONNECTION_ID` property.
 */
export class PublicTransport extends EventEmitter {
    /**
     * @param transport - The transport instance that will be wrapped.
     * @param publicTransportOptions - The options for this PublicTransport instance.
     */
    constructor(transport, publicTransportOptions) {
        super();
        /**
         * A constant for the access token event.
         */
        this.EVENT_ACCESS_TOKEN = PublicTransportEvent.EVENT_ACCESS_TOKEN;
        /**
         * A constant for the connection id event.
         */
        this.EVENT_CONNECTION_ID = PublicTransportEvent.EVENT_CONNECTION_ID;
        /**
         * A constant for the offline event.
         */
        this.EVENT_CONNECTION_OFFLINE = PublicTransportEvent.EVENT_CONNECTION_OFFLINE;
        /**
         * A constant for the online event.
         */
        this.EVENT_CONNECTION_ONLINE = PublicTransportEvent.EVENT_CONNECTION_ONLINE;
        /**
         * A constant for the endpoints resolved event.
         */
        this.EVENT_ENDPOINTS_RESOLVED = PublicTransportEvent.EVENT_ENDPOINTS_RESOLVED;
        /**
         * A reference to the StatusCode enum.
         */
        this.StatusCode = StatusCode;
        /**
         * A reference to the StatusFamily enum.
         */
        this.StatusFamily = StatusFamily;
        this.getConnectionId = transport.getConnectionId.bind(transport);
        this.getEndpoints = transport.getEndpoints.bind(transport);
        this.getInitTime = transport.getInitTime.bind(transport);
        this.getLastToken = transport.getLastToken.bind(transport);
        this.matchMessages = transport.matchMessages.bind(transport);
        this.unmatchMessages = transport.unmatchMessages.bind(transport);
        this.handlePushRequests = transport.handlePushRequests.bind(transport);
        this.unhandlePushRequests = transport.unhandlePushRequests.bind(transport);
        this.hasPlugin = transport.hasPlugin.bind(transport);
        this.getPluginAPI = transport.getPluginAPI.bind(transport);
        const transportRequest = transport.request.bind(transport);
        if (publicTransportOptions === null || publicTransportOptions === void 0 ? void 0 : publicTransportOptions.requestOptions) {
            // This instance defines some default options, so we have to wrap request
            // to add some merging behaviour when necesssary.
            this.request = (uri, options) => {
                if (!options) {
                    // There are no overrides, so just use the default options.
                    return transportRequest(uri, publicTransportOptions.requestOptions);
                }
                // Merge overrides with the default options.
                return transportRequest(uri, Object.assign(Object.assign(Object.assign({}, publicTransportOptions === null || publicTransportOptions === void 0 ? void 0 : publicTransportOptions.requestOptions), options), { 
                    // then merge any options that are objects
                    metadata: Object.assign(Object.assign({}, publicTransportOptions.requestOptions.metadata), options === null || options === void 0 ? void 0 : options.metadata), retry: Object.assign(Object.assign({}, publicTransportOptions.requestOptions.retry), options === null || options === void 0 ? void 0 : options.retry) }));
            };
        }
        else {
            // There are no defaults, so we don't need to do any merging. We can use
            // the Transport instance's request method directly.
            this.request = transportRequest;
        }
        this.proxyEmit(transport, Event.ACCESS_TOKEN, PublicTransportEvent.EVENT_ACCESS_TOKEN);
        this.proxyEmit(transport, Event.CONNECTION_OFFLINE, PublicTransportEvent.EVENT_CONNECTION_OFFLINE);
        this.proxyEmit(transport, Event.CONNECTION_ONLINE, PublicTransportEvent.EVENT_CONNECTION_ONLINE);
        this.proxyEmit(transport, Event.ENDPOINTS_RESOLVED, PublicTransportEvent.EVENT_ENDPOINTS_RESOLVED);
        // Handle the connection id event separately.
        this.onAddListener(PublicTransportEvent.EVENT_CONNECTION_ID, this._onAddConnectionIdListener.bind(this, transport.on.bind(transport)));
        this.onRemoveListener(PublicTransportEvent.EVENT_CONNECTION_ID, this._onRemoveConnectionIdListener.bind(this, transport.removeListener.bind(transport)));
    }
    /**
     * Called when we add a listener for `EVENT_CONNECTION_ID`.
     *
     * Because `TRANSPORT_CONNECTION_ID` is state-aware, we cannot proxy the
     * event, because proxies are only added once, whereas state-aware events
     * expect individual listeners.
     *
     * Note that this will explicitly cancel adding a listener to this
     * eventemitter instance.
     *
     * @param addListener - An `addListener` function that's bound to the origin
     *   transport instance.
     * @param ev - The add listener meta-event.
     */
    _onAddConnectionIdListener(addListener, ev) {
        // We do not want to add this as an actual listener, since we will never
        // actually fire this event from within public transport.
        ev.preventDefault();
        // We need to wrap the event so we can get a proper event name.
        const listener = ev.data.listener;
        const renamingWrapper = (e) => {
            const newEvent = this.createEvent(PublicTransportEvent.EVENT_CONNECTION_ID, e.data);
            listener.call(this, newEvent);
        };
        listener.$proxy_wrapper = renamingWrapper;
        addListener(Event.CONNECTION_ID, renamingWrapper, ev.data.options);
    }
    /**
     * Called when we remove a listener for `EVENT_CONNECTION_ID`.
     *
     * @param removeListener - A `removeListener` function that's bound to the
     *   origin transport instance.
     * @param ev - The remove listener meta-event.
     */
    _onRemoveConnectionIdListener(removeListener, ev) {
        ev.preventDefault();
        const listener = ev.data.listener;
        if (!listener.$proxy_wrapper) {
            return;
        }
        removeListener(Event.CONNECTION_ID, listener.$proxy_wrapper, ev.data.options);
    }
    /**
     * Remove all event listeners from the instance.
     *
     * NOTE: This is a NO-OP function. As a `PublicTransport` instance can be used
     * and pass across multiple libraries and packages, exposing this method can
     * lead to hard to detect bugs. We therefore override this method explicitly
     * and disable the behaviour.
     *
     * @returns The `PublicTransport` instance.
     */
    removeAllListeners() {
        return this;
    }
}
//# sourceMappingURL=public_transport.js.map