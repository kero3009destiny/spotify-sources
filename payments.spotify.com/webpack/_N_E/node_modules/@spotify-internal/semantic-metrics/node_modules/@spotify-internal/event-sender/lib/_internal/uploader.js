import { __rest } from "tslib";
import { Method } from '@spotify-internal/transport';
import { logging } from '@js-sdk/debug-tools';
import { EventEmitter } from '@spotify-internal/emitter';
import { UploadEvent } from '../enums/upload_event';
const debugLogger = logging.forTag('Uploader');
const BATCH_SIZE = 20;
const BIG_BATCH_SIZE = 100;
const AUTHORIZED_ENDPOINT = '@webgate/gabo-receiver-service/v3/events';
const UNAUTHORIZED_ENDPOINT = '@webgate/gabo-receiver-service/public/v3/events';
function formatFailedEvent(event, reason) {
    const { event_name: name, fragments } = event;
    const { message } = fragments, contexts = __rest(fragments, ["message"]);
    return {
        reason,
        contexts,
        event_data: {
            name: name,
            data: message,
        },
    };
}
/**
 * Create a new `Uploader` instance.
 * Handles uploading an array of events to the event delivery endpoint.
 */
export class Uploader extends EventEmitter {
    constructor(options) {
        var _a;
        super();
        this._suppressPersist = false;
        this._backoff = false;
        this._authorize = (_a = options.authorize) !== null && _a !== void 0 ? _a : true;
        this._transport = options.transport;
        this._suppressPersist = !!options.suppressPersist;
        this._endpoint = this._authorize
            ? AUTHORIZED_ENDPOINT
            : UNAUTHORIZED_ENDPOINT;
    }
    /**
     * Upload one batch of events to the endpoint.
     *
     * @param events - The events to be uploaded.
     * @param isLastFlush - Whether this is the last attempt to upload or not.
     * @return All events that could not be acknowledged.
     */
    _uploadBatch(events, isLastFlush = false) {
        const transport = this._transport;
        // For last flushes, we append the token as part of the URL. This allows
        // us to use Transport's fire-and-forget mode for authenticated requests
        // as well. We only do this for authorized requests.
        const url = isLastFlush && this._authorize
            ? transport.appendLastTokenQuery(this._endpoint)
            : this._endpoint;
        return this._transport
            .request(url, {
            method: Method.POST,
            metadata: {
                eventSenderEventNames: events.map((event) => event.event_name),
            },
            headers: {
                'content-type': 'application/json',
            },
            responseType: 'json',
            parseResponseHeaders: true,
            payload: JSON.stringify({
                suppress_persist: this._suppressPersist,
                events,
            }),
            // These two options will be different depending on whether this is
            // the last flush. If this is the last flush, we set the forget option
            // to trigger a fire and forget requests. Since these requests are not
            // allowed to be authorized, we will set the authorize parameter to
            // false.
            forget: isLastFlush,
            authorize: isLastFlush ? false : this._authorize,
        })
            .then(this._parseUploadResponse.bind(this, events, isLastFlush));
    }
    _parseUploadResponse(events, isLastFlush, response) {
        if (isLastFlush) {
            // This request was sent as a fire and forget request, so we don't need
            // to perform any other processing. We simply return an empty array as
            // we do not know whether the request succeeded or not.
            return Promise.resolve([]);
        }
        const { body, headers, status } = response;
        const authorize = this._authorize;
        if (status !== 200 || !body) {
            debugLogger.warn('Upload request failed', response);
            this.emit(UploadEvent.UPLOAD_REQUEST_FAILED, { authorize, status });
            this._backoff = true;
            return Promise.resolve(events);
        }
        const nackedEvents = [];
        const willRetryEvents = [];
        const rejectedEvents = [];
        if (body.error && body.error.length) {
            // See https://ghe.spotify.net/datainfra/gabo-receiver-service/blob/
            // master/receiver-service/src/main/proto/spotify/event/v3/event.proto
            // for explanation of the various "reason" codes
            debugLogger.info('response errors', events, body.error);
            for (let i = 0, len = body.error.length; i < len; i++) {
                const { transient, index, reason } = body.error[i];
                const failedEvent = formatFailedEvent(events[index], reason);
                if (transient) {
                    nackedEvents.push(events[index]);
                    willRetryEvents.push(failedEvent);
                }
                else {
                    rejectedEvents.push(failedEvent);
                }
            }
        }
        this._backoff = !!((headers === null || headers === void 0 ? void 0 : headers.get('backoff')) === 'true');
        const numFailed = willRetryEvents.length + rejectedEvents.length;
        const numSucceeded = events.length - numFailed;
        if (numFailed > 0) {
            this.emit(UploadEvent.UPLOAD_FAILED, {
                authorize,
                rejected: rejectedEvents,
                will_retry: willRetryEvents,
            });
        }
        if (numSucceeded > 0) {
            this.emit(UploadEvent.UPLOAD_SUCCEEDED, {
                authorize: this._authorize,
                num_events: numSucceeded,
            });
        }
        return Promise.resolve(nackedEvents);
    }
    /**
     * Upload events to the events delivery endpoint.
     *
     * @param evts - The events to be uploaded.
     * @param nacked - The accumulator for non acknowledged events.
     * @return Will be ressolved with non acknowledged events and
     * a flag for if backoff has been triggered.
     */
    upload(evts, nacked = []) {
        let nack = nacked;
        if (!evts.length) {
            return Promise.resolve({
                nack,
                backoff: this._backoff,
            });
        }
        const events = [...evts];
        return this._uploadBatch(events.splice(0, BATCH_SIZE)).then((nackedEvents) => {
            // put back nacked events in queue
            nack = [...nack, ...nackedEvents];
            // if backoff, put back rest of events in queue
            if (this._backoff) {
                nack = [...nack, ...events];
            }
            else if (events.length) {
                return this.upload(events, nack);
            }
            return {
                nack,
                backoff: this._backoff,
            };
        });
    }
    /**
     * Last effort to upload remaining events, uses BIG_BATCH_SIZE (100) instead of
     * BATCH_SIZE (20), and does not retry nacked events or failed requests.
     * Should be used when a client exits abnormally:
     * For example when `window.onbeforeunload` is triggered.
     *
     * @param events - The events to be uploaded.
     * @return Resolves with true if all events were uploaded, false otherwise.
     */
    lastUpload(events) {
        if (!events.length) {
            return Promise.resolve(true);
        }
        return this._uploadBatch(events.splice(0, BIG_BATCH_SIZE), true).then((nacked) => nacked.length === 0, () => false);
    }
    /**
     * Check if backoff has been requested during latest upload.
     *
     * @return true if backoff has been requested, else false.
     */
    shouldBackoff() {
        return this._backoff;
    }
}
/**
 * Creates a new `Uploader` Instance.
 *
 * @param options - The options for creating a new `Uploader` Instance
 * @return The `Uploader` Instance.
 */
export function createUploader(options) {
    return new Uploader(options);
}
//# sourceMappingURL=uploader.js.map