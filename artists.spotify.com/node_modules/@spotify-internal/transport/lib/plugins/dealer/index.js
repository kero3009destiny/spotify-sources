import { DealerErrors } from './typedefs';
import { PluginEvent } from '../../enums/plugin_event';
import { DealerError } from './error';
import { DealerEvent } from './event';
import { Dealer } from './dealer';
/**
 * The name of the Dealer Plugin.
 *
 * This value should be used when calling Transport methods like `hasPlugin()`
 * or `getPluginAPI()`.
 */
export const DEALER_PLUGIN_NAME = 'dealer';
/**
 * A Transport Plugin that implements the Dealer protocol.
 */
class DealerPlugin {
    constructor(options) {
        /**
         * The name of the plugin.
         */
        this.name = DEALER_PLUGIN_NAME;
        this._dealer = new Dealer(options);
        // Create the API, which is always bound to the instance.
        this.api = {
            hasConnectionInfo: () => this._dealer.hasConnectionId(),
            getConnectionInfo: () => {
                return this._dealer.getConnectionInfo().then((info) => {
                    return Object.assign({ plugin: this.name }, info);
                });
            },
        };
        // Rebind
        this._onDealerConnectionId = this._onDealerConnectionId.bind(this);
        this._onDealerDisconnected = this._onDealerDisconnected.bind(this);
        this._onDealerMessage = this._onDealerMessage.bind(this);
        this._onDealerRequest = this._onDealerRequest.bind(this);
        this._onTransportConnect = this._onTransportConnect.bind(this);
        this._onTransportAuthenticate = this._onTransportAuthenticate.bind(this);
        this._onTransportDisconnect = this._onTransportDisconnect.bind(this);
    }
    /**
     * Called when the Dealer instance receives a connection id.
     *
     * @param ev - The event object
     */
    _onDealerConnectionId(ev) {
        if (!this._mediator) {
            return;
        }
        this._mediator.emit(PluginEvent.PLUGIN_CONNECTION_INFO, Object.assign({ plugin: this.name }, ev.data));
    }
    /**
     * Called when the dealer instance gets disconnected.
     *
     * @param ev - The event object
     */
    _onDealerDisconnected(ev) {
        if (!this._mediator) {
            return;
        }
        const data = ev.data;
        this._mediator.emit(PluginEvent.PLUGIN_DISCONNECTED, {
            plugin: this.name,
            code: data.wsCode,
            reason: data.reason,
        });
    }
    /**
     * Called when the dealer instance receives a message.
     *
     * @param ev - The event object
     */
    _onDealerMessage(ev) {
        if (!this._mediator) {
            return;
        }
        this._mediator.emit(PluginEvent.PLUGIN_MESSAGE, Object.assign({ plugin: this.name }, ev.data));
    }
    /**
     * Called when the dealer instance receives a request.
     *
     * @param ev - The event object
     */
    _onDealerRequest(ev) {
        if (!this._mediator) {
            return;
        }
        this._mediator.emit(PluginEvent.PLUGIN_REQUEST, Object.assign({ plugin: this.name }, ev.data));
    }
    /**
     * Called when the transport instance starts connecting.
     *
     * @param ev - The event.
     */
    _onTransportConnect(ev) {
        const endpoints = ev.data.endpoints;
        const awaitPromise = ev.data.awaitPromise;
        if (!endpoints.dealer) {
            awaitPromise(Promise.reject(new DealerError(DealerErrors.ENDPOINT_NOT_DEFINED, 'No "dealer" endpoint defined.')));
            return;
        }
        if (!/^wss:/.test(endpoints.dealer)) {
            awaitPromise(Promise.reject(new DealerError(DealerErrors.INVALID_ENDPOINT, 'Dealer endpoint needs to be wss://')));
            return;
        }
        awaitPromise(this._dealer.connect(endpoints.dealer));
    }
    /**
     * Called when the Transport instance starts authenticating.
     *
     * @param ev - The event.
     */
    _onTransportAuthenticate(ev) {
        const data = ev.data;
        data.awaitPromise(this._dealer.authenticate(data.token));
    }
    /**
     * Called when the Transport instance is disconnecting.
     */
    _onTransportDisconnect() {
        this._dealer.disconnect();
    }
    _onDealerError(ev) {
        var _a;
        (_a = this._mediator) === null || _a === void 0 ? void 0 : _a.emit(PluginEvent.PLUGIN_ERROR, {
            plugin: this.name,
            error: ev.data.error,
        });
    }
    /**
     * Attaches the plugin to a Transport instance.
     *
     * @param _t - The Transport instance.
     * @param mediator - The PluginMediator from the Transport instance.
     */
    attach(_t, mediator) {
        this._mediator = mediator;
        mediator.addListeners({
            [PluginEvent.TRANSPORT_CONNECT]: this._onTransportConnect,
            [PluginEvent.TRANSPORT_AUTHENTICATE]: this._onTransportAuthenticate,
            [PluginEvent.TRANSPORT_DISCONNECT]: this._onTransportDisconnect,
        });
        this._dealer.addListeners({
            [DealerEvent.DISCONNECTED]: this._onDealerDisconnected,
            [DealerEvent.CONNECTION_ID]: this._onDealerConnectionId,
            [DealerEvent.MESSAGE]: this._onDealerMessage,
            [DealerEvent.REQUEST]: this._onDealerRequest,
            [DealerEvent.ERROR]: this._onDealerError,
        });
    }
    /**
     * Detaches the plugin from a Transport instance.
     *
     * @param _t - The Transport instance.
     * @param mediator - The PluginMediator from the Transport instance.
     */
    detach(_t, mediator) {
        this._mediator = undefined;
        mediator.removeListeners({
            [PluginEvent.TRANSPORT_CONNECT]: this._onTransportConnect,
            [PluginEvent.TRANSPORT_AUTHENTICATE]: this._onTransportAuthenticate,
            [PluginEvent.TRANSPORT_DISCONNECT]: this._onTransportDisconnect,
        });
        this._dealer.removeListeners({
            [DealerEvent.DISCONNECTED]: this._onDealerDisconnected,
            [DealerEvent.CONNECTION_ID]: this._onDealerConnectionId,
            [DealerEvent.MESSAGE]: this._onDealerMessage,
            [DealerEvent.REQUEST]: this._onDealerRequest,
            [DealerEvent.ERROR]: this._onDealerError,
        });
    }
}
export { DealerErrors };
/**
 * Creates a new Dealer Plugin.
 *
 * This function should be passed to `transport.addPlugin()` directly.
 *
 * @param _t - The Transport instance.
 * @param options - The options for the plugin.
 * @returns A new DealerPlugin.
 */
export function dealerCreator(_t, options) {
    return new DealerPlugin(options);
}
//# sourceMappingURL=index.js.map