import { Environment } from './enums/environment';
import { createUploader, } from './_internal/uploader';
import { EventSender, EventSenderEvent, } from './_internal/event_sender';
export { Environment, EventSenderEvent, };
/**
 * Create an EventSender instance.
 *
 * @param options - The options for the EventSender instance.
 * @return An EventSender instance.
 */
export function createEventSender(options) {
    const uploaderOptions = {
        suppressPersist: options.suppressPersist,
        transport: options.transport,
    };
    return new EventSender(Object.assign(Object.assign({}, options), { uploaders: {
            authorized: createUploader(uploaderOptions),
            unauthorized: createUploader(Object.assign(Object.assign({}, uploaderOptions), { authorize: false })),
        } }));
}
//# sourceMappingURL=index.js.map