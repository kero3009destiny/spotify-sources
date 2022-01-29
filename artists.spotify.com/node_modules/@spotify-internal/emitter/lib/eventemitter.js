import { EmittedEvent } from './emitted_event';
import { defer } from './_internal/deferred';
/**
 * Returns the index of a given TypedListenerEntry in a list.
 *
 * @remarks
 * This function uses both the listener identity and the option equivalence to
 * determine the entry.
 * @param events - A list of TypedListenerEntry objects
 * @param listener - A function used to match an entry.
 * @param options - The options to match to an entry.
 * @returns The index of the entry or `-1` if the entry is not in the list.
 */
function indexOfEntry(events, listener, options) {
    for (let i = 0, l = events.length; i < l; i++) {
        const entry = events[i];
        if ((entry === null || entry === void 0 ? void 0 : entry.listener) === listener && entry.options.once === options.once) {
            return i;
        }
    }
    return -1;
}
function isListenerUnique(store, eventType, listener, options = {}) {
    if (!listener) {
        return false;
    }
    const records = store[eventType];
    if (!records || !records.length) {
        return true;
    }
    return indexOfEntry(records, listener, options) === -1;
}
function appendToStore(store, eventType, listener, options = {}) {
    if (!eventType || !listener) {
        return;
    }
    const records = store[eventType];
    const entry = {
        listener: listener,
        options: options,
    };
    if (!records) {
        store[eventType] = [entry];
        return;
    }
    records.push(entry);
}
/**
 * Implements an object that can accept listeners and dispatch events.
 *
 * EventEmitter instances are built with a provided "event map", which is a type
 * or interface that defines the events and data types for the instance. Each
 * key of the event map is an event type, and the type of the key denotes the
 * type of the data for that event.
 *
 * @typeParam T - The event map for this emitter instance.
 */
