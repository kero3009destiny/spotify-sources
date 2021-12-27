import { Backoff } from '@js-sdk/backoff';
import { logging } from '@js-sdk/debug-tools';
import { TransportEvent } from '@spotify-internal/transport';
import { EventEmitter } from '@spotify-internal/emitter';
import { UploadEvent as EventSenderEvent } from '../enums/upload_event';
import sdkVersion from '../version';
import { SequenceIdGenerator } from './sequenceid_generator';
const DEFAULT_BACKOFF_TIME_SETTINGS = {
    baseTime: 200,
    ceiling: 300000,
    maxDuration: 1800000,
};
export { EventSenderEvent };
/**
 * `EventSender` instance for events logging.
 */
export class EventSender extends EventEmitter {
    /**
     * Create a new EventSender instance.
     *
     * @param options - The EventSender options.
     */
    constructor(options) {
        super();
        this._sequenceIdGenerator = SequenceIdGenerator.create();
        this._instanceContexts = {};
        this._transport = options.transport;
        this._events = {
            authorized: [],
            unauthorized: [],
        };
        this._uploaders = options.uploaders;
        this._ongoingUploads = {
            authorized: false,
            unauthorized: false,
        };
        this._uploadWaiting = {
            authorized: false,
            unauthorized: false,
        };
        this._backoffTimeSettings = Object.assign(Object.assign({}, DEFAULT_BACKOFF_TIME_SETTINGS), options.backoffTimeOverrides);
        this._upload = this._upload.bind(this);
        if (typeof window !== 'undefined' &&
            typeof window.addEventListener === 'function') {
            window.addEventListener('beforeunload', this._onBeforeDisconnect.bind(this));
        }
        this._initializeContexts(options.context);
        const proxyEventNameMap = {
            [EventSenderEvent.UPLOAD_SUCCEEDED]: EventSenderEvent.UPLOAD_SUCCEEDED,
            [EventSenderEvent.UPLOAD_FAILED]: EventSenderEvent.UPLOAD_FAILED,
            [EventSenderEvent.UPLOAD_REQUEST_FAILED]: EventSenderEvent.UPLOAD_REQUEST_FAILED,
        };
        this.proxyEmitAll(this._uploaders.authorized, proxyEventNameMap);
        this.proxyEmitAll(this._uploaders.unauthorized, proxyEventNameMap);
    }
    /**
     * Handler for flushing remaining events with a best-effort approach.
     *
     */
    _onBeforeDisconnect() {
        this._uploadFlush();
    }
    /**
     * Attempts to upload the (max 100) unsent authorized events, and the (max 100) unsent
     * unauthorized events.
     *
     * @return A promise that resolves with true if the upload was successful.
     */
    _uploadFlush() {
        return Promise.all([
            this._uploaders.authorized.lastUpload(this._events.authorized.splice(0)),
            this._uploaders.unauthorized.lastUpload(this._events.unauthorized.splice(0)),
        ])
            .then(([result1, result2]) => result1 && result2)
            .catch(() => false);
    }
    /**
     * Creates the contexts for the current instance.
     *
     * @param providers - The context providers for this instance.
     */
    _initializeContexts(providers) {
        if (!(providers === null || providers === void 0 ? void 0 : providers.length)) {
            return;
        }
        const instanceContexts = this._instanceContexts;
        for (const provider of providers) {
            const context = provider();
            if (!(context === null || context === void 0 ? void 0 : context.name)) {
                continue;
            }
            instanceContexts[context.name] = context.data;
        }
    }
    /**
     * Start the backoff sequence to upload the events.
     *
     * @param type - Type of events to flush (authorized or unauthorized)
     * @return A promise that is fulfilled with the response when upload has
     * finished.
     */
    _initFlush(type) {
        const shouldBackoff = this._uploaders[type].shouldBackoff();
        const { ceiling, maxDuration, baseTime } = this._backoffTimeSettings;
        return Backoff.init(() => this._upload(type), {
            curve: 'exponential',
            backoffInitial: shouldBackoff,
            retryPredicate: () => this._transport.isOnline(),
            ceiling,
            baseTime: shouldBackoff ? ceiling : baseTime,
            maxDuration,
        });
    }
    /**
     * Wait for connection to become online.
     *
     * @return A promise that is fulfilled when the connection is online.
     */
    _waitForConnection() {
        return new Promise((resolve) => {
            this._transport.once(TransportEvent.CONNECTION_ONLINE, () => resolve());
        });
    }
    /**
     * Upload all authorized or unauthorized events that have not yet been
     * uploaded to the endpoint.
     *
     * @param type - Type of events to flush (authorized or unauthorized)
     * @return A promise that is fulfilled with upload status when upload has
     * finished.
     */
    _upload(type) {
        return this._uploaders[type]
            .upload(this._events[type].splice(0))
            .then((response) => {
            if (response.nack.length) {
                this._events[type] = response.nack.concat(this._events[type]);
                throw new Error('Backoff requested');
            }
            return response;
        });
    }
    /**
     * Persist any not yet persisted events to the event delivery service.
     *
     * @param authorize - Whether to flush authorized (true) or
     * unauthorized (false) events.
     *
     * @return A promise that is fulfilled when upload has finished.
     */
    _flush(authorize) {
        const type = authorize ? 'authorized' : 'unauthorized';
        // When not connected
        if (!this._transport.isOnline()) {
            if (!this._ongoingUploads[type]) {
                // Fake ongoing upload to be resolvved when there is a connection
                this._ongoingUploads[type] = this._waitForConnection();
            }
        }
        const ongoingUpload = this._ongoingUploads[type];
        // When another upload is already ongoing, queue the flush
        if (ongoingUpload) {
            // but only if there isn't already a queued flush
            if (!this._uploadWaiting[type]) {
                this._uploadWaiting[type] = true;
                this._ongoingUploads[type] = ongoingUpload.then(() => {
                    this._ongoingUploads[type] = false;
                    this._uploadWaiting[type] = false;
                    return this._flush(authorize);
                });
            }
            return this._ongoingUploads[type];
        }
        // When there are no events to upload
        if (!this._events[type].length) {
            return Promise.resolve({
                nack: this._events[type],
                backoff: this._uploaders[type].shouldBackoff(),
            });
        }
        const initFlushResponse = this._initFlush(type)
            .then((response) => {
            this._ongoingUploads[type] = false;
            return response;
        })
            .catch(() => {
            this._ongoingUploads[type] = false;
            if (!this._transport.isOnline()) {
                return this._flush(authorize);
            }
            EventSender.consoleLogger.warn(`The events in the queue could not be uploaded. Throwing away ${this._events[type].length} ${type} events.`);
            this._events[type] = [];
            return {
                nack: this._events[type],
                backoff: this._uploaders[type].shouldBackoff(),
            };
        });
        this._ongoingUploads[type] = initFlushResponse;
        return initFlushResponse;
    }
    /**
     * Persist any not yet persisted events to the event delivery service.
     *
     * @param authorize - Whether to flush authorized (true) or
     * unauthorized (false) events. Defaults to true.
     *
     * @return A promise that is fulfilled when upload has finished.
     */
    flush(authorize = true) {
        return this._flush(authorize)
            .then(() => undefined)
            .catch(() => undefined);
    }
    /**
     * Make a best-effort attempt to flush all events that have not yet been
     * logged to the endpoints. If the access token is not valid at this point,
     * the flush will fail resulting in that the events are thrown away.
     *
     * Call this function before shutting down the application.
     *
     * The Sequence Id and the Sequence Numbers will have been renewed in future
     * logging.
     *
     * This function should be called before the user state in the client changes,
     * for example when the user logs out, or when new user logs in.
     *
     * @return A Promise<true|false>: true = flush succeeded, false = flush failed
     */
    finalFlush() {
        this._sequenceIdGenerator.reset();
        return this._uploadFlush();
    }
    /**
     * Deprecated. Use .send() instead.
     *
     * Log an event to the event delivery endpoint. The event needs to be
     * defined in event-definitions
     *
     * @deprecated - Use .send()
     * @param event - The event to be logged.
     * @param options - Options for the event logging.
     */
    log(event, options = {}) {
        this.send(event, options);
    }
    /**
     * Send an event to the event delivery endpoint. The event needs to be
     * defined in event-definitions
     *
     * @param eventData - The event to be logged.
     * @param options - Options for the event logging.
     * @param options.authorize - If set to true, the event will be sent as an
     * authorized event. Defaults to false.
     * @param options.flush - If set to true, the event will be immediately queued
     * for uploading.
     * @return A promise that resolves when event added to the queue or flush is done.
     */
    send(eventData, { authorize = true, flush = true } = {}) {
        const sequenceIdGenerator = this._sequenceIdGenerator;
        const event = {
            sequence_id: sequenceIdGenerator.getSequenceId(),
            sequence_number: sequenceIdGenerator.nextSequenceNumber(eventData.name),
            event_name: eventData.name,
            fragments: Object.assign(Object.assign({ 
                // Default Contexts
                context_sdk: {
                    version_name: sdkVersion.version,
                }, context_time: {
                    timestamp: Date.now(),
                } }, this._instanceContexts), { 
                // Actual event data payload
                message: eventData.data }),
        };
        this._events[authorize ? 'authorized' : 'unauthorized'].push(event);
        if (flush !== false) {
            return this.flush(authorize);
        }
        return Promise.resolve();
    }
    /**
     * Checks whether the provided context name is present in this instance.
     *
     * @param contextName - The context name.
     * @return True if context presents in this instance.
     */
    hasContext(...contextName) {
        return contextName.every((name) => !!this._instanceContexts[name]);
    }
}
EventSender.consoleLogger = logging.forTag('EventSender');
//# sourceMappingURL=event_sender.js.map