export class EventEmitter {
    constructor() {
        this._listeners = {};
        this._metaListeners = {
            add: {},
            remove: {},
        };
    }
    _dispatchFromStore(store, ev) {
        const eventType = ev.type;
        let records = store[eventType];
        if (!records) {
            return;
        }
        // Ensure that we only loop through the listeners that were added prior to
        // the dispatching of this loop. Otherwise, the list would grow if the
        // listener also ends up adding a listener.
        records = records.slice(0);
        for (const entry of records) {
            entry.listener.call(this, ev);
            if (entry.options.once) {
                this.removeListener(eventType, entry.listener, entry.options);
            }
            if (ev.immediateStopped) {
                break;
            }
        }
    }
    /**
     * Creates an EmittedEvent object that can be passed to one of the emitter methods.
     *
     * @param type - The type of event. This must be one of the events defined in
     *   the event map for the emitter.
     * @param data - The data associated with the event. This must be the type
     *   defined in the event map for the emitter.
     * @returns The EmittedEvent object for the given event type.
     */
    createEvent(type, data) {
        return new EmittedEvent(type, data);
    }
    /**
     * Adds a new event listener to the emitter instance.
     *
     * Any given combination of `eventType`, `listener` and `options` is only
     * added once (comparing the identity of the `listener` function). If you call
     * this method with exactly the same arguments (given a reference to the exact
     * same listener function), calls after the first would result in a noop.
     *
     * @param eventType - The type of event. This must be one of the events
     *   defined in the event map for the emitter.
     * @param listener - The listener function. This function will be invoked when
     *   the emitter emits an event of the provided type.
     * @param options - A set of options for the event listener.
     * @returns The emitter instance (for chaining).
     */
    on(eventType, listener, options = {}) {
        if (!eventType) {
            throw new TypeError('Argument `eventType` is required.');
        }
        if (!listener) {
            return this;
        }
        const listeners = this._listeners;
        if (isListenerUnique(listeners, eventType, listener, options)) {
            const addMetaStore = this._metaListeners.add;
            const metaListeners = addMetaStore[eventType];
            if (metaListeners && metaListeners.length) {
                const event = new EmittedEvent(eventType, {
                    listener: listener,
                    options: options,
                });
                this._dispatchFromStore(addMetaStore, event);
                if (event.defaultPrevented) {
                    return this;
                }
            }
            appendToStore(listeners, eventType, listener, options);
        }
        return this;
    }
    /**
     * Adds a new event listener to the emitter instance.
     *
     * Note: This is an alias for the `on()` method.
     *
     * @param eventType - The type of event. This must be one of the events
     *   defined in the event map for the emitter.
     * @param listener - The listener function. This function will be invoked when
     *   the emitter emits an event of the provided type.
     * @param options - A set of options for the event listener.
     * @returns The emitter instance (for chaining).
     */
    addListener(eventType, listener, options = {}) {
        return this.on(eventType, listener, options);
    }
    /**
     * Adds a map of event listeners to the emitter.
     *
     * The keys of this map should be one of the event types supported by this
     * emitter. The values for each key must be a listener function.
     *
     * @param listeners - A map of event types to event listeners.
     * @returns The emitter instance (for chaining).
     */
    addListeners(listeners) {
        for (const key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                this.on(key, listeners[key]);
            }
        }
        return this;
    }
    /**
     * Adds a new event listener to the emitter instance that would only be called
     * once after an event has been emitted and then removed afterwards.
     *
     * @param eventType - The type of event. This must be one of the events
     *   defined in the event map for the emitter.
     * @param listener - The listener function. This function will be invoked when
     *   the emitter emits an event of the provided type. This listener is removed
     *   after it has been called once.
     * @returns The emitter instance (for chaining).
     */
    once(eventType, listener) {
        return this.on(eventType, listener, { once: true });
    }
    /**
     * Removes an event listener for the given type.
     *
     * In order to remove a listener, the `eventType`, `listener` and `options`
     * properties must be exactly the same as the ones provided when the listener
     * was added with `on()` or `addListener()` or `addListeners()`.
     *
     * @param eventType - The type of event. This must be one of the events
     *   defined in the event map for the emitter.
     * @param listener - The listener function. This function will be invoked when
     *   the emitter emits an event of the provided type.
     * @param options - A set of options for the event listener.
     * @returns The emitter instance (for chaining).
     */
    removeListener(eventType, listener, options = {}) {
        if (!eventType) {
            throw new TypeError('Argument `eventType` is required.');
        }
        if (!listener) {
            return this;
        }
        const _listeners = this._listeners[eventType];
        if (!_listeners) {
            return this;
        }
        const index = indexOfEntry(_listeners, listener, options);
        if (index === -1) {
            return this;
        }
        const metaListeners = this._metaListeners.remove[eventType];
        if (metaListeners && metaListeners.length) {
            const event = new EmittedEvent(eventType, {
                listener: listener,
                options: options,
            });
            this._dispatchFromStore(this._metaListeners.remove, event);
            if (event.defaultPrevented) {
                return this;
            }
        }
        _listeners.splice(index, 1);
        return this;
    }
    /**
     * Removes a map of event listeners to the emitter.
     *
     * The keys of this map should be one of the event types supported by this
     * emitter. The values for each key must be a listener function.
     *
     * In order to remove a listener, the `eventType`, and `listener` properties
     * must be exactly the same as the ones provided when the listener was added
     * with `on()` or `addListener()` or `addListeners()`.
     *
     * @param listeners - A map of event types to event listeners.
     * @returns The emitter instance (for chaining).
     */
    removeListeners(listeners) {
        for (const key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                this.removeListener(key, listeners[key]);
            }
        }
        return this;
    }
    /**
     * Removes all listeners for a given event type, or removes all listeners if
     * the event type is omitted.
     *
     * @param eventType - When provided, this method removes all of the listeners
     *   for this event type. If not provided, this method removes all listeners
     *   for all types from this emitter.
     * @returns The emitter instance (for chaining).
     */
    removeAllListeners(eventType) {
        if (!eventType) {
            this._listeners = {};
        }
        else {
            this._listeners[eventType] = [];
        }
        return this;
    }
    /**
     * Emits an event of the provided type with the provided data.
     *
     * The event will be scheduled to run on the next possible time in the run
     * loop (dependent on the browser).
     *
     * @param eventType - The type of event to emit. This must be one of the event
     *   types defined in the event map for this emitter instance.
     * @param data - Data for the event. This must be the same type as the given
     *   event type as defined in the event map.
     * @returns The EmittedEvent object created for this emit operation.
     */
    emit(eventType, data) {
        if (!eventType) {
            throw new TypeError('Argument `eventType` is required.');
        }
        const event = this.createEvent(eventType, data);
        defer(() => this._dispatchFromStore(this._listeners, event));
        return event;
    }
    /**
     * Synchronously emits an event of the provided type with the provided data.
     *
     * Unlike `emit`, this method immediately triggers the event without scheduling.
     *
     * @param eventType - The type of event to emit. This must be one of the event
     *   types defined in the event map for this emitter instance.
     * @param data - Data for the event. This must be the same type as the given
     *   event type as defined in the event map.
     * @returns The EmittedEvent object created for this emit operation.
     */
    emitSync(eventType, data) {
        if (!eventType) {
            throw new TypeError('Argument `eventType` is required.');
        }
        const event = this.createEvent(eventType, data);
        this._dispatchFromStore(this._listeners, event);
        return event;
    }
    /**
     * Emits the provided EmittedEvent object.
     *
     * The event will be scheduled to run on the next possible time in the run
     * loop (dependent on the browser).
     *
     * @param ev - The EmittedEvent object to emit. This object must be an event
     *   for a type specified in the emitter's event map.
     * @returns The EmittedEvent object created for this emit operation.
     */
    emitEvent(ev) {
        defer(() => this._dispatchFromStore(this._listeners, ev));
        return ev;
    }
    /**
     * Synchronously emits the provided EmittedEvent object.
     *
     * Unlike `emit`, this method immediately triggers the event without scheduling.
     *
     * @param ev - The EmittedEvent object to emit. This object must be an event
     *   for a type specified in the emitter's event map.
     * @returns The EmittedEvent object created for this emit operation.
     */
    emitEventSync(ev) {
        this._dispatchFromStore(this._listeners, ev);
        return ev;
    }
    /**
     * Emits an event of the provided type with the provided data, and then calls
     * the provided callback event.
     *
     * @param eventType - The type of event to emit. This must be one of the event
     *   types defined in the event map for this emitter instance.
     * @param data - Data for the event. This must be the same type as the given
     *   event type as defined in the event map.
     * @param cb - A callback function that will be invoked after all the
     *   listeners for the given event type have been called.
     * @returns The EmittedEvent object created for this emit operation.
     */
    emitAndWait(eventType, data, cb) {
        if (!eventType) {
            throw new TypeError('Argument `eventType` is required.');
        }
        const ev = this.createEvent(eventType, data);
        defer(() => {
            this._dispatchFromStore(this._listeners, ev);
            cb.call(this, ev);
        });
        return ev;
    }
    /**
     * Emits an EmittedEvent object and then calls the provided callback event.
     *
     * @param ev - The EmittedEvent object to emit. This object must be an event
     *   for a type specified in the emitter's event map.
     * @param cb - A callback function that will be invoked after all the
     *   listeners for the given event type have been called.
     * @returns The EmittedEvent object created for this emit operation.
     */
    emitEventAndWait(ev, cb) {
        defer(() => {
            this._dispatchFromStore(this._listeners, ev);
            cb.call(this, ev);
        });
        return ev;
    }
    /**
     * Proxies the events from the source object, emitting a corresponding event
     * on this emitter instance.
     *
     * The proxied event will be scheduled to run on the next possible time in the
     * run loop (dependent on the browser).
     *
     * @param source - An EventEmitter instance.
     * @param sourceType - A event type from the source. This emitter will listen
     *   to this event from the source emitter and then emit the corresponding
     *   event provided in `targetType`
     * @param targetType - An event type from this emitter instance. When the
     *   source emitter emits an event of `sourceType`, this emitter will emit an
     *   event of `targetType`.
     * @returns The proxy function that was created to listen for events from the
     *   source emitter. This function can be used to remove the proxy listener
     *   from the source.
     */
    proxyEmit(source, sourceType, targetType) {
        if (!source || typeof source.on !== 'function') {
            throw new TypeError('Proxy source must be an EventEmitter');
        }
        // @ts-ignore : This can happen in compiled JS, but not in TS.
        if (source === this) {
            throw new ReferenceError('Cannot create recursive proxy.');
        }
        if (!sourceType || !targetType) {
            throw new TypeError('Parameter sourceType and targetType are required.');
        }
        const cb = (ev) => {
            if (ev.stopped) {
                return;
            }
            this.emitAndWait(targetType, ev.data, (_ev) => {
                if (_ev.defaultPrevented) {
                    ev.preventDefault();
                }
            });
        };
        source.on(sourceType, cb);
        return cb;
    }
    /**
     * Proxies the events from the source object, emitting a corresponding event
     * on this emitter instance.
     *
     * The proxied event will be emitted synchronously.
     *
     * @param source - An EventEmitter instance.
     * @param sourceType - A event type from the source. This emitter will listen
     *   to this event from the source emitter and then emit the corresponding
     *   event provided in `targetType`
     * @param targetType - An event type from this emitter instance. When the
     *   source emitter emits an event of `sourceType`, this emitter will emit an
     *   event of `targetType`.
     * @returns The proxy function that was created to listen for events from the
     *   source emitter. This function can be used to remove the proxy listener
     *   from the source.
     */
    proxyEmitSync(source, sourceType, targetType) {
        if (!source || typeof source.on !== 'function') {
            throw new TypeError('Proxy source must be an EventEmitter');
        }
        // @ts-ignore : This can happen in compiled JS, but not in TS.
        if (source === this) {
            throw new ReferenceError('Cannot create recursive proxy.');
        }
        if (!sourceType || !targetType) {
            throw new TypeError('Parameter sourceType and targetType are required.');
        }
        const cb = (ev) => {
            if (ev.stopped) {
                return;
            }
            const _ev = this.createEvent(targetType, ev.data);
            this.emitEventSync(_ev);
            if (_ev.defaultPrevented) {
                ev.preventDefault();
            }
        };
        source.on(sourceType, cb);
        return cb;
    }
    /**
     * Proxies the events from the source object, emitting corresponding events
     * from the event map on this emitter instance.
     *
     * The proxied event will be emitted synchronously.
     *
     * @param source - An EventEmitter instance.
     * @param proxies - A map of source events to target events.
     * @returns The proxy function that was created to listen for events from the
     *   source emitter. This function can be used to remove the proxy listener
     *   from the source.
     */
    proxyEmitAll(source, proxies) {
        for (const sourceType in proxies) {
            if (!proxies.hasOwnProperty(sourceType)) {
                continue;
            }
            this.proxyEmit(source, sourceType, proxies[sourceType]);
        }
    }
    /**
     * Proxies the events from the source object, emitting corresponding events
     * from the event map on this emitter instance.
     *
     * @param source - An EventEmitter instance.
     * @param proxies - A map of source events to target events.
     * @returns The proxy function that was created to listen for events from the
     *   source emitter. This function can be used to remove the proxy listener
     *   from the source.
     */
    proxyEmitAllSync(source, proxies) {
        for (const sourceType in proxies) {
            if (!proxies.hasOwnProperty(sourceType)) {
                continue;
            }
            this.proxyEmitSync(source, sourceType, proxies[sourceType]);
        }
    }
    /**
     * Adds a metalistener that will be called every time a listener for the given
     * event type is added to this emitter instance.
     *
     * @param eventType - The type of event. This must be one of the events
     *   defined in the event map for the emitter.
     * @param listener - A function that will be invoked every time a listener for
     *   the given event type is added.
     * @param options - A set of options for the event listener.
     * @returns The emitter instance (for chaining).
     */
    onAddListener(eventType, listener, options = {}) {
        const addMetaStore = this._metaListeners.add;
        if (isListenerUnique(addMetaStore, eventType, listener, options)) {
            appendToStore(addMetaStore, eventType, listener, options);
        }
        return this;
    }
    /**
     * Removes a metalistener that will be called every time a listener for the
     * given event type is added to this emitter instance.
     *
     * @param eventType - The type of event. This must be one of the events
     *   defined in the event map for the emitter.
     * @param listener - A function that will be invoked every time a listener for
     *   the given event type is removed.
     * @param options - A set of options for the event listener.
     * @returns The emitter instance (for chaining).
     */
    onRemoveListener(eventType, listener, options = {}) {
        const removeMetaStore = this._metaListeners.remove;
        if (isListenerUnique(removeMetaStore, eventType, listener, options)) {
            appendToStore(removeMetaStore, eventType, listener, options);
        }
        return this;
    }
}
//# sourceMappingURL=eventemitter.js.map